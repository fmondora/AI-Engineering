// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Conversational demo — Hello Agent.
 * Prefers POST /api/chat (xAI Grok via server.py); falls back to deterministic matcher.
 */
import { TIPI_CATALOGO, TIP_LABEL } from './src/widgets/tipi.js';
import { RENDERER_TIPI, renderBlocco } from './src/widgets/renderer.js';
import { renderShell } from './src/shell/shell.js';
import {
  FAQ,
  mossaApertura,
  mossaDaTip,
  mossaDaUtente,
} from './src/agent/hello-agent.js';

(function assertCatalogClosed() {
  for (const t of TIPI_CATALOGO) {
    if (!RENDERER_TIPI.includes(t)) throw new Error(`catalog tipo missing renderer: ${t}`);
  }
  for (const t of RENDERER_TIPI) {
    if (!TIPI_CATALOGO.has(t)) throw new Error(`renderer tipo not in catalog: ${t}`);
  }
})();

/** @type {{ nome?: string, lingua?: string, opened: string[] }} */
let sessione = { opened: [] };

/** @type {{ role: 'user'|'agent', text?: string, blocchi?: object[] }[]} */
const turns = [];

/** @type {'unknown' | 'llm' | 'deterministic'} */
let mode = 'unknown';

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function memoryNotes() {
  const notes = [];
  if (providerLabel) notes.push(`engine: ${providerLabel}`);
  else if (mode !== 'unknown') notes.push(`engine: ${mode}`);
  if (sessione.nome) notes.push(`name: ${sessione.nome}`);
  if (sessione.lingua) notes.push(`language: ${sessione.lingua}`);
  for (const id of sessione.opened) notes.push(`opened: ${id}`);
  if (!sessione.nome && !sessione.opened.length) {
    notes.push('(say “my name is …” or ask about the twins)');
  }
  return notes;
}

function markOpened(id) {
  if (!id || sessione.opened.includes(id)) return;
  sessione = { ...sessione, opened: [...sessione.opened, id] };
}

function applySessionPatch(patch) {
  if (!patch || typeof patch !== 'object') return;
  if (patch.nome) sessione = { ...sessione, nome: patch.nome };
  if (patch.lingua === 'it' || patch.lingua === 'en') {
    sessione = { ...sessione, lingua: patch.lingua };
  }
  if (Array.isArray(patch.opened_add)) {
    for (const id of patch.opened_add) markOpened(id);
  }
}

/** Infer memory + light cleanup on LLM/deterministic blocchi. */
function normalizeMossa(mossa, userText) {
  const blocchi = [];
  let tips = 0;
  for (const b of mossa.blocchi || []) {
    if (b.tipo === 'tip-chip') {
      tips += 1;
      if (tips > 3) continue;
    }
    if (b.tipo === 'faq-card') {
      const hit = Object.keys(FAQ).find(
        (k) =>
          FAQ[k].domanda === b.domanda ||
          (userText && userText.toLowerCase().includes(k.replaceAll('-', ' '))),
      );
      if (hit) markOpened(hit);
      else if (/twin|aiuxer|aiengineer/i.test(b.domanda + b.risposta)) markOpened('twins');
      else if (/genui|catalog/i.test(b.domanda + b.risposta)) markOpened('genui-band');
      else if (/memor/i.test(b.domanda + b.risposta)) markOpened('memory');
      else if (/who are you|chi sei|can you|puoi fare|how should/i.test(b.domanda + (userText || '')))
        markOpened('how-to-talk');
      else if (/what is this|cos'?è questo/i.test(b.domanda + (userText || '')))
        markOpened('what-is-this');
    }
    if (b.tipo === 'tip-chip' && b.tipId) {
      /* tips offered, not opened */
    }
    blocchi.push(b);
  }
  const prosa =
    (mossa.prosa && String(mossa.prosa).trim()) ||
    (blocchi.some((b) => b.tipo === 'faq-card')
      ? 'Here is what is in knowledge/'
      : 'Ask away — or pick a tip.');
  if (/twin/i.test(userText || '')) markOpened('twins');
  if (/genui|catalog/i.test(userText || '')) markOpened('genui-band');
  if (/memor/i.test(userText || '')) markOpened('memory');
  if (/chi sei|who are you|puoi fare|can you|cosa sai/i.test(userText || ''))
    markOpened('who-are-you');
  return { prosa, blocchi };
}

/** @type {string | null} */
let providerLabel = null;

async function probeHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('no health');
    const data = await res.json();
    mode = data.llm ? 'llm' : 'deterministic';
    providerLabel = data.llm
      ? `${data.provider}:${data.model}`
      : 'deterministic';
    return data;
  } catch {
    mode = 'deterministic';
    providerLabel = 'deterministic';
    return null;
  }
}

