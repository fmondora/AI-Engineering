# Semantic catalog (source of truth)

<!-- aiuxer@0.3.2 | phase: Spec|Build | date: 2026-08-22 -->

This folder is the **semantic layer** every consumer must reference:

| Consumer | How |
|---|---|
| LLM (Hello Agent) | Catalog-as-schema fragment from `index.json` + type files (`server.py`) |
| Sanitize / validate | Allowed `tipo` + field rules from JSON |
| `widgets/<tipo>/` | Implements the type (render + UX) — does not redefine meaning |
| Book `03-CATALOG` / specs | Point here; do not fork a second vocabulary |
| Surface-map / evals | Diff against `types[]` in `index.json` |

## Layout

```text
semantics/catalog/
  index.json       # TIPI_CATALOGO + version + paths
  greeting.json
  faq-card.json
  tip-chip.json
```

## Rules

1. **Add a type** → new `semantics/catalog/<tipo>.json` + row in `index.json` + `widgets/<tipo>/` + registry (#33) + Book delta.
2. **Change meaning/shape** → edit semantics first; then widgets + prompt regenerate from SoT.
3. Shell chrome is **not** listed here (#21).

*— AIUxer v0.3.2*
