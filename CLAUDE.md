# origam — Engineering Principles

This document is the canonical reference for AI agents and humans working on
the origam design system. It complements the global CLAUDE.md instructions
by capturing project-specific conventions.

## Tech stack (snapshot)

- **Vue 3** (Composition API + `<script setup lang="ts">`), strict TS.
- **Vite + Histoire + VitePress** for dev, stories, and docs.
- **unbuild** for the published library (consumed by external apps).
- **Cypress** (component tests), **Vitest** (unit tests, jsdom).
- **Style Dictionary v4** + **@tokens-studio/sd-transforms** for design
  tokens (multi-theme, multi-output: CSS, SCSS, TS types).

The project requires **Node >= 22** (see `.nvmrc`). The unit tests do not
run on Node 18 because `@vitejs/plugin-vue` calls `crypto.hash()` (Node 21+).

---

## Core principle — **CSS-first, JS-fallback**

Modern CSS is powerful. Use it.

| Need | First choice (CSS) | Fallback only if unsupported |
|---|---|---|
| Layout | `display: grid` + `grid-template-areas` | flex + JS positioning |
| Subdividing | `grid-template-columns: subgrid` | re-implement nested grid |
| Fluid sizing | `min()` / `max()` / `clamp()` | JS `ResizeObserver` + style mutations |
| Component-level breakpoints | `@container (...)` | JS `ResizeObserver` |
| Parent-aware styling | `:has()` selector | JS class toggling |
| Aspect-locked elements | `aspect-ratio: 16 / 9` | JS padding-bottom hack |
| Color blending | `color-mix(in srgb, …)` | JS color math |
| Form controls | `accent-color` | JS-painted custom controls |
| Smooth transitions | `view-transition-name` | JS animation libs |

Concretely, every component that previously needed JS for one of those tasks
should:
1. Implement the CSS-only path first.
2. Branch via the `useCssSupport()` composable to a JS fallback ONLY when
   `CSS.supports()` returns false.

### `useCssSupport()` — the single feature-detection layer

Located at `src/composables/CssSupport/cssSupport.composable.ts`.

```ts
import { useCssSupport } from '@/composables'

const { css, supports, supportsAny, has } = useCssSupport()

// Reactive named flag (preferred when the feature is part of the public matrix)
if (css.value.containerQueries) { /* CSS path */ }
else { /* JS resize-observer path */ }

// Free-form query (cached after the first call)
if (supports('selector(:has(*))')) { … }

// Logical combinators
if (supportsAny('display: grid', 'display: -ms-grid')) { … }
```

Rules:
- **Never call `CSS.supports()` directly in a component**. Always go through
  the composable so the matrix stays auditable in one place.
- **Never gate hydration-sensitive markup** on `css.value.*` — during SSR
  every flag is `false`. Wrap branches with `<ClientOnly>` or `onMounted`
  if the difference would cause hydration mismatch.
- **Add a new feature** by editing `FEATURE_QUERIES` in
  `cssSupport.composable.ts`. The map is the single source of truth for
  what we monitor.

When in doubt, ask: "can I express this with CSS today?". If yes, do it
with CSS. If a target browser cannot, branch via `useCssSupport`. This
keeps bundles smaller, performance better, and theming free.

---

## Design tokens

Source of truth: `tokens/` (Tokens Studio JSON, DTCG format).

Three tiers — agents must respect the boundary:

```
primitive    →  raw values (color.neutral.500, space.4, …)        – tokens/primitive.json
semantic     →  intent (color.surface.default, color.action.primary.bg)  – tokens/semantic/{theme}.json
component    →  per-component refs (btn.background-color)         – tokens/component/{name}.json
```

Naming convention emitted in CSS (handled by Style Dictionary transform):

| Layer | Path in JSON | CSS variable |
|---|---|---|
| Primitive | `color.neutral.500` | `--origam-color-neutral-500` |
| Semantic | `color.surface.default` | `--origam-color-surface-default` |
| Component | `component.btn.background-color` | `--origam-btn---background-color` |
| Component (state) | `component.btn.primary.background-color` | `--origam-btn--primary---background-color` |
| Component (BEM child) | `component.card.overlay.bg` | `--origam-card__overlay---bg` |

Build:
- `npm run tokens:build` — one-shot rebuild of CSS + SCSS + TS types.
- `npm run tokens:watch` — rebuild on `tokens/**/*.json` change.
- `npm run tokens:lint` — dry-run validation.
- Auto-prereq of `server:dev` and `server:build`.

When migrating a component:
1. Audit every `--origam-{cmp}---*` var the SCSS uses.
2. Make sure `tokens/component/{cmp}.json` declares each (with full
   property names, e.g. `background-color` not `bg`).
3. Replace any hardcoded hex/rgb in the SCSS by `var(--origam-color-…)`
   references (or `var(--origam-shadow-{rung})` for elevation).
4. Remove the global `<style>:root{}` block — defaults now come from the
   generated `:root, [data-theme="light"] { … }` rules.
5. Keep calc-based vars that depend on instance-level state (size variant,
   density modifier, …) inside the scoped `<style>` block.

---

## Multi-theme

`<html data-theme="light|dark|brand-x">` switches the active token set.
`prefers-color-scheme: dark` is honoured when no `data-theme` attribute
is present (auto mode).

Runtime helpers:
- `useTheme()` (composable) — singleton ref + persistence + toggle.
- `<OrigamThemeProvider theme="dark">…</OrigamThemeProvider>` — sub-tree
  override (e.g. a brand-X Card inside a neutral page).

To add a brand theme:
1. Drop a `tokens/semantic/brand-{name}.json` overriding the semantics
   you need.
2. Optionally add `tokens/{name}/primitive-override.json` if the brand
   needs a different primary ramp.
3. Register the theme in `tokens/$themes.json`.
4. Rebuild — `[data-theme="brand-{name}"] { … }` is auto-emitted.

---

## Color / intent props

The legacy `color="#ff0080"` API is **deprecated since v0.4** (warns once
per value via `useColorEffect`). The migration path is:
- Pass a `TIntent` value (`'primary' | 'success' | 'danger' | …`).
- For one-off custom colors, use `:style="{'--origam-btn---background-color': myColor}"`.

`TIntent` is defined in `src/types/Commons/intent.type.ts`.

---

## Component conventions (origam-specific)

- Files: `Origam{PascalCase}.vue`, `Origam{PascalCase}.spec.js`,
  `Origam{PascalCase}.cy.ts`, `Origam{PascalCase}.md` per component dir.
- Composables: `src/composables/{Domain}/{kebabCase}.composable.ts`.
- Types: `T` prefix, files under `src/types/{Domain}/{kebab-case}.type.ts`.
- Interfaces: `I` prefix, files under `src/interfaces/{Domain}/{kebab-case}.interface.ts`.
- CSS variables (component-local): `--origam-{component}---{property}`
  with **triple-tiret** as the block/property separator. State variants
  use `--origam-{component}--{state}---{property}` (double-tiret).

---

## Pre-delivery (project-specific overlay)

The global pre-delivery policy (TU + e2e + security) applies. Specific to
origam:
- Run tests on **Node 22** (`.nvmrc`); Node 18 produces unrelated
  `crypto.hash` failures.
- `npm run tokens:build` must succeed and not produce a token resolution
  warning ("token collisions detected" is acceptable — caused by
  cross-theme name reuse, expected).
- `npm audit --omit=dev` should be clean to ship; dev tree contains
  pre-existing histoire-alpha vulns documented as accepted risk.
