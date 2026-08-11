---
name: trend-radar
description: >
  Daily (or on-demand) dual-lens scan of AI-native trends: Reddit, X (Twitter),
  and GitHub. Writes a capped radar log under plugins/ai-native/radar/ for AIUxer
  (experience) and AIEngineer (architecture). Does NOT auto-promote into agent
  doctrine. Use when: "radar", "trend radar", "aggiorna i trend", "daily scan",
  "cosa c'è di nuovo su GenUI/agents/evals", or scheduled learning for the twin
  agents. Complements field lessons (dogfood) and literature (stable why).
---

# Trend radar — Reddit + X + GitHub → staging only

You are running the **trend-radar** skill.

Your job is a **bounded external scan** that feeds the agents' *learning loop*
without bloating doctrine. Agents learn via: **radar → optional stage → scarce
promote → commit**. You own only the first step (and optional stage *proposals*).

<HARD-GATE>
Do **NOT**:

1. Edit `agents/aiuxer.md` or `agents/aiengineer.md` principle/pattern sections
   unless the user explicitly says **stage** or **promote** *and* you follow the
   promote rules below
2. Append more than **5 signals per lens** (UX / Eng) for the day
3. Treat upvotes, stars, or virality as truth — they are *candidates*
4. Dump raw feeds or 50-link lists into the radar file

You **MAY** write only under `plugins/ai-native/radar/` (and, if user asks
**stage**, a single dated bullet under Field lessons → Staging in the matching
agent — never promote without dogfood/recurrence).
</HARD-GATE>

## Where artifacts live

Plugin root = this marketplace repo (`AI-Engineering`), not the product repo.

```text
plugins/ai-native/radar/
  README.md
  YYYY-MM-DD.md          # one file per day (both lenses)
  archive/               # optional: move files >30 days with no promote
```

If `radar/` is missing, create it. Date = **today** in the user's timezone if known,
else UTC.

## Checklist (do in order)

1. **Resolve date + mode** — full dual scan (default) | UX only | Eng only | query override from user
2. **Load query pack** — `references/queries.md` (+ user extras)
3. **Scan sources** — Reddit, X, GitHub (see §Sources); keep notes with URLs
4. **Triage** — map each hit to AIUxer / AIEngineer / both / noise; drop noise
5. **Cap & rank** — max **5 UX + 5 Eng** signals; prefer *decision-changing* over hype
6. **Write** `radar/YYYY-MM-DD.md` from `references/day-template.md`
7. **Propose actions** — table: ignore | watch | stage | dogfood-on-product (recommend ≤3 stage/dogfood)
8. **Stop** — wait for user; do not edit agents unless they say stage/promote

## Sources

Use whatever tools the host exposes. Prefer structured search over random browse.

### Reddit
- Web search: `site:reddit.com/r/UXDesign …`, `site:reddit.com/r/LocalLLaMA …`, etc.
- Or open hot/top threads if a browse tool exists
- Prefer last **7–14 days** when the tool allows date filters

### X (Twitter)
- Keyword / semantic search if available (`from:`, since:, min engagement lightly)
- Else web search: site-specific or known accounts (Anthropic, researchers — not fan accounts only)
- Prefer posts with a **concrete claim** (pattern, failure, metric), not pure vibes

### GitHub
- **Repos:** `generative-ui`, `agentic`, `ai-evals`, `llm-observability` (see queries pack)
- **Code / issues:** `gh search repos "…" --sort=updated`, `gh search code` if `gh` is available
- **Awesome lists / new releases:** recently pushed or starred growth is a *hint*, not proof
- Prefer: README that states a **pattern** (registry, eval harness, agent protocol) over empty scaffolds

### Parallelism
Run UX queries and Eng queries in parallel batches. Deduplicate the same story across Reddit/X/GitHub into **one** signal with multiple sources.

## Triage rules

| Keep as signal if… | Drop if… |
|---|---|
| Names a pattern/failure mode we might encode | Pure product ad / funding news |
| Would change advice on CSDDD, tantracp, buyer, or a new AI-native app | Already fully covered by AIUxer #1–#28 / Eng §1 with no delta |
| Has at least one primary link (thread, post, or repo) | Unverifiable rumor |
| GitHub: real README + activity | Empty template repo |

**Maps to** (pick one primary):

- AIUxer: P-* / pattern #N / new UX gap  
- AIEngineer: §1 building block / economics / evals / new Eng gap  
- Both: e.g. autonomy L4, GenUI registry  

## Day file format

Use `references/day-template.md`. Mandatory sections:

- Meta (date, operator, tools used)
- UX signals (≤5)
- Eng signals (≤5)
- Cross-cutting / both
- Noise discarded (count only, or 1-line themes)
- Recommended next actions
- Explicit: **No agent files modified** (or list if user authorized stage)

Each signal:

```markdown
### U1 — short title
- **Signal:** one sentence
- **Sources:** Reddit … | X … | GitHub …
- **Maps to:** AIUxer #… / gap
- **Action:** ignore | watch | stage | dogfood
- **Why it might matter:** one line
```

## Stage / promote (only if user asks)

### Stage
Add under the matching agent **Field lessons → Staging**:

```markdown
- **YYYY-MM-DD · <title>.** <2–4 sentences>. Candidate for ….
  *(Source: radar YYYY-MM-DD; links…)*
```

Do **not** invent a new pattern number yet.

### Promote
Only when user says promote **and** at least one of:

1. Second independent source or second product hit  
2. Explicit dogfood on a real codebase  
3. User accepts as doctrine after review  

Then: fold into principle/pattern + Promoted table + commit message = lesson.  
Prefer a separate commit from the radar file commit.

## Operating style

- Speak the interlocutor's language  
- Skeptical of hype; generous to **failure reports** and **production postmortems**  
- Cite URLs  
- Cap ruthlessly — empty radar day with "nothing decision-changing" is a valid outcome  
- Never claim the agents "updated themselves"

## Relation to other skills

| Skill | Role |
|---|---|
| **trend-radar** | external candidates |
| **surface-map / project-book** | product process |
| Field lessons ritual | promote after real work |
| Literature (§7 agents) | stable *why* |

Radar without dogfood = fashion magazine.  
Dogfood without radar = local maximum.
