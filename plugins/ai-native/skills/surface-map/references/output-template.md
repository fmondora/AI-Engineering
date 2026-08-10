# Surface map — <project> — YYYY-MM-DD

Copy this skeleton when writing `docs/ai-native/surface-maps/YYYY-MM-DD-surface-map.md`.
Every section is required. Prefer tables over prose.

## Meta
- Design root:
- Impl root:
- Sources:

## Roles
| Role | Surfaces | Notes |
|---|---|---|
| | | |

## Surfaces
| Surface | Family | Entry | Primary jobs |
|---|---|---|---|
| | conversational-generative / dashboard-deterministic / hybrid | `path` | |

## Runtime agents
| Agent | user_facing | emits | owns_presentation | Source |
|---|---|---|---|---|
| | true/false | domain / widgets+chips | true/false | `path` |

## Catalog diff
| Type | Kind | Surfaces | Det/Gen | Status | Spec | Code | Notes |
|---|---|---|---|---|---|---|---|
| | atom/widget/chip/container | | det / gen-slot / det+copy-gen | none/only-spec/only-code/diverged/shell-not-catalog | | | |

### Status legend
- `none` — in spec and code
- `only-spec` — specified, missing in registry/renderer
- `only-code` — coded, missing from authoritative spec
- `diverged` — same name, different shape/meaning
- `shell-not-catalog` — chrome/shell, not generative catalog

## Trust boundary hotspots
-

## Gaps that matter (clustered)
### P0 — blocks a real job end-to-end
-

### P1 — structural / second surface
-

### P2 — cleanup / vocabulary / docs drift
-

## Keystone
>

## Do NOT touch
-

## Proposals (2–3)
### A — (recommended)
- Jobs closed:
- Types / surfaces:
- Cost class: free-det | one-llm-turn | multi-agent
- Risk:

### B —
-

### C — (optional)
-
