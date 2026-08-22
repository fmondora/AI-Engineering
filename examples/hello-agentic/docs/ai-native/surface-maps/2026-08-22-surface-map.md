# Surface map — hello-agentic — 2026-08-22

<!-- aiuxer@0.3.1 | phase: Discover | date: 2026-08-22 -->

## Meta
- Design root: `examples/hello-agentic`
- Impl root: same
- Sources: `CLAUDE.md`, `pipelines/hello-assistant.md`, `knowledge/`, `specs/0001-hello-catalog.md`, `frontend/src/widgets/*`, `src/agents/assistant.ts`

## Roles
| Role | Surfaces | Notes |
|---|---|---|
| Learner / developer | Hello Assistant | Dogfoods the plugin E2E |

## Surfaces
| Surface | Family | Entry | Primary jobs |
|---|---|---|---|
| Hello Assistant | conversational-generative | `frontend/index.html` | Understand demo; open FAQ tips; see session memory |
| Shell | hybrid-det | header + memory panel | Chrome only |

## Runtime agents
| Agent | user_facing | emits | owns_presentation | Source |
|---|---|---|---|---|
| Hello Assistant | true | catalog widgets/chips | true | `src/agents/assistant.ts` |

## Stack inventory
### L1 Knowledge
| Source | Kind | Owner | Notes |
|---|---|---|---|
| `knowledge/faq.md` | static | human | active |
| MCP | — | — | none in v1 |

### L2 Agents
| Pipeline / agent | Role | Tools BE/FE | HITL |
|---|---|---|---|
| `pipelines/hello-assistant.md` | user-facing assistant | kb read / tip chips | none (no writes) |

### L3 Agentic UI
- Wire today: **custom** (deterministic mossa; no AG-UI/A2UI yet)
- Renderers: HTML string renderer + demo.js
- Catalog path: `frontend/src/widgets/tipi.ts`

## Catalog diff
| Type | Kind | Surfaces | Det/Gen | Status | Spec | Code | Notes |
|---|---|---|---|---|---|---|---|
| greeting | widget | hello | det+copy | none | 0001 | tipi+Renderer | |
| faq-card | widget | hello | det | none | 0001 | tipi+Renderer | grounded FAQ |
| tip-chip | chip | hello | det vocab | none | 0001 | tipi+Renderer | closed tip ids |

## Trust boundary hotspots
- No real-world writes in v1
- FAQ body from KB map, not free LLM prose in demo path

## User memory context (UX)
- Session notes list in shell memory panel (client-only)
- No durable store; inspect = panel; reset = reload

## Gaps that matter (clustered)
### P0
- none for hello slice
### P1
- No AG-UI bus (acceptable; Eng may propose later)
### P2
- TSX Renderer not wired to bundler — demo.js is the runnable path

## Keystone
Keep catalog tiny and enum ⊆ renderer; prove Book → Build watermark path.

## Do NOT touch
Human pipeline + `knowledge/` ownership.

## Proposals (2–3)
### A — Ship hello slice as plugin E2E (recommended)
- Jobs: open tips → FAQ; see memory notes
- Types: three catalog types
- Wire: custom; Eng: no new tech required
### B — Add AG-UI later
- Eng delta only if we need streaming multi-client

*— AIUxer v0.3.1*
