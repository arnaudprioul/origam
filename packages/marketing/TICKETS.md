# Marketing v5 — Phase 1 — Tickets d'intégration (T1..T7)

Chaque dev prend UN ticket = UN composant `app/components/Home*.vue` (stub déjà
en place, boote sans erreur). Le contenu de section est à construire ; le chrome
(app bar / footer), le câblage `index.vue`, le thème `origam` et toutes les clés
i18n sont DÉJÀ posés par le lead — **personne ne touche `app.vue`,
`pages/index.vue`, `en.json`, `nav.const.ts`, `chrome.const.ts`, `nuxt.config.ts`,
`marketing.const.ts`**. Zéro collision.

## Règles communes (NON négociables — CLAUDE.md)

- 100% composants DS (`OrigamXxx`), zéro layout custom hors `<section>` racine.
- HTML sémantique W3C : `<h2>`, `<ul>/<li>`, `<figure>/<figcaption>`, `<table>`,
  `<dl>`, `<button>`/`<a>`. Pas de `<div>` quand un sémantique existe.
- `data-cy` sur tout interactif ; `aria-label` sur icon-only.
- Zéro string hardcodée en template → `t('key','fallback')` via `useT()`
  (`import { useT } from '~/composables/useT'`). **Lire** les clés de `en.json`,
  jamais y écrire.
- **`props.` interdit dans le `<template>`** (OK dans `<script setup>`).
- Constantes locales au composant → un nouveau `~/consts/{kebab}.const.ts`
  (SCREAMING_SNAKE). Interfaces → `~/interfaces/*.interface.ts` (préfixe I).
  Types → `~/types/*.type.ts` (préfixe T). **Jamais inline.**
- Pas de hex/taille/espacement hardcodés → CSS vars `--origam-*` (avec fallback).
- Pas de logique dans le template : extraire en `computed`/méthode/composable.
- Chaque ticket livre : composant + sa spec e2e (`packages/tests/e2e/home-xxx.spec.ts`).
  La spec assert le rendu réel (présence des éléments clés, texte i18n, a11y de base).
- L'`id` et le `data-cy` de section viennent du PARENT (`index.vue`) via fallthrough
  d'attributs sur la `<section>` racine — **garder une `<section>` racine unique**,
  ne pas wrapper dans un fragment ni un autre élément racine.

## Pré-requis serveur

Le lead a modifié `nuxt.config.ts` (optimizeDeps Monaco/REPL) + `package.json`
(monaco-editor, @vue/repl) et lancé `pnpm install`. Le dev server doit être
relancé une fois par le lead/PM avant que T4 teste le Playground.
Node 22 obligatoire : `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 22`.

---

## T1 — HomeHero

- **Composant** : `app/components/HomeHero.vue`
- **Spec e2e** : `packages/tests/e2e/home-hero.spec.ts`
- **Clés i18n** : `home.hero.badge`, `home.hero.titleLine1`, `home.hero.titleLine2`,
  `home.hero.subtitle`, `home.hero.ctaComponents`, `home.hero.ctaGithub`,
  `home.hero.install`, `home.hero.copy`, `home.hero.copied`
- **DS** : `OrigamChip`/`OrigamBadge` (badge version), `OrigamBtn` (2 CTA),
  `OrigamCode` ou `OrigamBtn icon` pour le bouton Copy. Titre = `<h1>` (LE h1 de
  la page — un seul) sur 2 lignes (line1 + line2).
- **Maquette** : badge `v2.5.0 — 29 charts shipped, WCAG 2.1 AA pass` ; titre
  L1 `The Vue 3 design system` / L2 `that just works.` ; sous-titre = la longue
  phrase ; CTA `Browse components` (→ `/components`) + `Star on GitHub`
  (→ repo, externe, `target=_blank rel=noopener`) ; snippet `npm install origam`
  + bouton `Copy` (Clipboard API, état `Copied`).
