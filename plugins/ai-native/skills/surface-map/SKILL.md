---
name: surface-map
description: >
  Inventory the user-facing generative surface of an AI-native system from real
  code and specs: roles, contexts, agents (user-facing vs system), closed catalog
  of widgets/chips, det|gen classification, and spec-vs-code gaps. Produces a
  grounded surface map and 2–3 prioritized proposals — never free-form doctrine.
  Use when: "surface map", "widget/chip inventory", "which surfaces", "what's missing
  in the catalog", "AIUxer start", designing generative UI from agents/capabilities,
  or before project-book / implementation. First skill in the AIUxer pipeline.
---

# Surface map — from agents/capabilities to the generative surface

You are running the **surface-map** skill (AIUxer pipeline, step 1).

Your job is **discovery and gap analysis grounded in `file:line`**, not a lecture
on generative UI principles. Principles live in the `aiuxer` agent; here you only
**apply** them as filters (P-A closed vocabulary, P-B deterministic-first, P-L
presentation only when it *is* the reasoning, trust boundary).

<HARD-GATE>
Do NOT propose a new catalog, write or rewrite a product spec, implement widgets,
or invoke generate/codegen until:

1. You have produced a **Surface inventory** (format below) grounded in code/specs
2. You have shown **2–3 prioritized proposals** with a recommendation
3. The user has **chosen** a direction (or explicitly said "map only")

If the user only wants the map, stop after the inventory + gaps. No catalog invention.
</HARD-GATE>

## When this skill ends

Terminal states:

| User intent | Next step |
|---|---|
| Map only | Stop after inventory file + short summary |
| Design next | After user picks a proposal → hand off to **`project-book`** (dual-lens Book); do **not** implement until Book approved |
| Already clear scope | Still produce the inventory first (short is fine), then propose only within the grounded gap set → then **project-book** |

## Checklist (do in order)

You MUST track these as todos and complete them in order:

1. **Resolve project layout** — design repo vs impl repo, paths from `CLAUDE.md` / `AGENTS.md` if present
2. **Map roles & surfaces** — who talks to the system, which real surfaces exist
3. **Map runtime agents** — user-facing vs system-facing (P-L)
4. **Stack inventory (L1/L2/L3)** — see § below; human-owned pipelines/KB vs interaction gaps
5. **Extract closed catalog (spec)** — widget/chip/atom/container types claimed in specs
6. **Extract closed catalog (code)** — types in registry/union + renderer switch + chips
7. **Diff spec ↔ code** — `none | only-spec | only-code | diverged | shell-not-catalog`
8. **Classify det|gen** — who decides what (LLM vs domain fetch) per type when known
9. **Jobs & contexts** — jobs-to-be-done per surface; entry points (routes/pages)
10. **Write inventory artifact** — fixed path (below); **stamp AIUxer version watermark** in Meta + footer (`agents/aiuxer.md` frontmatter `version`)
11. **Propose 2–3 approaches** — only from real gaps; recommend one; wait for user

## Stack inventory (Knowledge → Agents → Agentic UI)

Fill even if sparse (`n/a` / `human-owned` / `missing`):

| Layer | Capture |
|---|---|
| **L1 Knowledge** | Static KB paths; MCP servers/tools; shared state/threads; memory/checkpoint tech already active |
| **L2 Agents** | Pipeline topology (from human/docs); user-facing vs system; BE tools; FE/device tools; HITL points |
| **L3 Agentic UI** | GenUI wire today: `custom \| AG-UI \| A2UI \| MCP-Apps \| hybrid \| none`; renderers (React/Flutter/…); catalog location |

Mark what is **human-owned input** vs **AIUxer interaction gap** vs **needs AIEngineer tech delta**.

## 1. Resolve project layout

Search, in order:

1. Project `CLAUDE.md` / `AGENTS.md` section **Surface map paths** (or similar)
2. Conventions:
   - Specs: `specs/**/*.md`, especially widget/UI/agent orchestration specs
   - Runtime agents: `src/agents/`, `agents/`, `app/agents/`
   - Catalog/registry: `**/widgets/tipi.ts`, `**/widgets/*types*`, `**/catalog*`, OpenUI/registry files
   - Renderer: `**/Renderer.tsx`, `**/render*widget*`
   - Shell/chrome: `**/shell/`, sidebars, banners (may host widgets *outside* the generative catalog)
   - Sibling impl repo: `../<name>-impl` or paths declared in CLAUDE.md

If design and impl are split, **read both**. Cite paths with the repo root you used.

If nothing AI-native exists yet (greenfield), inventory roles/jobs from the user request and mark catalog rows as `only-intent` — still produce the artifact shape.

## 2. Roles & surfaces

Build:

- **Roles** (stakeholder that looks at the UI)
- **Surfaces** (distinct IA places — e.g. coach chat vs ESG dashboard vs procurement)
- **Family**: `conversational-generative` | `dashboard-deterministic` | `hybrid`
- **Entry**: route/page/`file:line`

Apply: two cognitive families should stay **physically distinct and labeled** when both exist (AIUxer anti-pattern: double mental model).

## 3. Runtime agents (P-L)

For each agent (from specs + code):

| Field | Rule |
|---|---|
| `user_facing` | Speaks to a human conversational surface |
| `emits` | Structured domain only vs widget/chip types |
| `owns_presentation` | `true` only if choosing the widget *is* the move (conversational agent). System agents: pure domain → deterministic mapping |

Flag anti-patterns: system-facing agent that emits UI catalog types; multiple agents owning the same surface vocabulary.

## 4–6. Catalog extraction & diff

