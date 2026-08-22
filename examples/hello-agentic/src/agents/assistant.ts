/**
 * Hello Assistant — only user-facing agent (P-L).
 * Emits catalog types only; KB facts come from knowledge/ (grounded).
 */
import type { Blocco, TipId } from '../../frontend/src/widgets/tipi';

export type Mossa = {
  readonly prosa?: string;
  readonly blocchi: readonly Blocco[];
};

const FAQ: Record<TipId, { domanda: string; risposta: string }> = {
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

/** Deterministic open — no LLM required for hello world. */
export function mossaApertura(): Mossa {
  return {
    prosa: 'Welcome. Pick a tip or read the greeting.',
    blocchi: [
      {
        tipo: 'greeting',
        titolo: 'Hello Agentic',
        sottotitolo: 'AIUxer interaction slice · closed catalog',
      },
      { tipo: 'tip-chip', tipId: 'what-is-this', etichetta: 'What is this?' },
      { tipo: 'tip-chip', tipId: 'genui-band', etichetta: 'GenUI band' },
      { tipo: 'tip-chip', tipId: 'memory', etichetta: 'Memory' },
    ],
  };
}

/** Tip → FAQ card from closed map (domain), not free generation. */
export function mossaDaTip(tipId: TipId): Mossa {
  const faq = FAQ[tipId];
  return {
    blocchi: [
      {
        tipo: 'faq-card',
        domanda: faq.domanda,
        risposta: faq.risposta,
        fonte: 'knowledge/faq.md',
      },
    ],
  };
}
