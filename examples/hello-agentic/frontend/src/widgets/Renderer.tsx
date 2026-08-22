// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Exhaustive renderer for TIPI_CATALOGO. Unknown types → safe fallback (drop).
 */
import type { Blocco, TipId } from './tipi';

export interface Gestori {
  readonly onTip?: (tipId: TipId) => void;
}

export function RenderBlocco(blocco: Blocco, gestori?: Gestori): string {
  switch (blocco.tipo) {
    case 'greeting':
      return `<section class="w greeting" data-tipo="greeting">
        <h2>${escapeHtml(blocco.titolo)}</h2>
        ${blocco.sottotitolo ? `<p>${escapeHtml(blocco.sottotitolo)}</p>` : ''}
      </section>`;
    case 'faq-card':
      return `<article class="w faq-card" data-tipo="faq-card">
        <h3>${escapeHtml(blocco.domanda)}</h3>
        <p>${escapeHtml(blocco.risposta)}</p>
        <small data-fonte="${escapeHtml(blocco.fonte)}">fonte: ${escapeHtml(blocco.fonte)}</small>
      </article>`;
    case 'tip-chip':
      return `<button type="button" class="w tip-chip" data-tipo="tip-chip" data-tip="${blocco.tipId}">
        ${escapeHtml(blocco.etichetta)}
      </button>`;
    default: {
      const _exhaustive: never = blocco;
      void _exhaustive;
      return `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
    }
  }
}

export function RenderSequenza(blocchi: readonly Blocco[], gestori?: Gestori): string {
  return blocchi.map((b) => RenderBlocco(b, gestori)).join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
