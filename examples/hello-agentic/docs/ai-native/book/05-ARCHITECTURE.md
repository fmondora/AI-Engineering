# 05 — Architecture
**Owner:** AIEngineer · **Status:** ready

- Composition: assistant mossa → ordered `Blocco[]` → Renderer / demo.js
- Validation: `TIPI_CATALOGO` set; unknown dropped
- Data: FAQ map keyed by `TipId` grounded to `knowledge/faq.md` content
- Wire: **custom** (no AG-UI/A2UI in v1) — revisit in 02-STACK if multi-client needed
- Memory: client array only; no server ACK required for v1 notes