**Spec side:** parse the product's widget/chips spec (or design docs). Prefer explicit lists/tables over prose.

**Code side:**

- Discriminated union / registry of block types
- Renderer `switch` / map (exhaustive?)
- Chip components and allowed action enums
- Zod/schema validators if present
- Shell components that implement "widget-like" chrome **outside** the catalog (status: `shell-not-catalog`)

**Status per type:**

| Status | Meaning |
|---|---|
| `none` | In spec and code, aligned enough |
| `only-spec` | Specified, not in registry/renderer |
| `only-code` | Implemented, not in authoritative spec |
| `diverged` | Same name, different shape/semantics (cite both) |
| `shell-not-catalog` | Lives in shell/chrome, not generative catalog (document, don't double-count) |

**Canary (always report explicitly):** LLM-selectable set (prompt enum / zod of
agent turn) **⊆** Renderer / `TIPI_CATALOGO`. If the model can emit a type the FE
cannot mount, that is a **P0 grounding hole**, not a minor gap. Shell types in the
selectable set are the same class of bug. Also note whether the composition path
(`mossaABlocchi` / equivalent) **honors** the chosen type or only maps chips.

Never invent types in this skill. Only list what exists or is specified.

## 7. Det | gen

When the product documents it (e.g. table Det/Gen), copy it. When not:

- **Det**: data from domain/read-model; chrome; fixed action vocabulary
- **Gen (slot)**: copy, selection/order of chips from a closed set, compose references
- **Forbidden gen**: arbitrary markup, inventing chip actions, autonomous writes

## 8. Jobs & contexts

For each surface, 1–5 jobs-to-be-done in the user's language. Link to widgets that support (or should support) each job. Note **context** (pre-ratifica, on-behalf, scoped delegation, tenant) if it changes what may be shown (trust boundary).

## 9. Write the inventory artifact

**Path** (project overrides in CLAUDE.md win):

```text
docs/ai-native/surface-maps/YYYY-MM-DD-surface-map.md
```

If `docs/ai-native/` does not exist, create it. Use today's date.

**Required structure** — fill every section (use `n/a` only when truly absent):

```markdown
# Surface map — <project> — YYYY-MM-DD

## Meta
- Design root: …
- Impl root: …
- Sources: list of files read (paths)
- **Watermark:** `<!-- aiuxer@X.Y.Z | phase: Discover | date: YYYY-MM-DD -->` (read `version` from `agents/aiuxer.md` frontmatter)
- Footer: `*— AIUxer vX.Y.Z*`

## Roles
| Role | Surfaces | Notes |

## Surfaces
| Surface | Family | Entry | Primary jobs |

## Runtime agents
| Agent | user_facing | emits | owns_presentation | Source |

## Stack inventory
### L1 Knowledge
| Source | Kind (static/MCP/state/memory) | Owner (human/active) | Notes |

### L2 Agents
| Pipeline / agent | Role | Tools BE/FE | HITL |

### L3 Agentic UI
- Wire today: …
- Renderers: …
- Catalog path: …

## Catalog diff
| Type | Kind (atom/widget/chip/container) | Surfaces | Det/Gen | Status | Spec | Code | Notes |

## Trust boundary hotspots
- … (what must never be autonomous; what is hidden pre-decision; confirm-only actions)

## User memory context (UX)
- Session vs durable; inspect/reset affordances; gaps

## Gaps that matter (clustered)
### P0 — blocks a real job end-to-end
### P1 — structural / second surface
### P2 — cleanup / vocabulary / docs drift

## Keystone
One move that dissolves the most P0s if done first.

## Do NOT touch
What already works and must not be redesigned in this pass (esp. human pipelines/KB).

## Proposals (2–3)
### A — … (recommended)
- Scope, jobs closed, types involved, cost/risk sketch; interaction vs Eng tech delta
### B — …
### C — … (optional)
```

Keep the catalog table complete but terse. Prefer completeness of **diff status** over long descriptions.

## 10. Proposals — rules

- Only from **P0/P1 gaps**, not from doctrine wishlists
- Each proposal: which jobs close, which types enter the catalog or the renderer, which surface, rough cost class (`free-det` | `one-llm-turn` | `multi-agent`)
- Lead with **recommendation + why**
- One clarifying question only if a fork is unblockable without it; otherwise recommend and wait

After the user chooses: stop this skill. Next skill is **`project-book`**
(write/update `docs/ai-native/book/`). Do not start coding.

## Operating style

- Speak the interlocutor's language
- Direct; cite `path:line` for non-obvious claims
- No principle dump — link to agent doctrine only if a finding *violates* it
- Restraint: the best map surfaces *less* work than it invents

## CSDDD example paths (when CLAUDE.md points here)

Typical layout (adjust if the project declares otherwise):

| Concern | Design (`CSDDD`) | Impl (`CSDDD-impl`) |
|---|---|---|
| Principles | `principles.md` | same / mirrored |
| Agents orchestration | `specs/0001-consiglio-agenti-esg.md` | `src/agents/`, `src/domain/router.ts` |
| Widget/chip catalog | `specs/0002-widget-chips-dialogo.md` | `frontend/src/widgets/tipi.ts`, `Renderer.tsx`, `chips.tsx` |
| Coach channel | `specs/0012-canale-coach-runtime.md` | `src/app/coach-channel.ts`, `src/agents/coach.ts` |
| Shell / rail | `specs/0013-sidebar-coach.md` | `frontend/src/shell/` |
| Surfaces | `0002` §4.3–4.x | `frontend/src/pages/superfici/` |
| Construction agents | `.claude/agents/` | same |

When both repos exist as siblings, inventory **both** and mark status across the pair.
