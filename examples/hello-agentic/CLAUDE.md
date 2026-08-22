# Hello Agentic — E2E playground for AI-Engineering / ai-native

Toy product used to dogfood **AIUxer + AIEngineer** end-to-end.
Conversational surface: **Hello Agent** (onboarding guide, KB-grounded, session memory).

## Human-owned inputs (do not invent in agents)

| Item | Path |
|---|---|
| Agentic pipeline | `pipelines/hello-assistant.md` |
| Knowledge base (static) | `knowledge/` |
| MCP | none in v1 (document as deferred in Book `02-STACK`) |

## Surface map paths

- Specs: `specs/`
- Catalog / types: `frontend/src/widgets/tipi.ts`
- Renderer: `frontend/src/widgets/Renderer.tsx`
- Runtime agents: `src/agents/`
- Shell: `frontend/src/shell/`
- Design root / impl root: this directory (single repo)
- Book: `docs/ai-native/book/`
- Surface maps: `docs/ai-native/surface-maps/`

## How to drive the twins

1. Ensure plugin `ai-native` is installed from marketplace `AI-Engineering`.
2. Open this folder as the project root.
3. Follow `README.md` (Hello World E2E).

## Run the conversational demo (from Claude Code)

Hello Agent’s chat brain is driven by `server.py`, which shells out to the **same CLI family that launched it**:

```bash
./run.sh                       # → http://127.0.0.1:8765
# From Claude Code → claude -p · From Grok Build → grok -p
```

| Mode | How |
|---|---|
| **claude-cli** | `claude -p` (Claude Code login; preferred when Claude launches the server) |
| **grok-cli** | `grok -p` (Grok Build login; preferred when `GROK_AGENT=1`) |
| Anthropic / xAI API | `ANTHROPIC_API_KEY` / `XAI_API_KEY` |
| Force | `HELLO_LLM_PROVIDER=claude-cli\|grok-cli\|anthropic\|xai` |

Interactive sessions author the product; the browser → `server.py` → CLI `-p` for each chat turn.

## Trust

Confirm-only on any side effect. v1 has **no** real-world writes (tips are display-only).
