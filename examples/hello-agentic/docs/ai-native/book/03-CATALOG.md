# 03 — Catalog
<!-- aiuxer@0.3.2 | phase: Spec | date: 2026-08-22 -->
**Owner:** AIUxer · **Status:** ready

## Semantic SoT (mandatory)

All consumers share **`semantics/catalog/`** (AIUxer #34):

| File | Role |
|---|---|
| `index.json` | type list, version, out-of-catalog shell |
| `greeting.json` / `faq-card.json` / `tip-chip.json` | job, det/gen, fields, composition |
| `tools/sync-semantics.py` | → `frontend/src/semantics/{bundle.json,vocab.js}` |

LLM prompt + sanitize (`server.py`) load this layer. Widget dirs **implement** it (#33).

## Types

| Type | Kind | Det/Gen | LLM selectable | Impl dir |
|---|---|---|---|---|
| greeting | widget | det+copy | yes | `widgets/greeting/` |
| faq-card | widget | det | yes | `widgets/faq-card/` |
| tip-chip | chip | closed tip ids | yes | `widgets/tip-chip/` |

**Tip ids:** see `semantics/catalog/tip-chip.json` → `fields.tipId.enum`

**Invariant:** selectable ⊆ Renderer (`registry.js`).  
**Layout (#33):** one directory per type.  
**Out of catalog:** shell header, chat chrome, composer, memory panel (listed in `index.json`).

*— AIUxer v0.3.2*
