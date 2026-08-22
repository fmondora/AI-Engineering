// aiuxer@0.3.1 | 2026-08-22 | Build
/** Runnable demo mirroring tipi + Renderer + assistant (no build step). */

const TIPI = new Set(['greeting', 'faq-card', 'tip-chip']);

const FAQ = {
  'what-is-this': {
    domanda: 'What is this?',
    risposta:
      'A minimal product to exercise AIUxer + AIEngineer end-to-end: pipelines + KB → interaction.',
  },
  'genui-band': {
    domanda: 'Which GenUI band?',
    risposta: 'Controlled + Declarative closed catalog — not open-ended HTML.',
  },
  memory: {
    domanda: 'Where is my memory?',
    risposta: 'Session notes in the memory panel (client-only in v1). See Book 02-STACK.',
  },
};

const notes = [];

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderBlocco(b) {
  if (!TIPI.has(b.tipo)) {
    return `<div class="w fallback">dropped unknown type</div>`;
  }
  switch (b.tipo) {
    case 'greeting':
      return `<section class="w greeting" data-tipo="greeting"><h2>${escapeHtml(b.titolo)}</h2>${
        b.sottotitolo ? `<p>${escapeHtml(b.sottotitolo)}</p>` : ''
      }</section>`;
    case 'faq-card':
      return `<article class="w faq-card" data-tipo="faq-card"><h3>${escapeHtml(
        b.domanda,
      )}</h3><p>${escapeHtml(b.risposta)}</p><small>fonte: ${escapeHtml(b.fonte)}</small></article>`;
    case 'tip-chip':
      return `<button type="button" class="w tip-chip" data-tip="${escapeHtml(
        b.tipId,
      )}">${escapeHtml(b.etichetta)}</button>`;
    default:
      return `<div class="w fallback">dropped</div>`;
  }
}

function apertura() {
  return [
    {
      tipo: 'greeting',
      titolo: 'Hello Agentic',
      sottotitolo: 'AIUxer interaction slice · closed catalog',
    },
    { tipo: 'tip-chip', tipId: 'what-is-this', etichetta: 'What is this?' },
    { tipo: 'tip-chip', tipId: 'genui-band', etichetta: 'GenUI band' },
    { tipo: 'tip-chip', tipId: 'memory', etichetta: 'Memory' },
  ];
}

function paint(extra = []) {
  const blocchi = [...apertura(), ...extra];
  const main = blocchi.map(renderBlocco).join('\n');
  const mem = `<ul id="notes">${notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}</ul>`;
  document.getElementById('root').innerHTML = `<div class="app-shell">
  <header class="shell-header" data-shell="true"><strong>Hello Agentic</strong>
  <span class="muted">closed catalog · no writes in v1</span></header>
  <main class="shell-main" id="feed">${main}</main>
  <aside class="shell-memory" data-shell="memory-panel"><h2>Memory context</h2>
  <p class="muted">Session notes (client-only)</p>${mem}</aside>
</div>`;

  document.querySelectorAll('.tip-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tipId = btn.getAttribute('data-tip');
      const faq = FAQ[tipId];
      if (!faq) return;
      notes.push(`opened: ${tipId}`);
      paint([
        {
          tipo: 'faq-card',
          domanda: faq.domanda,
          risposta: faq.risposta,
          fonte: 'knowledge/faq.md',
        },
      ]);
    });
  });
}

paint();
