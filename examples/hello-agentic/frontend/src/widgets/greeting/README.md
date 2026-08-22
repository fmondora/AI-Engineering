# Widget: `greeting`

<!-- aiuxer@0.3.2 | phase: Build | date: 2026-08-22 -->

| | |
|---|---|
| **Job** | Open / welcome the user on the Hello Agent surface |
| **Kind** | widget |
| **Det/Gen** | structure det; copy may be gen |
| **Selectable** | yes (catalog) |
| **Shell?** | no |

## Semantic SoT
`semantics/catalog/greeting.json` — meaning + fields. This directory **implements** it.

## Files
- `tipi.js` / `tipi.ts` — shape binding
- `render.js` — HTML renderer

## Evolve here
Copy variants, optional subtitle rules, A11y headings — **not** chat chrome (shell).
Change fields/meaning in semantics first, then sync (`tools/sync-semantics.py`).

*— AIUxer v0.3.2*
