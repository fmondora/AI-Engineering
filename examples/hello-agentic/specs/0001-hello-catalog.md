# 0001 — Hello catalog (closed vocabulary)

## Types

| Type | Kind | Det/Gen | Authority |
|---|---|---|---|
| `greeting` | widget | det + copy gen | Hello Agent may choose when to show; copy can be gen |
| `faq-card` | widget | det | Body from KB / domain only |
| `tip-chip` | chip | gen order / det vocab | Labels from closed tip ids |

## Tip ids (closed)

`what-is-this` · `who-are-you` · `twins` · `genui-band` · `memory` · `how-to-talk`

## Out of catalog (shell)

- App header / nav
- Chat transcript chrome (user bubble, agent turn wrapper, prosa)
- Composer
- Memory panel chrome

## Invariant

LLM-selectable set ⊆ Renderer cases. Unknown → drop with reason.
