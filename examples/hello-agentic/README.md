# Hello Agentic — E2E Hello World

End-to-end playground for the **ai-native** plugin (AIUxer + AIEngineer).

Toy product: chat with **Hello Agent** — an **onboarding guide** with a **closed catalog** (`greeting`, `faq-card`, `tip-chip`), human-owned pipeline + static KB, session memory panel, Book + surface-map as the golden path.

```text
Human: pipelines/ + knowledge/
    → Discover (surface-map)
    → Frame / Spec (Book + 02-STACK)
    → Build (catalog + conversational UI)  ← you are looking at the result
    → Verify / Learn
```

## What Hello Agent does

| Does | Does not |
|---|---|
| Conversational onboarding for this playground | Invent facts outside `knowledge/` |
| Answers from KB; cites `fonte` | Open-ended HTML / unknown widgets |
| Tip chips + free-text matcher (deterministic v1) | Durable server memory |
| Session notes: name, language, opened tips | Writes / send / checkout |

Try: `Who are you?` · `What are the twins?` · `my name is Anna` · or click a tip.

## Prerequisites

```text
/plugin marketplace add fmondora/AI-Engineering
/plugin install ai-native@AI-Engineering
```

Open **`examples/hello-agentic`** as the project (or cwd) so `CLAUDE.md` paths resolve.

## Run the demo UI

Prefer the **local server** (static UI + LLM Hello Agent):

```bash
cd examples/hello-agentic
./run.sh                        # http://127.0.0.1:8765
```

| Provider | When |
|---|---|
| **grok-cli** | `grok` on PATH — preferred when launched from Grok Build (`GROK_AGENT=1`) · each turn `grok -p` |
| **claude-cli** | `claude` on PATH — preferred from Claude Code · each turn `claude -p` |
| anthropic | `ANTHROPIC_API_KEY` set |
| xai | `XAI_API_KEY` set |
| deterministic | none of the above |

From **this Grok Build CLI** or **Claude Code**: `./run.sh` — Hello Agent uses that CLI’s login (`grok -p` / `claude -p`) and chooses widgets. No separate API key required.

`HELLO_LLM_PROVIDER=grok-cli|claude-cli|anthropic|xai` forces a provider.

Flow: **you → Hello Agent (LLM) → JSON blocchi → renderer** (`greeting` / `faq-card` / `tip-chip`).

## Hello World — redo the E2E yourself

Use this folder as the sandbox. Either **inspect** the checked-in artifacts or **delete** `docs/ai-native/` and regenerate with the twins.

### Step 0 — Human inputs (already done)

| File | Role |
|---|---|
| `pipelines/hello-assistant.md` | Agentic pipeline (Hello Agent job) |
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

AIUxer implements conversation + memory panel from §09 (see `frontend/`, `src/agents/`).  
AIEngineer only if you open a tech delta (e.g. AG-UI) in `02-STACK`.

### Step 5 — Verify

Canaries:

- [ ] Chat or tip → FAQ, no unknown-type fallback
- [ ] KB miss → honest refusal + tips (no invention)
- [ ] Shell/composer/memory chrome **not** in catalog
- [ ] Watermarks on AIUxer-authored files
- [ ] `02-STACK` names GenUI kind + wire

### Step 6 — Learn (optional)

```text
AIUxer: learn
```

Uses today's radar + this session; you decide stage/promote/ignore.

## Layout

```text
pipelines/                    human — Hello Agent pipeline
knowledge/                    human — static KB
specs/                        catalog contract
src/agents/assistant.ts       Hello Agent (typed)
frontend/
  demo.js                     entry (imports modules)
  src/widgets/tipi.js         closed catalog
  src/widgets/renderer.js     greeting · faq-card · tip-chip
  src/shell/shell.js          chat + Memory sidebar (not catalog)
  src/agent/hello-agent.js    runtime agent
docs/ai-native/               surface-map + Book (AIUxer/Eng)
```

## What this proves

| Claim | Evidence here |
|---|---|
| Human owns pipelines + KB | `pipelines/`, `knowledge/` |
| AIUxer owns interaction + user memory UX | chat, catalog, memory panel, Book 01–03/02-STACK |
| Eng owns tech beyond active | 02-STACK deferred AG-UI; 05–07 |
| Process gates | map → Book approve → Build |
| Watermark | `aiuxer@0.3.1` on AIUxer artifacts |
