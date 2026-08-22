# AI-Engineering

Claude Code **marketplace** for an **AI-native design system**: twin agents plus process skills that force inventory and design before code.

| Piece | What it is |
|---|---|
| **`aiuxer`** | Design+impl of **interaction + user memory context** (after human pipelines/KB); GenUI stack (AG-UI/A2UI/MCP); **v0.3.1** — watermark + Learn mode (apprendi → brainstorm → you decide) |
| **`aiengineer`** | Tech choices **beyond active stack** + cost/reliability/evals; twin feasibility |
| **`surface-map`** | Skill — grounded inventory of roles, surfaces, catalog **spec ↔ code**, proposals |
| **`project-book`** | Skill — dual-lens **Book** the implementation must follow |
| **`trend-radar`** | Skill — Reddit + X + GitHub scan → capped daily radar (no auto-promote into agents) |

**Single shared source** across projects. Edit here; update elsewhere with `/plugin update`. No forked agent copies that drift.

---

## Why this exists

AI-native products fail in ways normal design reviews miss: unvalidated generative types, shells mixed into catalogs, rich chat with no durable design contract, cost that balloons without an outcome metric.

Agents alone become **consultant lectures**. Skills hold **pipelines with hard gates**. Doctrine stays universal; product specifics live in each project's Book and `CLAUDE.md`.

---

## The two agents

One plugin, `ai-native`. Two specialists on purpose — the tension is the point.

### `aiuxer` — experience

AI-native is not "a chatbot on a screen." It is an interface an **AI composes at runtime**: generative widgets, conversational surfaces, adaptive ranking and memory. That power needs patterns, anti-patterns, and audits.

**Brings:** pattern catalog, literature-backed principles (grounding gate, presentation only when it *is* the reasoning), maturity model L0–L4 (experience), audit method for "it's confusing," named anti-patterns (layered vocabulary, redundant surfaces, proactive spam).

**Use when:** the system feels confusing · make a UI truly AI-native · validate or add a generative widget · usability-audit an AI product · give the interface memory/learning.

**Non-negotiable:** **grounding** — generated content is marked; the trust boundary holds.

### `aiengineer` — AI architect (build path)

The twin is not only a cost critic. It is the **architect who knows how to implement** what AIUxer wants: workflows vs agents, registries, queues, context, memory, dual-gate autonomy, evals — using **current AI-engineering practice**, not fashion for its own sake.

The LLM is an **expensive guest, not the plumbing**. **Evals are the spec.** **Cost is a design choice**, measured as *cost-per-outcome*. If the full UX dream is too expensive, Eng ships a **phased architecture** that still hits the outcome — not a bare veto.

**Brings:** building blocks (backend abstraction, job queue, context engineering, structured-output validation, router-vs-agent, shared-shortlist fan-out, memory axes, AI-native data layer), economics playbook, reliability, evals & observability, BUILD maturity model.

**Use when:** "how do we build what UX asked?" · architecture for this AI feature · cost/latency · model tiering · memory · evals · fragile/looping agents.

**Non-negotiable:** **cost-per-outcome** and the **trust boundary**.

### Why two, not one

`aiuxer` maximizes *intelligence of the experience* (anticipation, generative richness, L4). `aiengineer` turns that into *architecture that holds* under cost, latency, reliability. Shared ground: deterministic-first, inviolable trust boundary, shared maturity. Arbiter = **measured outcome**.

> **AIUxer designs the desirable; AIEngineer is the AI architect who makes it implementable and sustainable; the outcome metric signs the agreement.**

Agents are authored in English and **answer in the interlocutor's language**.

---

## Pipeline (how you actually work)

```text
Human: agentic pipeline(s) + knowledge base (static / MCP / …)
        ↓
Discover (surface-map + stack inventory) → Frame → Spec (Book, incl. 02-STACK)
        ↓ approve
Build (AIUxer: interaction + user memory; Eng: tech deltas) → Verify → Learn
```

| Skill | Hard-gate | Artifact |
|---|---|---|
| **`surface-map`** | No new catalog / no codegen until map + proposals and a choice (or "map only") | `docs/ai-native/surface-maps/YYYY-MM-DD-surface-map.md` |
| **`project-book`** | No implementation until the Book slice is **approved** | `docs/ai-native/book/` (+ **`02-STACK`**) |
| **`trend-radar`** | Never auto-edit agent doctrine; ≤5 UX + ≤5 Eng/day; **auto** when twins invoked if day file missing | `plugins/ai-native/radar/YYYY-MM-DD.md` |

**Book ownership (short):**

| Chapters | Lead |
|---|---|
| 01 Intent, 02 Surfaces, 03 Catalog | AIUxer |
| **02 STACK** | Dual — human pipelines/KB; AIUxer interaction/memory; Eng tech beyond active |
| 05 Architecture, 06 Economics, 07 Reliability & evals | AIEngineer |
| 04 Agents-runtime, 08 Tensions, 09 Impl-ready | Both |

