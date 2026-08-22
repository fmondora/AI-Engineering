# Pipeline — Hello Agent (human-owned)

**Status:** active · **Owner:** human (Francesco) · **Edition:** 2026-08-22  
**Speaker:** **Hello Agent** (only user-facing agent)

## Job (v1)

**Onboarding guide** for this playground. Conversational, grounded, no side effects.

| Does | Does not |
|---|---|
| Greet and stay in a chat turn | Invent facts outside `knowledge/` |
| Explain ai-native / the twins (AIUxer, AIEngineer) from KB | Open-ended HTML / unknown widget types |
| Answer from `knowledge/` only; cite `fonte` | Autonomous writes, email, checkout |
| Offer `tip-chip` follow-ups | Rank tips with an LLM (deferred) |
| Remember **session** prefs (name, language note) in the memory panel | Durable server memory |

## Topology

```text
User (chat)
  → Hello Agent (user-facing, owns presentation)
       → Knowledge reader (system): facts from knowledge/
```

## Rules

- **One user-facing speaker:** Hello Agent only.
- System path emits **domain only** (FAQ hits, tip ids) — no widget types.
- Agent maps domain → closed catalog (`greeting`, `faq-card`, `tip-chip`).
- User bubbles + composer + memory chrome are **shell**, not catalog.
- Free-text turns: match KB / session intents; on miss → honest “I only know the KB” + tip chips.
- No HITL in v1 (no real-world side effects). Saving a durable preference later → L3 confirm.

## Tools (v1)

| Tool | Kind | Notes |
|---|---|---|
| `kb.search` | backend / static | Read/match `knowledge/*.md` (also injected into LLM system prompt) |
| `llm.chat` | backend | Optional — `server.py` → Anthropic and/or xAI; Hello Agent returns catalog JSON only |
| Session notes | FE / client | Name + “opened tip” + language note |
| Tip chips | FE | Click → next turn (LLM or deterministic FAQ) |
