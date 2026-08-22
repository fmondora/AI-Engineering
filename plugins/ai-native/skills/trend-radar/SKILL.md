---
name: trend-radar
description: >
  Daily dual-lens scan of AI-native trends: Reddit, X (Twitter), and GitHub.
  Writes a capped radar log under plugins/ai-native/radar/. Auto-run as
  preflight when AIUxer or AIEngineer are invoked and today's file is missing
  (mode: auto — then continue the user's job). Manual: "radar", "trend radar",
  "aggiorna i trend". Does NOT auto-promote into agent doctrine.
---

# Trend radar — Reddit + X + GitHub → staging only

You are running the **trend-radar** skill.

Your job is a **bounded external scan** that feeds the agents' *learning loop*
without bloating doctrine. Agents learn via: **radar → optional stage → scarce
promote → commit**. You own only the first step (and optional stage *proposals*).

## Invocation modes

| Mode | Who starts it | After write |
|---|---|---|
| **auto** | AIUxer or AIEngineer §8.0 preflight when `YYYY-MM-DD.md` missing | **Continue** the original user job; no wait for stage; one-line status |
| **manual** | User asks for radar / daily scan | Show actions table; wait if they want stage/promote |

**Idempotent day:** if today's file already exists, **exit immediately** (report
"already current") — do not re-scan unless user says **force** / **refresh**.

<HARD-GATE>
Do **NOT**:

1. Edit `agents/aiuxer.md` or `agents/aiengineer.md` principle/pattern sections
   unless the user explicitly says **stage** or **promote** *and* you follow the
   promote rules below
2. Append more than **5 signals per lens** (UX / Eng) for the day
3. Treat upvotes, stars, or virality as truth — they are *candidates*
4. Dump raw feeds or 50-link lists into the radar file
5. In **auto** mode: block the user on triage questions or refuse the original task

You **MAY** write under `plugins/ai-native/radar/` (preferred) or product
`docs/ai-native/radar/` if the plugin tree is not writable. Stage bullets only
when the user asks **stage**.
</HARD-GATE>

## Where artifacts live

Prefer the marketplace / plugin tree:

```text
plugins/ai-native/radar/
  README.md
  YYYY-MM-DD.md          # one file per day (both lenses)
  archive/               # optional: move files >30 days with no promote
```

**Lookup order** (exists? → skip scan):

1. `plugins/ai-native/radar/YYYY-MM-DD.md` (AI-Engineering source)
2. Any `**/ai-native/**/radar/YYYY-MM-DD.md` (installed plugin)
3. `docs/ai-native/radar/YYYY-MM-DD.md` (product-local fallback)

**Write order:** plugin path if writable; else product `docs/ai-native/radar/`.

Date = **today** in the user's timezone if known, else UTC.

## Checklist (do in order)

1. **Resolve date + mode** — auto | manual; full dual scan (default) | UX only | Eng only | force
2. **Idempotent check** — if day file exists and not force → stop (already current)
3. **Load query pack** — `references/queries.md` (+ user extras)
4. **Scan sources** — Reddit, X, GitHub (see §Sources); keep notes with URLs
5. **Triage** — map each hit to AIUxer / AIEngineer / both / noise; drop noise
6. **Cap & rank** — max **5 UX + 5 Eng** signals; prefer *decision-changing* over hype
7. **Write** day file from `references/day-template.md`
8. **Actions**
   - **manual:** table ignore | watch | stage | dogfood; wait if needed
   - **auto:** put recommended actions *inside the file only*; return to parent agent job
9. **Do not** edit agents unless user said stage/promote

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
| **AIUxer Learn mode** | after radar: brainstorm + user picks stage/promote/ignore |
| Field lessons ritual | promote after real work / approved Learn |
| Literature (§7 agents) | stable *why* |

If the user asks AIUxer to **learn** (or apprendi), ensure today's radar exists (or
refresh), then hand control to AIUxer **Learn mode** — do not auto-stage.

Radar without dogfood = fashion magazine.  
Dogfood without radar = local maximum.
