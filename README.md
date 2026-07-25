# AI-Engineering

Marketplace Claude Code con il **design system AI-native** di Francesco Mondora:
gli agenti gemelli **AIUxer** (esperienza) e **AIEngineer** (ingegneria, economia,
affidabilità). Fonte **unica e condivisa** tra progetti — niente più copie che
divergono.

## Cosa contiene

Un plugin, `ai-native`:

- **`aiuxer`** — AI-native UX & generative UI: pattern, principi, modello di maturità,
  metodologia d'audit, anti-pattern. Product-agnostic.
- **`aiengineer`** — ingegneria di software AI-native: architettura, scelta modelli,
  memoria/retrieval, il data layer AI-native, reward loop, evals, economia
  (costi + latenza). Il gemello ingegneristico di AIUxer.

I due sono complementari e in **tensione feconda**: AIUxer disegna il desiderabile,
AIEngineer lo rende fattibile e sostenibile; l'accordo lo firma la metrica d'esito.

## Installazione

Il repo è insieme il **marketplace** e ospita il plugin. Da un progetto:

```
/plugin marketplace add ~/wip/personal/AI-Engineering
/plugin install ai-native@AI-Engineering
```

(Path locale → editi qui, poi `/plugin update ai-native@AI-Engineering` negli altri
progetti. Quando lo metti su un git remoto, `/plugin marketplace add <git-url>`.)

## Migrazione (fonte unica davvero)

Dopo l'install, **rimuovi le copie locali** perché non mascherino quella del plugin
e non tornino a divergere:

- `.claude/agents/aiuxer.md`, `.claude/agents/aiengineer.md` (gitignored runtime)
- eventuali copie tracciate `docs/agents/aiuxer.md`, `docs/agents/aiengineer.md`

Da lì in poi: **si edita solo qui**, si aggiorna con `/plugin update`.

## Regole di igiene

- Gli agenti restano **universali**: le specificità di progetto vanno nel `CLAUDE.md`
  o nelle skill del progetto, **mai** dentro l'agente (è ciò che rende viabile la
  condivisione — cfr. principio P-L di AIUxer).
- `skills/` è pronto per le compagne future (delta/proattività, audit, eval-runner)
  che viaggeranno con gli agenti.

## Versioni

- **0.1.0** — primo impacchettamento: AIUxer (con P-L + pending in prima persona) e
  AIEngineer (con il building block delta/snapshot + il data layer AI-native).
