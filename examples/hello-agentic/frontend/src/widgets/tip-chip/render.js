// aiuxer@0.3.2 | 2026-08-22 | Build
import { escapeHtml } from '../_shared/escape.js';
import { TIPO } from './tipi.js';

/**
 * @param {{ tipo: string } & Record<string, unknown>} blocco
 * @returns {string}
 */
export function render(blocco) {
  return `<button type="button" class="w tip-chip" data-tipo="${TIPO}" data-tip="${escapeHtml(
    String(blocco.tipId ?? ''),
  )}">${escapeHtml(String(blocco.etichetta ?? ''))}</button>`;
}
