# AI-Engineering

A Claude Code marketplace holding Francesco Mondora's **AI-native design system**:
the twin agents **AIUxer** (experience) and **AIEngineer** (engineering, economics,
reliability). A **single, shared source** across projects — no more copies that
drift apart.

## What's inside

One plugin, `ai-native`:

- **`aiuxer`** — AI-native UX & generative UI: patterns, principles, a maturity
  model, an audit methodology, the anti-patterns. Product-agnostic.
- **`aiengineer`** — AI-native software engineering: architecture, model selection,
  memory/retrieval, the AI-native data layer, reward loop, evals, economics
  (cost + latency). AIUxer's engineering twin.

The two are complementary and in **productive tension**: AIUxer designs the
desirable, AIEngineer makes it feasible and sustainable; the outcome metric signs
the agreement.

> The agents author in English but **speak the interlocutor's language** — they
> answer you in whatever language you write.

## Install

The repo is both the **marketplace** and the host for the plugin. From any project:

```
/plugin marketplace add ~/wip/personal/AI-Engineering
/plugin install ai-native@AI-Engineering
```

(Local path → you edit here, then `/plugin update ai-native@AI-Engineering` in the
other projects. Once you push it to a git remote, `/plugin marketplace add <git-url>`.)

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

## Versions

- **0.1.0** — first packaging, in English: AIUxer (with P-L + first-person pending)
  and AIEngineer (with the delta/snapshot building block + the AI-native data layer).
