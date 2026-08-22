// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Exhaustive renderer for TIPI_CATALOGO.
 * Three widgets: greeting · faq-card · tip-chip. Unknown → drop.
 * Keep in sync with Renderer.tsx.
 */
import { isTipoCatalogo } from './tipi.js';

/**
 * @param {string} s
 */
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function renderGreeting(blocco) {
  return `<section class="w greeting" data-tipo="greeting">
  <h2>${escapeHtml(String(blocco.titolo ?? ''))}</h2>
  ${
    blocco.sottotitolo
      ? `<p>${escapeHtml(String(blocco.sottotitolo))}</p>`
      : ''
  }
</section>`;
}

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function renderFaqCard(blocco) {
  const fonte = String(blocco.fonte ?? '');
  return `<article class="w faq-card" data-tipo="faq-card">
  <h3>${escapeHtml(String(blocco.domanda ?? ''))}</h3>
  <p>${escapeHtml(String(blocco.risposta ?? ''))}</p>
  <small data-fonte="${escapeHtml(fonte)}">fonte: ${escapeHtml(fonte)}</small>
</article>`;
}

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function renderTipChip(blocco) {
  return `<button type="button" class="w tip-chip" data-tipo="tip-chip" data-tip="${escapeHtml(
    String(blocco.tipId ?? ''),
  )}">${escapeHtml(String(blocco.etichetta ?? ''))}</button>`;
}

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function renderBlocco(blocco) {
  if (!blocco || !isTipoCatalogo(blocco.tipo)) {
    return `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
  }
  switch (blocco.tipo) {
    case 'greeting':
      return renderGreeting(blocco);
    case 'faq-card':
      return renderFaqCard(blocco);
    case 'tip-chip':
      return renderTipChip(blocco);
    default:
      return `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
  }
}

/**
 * @param {readonly ({ tipo: string } & Record<string, unknown>)[]} blocchi
 * @returns {string}
 */
export function renderSequenza(blocchi) {
  return blocchi.map((b) => renderBlocco(b)).join('\n');
}

/** Canary: every catalog tipo has a renderer case. */
export const RENDERER_TIPI = Object.freeze(['greeting', 'faq-card', 'tip-chip']);
