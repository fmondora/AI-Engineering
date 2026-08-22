// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Closed catalog — Hello Agentic (`specs/0001-hello-catalog.md`).
 * Runtime SoT (no bundler). Keep in sync with tipi.ts.
 */

/** @typedef {'greeting' | 'faq-card' | 'tip-chip'} TipoBlocco */
/** @typedef {'what-is-this' | 'who-are-you' | 'twins' | 'genui-band' | 'memory' | 'how-to-talk'} TipId */

/** @type {ReadonlySet<TipoBlocco>} */
export const TIPI_CATALOGO = new Set(['greeting', 'faq-card', 'tip-chip']);

/** Tip ids the model may order — not free text actions. */
export const TIP_IDS = Object.freeze([
  'what-is-this',
  'who-are-you',
  'twins',
  'genui-band',
  'memory',
  'how-to-talk',
]);

/** @type {Record<TipId, string>} */
export const TIP_LABEL = Object.freeze({
  'what-is-this': 'What is this?',
  'who-are-you': 'Who are you?',
  twins: 'The twins',
  'genui-band': 'GenUI band',
  memory: 'Memory',
  'how-to-talk': 'How to talk',
});

/**
 * @param {string} x
 * @returns {x is TipoBlocco}
 */
export function isTipoCatalogo(x) {
  return TIPI_CATALOGO.has(/** @type {TipoBlocco} */ (x));
}