/**
 * @param {string} text
 * @returns {Promise<{ prosa?: string, blocchi: object[] }>}
 */
async function chatTurn(text) {
  if (mode === 'llm') {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sessione,
          history: turns.map((t) => ({
            role: t.role,
            text: t.text,
            blocchi: t.blocchi,
          })),
        }),
      });
      if (res.status === 503) {
        mode = 'deterministic';
        providerLabel = 'deterministic';
        const local = mossaDaUtente(text, sessione);
        sessione = local.sessione;
        return normalizeMossa(local.mossa, text);
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const local = mossaDaUtente(text, sessione);
        sessione = local.sessione;
        return normalizeMossa(
          {
            prosa: `LLM error: ${err.detail || err.error || res.status}. ${local.mossa.prosa}`,
            blocchi: local.mossa.blocchi,
          },
          text,
        );
      }
      const data = await res.json();
      applySessionPatch(data.session_patch);
      if (data.provider && data.model) {
        providerLabel = `${data.provider}:${data.model}`;
        mode = 'llm';
      }
      return normalizeMossa(
        { prosa: data.prosa, blocchi: data.blocchi || [] },
        text,
      );
    } catch (e) {
      mode = 'deterministic';
      providerLabel = 'deterministic';
      const local = mossaDaUtente(text, sessione);
      sessione = local.sessione;
      return normalizeMossa(
        {
          prosa: `Offline LLM (${e.message}). ${local.mossa.prosa}`,
          blocchi: local.mossa.blocchi,
        },
        text,
      );
    }
  }

  const local = mossaDaUtente(text, sessione);
  sessione = local.sessione;
  return normalizeMossa(local.mossa, text);
}

function paint() {
  const feed = turns
    .map((turn) => {
      if (turn.role === 'user') {
        return `<div class="bubble user" data-shell="user-bubble"><span class="who">You</span><p>${escapeHtml(
          turn.text,
        )}</p></div>`;
      }
      const body = [
        turn.text ? `<p class="prosa">${escapeHtml(turn.text)}</p>` : '',
        ...(turn.blocchi || []).map((b) => renderBlocco(b)),
      ].join('\n');
      return `<div class="bubble agent" data-shell="agent-turn"><span class="who">Hello Agent</span><div class="agent-body">${body}</div></div>`;
    })
    .join('\n');

  const mem = `<ul id="notes">${memoryNotes()
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('')}</ul>`;

  document.getElementById('root').innerHTML = renderShell({
    feedHtml: feed,
    memoryHtml: mem,
  });

  document.querySelectorAll('.tip-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tipId = btn.getAttribute('data-tip');
      void onUser(TIP_LABEL[tipId] || tipId || '', tipId);
    });
  });

  const form = document.getElementById('composer');
  const input = document.getElementById('msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    void onUser(text);
  });
  input?.focus();
}

/**
 * @param {string} text
 * @param {string} [tipId]
 */
async function onUser(text, tipId) {
  turns.push({ role: 'user', text });
  paint();
  const thinking = { role: 'agent', text: '…', blocchi: [] };
  turns.push(thinking);
  paint();

  let mossa;
  if (mode === 'llm') {
    mossa = await chatTurn(text);
  } else if (tipId && FAQ[tipId]) {
    const local = mossaDaTip(tipId, sessione);
    sessione = local.sessione;
    mossa = normalizeMossa(local.mossa, text);
  } else {
    mossa = await chatTurn(text);
  }

  turns.pop();
  turns.push({ role: 'agent', text: mossa.prosa, blocchi: mossa.blocchi });
  paint();
  scrollFeed();
  document.getElementById('msg')?.focus();
}

function scrollFeed() {
  const feed = document.getElementById('feed');
  if (feed) feed.scrollTop = feed.scrollHeight;
}

async function boot() {
  await probeHealth();
  paint(); // show shell + engine in memory while opening
  if (mode === 'llm') {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: '(open)', sessione, history: [] }),
      });
      if (res.ok) {
        const data = await res.json();
        applySessionPatch(data.session_patch);
        if (data.provider && data.model) {
          providerLabel = `${data.provider}:${data.model}`;
        }
        const m = normalizeMossa(
          { prosa: data.prosa, blocchi: data.blocchi || [] },
          '(open)',
        );
        turns.push({ role: 'agent', text: m.prosa, blocchi: m.blocchi });
        paint();
        return;
      }
      // keep llm mode for later retries; open with deterministic for now
    } catch {
      /* fall through */
    }
  }
  const open = normalizeMossa(mossaApertura(sessione), '(open)');
  turns.push({ role: 'agent', text: open.prosa, blocchi: open.blocchi });
  paint();
}

void boot();
