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
