// aiuxer@0.3.2 | 2026-08-22 | Build
/**
 * Typed facade — prefer per-directory renderers + registry for runtime.
 * Keep exhaustive switch aligned with TIPI_CATALOGO (#1 / #33).
 */
import type { Blocco, TipId } from './tipi';
import { TIPI_CATALOGO } from './tipi';
import { TIPO as GREETING } from './greeting/tipi';
import { TIPO as FAQ } from './faq-card/tipi';
import { TIPO as TIP } from './tip-chip/tipi';

export interface Gestori {
  readonly onTip?: (tipId: TipId) => void;
}

export const RENDERER_TIPI = [GREETING, FAQ, TIP] as const;

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderGreeting(blocco: Extract<Blocco, { tipo: 'greeting' }>): string {
  return `<section class="w greeting" data-tipo="${GREETING}">
  <h2>${escapeHtml(blocco.titolo)}</h2>
  ${blocco.sottotitolo ? `<p>${escapeHtml(blocco.sottotitolo)}</p>` : ''}
</section>`;
}

export function renderFaqCard(blocco: Extract<Blocco, { tipo: 'faq-card' }>): string {
  return `<article class="w faq-card" data-tipo="${FAQ}">
  <h3>${escapeHtml(blocco.domanda)}</h3>
  <p>${escapeHtml(blocco.risposta)}</p>
  <small data-fonte="${escapeHtml(blocco.fonte)}">fonte: ${escapeHtml(blocco.fonte)}</small>
</article>`;
}

export function renderTipChip(blocco: Extract<Blocco, { tipo: 'tip-chip' }>): string {
  return `<button type="button" class="w tip-chip" data-tipo="${TIP}" data-tip="${blocco.tipId}">
  ${escapeHtml(blocco.etichetta)}
</button>`;
}

export function renderBlocco(blocco: Blocco): string {
  switch (blocco.tipo) {
    case GREETING:
      return renderGreeting(blocco);
    case FAQ:
      return renderFaqCard(blocco);
    case TIP:
      return renderTipChip(blocco);
    default: {
      const _exhaustive: never = blocco;
      void _exhaustive;
      return `<div class="w fallback" data-tipo="unknown">dropped unknown type</div>`;
    }
  }
}

export function renderSequenza(blocchi: readonly Blocco[]): string {
  return blocchi.map((b) => renderBlocco(b)).join('\n');
}

/** @deprecated */
export function RenderBlocco(blocco: Blocco, _gestori?: Gestori): string {
  return renderBlocco(blocco);
}

/** @deprecated */
export function RenderSequenza(blocchi: readonly Blocco[], _gestori?: Gestori): string {
  return renderSequenza(blocchi);
}

export function assertEnumSubsetRenderer(): void {
  for (const t of TIPI_CATALOGO) {
    if (!(RENDERER_TIPI as readonly string[]).includes(t)) {
      throw new Error(`catalog tipo missing renderer: ${t}`);
    }
  }
}
