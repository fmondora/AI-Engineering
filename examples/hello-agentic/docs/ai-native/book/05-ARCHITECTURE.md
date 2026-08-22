# 05 — Architecture
**Owner:** AIEngineer · **Status:** ready

- **Semantic SoT:** `semantics/catalog/` → LLM catalog-as-schema + sanitize (`server.py`) + synced `frontend/src/semantics/vocab.js`
- Composition: Hello Agent mossa → ordered catalog JSON `blocchi[]` → `registry` → `widgets/<tipo>/render`
- Validation: semantic `types[]` ⊆ renderer map; unknown dropped
- Data: FAQ map keyed by `TipId` grounded to `knowledge/faq.md`
- Wire: **custom** (no AG-UI/A2UI in v1) — revisit in 02-STACK if multi-client needed
- Memory: client array only; no server ACK required for v1 notes
