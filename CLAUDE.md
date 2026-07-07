# fdc-ui — instructions Claude

Design system du projet FDC (Vue 3 + Storybook). Consommé en dépendance git par `fdc-app` (et une éventuelle vitrine), transpilé par le consommateur — pas de publish npm.

## Conventions (voir /home/denis/projets/POC_PLAYBOOK/02-DS-UI.md)
- Préfixe composants : `Fdc*`, un dossier par composant.
- Tokens dans `src/tokens/` (`base.css`, `tokens.css`). Charte « façon chasseurdefrance.com ».
- **Fallbacks obligatoires** : toujours `var(--token, valeur)` dans les composants — le consommateur peut ne pas déclarer les tokens.
- SVG : jamais de `v-html` ; injecter via `<component :is>` sur des descripteurs `{tag, attrs}`.
- Vérifier **visuellement** (Storybook), pas seulement le typecheck.

## Scripts
`pnpm storybook` (atelier), `pnpm test` (vitest), `pnpm typecheck` (vue-tsc).

## Git / release
Branche → PR → merge. release-please gère version + CHANGELOG (pas d'image, pas de npm publish).
