# 09 — Impl-ready
<!-- aiuxer@0.3.1 | phase: Spec|Build | date: 2026-08-22 -->
**Owner:** dual · **Status:** ready

## Slice H1 — Hello widgets + conversation (DONE)
- **Goal:** closed catalog widgets (`greeting`, `faq-card`, `tip-chip`) rendered via shared renderer; chat with Hello Agent; session memory sidebar; KB miss honesty
- **Authorized by:** 01–08
- **Semantic SoT (#34):** `semantics/catalog/` + `tools/sync-semantics.py`
- **Catalog / widgets (one dir per type — #33):**
  - `frontend/src/widgets/registry.js`
  - `frontend/src/widgets/{greeting,faq-card,tip-chip}/` — tipi + render + README
- **Shell (not catalog):** `frontend/src/shell/shell.js` — chat main + Memory sidebar
- **Agent:** `frontend/src/agent/hello-agent.js` (+ `src/agents/assistant.ts`)
- **Entry:** `frontend/demo.js` (imports modules; canary enum ⊆ renderer)
- **Done when:** open demo, send a message / click tips, notes in sidebar; unknown KB → refusal + tips; watermarks present
- **Status:** done

## Slice H1b — LLM conversation via xAI (DONE)
- **Goal:** optional Grok turn behind same catalog
- **Files:** `server.py` (`POST /api/chat`), `demo.js` health+fallback
- **Done when:** with `XAI_API_KEY`, chat uses LLM; without key, deterministic
- **Status:** done

## Slice H2 — Optional AG-UI spike
- **Status:** deferred (see 02-STACK)

*— AIUxer v0.3.1*