- **AC** : h1 unique, snippet en `<pre><code>` ou `OrigamCode`, copy fonctionnel
  (assert `navigator.clipboard` mocké en e2e), CTA pointent les bonnes URLs.

## T2 — HomeKpis

- **Composant** : `app/components/HomeKpis.vue`
- **Spec e2e** : `packages/tests/e2e/home-kpis.spec.ts`
- **Clés i18n** : `home.kpis.title`, `*Value`/`*Label` pour `components`, `charts`,
  `a11y`, `size`, `license`.
- **DS** : strip de stats. Sémantique = `<dl>` (value=`<dd>`, label=`<dt>`) OU
  liste de `<figure><figcaption>`. Pas de `<div>` répété.
- **Maquette** : `95` Components · `29` Chart primitives · `100%` WCAG 2.1 AA ·
  `<50kb` Tree-shakable · `MIT` Open source.
- **Décision** : créer `~/consts/kpis.const.ts` (`KPIS` array de
  `{ valueKey, labelKey }`) + `~/interfaces/kpi.interface.ts` (`IKpi`).
- **AC** : 5 items, `<h2>` titre, pas de magic string.

## T3 — HomeFeatures

- **Composant** : `app/components/HomeFeatures.vue`
- **Spec e2e** : `packages/tests/e2e/home-features.spec.ts`
- **Clés i18n** : `home.features.eyebrow`, `home.features.title`, puis pour chaque
  feature `charts|a11y|tokens|typescript|css|composition` : `.title` + `.description`.
- **DS** : `OrigamCard` × 6 dans une grille (`OrigamGrid`/`OrigamGridItem` ou CSS
  grid sur la `<section>`). Eyebrow = petit `<p>` ; titre = `<h2>`.
- **Maquette** : eyebrow `WHAT'S INSIDE`, 6 cartes (titre + desc) — cf. en.json.
- **Décision** : `~/consts/features.const.ts` (`FEATURES` array
  `{ titleKey, descriptionKey, icon? }`) + `~/interfaces/feature.interface.ts`.
- **AC** : 6 cards, chaque card a `<h3>` titre + desc, responsive via CSS grid.

## T4 — HomePlayground (Monaco / @vue/repl) — SPEC-028

- **Composant** : `app/components/HomePlayground.vue`
- **Spec e2e** : `packages/tests/e2e/home-playground.spec.ts`
- **Clés i18n** : `home.playground.eyebrow`, `.title`, `.file`, `.share`, `.open`,
  `.caption`.
- **DS** : chrome de la card via `OrigamCard`/`OrigamBtn` ; éditeur via `@vue/repl`
  + `monaco-editor` (déjà en deps). **Wrap obligatoire dans `<ClientOnly>`** (REPL
  = client-only, sinon mismatch hydration). Onglet `App.vue`, boutons `SHARE`/`OPEN`.
- **Maquette** : eyebrow `LIVE PLAYGROUND` ; titre `Try before you ship.` ;
  caption = la phrase.
- **Décision** : Monaco worker en `format:'es'` déjà configuré. L'éditeur ne doit
  PAS bloquer le SSR/200 — fallback skeleton pendant le chargement client.
- **AC** : page boote en SSR sans erreur hydration, éditeur monte côté client,
  e2e tolère le chargement async (waitFor le conteneur REPL). Si non testable
  headless, documenter la limite dans la spec.

## T5 — HomeShowcase

- **Composant** : `app/components/HomeShowcase.vue`
- **Spec e2e** : `packages/tests/e2e/home-showcase.spec.ts`
- **Clés i18n** : `home.showcase.eyebrow`, `.title`, `.viewAll`, sous-objets
  `dataTable.*`, `chartLine.*`, `switch.*`, `chips.*`, `avatarGroup.*`.
- **DS** : `OrigamTable` (Data Table, 5 rows), `OrigamChart`/`OrigamChartLine`
  (sparkline `+12.4%`), `OrigamSwitch` × 3 variants, `OrigamChip`/`OrigamChipGroup`
  (6 intents), `OrigamAvatarGroup` (`+24 members`). Lien `View all` → `/components`.
