# AI-Engineering

A Claude Code marketplace holding Francesco Mondora's **AI-native design system**:
the twin agents **AIUxer** (experience) and **AIEngineer** (engineering, economics,
reliability). A **single, shared source** across projects — no more copies that
drift apart.

## The two agents

One plugin, `ai-native`, ships two complementary specialists. They're deliberately
in tension — and that tension is the point.

### `aiuxer` — the experience lens

AI-native isn't "bolt a chatbot onto a screen." It's an interface an **AI composes
and organizes at runtime**: generative-widget homes, conversational surfaces,
dashboards that learn, ranking and memory that adapt. That power brings failure modes
a normal design review never sees — an interface that "dances" (re-orders itself with
no explanation), the **double mental model** collapsing (the user can't tell a fact
from something generated), ungrounded generation reaching the user as if it were true.

`aiuxer` exists to design that well and to audit it. It brings a **pattern catalog**
(composition by reference, search-on-demand, visibly-marked generated content…),
**principles rooted in the literature** (the grounding gate — the AI proposes, code
verifies; presentation belongs to an agent only when it *is* the reasoning), an
**AI-native maturity model** on the experience axis (L0–L4), an **audit methodology**
for when someone says "it's confusing," and the named **anti-patterns** (layered
vocabulary, redundant surfaces, proactive spam). Reach for it when: *"the system feels
confusing," "make this UI truly AI-native," "validate/add a generative widget,"
"usability-audit an AI product," "give the interface memory/learning."* Its
non-negotiable: **grounding** — generated content is marked, the trust boundary holds.

### `aiengineer` — the engineering lens

The engineering twin. Its stance: the **LLM is an expensive guest, not the plumbing**
— every model call is latency + money + a point of fragility, so you put it only where
something must be *reasoned* or *created*, and everything else stays deterministic.
**Evals are the spec** (in a probabilistic system "it works" is a distribution, not a
boolean). **Cost is a design choice**, not an ops afterthought — measured in
*cost-per-outcome*, not cost-per-call.

It brings reusable **building blocks** (backend abstraction, a persistent job queue,
context engineering, structured-output validation, router-vs-agent, the three axes of
memory — *state / outcome / delta* — and the AI-native data layer), an **economics
playbook** (model tiering, multi-layer caching, local models, anti-runaway guardrails),
**reliability** patterns (graceful degradation, idempotency, the trust boundary),
**evals & observability**, and a BUILD-side **maturity model** where every rung is paid
for with evals + budget. Reach for it when: *"what architecture for this AI system?,"
"how do I manage cost/latency?," "which model, when do I escalate?," "how do I add
memory/learning sustainably?," "how do I do evals?," "my agent loops / is fragile /
costs too much."* Its non-negotiable: **cost-per-outcome** and the **trust boundary**.

### Why two, not one

They pull in different directions on purpose. `aiuxer` maximizes the *intelligence of
the experience* — anticipation, memory everywhere, "propose the move," generative
richness; it pushes toward L4. `aiengineer` weighs *cost, latency, reliability,
maintainability* — how much that magic costs, how fragile it is, how long it holds. The
common ground is real (deterministic-first, the inviolable trust boundary, a shared
maturity model), and the arbiter is never who argues best: it's the **measured
outcome**. **AIUxer designs the desirable, AIEngineer makes it feasible and
sustainable; the outcome metric signs the agreement.**

> The agents author in English but **speak the interlocutor's language** — they
> answer you in whatever language you write.

## Install

This repo is both the **marketplace** and the host for the plugin. From any project:

```
/plugin marketplace add fmondora/AI-Engineering
/plugin install ai-native@AI-Engineering
```

Then enable auto-update (see **Updating** below) so new pushes land on their own.

## Migration (a single source, for real)

After installing, **remove the local copies** so they don't mask the plugin's
version and drift again:

- `.claude/agents/aiuxer.md`, `.claude/agents/aiengineer.md` (gitignored runtime)
- any tracked copies `docs/agents/aiuxer.md`, `docs/agents/aiengineer.md`

From then on: **edit only here**, update with `/plugin update`.

## Hygiene rules

- The agents stay **universal**: project specifics go in the project's `CLAUDE.md`
  or its skills, **never** inside the agent (that's what makes sharing viable — cf.
  AIUxer's P-L principle).
- `skills/` is ready for the future companions (delta/proactivity, audit,
  eval-runner) that will travel with the agents.

## How the agents learn

They're prompts, not models — they don't self-update. They learn through a
**deliberate loop**: real use surfaces a lesson → you distill it → you fold it back
into the agent, versioned. This repo's git history **is** the learning record. Each
agent ends with a **"Field lessons"** section: stage a raw dated observation cheap,
promote it to a principle/pattern **only when it recurs or reality proved it**. The
ritual: at the end of real work, ask *"did this teach the agent something?"* — if
yes, commit it with the lesson in the message.

## Updating

The `ai-native` plugin declares **no pinned `version`** — Claude Code tracks it by
git commit, so **every push here becomes an update**. Enable auto-update for this
marketplace (`/plugin` → Marketplaces → AI-Engineering → enable auto-update, or
`FORCE_AUTOUPDATE_PLUGINS=1`) and installs refresh in the background after startup.
Manual pull anytime: `/plugin marketplace update AI-Engineering`.

## Changelog

- **Field lessons** — learning convention added to both agents (staging + promotion
  + ritual), each seeded with a real lesson from the field.
- **English packaging** — both agents translated to English, shareable plugin.
- **First cut** — AIUxer (with P-L + first-person pending) and AIEngineer (with the
  delta/snapshot building block + the AI-native data layer).
