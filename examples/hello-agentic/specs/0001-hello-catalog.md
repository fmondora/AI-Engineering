# 0001 — Hello catalog (closed vocabulary)

**Semantic SoT:** [`semantics/catalog/`](../semantics/catalog/) (AIUxer #34).  
This spec summarizes; **edit JSON there**, then `tools/sync-semantics.py`.

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

## Layout

One directory per catalog type (AIUxer #33):

```text
frontend/src/widgets/
  registry.js
  greeting/   tipi + render + README
  faq-card/   …
  tip-chip/   … (owns TIP_IDS)
```

## Invariant

LLM-selectable set ⊆ Renderer cases. Unknown → drop with reason.
