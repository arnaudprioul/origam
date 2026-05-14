# origam

[![npm](https://img.shields.io/npm/v/origam.svg)](https://www.npmjs.com/package/origam)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![build](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

A Vue 3 design system built on modern CSS, design tokens, and a CSS-first
philosophy. Multi-theme out of the box, token-driven utility classes, and
~100 production-ready components.

---

## Installation

```bash
npm install origam
```

Peer dependencies — pulled in by default, but you can dedupe in your app:

| Package      | Required | Used by                       |
|--------------|----------|-------------------------------|
| `vue`        | `^3.5`   | Always.                       |
| `vue-i18n`   | `^11.1`  | Optional — locale composable. |
| `vue-router` | `^4.5`   | Optional — link components.   |

Node >= 22 is required to **build** the package from source. Consumers only
need Vue 3.5+ at runtime.

---

## Quick start

### 1. Register the plugin

```ts
// main.ts
import { createApp } from 'vue'
import { createOrigam } from 'origam'

import 'origam/tokens/css/primitive'
import 'origam/tokens/css/light'
import 'origam/tokens/css/utilities'

import App from './App.vue'

const origam = createOrigam()

createApp(App).use(origam).mount('#app')
```

`createOrigam()` accepts an options bag (`icons`, `locale`, `display`,
`date`, `goTo`, `aliases`, `components`, `directives`, `ssr`, `blueprint`).
All keys are optional — the defaults register every component and every
directive globally.

### 2. Use a component

```vue
<template>
  <OrigamBtn intent="primary" @click="onClick">
    Save
  </OrigamBtn>
</template>

<script setup lang="ts">
const onClick = () => console.log('clicked')
</script>
```

Tokenised props (`intent`, `rounded`, `elevation`, `size`) emit
utility classes (`.origam--bg-primary`, `.origam--shadow-md`, ...).
Custom values (`color="#ff0080"`) fall back to inline styles. See the
[classes-first conventions](./CLAUDE.md) section in `CLAUDE.md` for
details.

---

## Theming

origam ships three built-in modes: `light`, `dark`, and `auto`
(follows `prefers-color-scheme`).

### Static switch

```html
<html data-theme="dark">
```

Omit the attribute to fall back to `auto`. Brand themes can be registered
by dropping a `tokens/semantic/brand-{name}.json` file and rebuilding.

### Runtime switch

```ts
import { useTheme } from 'origam'

const { theme, set, toggle } = useTheme()

set('dark')      // 'light' | 'dark' | 'auto' | 'brand-x'
toggle()         // cycles light <-> dark
```

`useTheme()` is a module-level singleton — every call shares the same
`Ref`, persisted in `localStorage` under `origam-theme`.

### Scoped override

```vue
<OrigamThemeProvider theme="dark">
  <OrigamCard>I am dark, even on a light page.</OrigamCard>
</OrigamThemeProvider>
```

Don't forget to import the matching token sheet (`origam/tokens/css/dark`)
once at boot — the provider only flips the `data-theme` attribute on the
sub-tree.

---

## Design tokens

Three tiers, in order of specificity:

| Tier         | Lives in                          | Example CSS variable                       |
|--------------|-----------------------------------|--------------------------------------------|
| Primitive    | `tokens/primitive.json`           | `--origam-color-neutral-500`               |
| Semantic     | `tokens/semantic/{theme}.json`    | `--origam-color-surface-default`           |
| Component    | `tokens/component/{name}.json`    | `--origam-btn---background-color`          |

Semantic tokens reference primitives. Components reference semantics. App
code should consume **semantic** tokens or component variables — never
primitives directly.

The `origam-utilities.css` sheet generates 66 utility classes
(`.origam--bg-*`, `.origam--color-*`, `.origam--shadow-*`,
`.origam--rounded-*`, ...) that map 1:1 to semantic tokens.

Tokens are sourced from Tokens Studio (DTCG JSON) and compiled with
Style Dictionary v4. See [`tokens/`](./tokens) for the source and
[`scripts/build-tokens.mjs`](./scripts/build-tokens.mjs) for the build.

---

## Components

Around 80 component families, all prefixed `Origam*`:

| Family       | Examples                                                                  |
|--------------|---------------------------------------------------------------------------|
| Forms        | `OrigamTextField`, `OrigamSelect`, `OrigamCheckbox`, `OrigamRadio`, `OrigamSwitch`, `OrigamSliderField`, `OrigamRatingField`, `OrigamDatePickerField`, `OrigamColorPickerField`, `OrigamFileField`, `OrigamPasswordField`, `OrigamOtpInputField`, `OrigamNumberField`, `OrigamForm` |
| Navigation   | `OrigamToolbar`, `OrigamBottomNav`, `OrigamBreadcrumb`, `OrigamDrawer`, `OrigamPagination`, `OrigamStepper`, `OrigamTreeview` |
| Layout       | `OrigamApp`, `OrigamMain`, `OrigamSection`, `OrigamLayout`, `OrigamGrids`, `OrigamDivider`, `OrigamSystemBar` |
| Feedback     | `OrigamAlert`, `OrigamSnackbar`, `OrigamProgress`, `OrigamLoader`, `OrigamSkeleton`, `OrigamBadge`, `OrigamMessages` |
| Overlay      | `OrigamDialog`, `OrigamMenu`, `OrigamTooltip`, `OrigamSheet`, `OrigamContextualMenu`, `OrigamOverlay`, `OrigamConfirmWrapper` |
| Data         | `OrigamDataTable`, `OrigamDataList`, `OrigamTable`, `OrigamCarousel`, `OrigamTimeline`, `OrigamExpansionPanel`, `OrigamVirtualScroll`, `OrigamInfiniteScroll` |
| Display      | `OrigamCard`, `OrigamChip`, `OrigamAvatar`, `OrigamIcon`, `OrigamImg`, `OrigamKbd`, `OrigamTitle`, `OrigamLabel` |

The full catalogue lives in [`src/components/index.ts`](./src/components/index.ts).

---

## Composables

A library of ~80 composables. The ones you'll touch most often:

| Composable          | Purpose                                                            |
|---------------------|--------------------------------------------------------------------|
| `useTheme`          | Read / set / toggle the active theme.                              |
| `useColor`          | Resolve a tokenised intent into class + style outputs.             |
| `useBackgroundColor`| Same, scoped to `background-color`.                                |
| `useTextColor`      | Same, scoped to `color`.                                           |
| `useColorEffect`    | Hover / active / disabled state on top of `useColor`.              |
| `useRounded`        | Tokenised `border-radius`.                                         |
| `useElevation`      | Tokenised box shadow.                                              |
| `useBorder`         | Tokenised border width + color.                                    |
| `useSize`           | Tokenised dimensions.                                              |
| `useMargin`         | Tokenised margin (utility classes).                                |
| `usePadding`        | Tokenised padding (utility classes).                               |
| `useDensity`        | Density modifier (compact / comfortable / default).                |
| `useCssSupport`     | Reactive feature-detection — gate CSS paths vs JS fallbacks.       |
| `useDisplay`        | Reactive viewport / breakpoints.                                   |
| `useLocale`         | Locale provider (RTL-aware).                                       |
| `useGoTo`           | Smooth-scroll helper, configurable per-locale.                     |
| `useDefaults`       | Read the component-defaults injected by `<OrigamDefaultsProvider>`.|

Full list in [`src/composables/index.ts`](./src/composables/index.ts).

---

## CSS-first principle

origam treats modern CSS as a first-class platform. Container queries,
`:has()`, `color-mix()`, `subgrid`, `view-transition-name`, and
`aspect-ratio` are preferred over JS equivalents. Components branch to a
JS fallback **only** when feature detection fails:

```ts
const { css } = useCssSupport()

if (css.value.containerQueries) {
  // CSS path
} else {
  // ResizeObserver fallback
}
```

The full feature matrix lives in
[`src/composables/CssSupport/cssSupport.composable.ts`](./src/composables/CssSupport/cssSupport.composable.ts).
Never call `CSS.supports()` directly — always go through `useCssSupport()`
so the matrix stays auditable.

---

## Browser support

| Browser         | Minimum    |
|-----------------|------------|
| Chrome / Edge   | last 2     |
| Firefox         | last 2     |
| Safari          | 16+        |

Older browsers still receive a degraded but functional experience through
the `useCssSupport()` fallback paths. Building the package locally
requires **Node >= 22** (see [`.nvmrc`](./.nvmrc)).

---

## Contributing

Engineering principles, naming conventions, the classes-first contract,
and the "test-as-you-build" rule live in [`CLAUDE.md`](./CLAUDE.md).
Token authoring (Tokens Studio JSON, Style Dictionary pipeline) lives in
[`tokens/`](./tokens) and is documented in
[`tokens/CHANGELOG.md`](./tokens/CHANGELOG.md).

Local commands:

```bash
npm install
npm run server:dev     # Vite playground
npm run story:dev      # Histoire stories
npm run docs:dev       # VitePress docs
npm run tokens:build   # Rebuild CSS/SCSS/TS tokens
npm run test:unit      # Vitest
npm run test:e2e       # Playwright
```

---

## License

[MIT](./LICENSE) (c) 2024 Prioul Arnaud
