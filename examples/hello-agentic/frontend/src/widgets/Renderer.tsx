// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Exhaustive renderer for TIPI_CATALOGO.
 * Typed twin of renderer.js — greeting · faq-card · tip-chip.
 */
import type { Blocco, TipId } from './tipi';
import { TIPI_CATALOGO } from './tipi';

export interface Gestori {
  readonly onTip?: (tipId: TipId) => void;
}

export const RENDERER_TIPI = ['greeting', 'faq-card', 'tip-chip'] as const;

export function renderGreeting(blocco: Extract<Blocco, { tipo: 'greeting' }>): string {
  return `<section class="w greeting" data-tipo="greeting">
  <h2>${escapeHtml(blocco.titolo)}</h2>
  ${blocco.sottotitolo ? `<p>${escapeHtml(blocco.sottotitolo)}</p>` : ''}
</section>`;
}

export function renderFaqCard(blocco: Extract<Blocco, { tipo: 'faq-card' }>): string {
  return `<article class="w faq-card" data-tipo="faq-card">
  <h3>${escapeHtml(blocco.domanda)}</h3>
  <p>${escapeHtml(blocco.risposta)}</p>
  <small data-fonte="${escapeHtml(blocco.fonte)}">fonte: ${escapeHtml(blocco.fonte)}</small>
</article>`;
}

export function renderTipChip(blocco: Extract<Blocco, { tipo: 'tip-chip' }>): string {
  return `<button type="button" class="w tip-chip" data-tipo="tip-chip" data-tip="${blocco.tipId}">
  ${escapeHtml(blocco.etichetta)}
</button>`;
}

/** @deprecated prefer renderBlocco — kept for Book refs */
export function RenderBlocco(blocco: Blocco, _gestori?: Gestori): string {
  return renderBlocco(blocco);
}

export function renderBlocco(blocco: Blocco): string {
  switch (blocco.tipo) {
    case 'greeting':
      return renderGreeting(blocco);
    case 'faq-card':
      return renderFaqCard(blocco);
    case 'tip-chip':
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

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
