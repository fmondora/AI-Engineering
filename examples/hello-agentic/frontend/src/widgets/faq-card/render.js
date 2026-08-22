// aiuxer@0.3.2 | 2026-08-22 | Build
import { escapeHtml } from '../_shared/escape.js';
import { TIPO } from './tipi.js';

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function render(blocco) {
  const fonte = String(blocco.fonte ?? '');
  return `<article class="w faq-card" data-tipo="${TIPO}">
  <h3>${escapeHtml(String(blocco.domanda ?? ''))}</h3>
  <p>${escapeHtml(String(blocco.risposta ?? ''))}</p>
  <small data-fonte="${escapeHtml(fonte)}">fonte: ${escapeHtml(fonte)}</small>
</article>`;
}
