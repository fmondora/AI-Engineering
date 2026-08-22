# 0001 — Hello catalog (closed vocabulary)

## Types

| Type | Kind | Det/Gen | Authority |
|---|---|---|---|
| `greeting` | widget | det + copy gen | Assistant may choose when to show; copy can be gen |
| `faq-card` | widget | det | Body from KB / domain only |
| `tip-chip` | chip | gen order / det vocab | Labels from closed tip ids |

## Out of catalog (shell)
- App header / nav
- Memory panel chrome

## Invariant
LLM-selectable set ⊆ Renderer cases. Unknown → drop with reason.
