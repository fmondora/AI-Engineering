# Pipeline — Hello Assistant (human-owned)

**Status:** active · **Owner:** human (Francesco) · **Edition:** 2026-08-22

## Topology

```text
User
  → Hello Assistant (user-facing, owns presentation)
       → Knowledge reader (system): FAQ from knowledge/
       → (future) Tip ranker (system): optional ranking — deferred
```

## Rules

- **One user-facing speaker:** Hello Assistant only.
- System agents emit **domain only** (FAQ hits, tip ids) — no widget types.
- Assistant maps domain → closed catalog (`greeting`, `faq-card`, `tip-chip`).
- No autonomous writes. No checkout. No external send.

## Tools (v1)

| Tool | Kind | Notes |
|---|---|---|
| `kb.search` | backend / static | Grep/read `knowledge/*.md` |
| Frontend chips | FE | User picks a tip chip → injects next FAQ card (deterministic) |

## HITL

None required in v1 (no side effects). If we add “save preference”, it becomes L3 confirm.
