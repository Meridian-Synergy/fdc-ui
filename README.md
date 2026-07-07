# fdc-ui

Design system du projet **FDC** — Vue 3 + Storybook.

```bash
pnpm install
pnpm storybook     # atelier http://localhost:6006
pnpm test          # tests unitaires (vitest)
pnpm typecheck     # vue-tsc
```

Consommé en dépendance git : `"fdc-ui": "github:Meridian-Synergy/fdc-ui"`.
Voir `CLAUDE.md`.

## Visibilité

Repo **public** (pour que la CI de `fdc-app` récupère la dépendance sans auth). Aucun secret ici (composants + charte). Anti-indexation : `public/robots.txt` (Disallow all) + `<meta robots=noindex>` dans Storybook (`.storybook/{manager,preview}-head.html`). GitHub Pages **non activées** — aucun site hébergé.
