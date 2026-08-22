// aiuxer@0.3.2 | 2026-08-22 | Build
/**
 * Renderer facade — delegates to per-type directories via registry.
 * Evolve widgets under `./greeting`, `./faq-card`, `./tip-chip` — not here.
 */
export {
  RENDERER_TIPI,
  RENDERERS,
  assertEnumSubsetRenderer,
  renderBlocco,
  renderSequenza,
} from './registry.js';

export { render as renderGreeting } from './greeting/render.js';
export { render as renderFaqCard } from './faq-card/render.js';
export { render as renderTipChip } from './tip-chip/render.js';
