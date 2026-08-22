# 03 — Catalog
<!-- aiuxer@0.3.1 | phase: Spec | date: 2026-08-22 -->
**Owner:** AIUxer · **Status:** ready

| Type | Kind | Det/Gen | LLM selectable | Renderer |
|---|---|---|---|---|
| greeting | widget | det+copy | yes | yes |
| faq-card | widget | det | yes | yes |
| tip-chip | chip | closed tip ids | yes | yes |

**Tip ids:** `what-is-this` · `who-are-you` · `twins` · `genui-band` · `memory` · `how-to-talk`

**Invariant:** selectable ⊆ Renderer (`tipi.js` / `renderer.js`; typed twins `.ts`/`.tsx`).  
**Impl:** `renderGreeting` · `renderFaqCard` · `renderTipChip` — demo imports, does not inline.  
**Out of catalog:** shell header, chat chrome (user bubble, agent turn + prosa), composer, memory panel chrome.

*— AIUxer v0.3.1*
