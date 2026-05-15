# origam — Changelog

This changelog tracks releases of the `origam` package itself. Token-value
churn (Tokens Studio sync from Figma, semantic primitive shifts) lives in
[`tokens/CHANGELOG.md`](./tokens/CHANGELOG.md) — keep them separate so
"the design moved" never blocks a release of "the code shipped a new
component".

Format inspired by [Keep a Changelog](https://keepachangelog.com).
This project follows [Semantic Versioning](https://semver.org).

---

## [Unreleased]

### Added

- `OrigamBracket` — e-sport tournament tree. Supports single-elimination,
  double-elimination and round-robin variants. SVG connectors
  auto-computed from `nextMatchId` (with positional fallback). Slots for
  custom match / competitor / round-title / connector rendering. ARIA
  `role="region"` with per-round `role="group"` + `aria-labelledby`
  pointing at title headings. Tokens exposed under
  `tokens/component/bracket.json` (`--origam-bracket---*`,
  `--origam-bracket-match---*`, `--origam-bracket-competitor---*`,
  `--origam-bracket-connector---*`, `--origam-bracket-round-robin---*`).

- `OrigamSnackbarStack` — multi-toast notification system. Reuses
  `OrigamSnackbar` styling vocabulary for rendering. Composable
  `useSnackbarStack({ id })` exposes `notify` / `dismiss` /
  `dismissAll`. 8 anchor locations, max stack size with FIFO eviction,
  per-item auto-dismiss (or `0` for sticky), action buttons with
  optional `keepOpen`, ARIA `role="region"` on the stack root +
  `role="status"` / `"alert"` per intent on each item with matching
  `aria-live`. Slide-in / slide-out transitions degrade to a fade under
  `prefers-reduced-motion`. Tokens exposed under
  `tokens/component/snackbar-stack.json`
  (`--origam-snackbar-stack---*`, `--origam-snackbar-stack__item---*`).

- `OrigamTabs` / `OrigamTab` / `OrigamTabPanels` / `OrigamTabPanel` —
  full tab system with horizontal / vertical orientation, three visual
  variants (`default` / `pills` / `underline`), ARIA `role="tablist"` +
  `role="tab"` + `role="tabpanel"` wiring, full keyboard navigation
  (`←`/`→`/`↑`/`↓`/`Home`/`End`/`Enter`/`Space`), lazy or eager panel
  mounting, optional touch-swipeable panels. Reuses the shared
  `useGroup` orchestration so the selection state, mandatory behaviour
  and disabled-tab semantics align with the rest of the system
  (`OrigamBtnToggle`, `OrigamCarousel`, `OrigamBottomNav`). Tokens
  exposed under `tokens/component/tabs.json` (item color, indicator
  color, panel padding, transition duration).

---

## [2.2.1] — 2026-05-14

### Fixed

- Expose `./package.json` explicitly in the `exports` map. The catch-all
  `"./*": "./dist/src/*"` previously intercepted `import 'origam/package.json'`
  and re-routed it to a non-existent file inside `dist/`. Standard
  consumer pattern (reading the version from the package metadata) was
  broken — fixed by adding `"./package.json": "./package.json"` ahead
  of the catch-all so it matches first.
- 2.2.0 was tagged but never published to npm. 2.2.1 is the first
  version that lands on the registry.

---

## [2.2.0] — 2026-05-14

> **The "ready for npm" release.** Package metadata, peer dependencies,
> tree-shaking signals and a real README are all in. Tarball preview
> shrunk from 5.6 MB to **867.9 kB** (2 343 files, zero suspect entry).
> No public API change vs 2.1.0 — every consumer upgrade is a
> drop-in.

### Added — stories, slots, emits coverage

- 525+ missing `Slot` / `Emit` Variants across 113 component stories
  (`feat(stories)`). Every documented slot now has a dedicated Variant
  with a custom-content example, and every emit a Variant that logs
  to a live counter.
- `OrigamSwitchTrack` extracted as a standalone primitive (track-only)
  so consumers can build switch-like compounds without rewriting the
  thumb logic.
- Tooling: `useStateEffect` now reacts to every per-axis composable
  (`useHover` / `useActive` / `useFocus`) in a single call — collapses
  the 14 components that historically wired them axis by axis.

### Fixed

- `useStyle` now instrumented across the 124 components that
  previously inlined `*Styles` arrays — single source of truth for the
  inline-style escape hatch.
- Carousel — `progress` prop renders a real-time progress bar wired to
  the cycle timer (was rendering a static "step / total" bar).
- Carousel — `hideDelimiterBackground` finally has a background to
  hide (default `__controls` bg = `rgba(0, 0, 0, 0.4)`).
- Histoire sandbox/panel sash now resizes the iframe in **both
  directions** (was capped at the 720 px responsive-preset width when
  dragging right).
- `useRounded` — utility variants (`xs|sm|md|lg|xl|none|full`) now
  emit BOTH the `.origam--rounded-*` class AND an inline
  `border-radius` declaration as a specificity escape hatch (Strategy
  A documented in `CLAUDE.md`).
- 130 unused-vars cleared from `src/`, 39 ESLint warnings fixed.

### Changed — package for npm

- `peerDependencies` introduced: `vue ^3.5`, `vue-i18n ^11`,
  `vue-router ^4.5` (last two `optional` via `peerDependenciesMeta`).
  They are no longer auto-installed as `dependencies` — consumers
  bring their own versions.
- `sideEffects: ["**/*.css", "**/*.scss", "**/*.vue"]` for downstream
  tree-shaking.
- `engines.node: ">=22"` (matches `.nvmrc`).
- `prepublishOnly` script chains `tokens:build` → `server:build` →
  unit tests. Every `npm publish` rebuilds from scratch with green
  tests.
- `files` whitelist tightened to `dist/src/`, `dist/tokens/`, LICENSE,
  README, CHANGELOG. The Histoire bundle (`dist/stories/`, ~13 MB) is
  no longer shipped to consumers.
- `build.config.ts` `externals` extended to `['vue', 'vue-i18n',
  'vue-router', '@mdi/font']` so peer deps don't get re-bundled.
- mkdist exclusion patterns expanded: `.spec.ts`, `__tests__/**`,
  `.cy.ts`, `.story.vue` are stripped from `dist/`.
- ESLint config ignores `docs/.vitepress/cache/**` and
  `figma-plugin/**` (these aren't part of the published library).

### Documentation

- Full `README.md` written from scratch (253 lines) — install,
  peer deps, plugin registration, theming (`data-theme` +
  `useTheme()` + `<OrigamThemeProvider>`), token tiers, component
  families, composable table, CSS-first principle.

### Internal

- ESLint rule `no-restricted-imports` blocks `@origam` /
  `@stories` / `@docs` / `@cypress` aliases inside `src/` — once
  published, those aliases can't be resolved by consumers.
- 124 components instrumented with `useStyle` following the
  canonical pattern.
- `.tsbuildinfo` and other transient artefacts removed from the tree.

---

## [2.1.0] — 2026-05-07

> **The classes-first release.** The 13 transversal composables
> (`useColor`, `useBackgroundColor`, `useTextColor`, `useColorEffect`,
> `useElevation`, `useRounded`, `useBorder`, `useMargin`, `usePadding`,
> `useSize`) now emit utility classes (e.g. `.origam--bg-primary`,
> `.origam--shadow-md`) when the consumer passes a tokenised value. The
> existing `*Styles` outputs stay populated only when the value is
> non-tokenisable (legacy hex, custom dimensions) — the inline style
> stack on a typical button drops from ~12 to ~6 declarations.
>
> **Non-breaking.** Every composable keeps its previous return shape;
> the new `*Classes` keys are additive. Components have been migrated
> to read both shapes in parallel (transition strategy A).

### Migrating from v2.0 to v2.1

Nothing is required. The release is additive; existing consumers keep
working unchanged. To start using the new path:

```vue
<!-- v2.0 — still works, still emits inline style -->
<OrigamBtn color="primary">Click</OrigamBtn>

<!-- v2.1 — same code, but the emitted DOM now also carries the
     `.origam--bg-primary` utility class instead of inline
     `background-color: var(...)`. Inspecting the DOM is much cleaner. -->
```

If you write your own components on top of `useColor*` / `useElevation`
/ `useRounded` / etc., you can now destructure the new `*Classes`
return:

```ts
const { colorClasses, colorStyles } = useColorEffect(props, isHover, isActive, isDisabled)
// colorClasses: ['origam--bg-primary']  when intent
// colorStyles : []                       when intent
// colorClasses: []                       when '#7c3aed'
// colorStyles : ['background-color: ...']when '#7c3aed'
```

Bind both — `:class="[..., colorClasses]"` AND `:style="[..., colorStyles]"`.
The hover/active/disabled state still flows through `colorStyles` (utility
classes are static, by design).

### Added

- **66 utility classes** generated by Style Dictionary, exposed at
  `origam/tokens/css/utilities` and forwarded by `origam/styles`:
  - `.origam--color-{primary|secondary|success|warning|danger|info|neutral}`
  - `.origam--bg-{primary|secondary|success|warning|danger|info|neutral}`
  - `.origam--shadow-{none|xs|sm|md|lg|xl}`
  - `.origam--rounded-{none|xs|sm|md|lg|xl|full}`
  - `.origam--border-{none|thin|thick}`
  - `.origam--p-{0..12}`, `.origam--m-{0..12}`, `.origam--gap-{0..12}`
  - `.origam--text-{xs|sm|md|lg|xl|2xl}`
- New return keys on transversal composables:
  `colorClasses`, `backgroundColorClasses`, `textColorClasses`,
  `elevationClasses` (extended), `roundedClasses` (extended),
  `borderClasses` (extended), `marginClasses`, `paddingClasses`,
  `sizeClasses`.
- `tests/e2e/utilities.spec.ts` — 66 Playwright tests, one per
  utility class, asserting both class presence and `getComputedStyle`
  resolution against the CSS var pipeline.
- `tests/e2e/prop-audit-phase4.spec.ts` — DOM audit on representative
  components confirming the inline-style pile reduction.
- 79 new Vitest unit specs in `src/composables/Commons/__tests__/`
  covering the classes-first branch of every refactored composable.

### Changed

- ~54 components migrated to consume `*Classes` in parallel with
  `*Styles`. Notable surface-bearing children: Menu/Tooltip/Picker/
  Snackbar/Badge — utility class lands on the `__content` / `__pill` /
  `__wrapper` BEM child, never on the teleport root.
- `OrigamSelectionControl.__wrapper` now carries
  `useTextColor(color)`'s class + style on its root element. This
  re-instates the Switch thumb tinting (`currentColor`) for tokenised
  intents, which had silently broken when `OrigamSwitchTrack` was
  extracted earlier in the cycle.
- `OrigamSwitch` SCSS — the legacy `[style*="color:"]` selector is
  joined by a class-driven set
  (`.origam-selection-control__wrapper.origam--color-{intent} &__thumb`)
  so both the new tokenised path and the legacy hex path tint the thumb
  via `currentColor`.

### Deprecated

- `*Styles` returns on the 10 refactored composables — prefer the
  matching `*Classes` for tokenised values. Both are kept for one
  major cycle; removal scheduled for v3.0.0.

### Fixed

- `OrigamSwitch` thumb stayed white when `color="primary"` (or any
  tokenised intent) — regression from the `OrigamSwitchTrack`
  extraction. Re-introduced via classes-first.
- `OrigamSnackbar` `__wrapper` no longer duplicates the
  `roundedClasses`/`borderClasses` already applied at the root.

### Known limits — planned for v2.2 (Phase 1.5)

- No utility for margin / padding axes (`mx`, `my`, `mt`, `mb`, `ml`,
  `mr`, `px`, `py`, `pt`, `pb`, `pl`, `pr`). Components passing
  axis-specific values fall back to inline styles for now.
- No `2xl` / `3xl` shadow utilities (the rungs exist as primitives but
  are off the manifest).
- Legacy `ROUNDED` enum (`x-small | small | default | medium | large
  | x-large | shaped | shaped-invert`) does not bridge to the
  `none|xs|sm|md|lg|xl|full` utility taxonomy — components passing a
  legacy value get their existing component-scoped BEM modifier and an
  inline style fallback.
- `useColorEffect` does NOT emit a `*Classes` value when `isHover` /
  `isActive` / `isDisabled` is true (states are inline-only by design).
  Components that bind `useActive(props, 'modelValue')` (Alert, Badge,
  BottomNav) therefore never carry a utility class while visible — the
  inline style still paints them correctly. This is intentional; do not
  rely on the utility class for state-dependent styling.

---

## [2.0.0] — 2026-04-26

> **The design tokens release.** Every component now resolves its colors,
> spacing, typography, and motion through a centralised, theme-aware
> token pipeline (Style Dictionary v4 + Tokens Studio for Figma). 50+
> components migrated; 18 of them also picked up real bug fixes from the
> companion `optimus-design-system` codebase. Multi-theme (light / dark)
> works out of the box; `brand-X` themes are an additive layer.

### Migrating from v0.x to v2.0.0

This is a major bump because three things change:

1. **The CSS variables that components read are now generated.** The old
   `<style>:root{}` blocks that each component shipped have been removed.
   Consumers MUST load the generated token CSS — either:

   ```ts
   import 'origam/styles' // primitive + light + dark + helpers
   ```
   or pick the layers separately:
   ```ts
   import 'origam/tokens/css/primitive'
   import 'origam/tokens/css/light'
   import 'origam/tokens/css/dark' // applied via [data-theme="dark"]
   ```

   If you were overriding origam vars at the document root (e.g.
   `:root { --origam-btn---background-color: red }`), that still works —
   the generated CSS is just a default. But if you depended on the
   per-component `:root{}` block being injected when the component
   mounted, that's gone. The vars are now set once globally.

2. **`useColorEffect` is intent-aware.** The `color` / `bgColor` props on
   `<OrigamBtn>`, `<OrigamChip>`, `<OrigamAvatar>`, etc. now expect a
   semantic intent (`'primary'`, `'success'`, `'danger'`, …) rather than
   a raw hex. Raw hex still works but emits a one-shot `console.warn`
   per `(prop, value)` pair (full removal in v3.0.0).

   ```vue
   <!-- v0.x -->
   <OrigamBtn color="#7c3aed">Click</OrigamBtn>

   <!-- v2.0 -->
   <OrigamBtn color="primary">Click</OrigamBtn>

   <!-- One-off custom color -->
   <OrigamBtn :style="{ '--origam-btn---background-color': '#7c3aed' }">…</OrigamBtn>
   ```

3. **`useElevation` no longer computes shadows in JS.** The `bgColor`
   parameter is accepted for signature compat but ignored. The composable
   now emits `box-shadow: var(--origam-shadow-{rung})` and the rung is
   themed at the token level (different shadow recipes for light vs dark).

   The legacy `formatElevationStyle(level, bgColor)` utility is still
   exported but `@deprecated` — it will be removed in v3.0.0.

### Added

- **Multi-tier design tokens** (`tokens/`):
  - Primitive: 12 color ramps, 12 spacing steps, full font / radius /
    shadow / motion / zIndex / opacity / border ladders.
  - Semantic: `surface`, `text`, `border`, `action.{primary,secondary,
    ghost}`, `feedback.{success,warning,danger,info}`, `overlay`. Per
    theme (light + dark), with hooks for brand-X.
  - Component: ~60 files, one per component, in DTCG / Tokens Studio
    format — editable from the Figma plugin.
- **Pipeline**: Style Dictionary v4 + sd-transforms. Outputs CSS,
  SCSS partials, and TypeScript union types. `npm run tokens:build`,
  `tokens:watch`, `tokens:lint`.
- **GitHub Action** (`.github/workflows/tokens-sync.yml`): consumes
  Figma → Tokens Studio → `tokens-sync` branch, rebuilds artifacts,
  opens a PR to `develop` automatically.
- **Multi-theme runtime**:
  - `useTheme()` composable — singleton ref, persistence, prefers-
    color-scheme fallback, toggle helper.
  - `<OrigamThemeProvider theme="dark">` for sub-tree overrides.
- **CSS-first / JS-fallback principle**:
  - `useCssSupport()` composable — feature detection layer wrapping
    `CSS.supports()` with caching for 20 modern features (subgrid,
    container queries, `:has()`, aspect-ratio, color-mix, anchor
    positioning, view transitions, …). Components now branch via
    this composable instead of calling `CSS.supports()` directly.
- **Defaults system** (ported from optimus):
  - `useDefaults()` composable + `<OrigamDefaultsProvider>` for
    cascading default props (mirrors Vuetify's `<v-defaults-provider>`).
  - `IDefault`, `IDefaultProviderProps`, `IDefaultProviderSlots`.
- **`<OrigamConfirmWrapper>`** — type-it-twice form helper with
  auto-injected validation, two render modes (slot-based / `field=`
  shortcut), and bidirectional defaults forwarding.
- **`SCSS helpers`** (`src/assets/scss/_helpers.scss`): `ds-intent`,
  `ds-elevation`, `ds-text-style`, `ds-space`, `ds-focus-ring`,
  `ds-visually-hidden`.
- **VARIANT / VARIANT_INPUT enums** + `TVariant` / `TVariantInput`
  types.
- Common emit / slot interfaces: `IFieldEmits`, `IFieldSlots`,
  `IFieldDefaultSlotProps`, `IInputEmits`, `IInputSlots`,
  `IAdjacentEmits`, `IAdjacentSlots`, `IAdjacentInnerEmits`,
  `IAdjacentInnerSlots`, `IActiveEmits`, `IFocusEmits`,
  `ICommonsComponentEmits`, `ICommonsComponentSlots`.

### Changed

- **Every component** with chrome (~50) now consumes design tokens
  rather than hardcoded values. The per-component `<style>:root{}`
  blocks are gone.
- **`OrigamPasswordField`** rebuilt from the optimus version (629
  vs 399 lines). New features: strength-requirements popup
  (`requirements` + `need*` flags + `minLength`), auto-injected
  validation rules, show/hide toggle, intersect-driven autofocus,
  click:control / mousedown:control emits.
- **`OrigamFileField`** split into 3 files (FileField + DragNDropItem
  + ListItem) for clearer responsibility boundaries; drag-and-drop
  mode reworked, `maxFileSize` validation added, typed emits.
- **`OrigamForm`** grew form-level validation, `scrollToError`,
  global `messages` rendering through OrigamMessages.
- **`OrigamField`** now exposes the `outline__notch` BEM child for
  the floating-label rendering, slot-based prefix/suffix detection,
  and proper focus↔active synchronisation.
- **Snackbar z-index** normalised from `10000` to `1060` via
  `{zIndex.toast}`. Consumers stacking custom overlays on top must
  verify their stacking context.
- **`color.action.primary.bgSubtle / fgSubtle`** added to the
  semantic layer (was missing — Select selected-item background and
  Slider thumb focus ring needed it).

### Fixed

- **OrigamMessages**: `:id` was bound to the entire messages array
  instead of the current message. Fixed by using a kebab-cased
  per-message key.
- **OrigamNumberField**: `watchEffect` → `watch(props.modelValue)` —
  the eager mode was causing reactive write loops while the user
  typed. Increment / decrement handlers split.
- **OrigamOtpInputField**: undefined-current crash guard;
  `isValidNumber` → `isInvalidValue` (semantic was inverted);
  double `update:focused` emit prevented; handleClear added.
- **OrigamFileField**: `@clik:append` and `@lick:append-inner` typo
  fixes; drag&drop append mode no longer overwrites existing files;
  locale arg shape `t(key, [arg])` corrected.
- **OrigamMenu**: stray `console.log()` removed.
- **OrigamOverlayScrim**: `<style scoped>` block was missing
  entirely — scrim wasn't rendering.
- **OrigamProgressCircular**: `backgroundColorClasses` /
  `loaderColorClasses` were missing on the SVG `<circle>` elements.
- **OrigamProgressLinear**: `useBackgroundColor` → `useTextColor`
  (the bar's color was being applied as background, washing it out).
- **OrigamListSubheader**: vuetify-specific
  `rgba(var(--v-theme-on-surface), …)` references replaced with
  origam-native tokens. Style block converted from `lang="css"` to
  `lang="scss"`.
- **OrigamExpansionPanel**: vuetify shadow var leak
  (`var(--v-shadow-key-umbra-opacity, …)`) removed; selector
  `:not(.v-expansion-panel-title--static)` matched a vuetify class
  that never renders in origam — corrected to the origam class.
- **OrigamSlideGroup**: `<style scoped>` block was missing entirely.
- **OrigamCheckbox / OrigamCheckboxBtn / OrigamSelectionControl**:
  `handleClickLabel` argument typed `MouseEvent` (was `Event` —
  caused TS strict failures).
- **OrigamSelectionControlGroup**: `item` slot now exposes
  `{ item, index }` (was `{ item }` only).

### Deprecated

- `formatElevationStyle(level, bgColor)` — replaced by the
  `--origam-shadow-{rung}` token ladder. Kept exported for one
  major version; full removal in v3.0.0.
- Raw hex / rgb passed to `useColorEffect` color props — pass a
  `TIntent` value or use `:style` for one-off custom colors. Removal
  in v3.0.0.

### Outstanding (deferred to v2.x or v3.0.0)

- Several form components still carry hardcoded hex inside their
  scoped styles (Switch 11, Select 8, DatePickerField 5,
  ColorPickerField 2, Img 2, Highlight 3). The token JSONs are in
  place; the `var(--origam-…)` references need to be wired in a
  follow-up. Fallback-only behaviour ensures consumers see the
  intended design today.
- Outstanding token-naming gaps: `color.surface.chrome` (SystemBar),
  `color.overlay.backdrop` (Drawer / Overlay scrim), `color.surface
  .inverse` (Tooltip), `opacity.20` / `opacity.30`, `radius.xs2: 6px`,
  `font.size.6xl: 45px`, `font.letterSpacing.widish`. Promote at
  next ui-designer review.
- `OrigamMain` uses `--origam-main--{prop}` (double-tiret) instead
  of the canonical `---` convention. Cosmetic, breaks consumer
  overrides. To be aligned at v3.

---

## Pre-2.0 history

The `[WIP]` commits before this release were the foundation work
(audit, Figma integration spike, package layout). The design-token
migration started at commit `2124ab8` (Lot 0) and shipped over
ten incremental commits visible in `git log --oneline main..HEAD`.

