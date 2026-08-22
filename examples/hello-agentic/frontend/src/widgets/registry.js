// aiuxer@0.3.2 | 2026-08-22 | Build
/**
 * Closed catalog registry — one directory per type; enum ⊆ renderer.
 * Pattern AIUxer #33 (one-directory-per-catalog-type).
 */
import { TIPI_CATALOGO as SEMANTIC_TIPI } from '../semantics/vocab.js';
import { TIPO as GREETING_TIPO } from './greeting/tipi.js';
import { render as renderGreeting } from './greeting/render.js';
import { TIPO as FAQ_TIPO } from './faq-card/tipi.js';
import { render as renderFaqCard } from './faq-card/render.js';
import { TIPO as TIP_TIPO } from './tip-chip/tipi.js';
import { render as renderTipChip } from './tip-chip/render.js';

/** @type {ReadonlySet<string>} */
export const TIPI_CATALOGO = SEMANTIC_TIPI;

/** @type {Readonly<Record<string, (b: object) => string>>} */
export const RENDERERS = Object.freeze({
  [GREETING_TIPO]: renderGreeting,
  [FAQ_TIPO]: renderFaqCard,
  [TIP_TIPO]: renderTipChip,
});

export const RENDERER_TIPI = Object.freeze(Object.keys(RENDERERS));

/**
 * @param {string} x
 * @returns {boolean}
 */
export function isTipoCatalogo(x) {
  return TIPI_CATALOGO.has(x);
}

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function renderBlocco(blocco) {
  if (!blocco || !isTipoCatalogo(blocco.tipo)) {
    return `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
  }
  const fn = RENDERERS[blocco.tipo];
  return fn
    ? fn(blocco)
    : `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
}

/**
 * @param {readonly ({ tipo: string } & Record<string, unknown>)[]} blocchi
 * @returns {string}
 */
export function renderSequenza(blocchi) {
  return blocchi.map((b) => renderBlocco(b)).join('\n');
}

/** Canary: semantic catalog ⊆ renderer dirs, and impl dirs ⊆ semantics. */
export function assertEnumSubsetRenderer() {
  const impl = new Set([GREETING_TIPO, FAQ_TIPO, TIP_TIPO]);
  for (const t of TIPI_CATALOGO) {
    if (!RENDERERS[t]) throw new Error(`semantic tipo missing renderer: ${t}`);
    if (!impl.has(t)) throw new Error(`semantic tipo missing widget dir: ${t}`);
  }
  for (const t of Object.keys(RENDERERS)) {
    if (!TIPI_CATALOGO.has(t)) throw new Error(`renderer tipo not in semantics: ${t}`);
  }
}
