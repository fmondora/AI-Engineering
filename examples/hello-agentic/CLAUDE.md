# Hello Agentic — E2E playground for AI-Engineering / ai-native

Toy product used to dogfood **AIUxer + AIEngineer** end-to-end.

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

## Trust

Confirm-only on any side effect. v1 has **no** real-world writes (tips are display-only).
