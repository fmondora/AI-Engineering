# 02 — Stack
<!-- aiuxer@0.3.1 | phase: Frame|Spec | date: 2026-08-22 -->
**Owner:** dual · **Status:** ready

## Human-owned inputs
| Item | Path | Status |
|---|---|---|
| Agentic pipeline | `pipelines/hello-assistant.md` | active |
| Knowledge base | `knowledge/` | active |
| MCP | — | deferred |

## Layer map
| Layer | Active today | Gap | Owner next |
|---|---|---|---|
| L1 Knowledge | static FAQ | MCP | human |
| L2 Agents | single assistant | — | human |
| L3 Agentic UI | custom closed catalog | AG-UI/A2UI optional | AIUxer / Eng |

## GenUI decision
- **Band:** Controlled + Declarative
- **Wire:** custom
- **Rationale:** smallest E2E; prove process before protocol

## User memory context (AIUxer)
| Concern | Design | Inspect/reset |
|---|---|---|
| Session thread | note list in panel | panel / reload |
| Durable facts | none in v1 | — |

## Tech beyond active stack (AIEngineer)
| Proposal | Why | Cost / risk | Decision |
|---|---|---|---|
| AG-UI bus | multi-client later | medium | deferred |
| Durable memory store | multi-device | medium | deferred |

*— AIUxer v0.3.1*
