// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Closed catalog — Hello Agentic (`specs/0001-hello-catalog.md`).
 * LLM may select only these types; Renderer must cover the same set.
 */

export type TipoBlocco = 'greeting' | 'faq-card' | 'tip-chip';

export const TIPI_CATALOGO: ReadonlySet<TipoBlocco> = new Set([
  'greeting',
  'faq-card',
  'tip-chip',
]);

/** Tip ids the model may order — not free text actions. */
export const TIP_IDS = ['what-is-this', 'genui-band', 'memory'] as const;
export type TipId = (typeof TIP_IDS)[number];

export interface BloccoGreeting {
  readonly tipo: 'greeting';
  readonly titolo: string;
  readonly sottotitolo?: string;
}

export interface BloccoFaqCard {
  readonly tipo: 'faq-card';
  readonly domanda: string;
  readonly risposta: string;
  readonly fonte: string; // path under knowledge/
}

export interface BloccoTipChip {
  readonly tipo: 'tip-chip';
  readonly tipId: TipId;
  readonly etichetta: string;
}

export type Blocco = BloccoGreeting | BloccoFaqCard | BloccoTipChip;

export function isTipoCatalogo(x: string): x is TipoBlocco {
  return TIPI_CATALOGO.has(x as TipoBlocco);
}
