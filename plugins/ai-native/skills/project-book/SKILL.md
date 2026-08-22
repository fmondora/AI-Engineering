---
name: project-book
description: >
  Write or update the per-project AI-native Book — the dual-lens design artifact
  (AIUxer experience + AIEngineer feasibility) that implementation must follow.
  Chapters: intent, surfaces, catalog, agents, architecture, economics,
  reliability/evals, tensions, impl plan. Use after surface-map when the user
  chose a direction, or when asked for "book", "project book", "design
  book", "write the book", "before implementation". Hard-gate: no codegen
  until the Book slice is approved.
---

# Project Book — dual-lens design before implementation

You are running the **project-book** skill.

**The Book is the product design contract for AI-native work on this repo.**  
AIUxer and AIEngineer co-author it. Implementation (humans or coding agents)
**starts from the Book**, not from chat improvisation.

<HARD-GATE>
Do NOT implement features, scaffold widgets, or invent ad-hoc specs outside the Book until:

1. There is a current **surface-map** (or you run `surface-map` first) for the scope
2. The user has chosen a direction (from map proposals or an explicit scope)
3. You have written/updated the **relevant Book chapters** (format below)
4. You have run the **Book self-review** and asked the user to **approve** the Book slice

If the user only wants a draft, write it and stop at review. No code.
</HARD-GATE>

## Why a Book (not another free-form spec)

| Problem | Book answer |
|---|---|
| Doctrine dump in chat | Durable chapters on disk |
| AIUxer vs Eng talking past each other | Same artifact, owned sections + tensions chapter |
| Specs scattered / drift | Index + links + *delta* for this slice |
| Jump to code | Hard-gate: approve Book → then impl plan → then code |

Product-specific content lives **in the project Book**. Agent doctrine stays universal.

## Layout (default — override in CLAUDE.md)

```text
docs/ai-native/book/
  00-INDEX.md
  01-INTENT.md              # AIUxer lead
  02-SURFACES.md            # AIUxer lead
  02-STACK.md               # dual — human inputs + interaction frame + Eng tech deltas
  03-CATALOG.md             # AIUxer lead
  04-AGENTS-RUNTIME.md      # dual (experience mapping; topology often human-owned)
  05-ARCHITECTURE.md        # AIEngineer lead
  06-ECONOMICS.md           # AIEngineer lead
  07-RELIABILITY-EVALS.md   # AIEngineer lead
  08-TENSIONS.md            # dual (must exist if any open tradeoff)
  09-IMPL-READY.md          # dual — slices for implementation
```

Also keep dated maps: `docs/ai-native/surface-maps/…` (inputs, not chapters).

**Greenfield:** create all chapters that the slice needs (can stub later chapters with `Status: deferred`).  
**Brownfield (e.g. CSDDD):** Book **synthesizes and points** at existing `specs/000x-…`; do not duplicate wholesale. Write **delta chapters** for the chosen slice and link the source of truth.

## Ownership

| Chapter | Primary author | Must review |
|---|---|---|
| 00 INDEX | whoever starts | both lenses reflected in status |
| 01 INTENT | **AIUxer** | Eng: metrics measurable? |
| 02 SURFACES | **AIUxer** | Eng: cost of generative surfaces |
| **02 STACK** | **dual** | Human pipelines/KB recorded; AIUxer interaction+memory; Eng tech beyond active |
| 03 CATALOG | **AIUxer** | Eng: registry / enum ⊆ renderer |
| 04 AGENTS | dual | P-L respected; do not silently rewrite human pipeline topology |
| 05 ARCHITECTURE | **AIEngineer** | Ux: trust + composition path |
| 06 ECONOMICS | **AIEngineer** | Ux: outcomes still hold |
| 07 RELIABILITY-EVALS | **AIEngineer** | Ux: honest degradation UX |
| 08 TENSIONS | dual | every open row has an owner |
| 09 IMPL-READY | dual | no TBD in slices to build; interaction slices owned by AIUxer path |

When only one agent is invoked: write your chapters fully; leave explicit `Needs: AIEngineer` / `Needs: AIUxer` stubs — do not fake the other lens.

## Checklist (do in order)

1. **Prerequisites** — locate surface-map; if missing/stale for this scope, run `surface-map` first
2. **Scope the Book slice** — which jobs/surfaces/types this edition covers (not the whole product forever)
3. **Create/update `00-INDEX.md`** — status, scope, sources, approval state
4. **Write experience chapters** (01–02 Surfaces, 03, contribute to 04) as AIUxer
5. **Write `02-STACK.md`** — see contract below (human inputs + AIUxer frame + Eng deltas)
6. **Write engineering chapters** (05–07, contribute to 04) as AIEngineer — same session if dual, or mark Needs
7. **Write `08-TENSIONS.md`** — every UX richness vs cost/reliability tradeoff named; arbiter = cost-per-outcome + compliance veto if project has it
8. **Write `09-IMPL-READY.md`** — ordered slices, each independently shippable, with files/interfaces/tests sketched
9. **Self-review** (below)
10. **User approval gate** — ask to review Book before implementation
11. **Stop** — next is implementing from 09 (AIUxer leads interaction/memory slices); not more design chat

