// aiuxer@0.3.1 | 2026-08-22 | Build
/**
 * Shell chrome — NOT in generative catalog.
 * Layout: chat with Hello Agent (main) · Memory (sidebar).
 */

/**
 * @param {{ feedHtml: string, memoryHtml: string, placeholder?: string }} opts
 * @returns {string}
 */
export function renderShell(opts) {
  const placeholder =
    opts.placeholder ??
    'Message Hello Agent… (try: Who are you? / my name is Anna)';
  return `<div class="app-shell">
  <header class="shell-header" data-shell="true">
    <strong>Chat with Hello Agent</strong>
    <span class="muted">onboarding guide · closed catalog · no writes in v1</span>
  </header>
  <section class="shell-chat" data-shell="chat">
    <main class="shell-main" id="feed">${opts.feedHtml}</main>
    <form class="shell-composer" data-shell="composer" id="composer">
      <input id="msg" type="text" autocomplete="off" placeholder="${escapeAttr(
        placeholder,
      )}" />
      <button type="submit">Send</button>
    </form>
  </section>
  <aside class="shell-memory" data-shell="memory-panel">
    <h2>Memory</h2>
    <p class="muted">Session context (sidebar · client-only)</p>
    ${opts.memoryHtml}
  </aside>
</div>`;
}

/**
 * @param {string} s
 */
function escapeAttr(s) {
  return String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}
