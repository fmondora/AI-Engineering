// aiuxer@0.3.1 | 2026-08-22 | Build
/** Shell chrome — NOT in generative catalog. */

export function renderShell(mainHtml: string, memoryHtml: string): string {
  return `<div class="app-shell">
  <header class="shell-header" data-shell="true">
    <strong>Hello Agentic</strong>
    <span class="muted">closed catalog · confirm-only (no writes in v1)</span>
  </header>
  <main class="shell-main">${mainHtml}</main>
  <aside class="shell-memory" data-shell="memory-panel">
    <h2>Memory context</h2>
    <p class="muted">Session notes (client-only in v1)</p>
    ${memoryHtml}
  </aside>
</div>`;
}