- **Maquette** : Data Table `Sortable · filterable · virtualized` + rows (Aurora
  release/Arnaud/Shipped, Tokens v2/Léa/In review, A11y audit/Jade, Chart
  engine/Marc/Draft, New theme/Romi) ; Chart Line ; Switch ; Chips ; Avatar Group.
- **Décision** : `~/consts/showcase.const.ts` (rows table, chip intents) +
  interfaces dédiées. Table = vrai `<table>` via OrigamTable, pas de divs.
- **AC** : table 5 lignes, chips 6 intents, avatar group avec overflow count.

## T6 — HomeThemes

- **Composant** : `app/components/HomeThemes.vue`
- **Spec e2e** : `packages/tests/e2e/home-themes.spec.ts`
- **Clés i18n** : `home.themes.eyebrow`, `.title`, `chipGlass..chipApple`,
  `.tokensStudio`, `.styleDictionary`, `previewLight/Dark/BrandA/BrandB/Button/Json`.
- **DS** : `OrigamChipGroup` (7 brand chips), tuiles de preview (`OrigamCard` ou
  `OrigamSheet`) montrant light/dark/brand-a/brand-b avec un `OrigamBtn` exemple
  et un label `.json`. Eyebrow `THEMING` ; titre `One design system. Every brand.`
- **Maquette** : chips Glass/Geek/Cartoon/Editorial/Material/Ecom/Apple ; mentions
  `tokens.studio compatible` + `Style Dictionary v4` ; preview labels.
- **Décision** : `~/consts/themes-showcase.const.ts` (chips + preview tiles). Les
  tuiles peuvent porter `data-theme` ou `OrigamThemeProvider` pour montrer le rendu.
- **AC** : 7 chips, 4 tuiles preview, 2 mentions tooling.

## T7 — HomeCta

- **Composant** : `app/components/HomeCta.vue`
- **Spec e2e** : `packages/tests/e2e/home-cta.spec.ts`
- **Clés i18n** : `home.cta.title`, `.description`, `.ctaDocs`, `.install`,
  `.copy`, `.copied`.
- **DS** : `OrigamCard`/`OrigamSheet` bandeau de clôture, `OrigamBtn` `Read docs`
  (→ `/docs`), snippet `npm install origam` + Copy (réutiliser le même pattern
  copy que T1 — coordination : extraire un `~/composables/useCopy.ts` partagé
  si T1 le crée, sinon T1 le crée et T7 le consomme — **ne pas dupliquer**).
- **Maquette** : titre `Ready to ship faster?` ; texte `Spin up your Vue 3
  project with origam in 30 seconds.` ; CTA `Read docs` + install.
- **AC** : `<h2>`, CTA docs, snippet copyable.

---

## Coordination inter-tickets (anti-duplication)

- **Bouton Copy** (T1 + T7) : un seul composable `~/composables/useCopy.ts`
  (Clipboard API + état `copied` temporisé). **T1 le crée**, T7 l'importe.
  Le PM doit séquencer ou prévenir T7 de ne pas le réécrire.
- **Eyebrow** (T3, T5, T6, playground) : motif identique (petit `<p>` majuscule).
  Si un composant `HomeEyebrow.vue` ou une classe utilitaire émerge, factoriser —
  sinon garder simple et cohérent (même classe CSS nommée pareil).
- **Snippet install** (T1, T7) : même rendu `<pre><code>` / OrigamCode.
- Toutes les nouvelles consts/interfaces vont dans `~/consts` / `~/interfaces`
  avec un nom de fichier UNIQUE par ticket pour éviter les collisions de fichiers.

## Parallélisation

T1, T2, T3, T5, T6 sont indépendants → parallélisables immédiatement.
T7 dépend de `useCopy` (T1) → démarrer après T1 ou coordonner le composable.
T4 (Playground) est isolé mais nécessite le restart serveur post-install.
