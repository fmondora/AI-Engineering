# Chapter skeletons (copy into book files)

---

## 01-INTENT.md

```markdown
# 01 — Intent
**Owner:** AIUxer · **Status:** draft | ready

## Jobs-to-be-done
| Job | Who | Success looks like |

## Outcome metrics (distributions)
| Metric | Surface | Notes |

## Maturity target (this slice)
L? on experience axis — why this rung, not higher

## Non-goals
-
```

---

## 02-SURFACES.md

```markdown
# 02 — Surfaces
**Owner:** AIUxer · **Status:**

## Roles × surfaces
| Role | Surface | Family | Entry |

## Trust boundary
| Surface | Hidden pre-decision | Confirm-only actions |

## Shell vs generative
| Element | shell-not-catalog | notes |

## Flows (happy path)
1. …
```

---

## 03-CATALOG.md

```markdown
# 03 — Closed catalog
**Owner:** AIUxer · **Status:**

## Types in scope
| Type | Kind | Surfaces | Det/Gen | Authority (who decides) | Status vs code |

## LLM-selectable set
List exact enum. Must be ⊆ Renderer.

## Renderer / registry set
List exact types mounted.

## Out of catalog (shell)
-

## Canary
- [ ] selectable ⊆ renderable
- [ ] composition path honors type choice
```

---

## 04-AGENTS-RUNTIME.md

```markdown
# 04 — Runtime agents
**Owner:** dual · **Status:**

| Agent | user_facing | emits | owns_presentation | Source |

## Orchestration
Router / state machine / when LLM enters

## P-L check
System-facing agents do not own widget vocabulary.
```

---

## 05-ARCHITECTURE.md

```markdown
# 05 — Architecture
**Owner:** AIEngineer · **Status:**

## Composition contract
Request/response shape; mossa vs contesto (or equivalent)

## Registry path
type → schema → validate → render → map

## Deterministic vs LLM
| Path | LLM? | Why |

## Persistence
What is durable vs client UX timer only

## Key modules (paths)
-
```

---

## 06-ECONOMICS.md

```markdown
# 06 — Economics
**Owner:** AIEngineer · **Status:**

## Cost-per-outcome
| Job | Cost driver | Budget / cap |

## Model tiering
Default / escalate when

## Caching & free paths
-

## Latency
Perceived vs total for the generative turn
```

---

## 07-RELIABILITY-EVALS.md

```markdown
# 07 — Reliability & evals
**Owner:** AIEngineer · **Status:**

## Failure modes → honest UX
| Failure | User sees |

## Canaries / evals
| Name | Asserts |

## Observability minimum
-
```

---

## 08-TENSIONS.md

```markdown
# 08 — Tensions (AIUxer ↔ AIEngineer)
**Owner:** dual · **Status:**

| Topic | AIUxer wants | Eng constraint | Decision | Metric / gate |
|---|---|---|---|---|
| | | | | |

Open rows block 09 slices that depend on them.
```

---

## 09-IMPL-READY.md

```markdown
# 09 — Implementation-ready slices
**Owner:** dual · **Status:**

## Slice 1 — <name>
- **Goal:**
- **Authorized by chapters:**
- **Files (estimate):**
- **Interfaces:**
- **Tests / canaries:**
- **Done when:**
- **Status:** ready | blocked (why)

## Slice 2 — …
```
