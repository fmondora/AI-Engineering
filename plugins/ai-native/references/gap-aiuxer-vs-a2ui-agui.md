# Gap analysis — AIUxer vs A2UI vs AG-UI

Date: 2026-08-22  
Sources: [a2ui.org](https://a2ui.org/), [docs.ag-ui.com](https://docs.ag-ui.com/introduction), [AG-UI GitHub](https://github.com/ag-ui-protocol/ag-ui), CopilotKit GenUI spectrum, AIUxer doctrine (`agents/aiuxer.md`).

## 0. They are not competitors — different layers

| | **AIUxer** | **AG-UI** | **A2UI** |
|---|---|---|---|
| **What it is** | Design doctrine + process (taste, patterns, audits, Book) | **Runtime protocol** agent ↔ frontend | **Declarative UI wire format** (JSON blueprints) |
| **Layer** | Experience / product design | Transport + interaction events | Payload “what to show” |
| **Emits** | Principles, #patterns, surface-map, Book | Typed event stream (text, tools, state, lifecycle…) | Component tree + data against a **trusted catalog** |
| **Owns pixels?** | No — tastes + constraints | No — sync + streaming | No — host maps abstract → native widgets |
| **Analogy** | Building code + pattern book | HTTP/SSE for agentic apps | HTML-like data language without code execution |

**Official stacking (CopilotKit / Google):**

```text
MCP / tools          → what the agent can call
A2A                  → agent ↔ agent
AG-UI                → agent ↔ user app (events, state, HITL)
A2UI / Open-JSON-UI  → declarative GenUI payload (often rides on AG-UI)
MCP Apps             → open-ended GenUI (HTML in sandbox)
AIUxer               → which band to choose, how to design, when to refuse
```

AIUxer already names this in §0 as **Controlled (AG-UI-style) / Declarative (A2UI) / Open-ended (MCP Apps)**.

---

## 1. Alignment (where AIUxer and the specs agree)

| Theme | AIUxer | A2UI | AG-UI |
|---|---|---|---|
| **Closed / trusted catalog** | P-A, #1, enum ⊆ renderer | Client “Trusted Catalog”; agent only requests approved components | Controlled GenUI = pre-built components + tool results |
| **Data not code** | No arbitrary markup | Declarative JSON, not executable UI code | Events carry data; UI owns rendering |
| **Composition** | #19 composition by reference; atoms/widgets | Flat component list + IDs; host renders | Tool-based GenUI: agent chooses *when/which*, app owns *how* |
| **Security / trust** | P-C, P-I, confirm-only writes | Explicit: safe like data across trust boundaries | HITL, shared state, tool lifecycle |
| **Streaming** | #13, #30 steerable | Streaming / incremental updates (v0.9+) | Core: SSE/event stream (16+ event types) |
| **Framework-agnostic intent** | Token contract; host design system | Same JSON → Lit/Angular/Flutter/React… | Clients: React, RN, terminal, Slack… |
| **HITL** | #25 L3 default on writes | Actions / forms as catalog components | First-class human-in-the-loop |

**Bottom line:** AIUxer’s product default (**Controlled + Declarative**) is the same home as **AG-UI controlled GenUI + A2UI**. The gap is not taste — it is **wire/runtime adoption**.

---

## 2. What A2UI / AG-UI have that AIUxer lacks (gaps → AIUxer / Eng)

| Gap | Detail | Owner | Suggested absorb |
|---|---|---|---|
| **G1 · Wire contracts** | No normative event list or JSON schema in the plugin; CSDDD invents `mossa`/`POST /coach/turn` ad hoc | Eng + Book §05 | Document “native contract vs adopt AG-UI/A2UI” as Book decision; optional adapter pattern |
| **G2 · Interop story** | Doctrine doesn’t say how a product plugs into CopilotKit / ADK / LangGraph clients | Eng | AIEngineer: “prefer AG-UI as agent↔UI bus when multi-framework or multi-host” |
| **G3 · Catalog advertisement** | A2UI: client advertises catalog → agent constrained; we often hardcode prompt enums | AIUxer #1 + Eng | Pattern: **catalog-as-schema** exported to prompt/SDK (A2UI Schema Manager analogue) |
| **G4 · Bidirectional state** | AG-UI shared state / STATE_DELTA; AIUxer focuses compose→render, less on app→agent live state | AIUxer + Eng | Stage: “surface state sync” for on-behalf, dossier, composer context |
| **G5 · Cross-platform portability** | A2UI sells one payload → many hosts; AIUxer is product-repo-centric (one FE) | AIUxer | Only matters if multi-client (web+mobile); note in Book §02 when relevant |
| **G6 · Protocol literacy in audits** | Audit §6 doesn’t ask “are you on Controlled/Declarative/Open wire?” | AIUxer | Add canary to §8: *name GenUI kind (#29) + wire (custom / AG-UI / A2UI / MCP Apps)* |
| **G7 · Open ecosystem renderers** | A2UI ships Basic Catalog + renderers; we reinvent widgets per product | Product | Not doctrine — optional “align widget names to A2UI basic catalog where isomorphic” |

---

## 3. What AIUxer has that A2UI / AG-UI don’t (gaps → protocols / our edge)

| AIUxer strength | Why protocols don’t cover it |
|---|---|
| **Process hard-gates** (`surface-map` → Book → impl) | Specs don’t force inventory before inventing types |
| **Product taste & anti-patterns** (shell≠catalog, sibling-first, dancing UI, double mental model) | Wire formats are silent on IA |
| **Dual-lens Book + AIEngineer tension** | No cost-per-outcome / eval gates in A2UI/AG-UI |
| **Autonomy ladder #25** (L1–L5, dual-gate) | HITL exists; no per-action authority matrix |
| **Field lessons / dogfood loop** | Standards don’t learn from CSDDD/Shakti/buyer |
| **Intelligence axis** (maturity L0–L4, memory, reward) | GenUI specs are interface-axis only |
| **Chat ≠ only surface** | Many demos are chat-first; we keep dashboard families |
| **Composition by reference + domain fetchers** | A2UI describes structure; we insist data stay grounded (P-I) |

**Bottom line:** adopting A2UI/AG-UI **without AIUxer** risks beautiful interoperable GenUI with confused IA, open catalogs, and no Book. AIUxer without them risks **strong taste on a proprietary wire**.

---

## 4. Dimension-by-dimension scorecard

| Dimension | AIUxer | A2UI | AG-UI | Gap direction |
|---|---|---|---|---|
| Closed catalog / security | Strong (doctrine) | Strong (spec) | Strong (controlled band) | **Aligned** — implement wire |
| Declarative trees | Implicit (#19) | **Native** | Via A2UI/JSON-UI on top | AIUxer → adopt A2UI shape when multi-host |
| Streaming / interrupt | #13 #30 | Supported | **Native** | AIUxer → prefer AG-UI events in greenfield |
| Shared / live state | Partial (context render) | Data model sync | **Native** STATE_* | **AIUxer gap** |
| HITL / confirm | Strong #25 P-C | Actions in catalog | Strong | Aligned |
| Process (map/Book) | **Unique** | — | — | Protocols gap |
| Cost / evals | Via twin Eng | — | — | Protocols gap |
| Open-ended GenUI | Reject default | Out of band | Allows MCP Apps band | Aligned rejection |
| Multi-framework portability | Weak (one product FE) | **Strong** | Strong clients | Only if we need it |
| Domain grounding (facts) | P-I strong | Not their job | Not their job | Keep AIUxer |

---

## 5. Practical recommendation (for Francesco)

### Do now (doctrine / plugin)
1. Keep §0 spectrum + #29 as the **decision frame**.
2. Add audit canary: *GenUI kind + wire named* (custom coach contract vs AG-UI vs A2UI).
3. Point AIEngineer Book §05: “if agent↔UI is greenfield or multi-client → evaluate AG-UI bus; if declarative trees → A2UI catalog.”

### Do on next greenfield / major rewrite (e.g. new surface, not forced on CSDDD today)
| Choice | When |
|---|---|
| **Stay custom** (`mossa` / `POST /coach/turn`) | Single product FE, working, Book A locked |
| **AG-UI as bus** | Need streaming tool UI, shared state, CopilotKit/ADK clients |
| **A2UI as payload** | Need portable declarative trees / multi-renderer |
| **Both** | AG-UI transport + A2UI messages for declarative band (industry default stack) |

### Do not
- Rewrite CSDDD coach onto AG-UI “because standard” without Book tension row (cost vs outcome).
- Treat AG-UI as a substitute for closed catalog (it isn’t — Controlled still needs your components).
- Confuse **A2A** (agent↔agent) with **A2UI** (agent→UI).

---

## 6. One-sentence verdict

**AIUxer is the design law for which GenUI band and constraints to use; A2UI is the declarative language for that band; AG-UI is the realtime bus — AIUxer is strong on law and weak on wire; A2UI/AG-UI are strong on wire and silent on product taste and process.**

---

## 7. Follow-ups (optional commits)

| ID | Action |
|---|---|
| F1 | AIUxer §8 canary: name GenUI kind + wire |
| F2 | AIEngineer §1/§7: AG-UI bus + A2UI payload as building-block options |
| F3 | CSDDD Book §05/§08: row “custom coach contract vs AG-UI/A2UI” (defer / adopt) |
| F4 | Spike: map CSDDD `TIPI_CATALOGO` ↔ A2UI basic catalog overlap (doc only) |
