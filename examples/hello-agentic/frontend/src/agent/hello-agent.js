// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Hello Agent — onboarding guide (browser twin of src/agents/assistant.ts).
 * Emits catalog types only; facts from knowledge/faq.md (inlined map).
 */
import { TIP_IDS, TIP_LABEL } from '../widgets/tipi.js';

/**
 * @typedef {{ nome?: string, lingua?: 'it' | 'en', opened: string[] }} Sessione
 * @typedef {{ prosa?: string, blocchi: object[] }} Mossa
 */

/** Mirrors knowledge/faq.md */
const FAQ = {
  'what-is-this': {
    domanda: 'What is this?',
    risposta:
      'A minimal product to exercise AI-Engineering end-to-end: pipelines + KB → AIUxer interaction → AIEngineer tech deltas → Book → closed-catalog UI.',
    keywords: ['what is this', "cos'è", 'playground', 'hello agentic', 'this project'],
  },
  'who-are-you': {
    domanda: 'Who are you?',
    risposta:
      'I am Hello Agent, the only user-facing speaker here. I onboard you from the knowledge base, offer tip chips, and keep session notes. I do not invent facts outside knowledge/.',
    keywords: ['who are you', 'chi sei', 'your name', 'hello agent', 'assistente'],
  },
  twins: {
    domanda: 'Who are the twins?',
    risposta:
      'AIUxer designs/implements interaction + user memory. AIEngineer owns architecture, cost, evals, and tech beyond the active stack in Book 02-STACK. Humans own pipelines and the KB.',
    keywords: ['twin', 'aiuxer', 'aiengineer', 'plugin', 'ai-native'],
  },
  'genui-band': {
    domanda: 'Which GenUI band?',
    risposta:
      'Controlled + Declarative closed catalog — not open-ended HTML. Only greeting, faq-card, tip-chip.',
    keywords: ['genui', 'catalog', 'band', 'open-ended', 'widget', 'html'],
  },
  memory: {
    domanda: 'Where is my memory?',
    risposta:
      'Session notes in the memory panel (client-only in v1): tips you opened, optional name, language note. Not a durable server store — see Book 02-STACK.',
    keywords: ['memory', 'memoria', 'session', 'remember', 'ricorda'],
  },
  'how-to-talk': {
    domanda: 'How should I talk to you?',
    risposta:
      'Type freely or click a tip. Ask about this playground, the twins, GenUI, or memory. If it is not in the KB, I will say so and offer tips — I will not invent.',
    keywords: ['how to', 'come parlo', 'help', 'aiuto', 'commands'],
  },
};

/**
 * @param {string} tipId
 */
function faqCard(tipId) {
  const faq = FAQ[tipId];
  return {
    tipo: 'faq-card',
    domanda: faq.domanda,
    risposta: faq.risposta,
    fonte: 'knowledge/faq.md',
  };
}

/**
 * @param {readonly string[]} [ids]
 */
function tipChips(ids = TIP_IDS) {
  return ids.map((tipId) => ({
    tipo: 'tip-chip',
    tipId,
    etichetta: TIP_LABEL[tipId],
  }));
}

/**
 * @param {string} text
 */
function matchFaq(text) {
  const t = text.toLowerCase().trim();
  let best;
  let score = 0;
  for (const tipId of TIP_IDS) {
    const entry = FAQ[tipId];
    let s = 0;
    for (const kw of entry.keywords) {
      if (t.includes(kw)) s += kw.length;
    }
    if (s > score) {
      score = s;
      best = tipId;
    }
  }
  return score > 0 ? best : undefined;
}

/**
 * @param {Sessione} sessione
 * @param {string} text
 */
export function applicaIntentiSessione(sessione, text) {
  const t = text.trim();
  const next = { ...sessione, opened: [...sessione.opened] };
  let ack;

  const nameIt = t.match(/mi chiamo\s+([A-Za-zÀ-ÿ][\wÀ-ÿ-]{0,40})/i);
  const nameEn = t.match(/(?:i(?:'m| am)|call me|my name is)\s+([A-Za-zÀ-ÿ][\wÀ-ÿ-]{0,40})/i);
  const name = nameIt?.[1] ?? nameEn?.[1];
  if (name) {
    next.nome = name;
    ack = `Noted — I will call you ${name}.`;
  }

  if (/\b(italiano|italian)\b/i.test(t)) {
    next.lingua = 'it';
    ack = (ack ? ack + ' ' : '') + 'Language note: italiano (session only).';
  } else if (/\b(english|inglese)\b/i.test(t) && !nameEn) {
    next.lingua = 'en';
    ack = (ack ? ack + ' ' : '') + 'Language note: English (session only).';
  }

  return { sessione: next, ack };
}

/**
 * @param {Sessione} [sessione]
 * @returns {Mossa}
 */
export function mossaApertura(sessione = { opened: [] }) {
  const chi = sessione.nome ? `, ${sessione.nome}` : '';
  return {
    prosa: `Hi${chi}. I am Hello Agent — your onboarding guide for this playground. Ask me anything in the KB, or pick a tip.`,
    blocchi: [
      {
        tipo: 'greeting',
        titolo: 'Hello Agent',
        sottotitolo: 'Onboarding guide · closed catalog · grounded on knowledge/',
      },
      ...tipChips(),
    ],
  };
}

/**
 * @param {string} tipId
 * @param {Sessione} sessione
 */
export function mossaDaTip(tipId, sessione) {
  if (!FAQ[tipId]) {
    return {
      sessione,
      mossa: {
        prosa: 'Unknown tip — not in the closed set.',
        blocchi: tipChips(),
      },
    };
  }
  const opened = sessione.opened.includes(tipId)
    ? sessione.opened
    : [...sessione.opened, tipId];
  return {
    sessione: { ...sessione, opened },
    mossa: {
      prosa: 'From the knowledge base:',
      blocchi: [faqCard(tipId), ...tipChips(TIP_IDS.filter((id) => id !== tipId).slice(0, 3))],
    },
  };
}

/**
 * @param {string} text
 * @param {Sessione} sessione
 */
export function mossaDaUtente(text, sessione) {
  const { sessione: afterIntent, ack } = applicaIntentiSessione(sessione, text);
  const hit = matchFaq(text);

  if (hit) {
    const opened = afterIntent.opened.includes(hit)
      ? afterIntent.opened
      : [...afterIntent.opened, hit];
    return {
      sessione: { ...afterIntent, opened },
      mossa: {
        prosa: ack ?? 'From the knowledge base:',
        blocchi: [faqCard(hit), ...tipChips(TIP_IDS.filter((id) => id !== hit).slice(0, 3))],
      },
    };
  }

  if (ack) {
    return {
      sessione: afterIntent,
      mossa: {
        prosa: ack + ' What would you like to explore?',
        blocchi: tipChips(),
      },
    };
  }

  return {
    sessione: afterIntent,
    mossa: {
      prosa:
        'I only answer from knowledge/ — that is not in the KB. Try a tip, or ask about this playground, the twins, GenUI, or memory.',
      blocchi: tipChips(),
    },
  };
}

export { FAQ, TIP_LABEL, TIP_IDS };
