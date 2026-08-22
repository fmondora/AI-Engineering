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
| L2 Agents | Hello Agent (deterministic **or** xAI Grok) | — | human / AIUxer |
| L3 Agentic UI | custom closed catalog + **semantic SoT** (`semantics/catalog/`) | AG-UI/A2UI optional | AIUxer / Eng |

## GenUI decision
- **Band:** Controlled + Declarative
- **Wire:** custom
- **Conversation engine:** optional LLM via `server.py` → `POST /api/chat` (catalog-as-schema JSON). Providers: **`claude -p`** (Claude Code login), **Anthropic API**, **xAI**. Else deterministic matcher.
- **Author vs runtime:** interactive Claude/Grok sessions author the product; browser → `server.py`. On Claude Code, `server.py` may shell out to **`claude -p`** so Hello Agent uses the same CLI login.
- **Rationale:** same closed catalog whether Claude, Grok, or matcher; prove process before AG-UI.

## User memory context (AIUxer)
| Concern | Design | Inspect/reset |
|---|---|---|
| Session thread | note list in panel (+ engine mode) | panel / reload |
| Durable facts | none in v1 | — |

## Tech beyond active stack (AIEngineer)
| Proposal | Why | Cost / risk | Decision |
|---|---|---|---|
| Claude Code CLI (`claude -p`) | Hello Agent without API key | slower/turn | **active** if `claude` on PATH |
| Anthropic Messages API | Claude Hello Agent | API key + latency | **active** (`ANTHROPIC_API_KEY`) |
| xAI chat completions | Grok Hello Agent | API key + latency | **active** (`XAI_API_KEY`) |
| AG-UI bus | multi-client later | medium | deferred |
| Durable memory store | multi-device | medium | deferred |

*— AIUxer v0.3.1*
