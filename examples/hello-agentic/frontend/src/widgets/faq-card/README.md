# Widget: `faq-card`

<!-- aiuxer@0.3.2 | phase: Build | date: 2026-08-22 -->

| | |
|---|---|
| **Job** | Show one grounded Q&A from `knowledge/` |
| **Kind** | widget |
| **Det/Gen** | body **det** (KB); when to show may be gen |
| **Selectable** | yes |
| **Shell?** | no |

## Semantic SoT
`semantics/catalog/faq-card.json`

## Invariant
`fonte` must point under `knowledge/`. Do not invent facts in the renderer.

## Evolve here
Loading/error states, multi-cite, expand/collapse — keep one job per card.
Change fields/meaning in semantics first, then sync.

*— AIUxer v0.3.2*
