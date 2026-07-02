# origam Marketing — Spec Registry (v5.0)

> Registre vivant des décisions validées. Source de vérité : **MASTER PRODUCT
> SPECIFICATION v5.0**. Toute décision est consignée ici comme une spec
> numérotée, validée par l'utilisateur avant exécution.

## Méthode de travail

- Résumé **avant** chaque phase → validation utilisateur.
- Résumé **après** chaque phase → validation utilisateur.
- Chaque décision = une spec écrite ci-dessous.
- Zéro action non validée. Vérification visuelle utilisateur sur la Phase 1.

## ROADMAP (phases)

| Phase | Contenu | Statut |
|---|---|---|
| **1** | Landing + thème par défaut `origam` (vérifiée au millimètre) | 🚧 en cours |
| 2 | Components · Docs · Playground | à venir |
| 3 | Themes (gallery + 8 thèmes officiels) | à venir |
| 4 | Theme Builder | à venir |
| 5 | Marketplace | à venir |
| 6 | AI Theme Generator | à venir |

## Specs validées

| # | Spec | Décision |
|---|------|----------|
| SPEC-000 | Nature produit | marketing = plateforme Origam complète (11 surfaces à terme), pas un simple site vitrine. |
| SPEC-001 | Chrome 100% DS | Tout en composants DS, zéro layout custom : `OrigamApp` → `OrigamAppBar` \| `OrigamMain` \| `<footer>`. |
| SPEC-002 | Maquettes officielles | Les exports HTML du Bureau sont la référence pixel. Phase 1 : `Sobre _ Dark/Light.html`. |
| SPEC-003 | Stack | Nuxt 4 · Vue 3 · TS · Origam · Nitro · Monaco · Vue REPL · Pagefind · Plausible · Coolify. |
| SPEC-004 | Périmètre reprise | On repart du contenu existant (réf. via git), pas de table rase. |
| SPEC-005 | Découpage phases | Voir ROADMAP. Phase 1 d'abord, validée par l'utilisateur. |
| SPEC-008 | Base de départ | Skeleton Nuxt 4 neuf ; ancien code consulté via git, jamais restauré en bloc. |
| SPEC-009 | Footer | `<footer>` HTML sémantique natif — exception assumée à SPEC-001 (pas de composant DS footer). |
| SPEC-010 | Sécurisation git | Branche dédiée `feature/marketing-v5-phase1` + tag `backup/2026-05-31-marketing-v5`. |
| SPEC-011 | Source de vérité | v5.0 écrase toutes les anciennes specs (SPEC.md, SPECS-v3*, CLAUDE.md local, MEMORY v3). |
| SPEC-012 | Exécution git | Tag de sauvegarde + branche au commit courant (pas de stash : branchement sans mouvement de tree). |
| SPEC-013 | Skeleton | Arbo Nuxt 4 minimale (package.json, nuxt.config, tsconfig, app/app.vue, pages/index.vue, consts/interfaces/composables/assets). |
| SPEC-014 | app.vue | Chrome DS + skip-link a11y + nav + CTA GitHub + toggle thème. |
| SPEC-016 | Thème | Phase 1 = identité `origam` du DS (light `:root` / dark `[data-mode="dark"]`). Aucun brand theme installé (Phase 3). Toggle via `useTheme()`. |
| SPEC-017 | i18n | `en.json` source de vérité, `t('key','fallback')` via `useT()`, zéro string hardcodée en template. |
| SPEC-018 | Modules Phase 1 | Lean : `origam/nuxt`, `@nuxtjs/i18n`, `@nuxtjs/seo`. Déférés : content, image, plausible, monaco, repl, pagefind, og-image, sitemap, robots. |
| SPEC-019 | Vérification | Test-as-you-build (Playwright e2e + axe a11y par section) + validation visuelle utilisateur contre les maquettes Sobre. |
| SPEC-020 | Traçabilité | Ce fichier. |
| SPEC-021 | Fix tokens (Option B) | Le thème `origam` injecte TOUT via `cssVars` : light complet → `:root`, dark complet → `[data-mode="dark"]`. Corrige les ~2700 vars composant indéfinies. |
| SPEC-021a | Source des couleurs | **Sheets canoniques du DS** (`light.css`/`dark.css`) font foi pour les couleurs (text `#171717`…), pas la maquette. Affine SPEC-002 : la maquette gouverne layout/structure/contenu, le DS gouverne les couleurs du thème. |
| SPEC-022 | Génération | `origam.theme.ts` régénéré en parsant `light.css` (`:root`) + `dark.css` (bloc `[data-theme="dark"]` uniquement). |
| SPEC-023 | Générateur versionné | `packages/ds/scripts/gen-origam-theme.mjs` (remplace `/tmp/gen-themes.mjs`). |
| SPEC-024 | Marketing inchangé | SPEC-016 reste : toggle via `data-mode`. Pas de chargement statique light/dark. |
| SPEC-025 | Tests | 822 TU verts. 2 TU rouges PRÉ-EXISTANTS (`ssr-smoke.spec.ts`, dette depuis commit 180040ea) → à corriger AVANT merge Phase 1 (gate pre-delivery). |
| SPEC-026 | Workflow dev DS | Le module `origam/nuxt` est chargé par Nuxt depuis `dist/` (résolution node config-time, alias vite non appliqué). Toute modif de la source DS consommée par le module (ex `origam.theme.ts`) exige `pnpm -F origam build` pour être visible en dev marketing. Preuve runtime via sonde Playwright (`getComputedStyle`). |
| SPEC-027 | Nav app bar | Labels maquette (`Components/Playground/Docs/Stories/Blog/Changelog`) → vraies routes (`/components`…), qui 404 en Phase 1 (pages = phases 2+). |
| SPEC-028 | Playground | ~~Vrai Monaco~~ → **@vue/repl avec éditeur CodeMirror par défaut** (Monaco RETIRÉ : incompat Vite 7 — dynamic import → 404 hash `?v=`, static import → stack overflow transform Vite cassant `index.vue`). Vrai REPL live conservé (éditeur + preview), Monaco différé. |
| SPEC-029 | Chrome interactif | Search ⌘K + compteur ⭐ + sélecteur brand = **statique/visuel** (non fonctionnel). Toggle = light/dark uniquement. Brand-switching = phase 3. |
| SPEC-030 | Équipe & orchestration | frontend-lead (contrats : app.vue, index.vue, en.json, nuxt.config, stubs) + 7 frontend-developer (1 composant chacun) + qa-tester (gate). **Pas de worktree** (CLAUDE.md) → propriété de fichiers stricte. |
| SPEC-031 | Sections/tickets | T1 HomeHero · T2 HomeKpis · T3 HomeFeatures · T4 HomePlayground · T5 HomeShowcase · T6 HomeThemes · T7 HomeCta. Chacun : composant DS + clés i18n existantes + spec Playwright e2e + axe a11y. |

## Sections de la Landing (Phase 1)

Ordre imposé par la spec HOME PAGE :

1. **Hero** — titre, description, CTA Components, CTA GitHub, install rapide.
2. **KPIs** — 95+ Components · 29 Chart Primitives · WCAG 2.1 AA · Tree Shakable · MIT.
3. **Features** — Accessibility · TypeScript First · Design Tokens · Charts · CSS Modern · Composition API.
4. **Playground Preview**.
5. **Showcase** — DataTable · Charts · Buttons · Cards · Forms.
6. **Themes Section**.
7. **CTA Final** — install rapide.
