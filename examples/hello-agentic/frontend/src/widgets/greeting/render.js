// aiuxer@0.3.2 | 2026-08-22 | Build
import { escapeHtml } from '../_shared/escape.js';
import { TIPO } from './tipi.js';

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function render(blocco) {
  return `<section class="w greeting" data-tipo="${TIPO}">
  <h2>${escapeHtml(String(blocco.titolo ?? ''))}</h2>
  ${
    blocco.sottotitolo
      ? `<p>${escapeHtml(String(blocco.sottotitolo))}</p>`
      : ''
  }
</section>`;
}