## Chapter contracts (minimum content)

Use skeletons in `references/chapters/` if present; otherwise these headings are mandatory.

### 00-INDEX
- Project name, Book version/date, scope of this edition
- Status: `draft | in-review | approved | superseded`
- Pointers to surface-map(s), existing product specs, design vs impl roots
- Chapter list with owner + status
- **Approval:** who approved, date (empty until user says so)
- **Tooling watermark (AIUxer-led editions):**  
  `<!-- aiuxer@X.Y.Z | phase: Spec|Build|… | date: YYYY-MM-DD -->`  
  and footer `*— AIUxer vX.Y.Z*` — version from `agents/aiuxer.md` frontmatter.
  Each chapter AIUxer authors/updates gets the same stamp in its header/Meta.

### 01-INTENT
- Jobs-to-be-done (user language)
- Outcome metrics (distributions, not booleans)
- Maturity target (L0–L4) for this slice — experience axis
- Non-goals

### 02-SURFACES
- Roles × surfaces × family (conversational vs dashboard)
- Trust boundary per surface (what is hidden, confirm-only)
- Shell vs generative (#21)
- Entry points (`path`)

### 02-STACK
- **Human-owned inputs:** agentic pipeline(s) summary + KB (static/MCP/data) — link paths; do not invent
- **L1/L2/L3 map:** what is active today vs missing
- **GenUI band** (Controlled / Declarative / Open-ended) + **wire** (`custom | AG-UI | A2UI | MCP-Apps | hybrid`)
- **User memory context (AIUxer):** session vs durable; inspect/reset; shared state/threads UX
- **Tech beyond active (AIEngineer):** proposed deltas only (new bus, runtime, storage, eval harness) with cost note
- Status per row: `active | proposed | deferred | rejected`

### 03-CATALOG
- Types in scope (atom/widget/chip/container)
- Det | Gen | authority table (who decides what)
- LLM-selectable set **⊆** Renderer (list both)
- Status vs code if brownfield (`none | only-spec | …`)
- Explicit **out of catalog** (shell)

### 04-AGENTS-RUNTIME
- Runtime agents: user_facing, emits, owns_presentation (P-L)
- Router / orchestration (deterministic vs agentic)
- One conversational speaker rule if applicable

### 05-ARCHITECTURE
- Composition contract (e.g. mossa + contesto; registry path)
- Backend abstraction, queues, validation boundary
- Data/fetchers for grounded widgets
- What is durable vs client-only UX state

### 06-ECONOMICS
- Cost-per-outcome for the jobs in 01
- Where LLM runs (and does not)
- Caps, caching, tiering for this slice
- Latency budget (perceived vs total)

### 07-RELIABILITY-EVALS
- Failure modes + honest degradation
- Evals/canaries (unknown type dropped; trust boundary)
- Observability minimum

### 08-TENSIONS
Table: `| Topic | AIUxer wants | AIEngineer constraint | Decision | Metric |`

No empty decisions left as "TBD" for slices marked ready in 09.

### 09-IMPL-READY
Ordered slices:
- Goal (one job)
- Book chapters that authorize it
- Files to touch (best estimate)
- Interfaces produced/consumed
- Tests/canaries
- Done when…

Each slice must be implementable **without** reopening 01–03 design (only bugs/clarifications).

## Self-review (run before asking approval)

1. **Placeholder scan** — no TBD/TODO in chapters marked ready; deferred chapters say `Status: deferred` + why
2. **Enum ⊆ Renderer** stated in 03 and echoed in 05
3. **Composition path** honors model choice (05)
4. **Every P0 from surface-map** is either in a slice in 09 or explicitly deferred with reason
5. **Tensions** closed or blocked with owner
6. **No product secrets in agent files** — only in Book
7. **Brownfield:** links to existing specs are real paths

## Operating style

- Speak the interlocutor's language
- Prefer tables and closed lists over essays
- Cite `file:line` / spec paths for brownfield claims
- Restraint: one Book edition = one chosen direction from the map, not the whole roadmap
- After approval: remind that **implementation follows 09-IMPL-READY** only

## Handoff after approval

```text
Book approved (slice)
  → implement slice 1 from 09 (TDD / existing project conventions)
  → update surface-map + Book when reality contradicts a chapter
  → ritual: "did this teach the agents?" → field lessons in plugin if universal
```

Do **not** expand scope mid-impl without a Book amendment (new edition date + INDEX status).