**How agents learn:** dogfood + literature + **`trend-radar`** → stage → scarce promote → commit. Twins auto-run radar once per day if missing.

See also: `plugins/ai-native/references/gap-aiuxer-vs-a2ui-agui.md`.

---

## Install

From any project (Claude Code):

```text
/plugin marketplace add fmondora/AI-Engineering
/plugin install ai-native@AI-Engineering
```

Then enable auto-update (see **Updating**).

### Invoke

| Intent | What to say / use |
|---|---|
| Map the generative surface | `/surface-map` or ask AIUxer to run the surface map |
| Design before code | After a direction: `/project-book` or "write the project book" |
| Daily / on-demand trend scan | `/trend-radar` (Reddit + X + GitHub → `radar/`) |
| Learn into AIUxer (decide with brainstorm) | Ask AIUxer: *apprendi* / *learn* — uses today's radar + session sources |
| Experience review / pattern | Invoke **`aiuxer`** |
| Architecture / cost / evals | Invoke **`aiengineer`** |
| Full slice | Map → choose → Book (both lenses) → approve → implement §09 |

### Project setup (once per product repo)

In the product's `CLAUDE.md` (or `AGENTS.md`), add a **Surface map paths** section so skills find specs, registry, renderer, and agents without hardcoding a product. Example shape:

```markdown
## Surface map paths
- Specs: specs/
- Catalog / types: frontend/src/widgets/tipi.ts
- Renderer: frontend/src/widgets/Renderer.tsx
- Runtime agents: src/agents/
- Shell: frontend/src/shell/
- Design root / impl root: … (if split repos)
```

Product catalog **contents** stay in the product repo. Agents stay universal.

---

## Migration (one source, for real)

After install, **remove local copies** so they do not mask the plugin:

- `.claude/agents/aiuxer.md`, `.claude/agents/aiengineer.md` (runtime copies)
- tracked `docs/agents/aiuxer.md`, `docs/agents/aiengineer.md` if any

From then on: **edit only in this repo**, pull updates with `/plugin update` / marketplace update.

---

## Hygiene

- **Agents = principles.** Project specifics → Book + `CLAUDE.md`, never agent files.
- **Skills = process with gates.** Travel with the plugin.
- **Brownfield:** Book links existing product specs and writes *deltas*; it does not silently fork a second source of truth.
- **After ship:** if reality contradicts a chapter, amend the Book (new edition), then code; promote universal lessons into agents via **Field lessons**.

---

## How the agents learn

They are prompts, not models — they do not self-update. Loop: real use → distill a lesson → fold into the agent, versioned. Git history **is** the learning record.

Each agent ends with **Field lessons**: stage a dated raw observation cheap; promote to principle/pattern only when it recurs or reality proved it. Ritual after real work: *"Did this teach the agent something?"* — if yes, commit it with the lesson in the message.

---

## Updating

The `ai-native` plugin has **no pinned `version`** — Claude Code tracks by git commit, so **every push here is an update**.

- Auto: `/plugin` → Marketplaces → AI-Engineering → enable auto-update (or `FORCE_AUTOUPDATE_PLUGINS=1`)
- Manual: `/plugin marketplace update AI-Engineering`

---

## Changelog

- **AIUxer redesign (branch)** — design+impl mandate; Knowledge→Agents→UI stack; phases Discover→Learn; Book `02-STACK`; human owns pipelines/KB.
- **`trend-radar` skill** — dual-lens scan (Reddit + X + GitHub) into capped `radar/YYYY-MM-DD.md`; stage/promote still human-gated.
- **Field absorb (CSDDD + tantracp 2026-08-11)** — AIUxer **#25–#28** (autonomy ladder, impact preview, dual memory, evidence surface); AIEngineer dual-gate L4, unattended draft vs act, client timer ≠ durable capture; pattern crosswalk (Shape of AI / AI UX Playground).
- **`project-book` skill** — per-project dual-lens Book before implementation; wired into both agents and surface-map handoff.
- **Field absorb (CSDDD 2026-07-31)** — promoted: LLM enum ⊆ Renderer, shell ≠ catalog, surface-map-first, unified registry + composition path must honor model choice.
- **`surface-map` skill** — first process skill (inventory + catalog diff + proposals); agents hold doctrine, skills force the workflow.
- **Field lessons** — staging + promotion + ritual on both agents.
- **English packaging** — agents and plugin shareable in English.
- **First cut** — AIUxer + AIEngineer doctrine.

---

## License / contact

Maintained by Francesco Mondora. Issues and field lessons welcome via PRs on this repo.
