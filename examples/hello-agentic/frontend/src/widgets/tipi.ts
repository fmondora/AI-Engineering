// aiuxer@0.3.2 | 2026-08-22 | Build
/**
 * Catalog facade (typed) — union of per-directory widget shapes.
 * Evolve under `greeting/`, `faq-card/`, `tip-chip/` — not only here.
 */
import type { BloccoGreeting } from './greeting/tipi';
import type { BloccoFaqCard } from './faq-card/tipi';
import type { BloccoTipChip } from './tip-chip/tipi';
import { TIPO as GREETING } from './greeting/tipi';
import { TIPO as FAQ } from './faq-card/tipi';
import { TIPO as TIP } from './tip-chip/tipi';

export type { BloccoGreeting } from './greeting/tipi';
export type { BloccoFaqCard } from './faq-card/tipi';
export type { BloccoTipChip, TipId } from './tip-chip/tipi';
export { TIP_IDS, TIP_LABEL } from './tip-chip/tipi';

export type TipoBlocco = typeof GREETING | typeof FAQ | typeof TIP;
export type Blocco = BloccoGreeting | BloccoFaqCard | BloccoTipChip;

export const TIPI_CATALOGO: ReadonlySet<TipoBlocco> = new Set([GREETING, FAQ, TIP]);

export function isTipoCatalogo(x: string): x is TipoBlocco {
  return TIPI_CATALOGO.has(x as TipoBlocco);
}
