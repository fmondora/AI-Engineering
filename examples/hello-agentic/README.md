# Hello Agentic — E2E Hello World

End-to-end playground for the **ai-native** plugin (AIUxer + AIEngineer).

Toy product: a **Hello Assistant** with a **closed catalog** (`greeting`, `faq-card`, `tip-chip`), human-owned pipeline + static KB, session memory panel, Book + surface-map already filled as the golden path.

```text
Human: pipelines/ + knowledge/
    → Discover (surface-map)
    → Frame / Spec (Book + 02-STACK)
    → Build (catalog + demo UI)     ← you are looking at the result
    → Verify / Learn
```

## Prerequisites

```text
/plugin marketplace add fmondora/AI-Engineering
/plugin install ai-native@AI-Engineering
```

Open **`examples/hello-agentic`** as the project (or cwd) so `CLAUDE.md` paths resolve.

## Run the demo UI

No build step:

```bash
cd examples/hello-agentic/frontend
python3 -m http.server 8765
```

Open http://localhost:8765 — click tip chips; session notes appear in the memory panel.

## Hello World — redo the E2E yourself

Use this folder as the sandbox. Either **inspect** the checked-in artifacts or **delete** `docs/ai-native/` and regenerate with the twins.

### Step 0 — Human inputs (already done)

| File | Role |
|---|---|
| `pipelines/hello-assistant.md` | Agentic pipeline |
| `knowledge/` | Static KB |
| `CLAUDE.md` | Surface map paths |

Do **not** ask AIUxer to invent these from scratch.

### Step 1 — Discover

```text
Invoke AIUxer / run surface-map on this project
```

Expect: `docs/ai-native/surface-maps/YYYY-MM-DD-surface-map.md` with stack inventory + catalog diff + watermark `aiuxer@…`.

Choose proposal **A** (ship hello slice).

### Step 2–3 — Frame & Spec

```text
Run project-book for hello-agentic slice A
```

Expect Book under `docs/ai-native/book/` including **`02-STACK.md`** (band Controlled/Declarative, wire custom, Eng deltas deferred).  
Approve the Book before Build.

### Step 4 — Build

AIUxer implements interaction + memory panel from §09 (see `frontend/`, `src/agents/`).  
AIEngineer only if you open a tech delta (e.g. AG-UI) in `02-STACK`.

### Step 5 — Verify

Canaries:

- [ ] Tip click → FAQ, no unknown-type fallback
- [ ] Shell/memory chrome **not** in catalog
- [ ] Watermarks on AIUxer-authored files
- [ ] `02-STACK` names GenUI kind + wire

### Step 6 — Learn (optional)

```text
AIUxer: apprendi
```

Uses today's radar + this session; you decide stage/promote/ignore.

## Layout

```text
pipelines/          human — agentic pipeline
knowledge/          human — static KB
specs/              catalog contract
src/agents/         Hello Assistant (P-L)
frontend/           closed catalog + shell + runnable demo
docs/ai-native/     surface-map + Book (AIUxer/Eng)
```

## What this proves

| Claim | Evidence here |
|---|---|
| Human owns pipelines + KB | `pipelines/`, `knowledge/` |
| AIUxer owns interaction + user memory UX | catalog, demo, memory panel, Book 01–03/02-STACK |
| Eng owns tech beyond active | 02-STACK deferred AG-UI; 05–07 |
| Process gates | map → Book approve → Build |
| Watermark | `aiuxer@0.3.1` on AIUxer artifacts |
