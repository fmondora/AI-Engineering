# Surface map — hello-agentic — 2026-08-22

<!-- aiuxer@0.3.1 | phase: Discover | date: 2026-08-22 -->

## Meta
- Design root: `examples/hello-agentic`
- Impl root: same
- Sources: `CLAUDE.md`, `pipelines/hello-assistant.md`, `knowledge/`, `specs/0001-hello-catalog.md`, `frontend/src/widgets/*`, `src/agents/assistant.ts`

## Roles
| Role | Surfaces | Notes |
|---|---|---|
| Learner / developer | Hello Agent chat | Dogfoods the plugin E2E |

## Surfaces
| Surface | Family | Entry | Primary jobs |
|---|---|---|---|
| Hello Agent | conversational-generative | `frontend/index.html` | Chat onboarding; KB answers; tip chips; session memory |
| Shell | hybrid-det | header + composer + memory panel | Chrome only (not catalog) |

## Runtime agents
| Agent | user_facing | emits | owns_presentation | Source |
|---|---|---|---|---|
| Hello Agent | true | catalog widgets/chips + shell prosa | true | `src/agents/assistant.ts` |

## Stack inventory
### L1 Knowledge
| Source | Kind | Owner | Notes |
|---|---|---|---|
| `knowledge/faq.md` | static | human | active — onboarding ground truth |
| MCP | — | — | none in v1 |

### L2 Agents
| Pipeline / agent | Role | Tools BE/FE | HITL |
|---|---|---|---|
| `pipelines/hello-assistant.md` | Hello Agent (onboarding guide) | kb match / tip chips / session notes | none (no writes) |

### L3 Agentic UI
- Wire today: **custom** (deterministic mossa; no AG-UI/A2UI yet)
- Semantic SoT: `semantics/catalog/` (AIUxer #34)
- Renderers: per-type `widgets/<tipo>/render.js` via `registry.js` (AIUxer #33)
- Catalog path: `registry.js` + `greeting|faq-card|tip-chip/` (implements semantics)
- Demo wires modules: `frontend/demo.js`

## Catalog diff
| Type | Kind | Surfaces | Det/Gen | Status | Spec | Code | Notes |
|---|---|---|---|---|---|---|---|
| greeting | widget | hello | det+copy | none | 0001 | tipi+Renderer | |
| faq-card | widget | hello | det | none | 0001 | tipi+Renderer | grounded FAQ |
| tip-chip | chip | hello | det vocab | none | 0001 | tipi+Renderer | 6 closed tip ids |

## Trust boundary hotspots
- No real-world writes in v1
- FAQ body from KB map, not free LLM prose in demo path
- KB miss → honest refusal (no invention)

## User memory context (UX)
- Session notes: name, language, opened tips (client-only)
- No durable store; inspect = panel; reset = reload

## Gaps that matter (clustered)
### P0
- none for hello slice
### P1
- No AG-UI bus (acceptable; Eng may propose later)
### P2
- Typed `.ts`/`.tsx` are twins of runnable `.js` (no bundler) — keep in sync
- Real LLM optional later behind same catalog

## Keystone
Keep catalog tiny and enum ⊆ renderer; prove conversational onboarding + Book → Build watermark path.

## Do NOT touch
Human pipeline + `knowledge/` ownership.

## Proposals (2–3)
### A — Ship hello conversational slice as plugin E2E (recommended)
- Jobs: chat + tips → FAQ; session notes; KB honesty
- Types: three catalog types
- Wire: custom; Eng: no new tech required
### B — Add AG-UI later
- Eng delta only if we need streaming multi-client

*— AIUxer v0.3.1*
