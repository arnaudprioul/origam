# origam — Changelog

This changelog tracks releases of the `origam` package itself. Token-value
churn (Tokens Studio sync from Figma, semantic primitive shifts) lives in
[`tokens/CHANGELOG.md`](./tokens/CHANGELOG.md) — keep them separate so
"the design moved" never blocks a release of "the code shipped a new
component".

Format inspired by [Keep a Changelog](https://keepachangelog.com).
This project follows [Semantic Versioning](https://semver.org).

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

