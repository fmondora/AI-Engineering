# Trend radar (external learning feed)

Daily (or on-demand) scan of **Reddit + X + GitHub** for AI-native signals.
Owned by skill **`trend-radar`**.

## What this is

| Layer | Role |
|---|---|
| **radar/YYYY-MM-DD.md** | Capped candidates (≤5 UX + ≤5 Eng) |
| **Agent Staging** | Only after human says *stage* |
| **Agent doctrine** | Only after *promote* (dogfood / recurrence) |

**Not** auto-learning. Not a dump of the feed into `aiuxer.md` / `aiengineer.md`.

## How to run

From the AI-Engineering plugin workspace (or any project with the plugin installed):

```text
/trend-radar
```

or: *“run the trend radar”* / *“aggiorna i trend”*.

Optional: *UX only* · *Eng only* · extra queries.

## Learning loop

```text
trend-radar (Reddit, X, GitHub)
    → radar/YYYY-MM-DD.md
    → user: stage | dogfood | ignore
    → Field lessons Staging
    → promote scarce → commit
```

## Hygiene

- Prefer **failure reports** and **production patterns** over hype  
- Deduplicate the same story across three platforms into one signal  
- Archive or delete day files **>30 days** with no stage/promote  
- Product lore stays in product Books — not here  

## Dual lens

| File section | Agent |
|---|---|
| UX signals | AIUxer |
| Eng signals | AIEngineer |
| Cross-cutting | both |

Query seeds: `skills/trend-radar/references/queries.md`.
