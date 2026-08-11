# AI UX pattern crosswalk

Sources (external, cite with attribution):

| Source | License / notes | Strength |
|---|---|---|
| [The Shape of AI](https://www.shapeof.ai/) (Emily Campbell) | CC-BY-NC-SA | Generative-product UX: wayfind, prompt actions, tuners, governors, trust, identifiers (~55 patterns, 6 families) |
| [AI UX Playground](https://aiuxplayground.com/patterns) | Editorial catalog (Bestfolios); link + attribute | 155+ interaction patterns + frameworks (Agentic UX L1–L5, Chat UX) |

This file is **ours**: stance filters, mapping to AIUxer doctrine, absorb priority.  
Do **not** paste Shape of AI prose wholesale into agents (NC-SA). Prefer: name + link + our operational rule.

**Stance filter (AIUxer §0):** closed vocabulary · deterministic first · confirm-only writes · grounding gate.  
External patterns that assume unconstrained HTML/CSS generation or silent agent writes are **rejected** or **constrained** (registry types only, confirm before side-effect).

---

## 1. How to read this catalog

| Column | Meaning |
|---|---|
| **Family** | Our bucket (not theirs) |
| **Pattern (external)** | Name + source code `S` = Shape of AI, `P` = Playground |
| **AIUxer map** | Existing principle/pattern # or gap |
| **Absorb** | `core` (fold into doctrine) · `catalog` (name-only in agent + link) · `skill` (process/hard-gate) · `skip` · `eng` (AIEngineer / Book §05–07) |
| **Constraint** | How we keep it AI-native under our thesis |

**Absorb order for the plugin:** `core` first → `skill` when recurrence hits 2 products → `catalog` as index → never dump 155 patterns into `aiuxer.md`.

---

## 2. Shape of AI — full inventory (by their families)

### Wayfinders → onboarding / blank-canvas

| External | AIUxer map | Absorb | Constraint |
|---|---|---|---|
| Gallery `S` | maturity L0–L1; empty-state education | catalog | Sample prompts only; no fake outcomes |
| Follow-up `S` | #7 adaptive affordances; chips | core (already close) | Structured chips ≫ free follow-up walls |
| Initial CTA / open input `S` | composer shell (#14) | catalog | CTA = shell, not catalog type (#21) |
| Nudges `S` | anti-pattern proactive spam §5 | catalog | Soft; dismissible; never silent write |
| Prompt details `S` | #13 streaming honesty; footprints | catalog | Show params that user can edit |
| Randomize `S` | P-E variability | catalog | Low-stakes only |
| Suggestions `S` | #7 | core | Order changes, meaning stable |
| Templates / Madlibs `S` | P-A closed forms; structured gen | core | Schema-bound slots, not free markup |

### Prompt actions → operate on content

| External | AIUxer map | Absorb | Constraint |
|---|---|---|---|
| Auto-fill `S` | #16 on-demand tools | catalog | Confirm before multi-field write |
| Chained action `S` | P-F action→next; plan-execute `P` | core | Each hop confirm if side-effect |
| Describe / Expand / Summary / Synthesis `S` | det vs gen (#4) | catalog | Ground facts via P-I |
| Inline action `S` | #3 action→inline | core | Same flow, no nav break |
| Inpainting / Restyle / Transform `S` | creative modality | catalog | Media pipeline; not domain truth |
| Open input `S` | NL for intent only (P-B) | core | NL explores; keyboard repeats (#8) |
| Regenerate / Variations `S` | P-E | core | Label as gen; keep history |
| Restructure `S` | composition by ref (#19) | core | Restructure *references*, not free layout |

### Tuners → context & constraints

| External | AIUxer map | Absorb | Constraint |
|---|---|---|---|
| Attachments / Connectors `S` | context chip management `P` | core | Sources visible; consent for external |
| Filters / Parameters `S` | P-H designer constraints | core | Enums + tokens, not free CSS |
| Model management `S` / Model selection `P` | eng economics | eng | Cost/latency UI → AIEngineer Book §06 |
| Modes / Persona / Voice & tone `S` | modes, personality `P` | catalog | Product policy; not per-agent UI vocab |
| Preset / saved styles `S` | token contract §4 | core | Styles = token packs |
| Prompt enhancer `S` | optional | skip/catalog | Easy to over-promise; keep optional |

### Governors → human control (highest overlap)

| External | AIUxer map | Absorb | Constraint |
|---|---|---|---|
| Action plan `S` / Plan & Execute `P` | before autonomous acts | core | Plan is proposal until confirm (P-C) |
| Branches `S` / Thread branching `P` | conversation UX | catalog | Pin composition if generative (#19) |
| Citations `S`/`P` | P-I grounding | core | Cite after gate, not as decoration |
| Controls / Interrupt `S`/`P` | #13 composer always typeable | core | Stop mid-stream = first-class |
| Cost estimates `S` / Pre-task cost `P` | cost-per-outcome | eng + catalog | Show before high-cost runs |
| Draft mode `S` / Chat artifacts `P` | L2 Agentic UX | core | Side effects blocked until publish |
| Memory `S`/`P` | maturity L2–L3; inspectable | core | Scope toggle + export; never silent durable write |
| References `S` / Source browser `P` | P-I | core | Inspect without leaving answer |
| Sample response `S` | intent confirm | catalog | High-ambiguity only |
| Shared vision `S` | collab canvas | catalog | Domain: multiplayer |
| Stream of thought `S` / CoT `P` | optional transparency | catalog | Default collapsed; audit trails for high risk |
| Variations `S` / Variation picker `P` | P-E | core | |
| Verification `S` / HITL `P` | P-C trust boundary | core | Preview impact + deny/edit |

### Trust builders

| External | AIUxer map | Absorb | Constraint |
|---|---|---|---|
| Caveat / Failure disclosure `S`/`P` | P-D | core | Honest degrade, no fake 200 |
| Consent / Granular consent `S`/`P` | P-C extended | core | Per capability + revoke |
| Data ownership `S`/`P` | memory + privacy | core | User-visible store |
| Disclosure / Watermark `S` | double mental model §5 | core | Always mark gen content |
| Footprints `S` / Audit trail `P` | operational honesty | core | Especially agent actions |
| Incognito mode `S` | memory scope | catalog | Session-only default option |

### Identifiers (brand) — mostly product chrome

| External | Absorb | Note |
|---|---|---|
| Avatar, Color, Iconography, Name, Personality `S` | skip/catalog | Shell/brand tokens; not generative catalog types (#21) |

---

## 3. AI UX Playground — by category (curated, not all 155)

Playground is an **interaction library**. We absorb only patterns that either (a) strengthen AIUxer gates or (b) fill a hole we hit in the field.

### Trust (must-have)

| Pattern `P` | Map | Absorb |
|---|---|---|
| Citations, Source browser, Confidence indicators | P-I, double mental model | core |
| Failure disclosure, Fact-checking indicators | P-D, P-I | core |
| Granular consent, Data ownership, Privacy filters | P-C | core |
| Audit trail, Authentication chains, Responsibility attribution | agent ops | core / eng |
| Agent identity | P-L multi-agent | core |
| Verification next steps | post-gen trust | catalog |
| Bias detection, Transparency report | compliance products | catalog / skip unless needed |

### Agentic / control (must-have — maps to Playground Agentic UX L1–L5)

| Pattern `P` | Autonomy level | AIUxer | Absorb |
|---|---|---|---|
| Suggest / Confirm / Execute | L1–L3 ladder | P-C | core |
| Human in the loop | L3 | P-C #5 | core |
| Sandbox preview, Blast radius, Reversibility marking | L3 | before confirm | core |
| Time-delayed execution | L3–L4 | high impact | catalog |
| Per-action autonomy, Autonomy budgets, Escalation thresholds | L4 | policy | core |
| Autonomous mode display, Ambient presence | L5 | status honesty | catalog |
| Interrupt and resume, Checkpoints and restore | L4–L5 | robustness | core |
| Plan & Execute, Tool use (visible), Task queue | ops UX | #13, #16 | core |
| Pre-task cost estimate, Hard budget ceilings, Running meters | cost | eng | eng |
| Error recovery strategies, Self-correction | reliability | P-D | eng + catalog |
| Human handoff | support | | catalog |

**Rule:** default product ceiling for domain writes = **L3 Confirm** unless Book §08 explicitly raises it. L4/L5 only inside hard limits + interrupt + audit (AIEngineer co-owns).

### Chat / composer

| Pattern `P` | Map | Absorb |
|---|---|---|
| Streaming, Skeleton, Scroll-to-bottom | #13 | core |
| Follow-up chips, Prompt starters, Conversation templates | #7, wayfinders | core |
| Chat artifacts | draft L2 | core |
| Thread branching, Regen carousel, Response refinement, Repair contract | P-E, iteration | catalog |
| Context chips, Mentions, Multimodal input, Slash, Command bar | #8, #16 | core |
| Memory manage, Memory scope toggle | memory maturity | core |
| Conversation search/tags/export/pin | hygiene | catalog |
| Tool switching in composer | modes | catalog |

### Outputs / generative UI

| Pattern `P` | Map | Absorb |
|---|---|---|
| Generative UI | #1, #19 — **constrained** | core (already stronger) |
| Generative charts | closed chart types + grounded data | core |
| Progressive disclosure | P-G | core |
| Output comparison / history / format selection | P-E | catalog |
| Feedback loops | reward signal (maturity) | catalog → eng evals |

### Inputs (high value)

| Pattern `P` | Map | Absorb |
|---|---|---|
| Command bar, Slash, Mentions | #8 | core |
| Magic edit, Tone sliders, Persona | tuners | catalog |
| Smart autocomplete / predictive type | det first | catalog (careful: noise) |
| Context menu (AI on selection) | inline action | core |

### Onboarding

| Pattern `P` | Map | Absorb |
|---|---|---|
| Use-case wizard, Prompt starters, AI tips | wayfinders; anti proactive spam | catalog |
| Progressive feature unlock | maturity ladder | catalog |
| Interactive tutorials | product-specific | skip in agent |

### Performance / cost (AIEngineer primary)

| Pattern `P` | Absorb |
|---|---|
| Cost transparency, Rate limits, Caching indicators, Model selection UI, Batch queue, Resource dashboard, Hard budget ceilings | eng |

### Commerce / audio / design-tools / collab

Absorb **only if the product has that surface**. Keep as external index; do not bloat AIUxer.

- Commerce: semantic search, NL filter, smart fill — useful if e-com; else skip  
- Audio: interruptibility, voice confirmation, activation boundaries — core *if* voice  
- Design tools: inpainting, variation grid — creative apps only  
- Collab: smart diff, shared session — multiplayer only  

---

## 4. Gaps: external has it, AIUxer thin or missing

Promote candidates (field-prove before folding):

| Gap | External anchors | Proposed home |
|---|---|---|
| **Autonomy ladder L1–L5** | Playground Agentic UX | New AIUxer subsection under P-C / maturity; default L3 for writes |
| **Blast radius + reversibility before confirm** | `P` | Pattern #25 candidate |
| **Inspectable memory scopes** | Memory `S`/`P` | Pattern + Book chapter note |
| **Citations / source browser as first-class** | both | Tie to P-I; not optional chrome |
| **Visible tool use / plan steps** | Tool use, Plan execute, Progress steps | Pattern #13 extension |
| **Cost legibility in UX** | Cost estimates both | Shared with AIEngineer; AIUxer owns *presentation*, Eng owns *truth of numbers* |
| **Agent identity (multi-agent)** | Agent identity `P` | P-L companion |
| **Sandbox / dry-run** | Sandbox preview `P` | Before high-impact confirm |
| **Repair contract** (retry with explicit delta) | `P` | Better than blind regenerate |
| **Wayfinding library** | Shape wayfinders | Thin catalog in AIUxer or onboarding skill |

Already stronger in AIUxer than external libs:

| Ours | Why keep primacy |
|---|---|
| Closed vocab + enum ⊆ renderer (#1, #21) | Production grounding; external GenUI often unconstrained |
| Composition by reference (#19) | Safety for whole views |
| Shell ≠ catalog (#21) | Prevents chrome-as-widget |
| Surface-map / Project Book (#22–#24) | Process hard gates (libraries don't force work) |
| Sibling before invent (#23) | Architectural restraint |
| Token contract §4 | AI↔UI form boundary |

---

## 5. Recommended “our catalog” shape (do not mirror 155)

Keep **one operational catalog** in AIUxer (~25–35 patterns), structured as today, plus a **reference index**:

```text
AIUxer §3 Pattern catalog     → operational, numbered, field-proven
references/ai-ux-pattern-crosswalk.md  → this file (external map + absorb)
(optional later) references/shape-of-ai-index.md → slug list + links only
```

### Tier A — already doctrine (refresh wording with external names for discoverability)

1–24 as today; alias external names in one line where useful, e.g.  
`#5 Trust boundary` ↔ HITL / Verification / Suggest-Confirm-Execute (L3).

### Tier B — dogfood → **promoted into AIUxer #25–#28**

| # | Name | CSDDD | tantracp / Shakti | **buyer** | Notes |
|---|---|---|---|---|---|
| 25 | Autonomy L1–L5; default L3 writes | **present** L1–L3 | **present** L1–L3 + dual L4 | **L2 research / L3 human buy** | buyer: no auto-checkout |
| 26 | Impact preview before L3 | **partial→strong** | **present** (msg) | **present** (report) | Multi-dim scores + trade-offs |
| 27 | Dual memory session ≠ durable | **partial** | **present (strong)** | **present (strong)** | buyer: results + learnings + purchased |
| 28 | Evidence surface | **present** audit | **present** thread | **partial→strong** | buyer: sources/EU DBs; weak price gate |

Artifacts:
- `CSDDD/docs/ai-native/surface-maps/2026-08-11-tier-b-dogfood.md`
- `tantracp/docs/ai-native/surface-maps/2026-08-11-tier-b-dogfood.md`
- `buyer/docs/ai-native/surface-maps/2026-08-11-tier-b-dogfood.md`

### Tier B′ — still waiting on dogfood / second product

| # | Name | From |
|---|---|---|
| 29 | **Visible plan / tool trace (collapsible)** | both |
| 30 | **Repair contract (delta retry)** | Playground |

### Tier C — never agent body

Commerce kits, audio kits, brand identifiers, design-tool media suite, 50 chat hygiene patterns → link out or product Book only.

---

## 6. Orchestration: should AIUxer become an orchestrator?

### Recommendation: **no multi-agent zoo; yes thin orchestration via skills**

| Option | Verdict | Why |
|---|---|---|
| AIUxer → meta-orchestrator spawning 5–8 UX subagents | **No** | Fragments taste; multiplies doctrine drift; cost without outcome; violates “agents hold principles, skills hold gates” |
| AIUxer + AIEngineer twins (current) | **Keep** | Real tension (desirable vs feasible); arbiter = metric |
| AIUxer routes **skills** (surface-map, project-book, future…) | **Yes — already the model** | Orchestration = pipeline, not hierarchy of personas |
| New **peer** agents (orthogonal jobs) | **Only if load is chronic** | e.g. compliance/a11y if every product needs a separate doctrine owner — still prefer skills first |
| Product **runtime** multi-agent (coach, router, domain) | **Not plugin agents** | P-L + Book §04; those are product agents, not marketplace personas |

### When AIUxer “orchestrates”

It already should, as **pipeline lead for experience work**:

```text
invoke AIUxer
  → skill surface-map
  → user chooses
  → skill project-book (AIUxer leads 01–03; calls AIEngineer for 05–07)
  → approve
  → implement from §09
```

That is **orchestration of work**, not “AIUxer spawns ChatComposerAgent + TrustAgent + OnboardingAgent”.

### If you still want “more agents”, hierarchy that doesn’t rot

```text
                    ┌─ AIEngineer (peer, cost/reliability/evals)
AIUxer (experience lead)
                    └─ skills only:
                         surface-map
                         project-book
                         (later) autonomy-review   ← L1–L5 + blast radius check
                         (later) evidence-pass     ← citations/source gate
                         (later) chat-composer     ← empty-state + chips + streaming
```

Promote a skill to an **agent** only when:

1. It needs a **stable persona + literature** that recurs across products, and  
2. A skill checklist is too thin (judgment-heavy audit), and  
3. It does **not** invent a second catalog of widgets (P-L / #21).

Candidates that *might* earn agent status later (not now):

| Candidate | Job | Prefer first |
|---|---|---|
| Trust/evidence auditor | P-I + disclosure + consent deep audit | skill `evidence-pass` |
| Agentic autonomy reviewer | L1–L5 policy per action | skill `autonomy-review` |
| Chat surface specialist | composer/thread patterns | still AIUxer + catalog Tier B |

**Do not** create: OnboardingAgent, CommerceAgent, VoiceAgent, BrandAgent — those are domains, not lenses.

### Anti-pattern for “AIUxer as orchestrator”

- Subagents that each own a **UI vocabulary** → layered vocabulary / redundant surfaces.  
- Orchestrator that **implements** without Book approval → bypasses #24.  
- Parallel “AIUxer-lite” copies in product repos → marketplace drift again.

---

## 7. Practical next steps (plugin)

1. **Keep this crosswalk** as the living index; update when field lessons recur.  
2. **Promote Tier B #25–#28** into `aiuxer.md` only after one dogfood (e.g. CSDDD) confirms wording.  
3. **Optional skill** `autonomy-review`: hard-gate “no L4+ writes without budgets + interrupt + audit row in Book §07”.  
4. **README**: one paragraph pointing to Shape of AI + Playground as *inspiration indexes*, this file as *our filter*.  
5. **Do not** expand agent count until two products force a judgment-heavy specialist that skills cannot hold.

---

## 8. Quick lookup — external name → our home

| You hear… | Look at… |
|---|---|
| Human-in-the-loop / Verification | P-C, #5, HITL L3 |
| Generative UI | #1, #19, #21 (constrained) |
| Streaming | #13 |
| Memory | maturity + #27 candidate |
| Citations / RAG UI | P-I + #28 candidate |
| Autonomy / agent acts alone | L1–L5 + #25–26; Eng budgets |
| Cost to user | AIEngineer + cost UX patterns |
| Blank canvas / starters | Wayfinders; #7 chips |
| Variations / regenerate | P-E; prefer repair contract |
| Multi-agent UI | P-L + agent identity |
| Shell / chrome | #21 shell-not-catalog |
| “Make a new widget” | #22 surface-map → Book |

---

*Last built: 2026-08-11. Sources: shapeof.ai; aiuxplayground.com/patterns + frameworks/agentic.*  
*Dogfood: CSDDD + tantracp/Shakti + buyer 2026-08-11 — Tier B #25–#28; Eng shared-shortlist fan-out from buyer.*
