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

- `OrigamQRCode` + `useQRCode` composable — SVG QR code rendering.
  Powered by `qrcode-generator` (~5 kB, pure JS, no canvas dep). 4
  error correction levels (L/M/Q/H). Optional logo overlay
  (auto-padded white background, ~20 % max recommended size).
  Rounded modules option. SSR-safe (pure JS encoding). ARIA
  `role="img"` + `aria-label` (defaults to `"QR code for {value}"`,
  overridable via prop). Module-level LRU cache (16 entries, keyed on
  value + ECC) so re-renders with the same payload reuse the matrix.
- `OrigamNumberFormat` + `useNumberFormat` composable — i18n number
  formatting via `Intl.NumberFormat` (no external dep). 7 formats
  (`decimal` / `currency` / `percent` / `unit` / `compact` /
  `scientific` / `engineering`), full locale support with auto
  resolution chain (`<html lang>` → `navigator.language` → `'en-US'`),
  currency / unit / sign / notation controls. LRU-cached `Intl`
  instances (16-entry capacity, keyed on serialised options). Scoped
  `#default` slot exposes `{ formatted, parts, value }` for custom
  rendering (e.g. highlight currency symbol). ARIA `aria-label`
  expansion for compact notation (`1.2M` visible → `"1.2 million"` for
  screen readers).
- `OrigamInlineEdit` + `useInlineEdit` composable — edit-in-place
  pattern. Click the display affordance → an input appears prefilled
  with the current value → `Enter` confirms / `Escape` cancels. v-model
  binds to the value, sync or async `validate` callback returns
  `true | string | Promise<true | string>` and keeps the editor open
  on error (`role="alert"` for screen readers). Multiline mode renders
  a `<textarea>` (Cmd/Ctrl+Enter to confirm). Custom slots for
  `#display` / `#edit` / `#actions`. Loading state during async
  validation via `aria-busy` + optional CSS hook. New
  `tokens/component/inline-edit.json` (display + editor + error
  padding / border / color / focus ring). ARIA `aria-label` on the
  display button, `aria-invalid` + `aria-describedby` on the input.
- `OrigamClipboard` + `useClipboard` composable — copy-to-clipboard
  helper. Wraps any trigger with `navigator.clipboard.writeText` +
  `execCommand` fallback. Scoped `#default` slot exposes
  `{ copy, copied, error }`. Auto-resetting feedback state after
  configurable duration. ARIA `aria-live="polite"` on the feedback
  overlay. SSR-safe (guards on `typeof navigator` /
  `typeof document`). New `tokens/component/clipboard.json` (feedback
  pill color, background, padding, border-radius, transition
  duration).
- `OrigamEmptyState` — placeholder for absent data. 5 visual presets
  (`no-data` / `no-results` / `error` / `offline` / `locked`) with
  auto icon + intent mapping via `EMPTY_STATE_PRESET_CONFIG`. Slots
  for `icon` / `title` / `description` / `actions` / `default` (full
  layout override). Three sizes (`sm` / `md` / `lg`) and two
  alignments (`center` / `left`). ARIA `role="status"` +
  `aria-live="polite"` for dynamic empty transitions. New
  `tokens/component/empty-state.json` (per-size padding / gap /
  font-size, per-preset intent color).
- `OrigamBlockquote` — typography component for long citations. 5
  variants (default / elegant / quoted / minimal / pull). Author +
  source + cite attribute support. Locale-aware decorative quote
  marks (fr / en / es / de). Slots for custom author / source
  rendering. ARIA via native blockquote semantics.
- `OrigamMasonry` — Pinterest-style masonry layout. CSS-first via
  `grid-template-rows: masonry` when supported (detected via
  `useCssSupport` — new `masonry` feature flag in the registry). JS
  fallback bucket-fill algorithm with `ResizeObserver` (no external
  dep). Responsive columns via container-query breakpoints
  (`columnBreakpoints`). Optional `transform` transition on item
  reposition (`animated`, default `true`). Vertical alignment via
  `align: 'top' | 'center'` (JS path only). New `useMasonry`
  composable exporting `pickColumnsForWidth` and `bucketFill` pure
  helpers; new `tokens/component/masonry.json`
  (`animation-duration`, `animation-easing`).
- `OrigamGrid` + `OrigamGridItem` — declarative CSS Grid wrapper. Props
  for `columns` / `rows` / `areas` / `gap` (token or raw CSS) /
  `autoFlow` / `align*` / `justify*` and the matching item-level
  `column` / `row` / `area` / `*Self` shorthands. `GridItem` accepts
  both object syntax (`{ start: 1, end: 5 }`, `{ start: 1, span: 4 }`)
  and raw CSS strings (`'1 / 5'`, `'span 2'`) for fine-grained column /
  row span control. New tokens `--origam-grid---gap-{xs,sm,md,lg,xl}`
  resolved against `space.*` primitives. CSS Grid is stable since 2017
  — no fallback needed.

---

## [2.3.0] — 2026-05-15

> **The features release.** Four new components, four major
> enrichments, an official Nuxt module, and a comprehensive SSR
> safety audit. All additions are backward-compatible — drop-in
> upgrade from 2.2.x. 378 unit tests (+158 vs 2.2.1), 0 lint errors.

### Added

- `origam/nuxt` sub-export — official Nuxt 3 / Nuxt 4 module. Auto-imports
  components and composables. SSR-safe theme resolution via cookie +
  `Sec-CH-Prefers-Color-Scheme` header (no FOUC, no hydration mismatch).
  Auto-injects token CSS files (primitive + selected themes + utilities).
  Configurable via `origam: {}` in `nuxt.config.ts`. Resolves through
  `modules: ['origam/nuxt']`. New `IOrigamNuxtModuleOptions` and
  `IOrigamNuxtRuntimeConfig` interfaces; new theme constants
  (`ORIGAM_THEME_AUTO`, `ORIGAM_THEME_LIGHT`, `ORIGAM_THEME_DARK`,
  `ORIGAM_THEME_ATTR`, `ORIGAM_THEME_STORAGE_KEY`). Reference
  documentation at `docs/integrations/nuxt.md`.

### Changed

- `OrigamTextField` — new `mask` prop with built-in patterns
  (`phone:fr`, `phone:us`, `phone:international`, `iban`, `siret`,
  `creditcard`, `date:iso`, `date:fr`, `date:us`, `time`, `time:12h`,
  `postcode:fr`, `postcode:us`) plus a custom pattern syntax
  (`#` = digit, `A` = letter, `*` = any, anything else is a literal).
  In-house mask engine — zero external dependency (no `imask.js` /
  `cleave.js` / `vue-the-mask`). Reactive validation pipeline with
  built-in `luhn` (credit card), `iban` (mod-97) and date parsers
  (`date:iso` / `date:fr` / `date:us`); custom validators accepted as
  `(unmasked) => boolean`. New emits `@valid(boolean)` and
  `@complete({ complete, unmasked })` fire on every value change. The
  v-model exposes the **unmasked** value while the DOM input displays
  the formatted (masked) one — paste handling strips literals and
  reformats, `aria-invalid` toggles on touched fields, and the engine
  auto-promotes phone-shaped patterns to `type="tel"` for mobile
  keyboard hints. New `useMask` composable, `applyMask` / `unmaskValue`
  / `resolveMaskConfig` / `validatePattern` utils, new `IMaskOptions`
  interface and `TMask` / `TBuiltInPattern` / `TPatternValidator`
  types.
- `OrigamTextareaField` — new `mode="rich"` enabling a lightweight
  HTML / Markdown editor based on `contenteditable`. Built in-house
  with zero external dependencies (no TipTap, ProseMirror, Quill).
  9 toolbar commands (`bold`, `italic`, `underline`, `link`,
  `list-bullet`, `list-ordered`, `heading`, `code-inline`,
  `clear-format`), customisable via the new `toolbar` prop (or
  `toolbar: false` to hide). Keyboard shortcuts (Cmd/Ctrl+B/I/U/K/E
  and Cmd/Ctrl+Shift+7/8 for the two list modes). New `output` prop
  switches the v-model serialisation between `'html'` (sanitised) and
  `'markdown'` (CommonMark-flavoured subset). New `toolbarPosition`
  prop (`'top' | 'bottom' | 'floating'`). New `format` emit fired on
  every toolbar click or keyboard shortcut with the command id (and
  the URL for link insertion). New slots `#toolbar` and
  `#toolbar-item` allow replacing the default UI entirely. Internal
  sub-component `OrigamRichToolbar.vue` + composable
  `useTextareaRich` own the contenteditable contract. In-house HTML
  sanitiser with allowlist on tags (`p`, `br`, `strong`, `b`, `em`,
  `i`, `u`, `a`, `ul`, `ol`, `li`, `h1`, `h2`, `h3`, `code`),
  attributes (`href` restricted to `http:` / `https:` / `mailto:` /
  `tel:` plus relative URLs; `class` restricted to the
  `origam-rich--*` prefix), and stripping every `on*` event handler
  before per-tag filtering. External links are auto-hardened with
  `rel="noopener noreferrer nofollow" target="_blank"`. ARIA:
  `role="toolbar" + aria-label` on the toolbar, real `<button>` per
  command with `aria-label` + `aria-pressed`, the editing surface
  carries `role="textbox" + aria-multiline="true"`. New tokens under
  `component/textarea-field/rich-*` (toolbar surface, button states,
  content padding, inline-code colors, link color, heading sizes).
  The plain-mode (`mode="plain"`, default) API is fully
  backward-compatible — passing nothing keeps the previous
  `<textarea>` behaviour.

- `OrigamCode` — major enrichment via shiki integration. Syntax
  highlighting for 13 languages (vue, ts, js, tsx, jsx, scss, css, json,
  bash, html, xml, yaml, md) plus `plaintext`. New props: `lineNumbers`,
  `highlightLines` (accepts both `number[]` and the range syntax
  `'2,5-7'`), `copyable`, `maxHeight`, `theme` (`'auto' | 'light' | 'dark'`),
  `wrap`, `filename`. Copy button with `navigator.clipboard` and an
  `execCommand('copy')` fallback for legacy WebViews. Lazy-init shiki
  highlighter cached as a module-level singleton across instances; an
  LRU (max 64 entries) caches highlighted HTML by `(code, lang, theme)`
  so re-renders never re-tokenise. Theme defaults to `auto` and tracks
  the host `<html data-theme>` attribute. New `useCode` composable
  exposing `{ highlight, prime, isReady, resetCacheForTesting }`. New
  utility `parseHighlightLines()` shared with stories/tests. Pure-CSS
  line-numbers gutter (CSS counter, no JS layout) and line-highlight
  swap (class toggle on already-rendered rows, no re-tokenisation).
  ARIA: `role="region"` on the surface, `aria-live="polite"` on the
  copy feedback, hidden line numbers. `shiki` (`^3.8.1`) promoted from
  `devDependencies` to `dependencies` (it's a runtime dep now); the
  bundle adds ~3 MB to installed `node_modules` for the curated subset.
  New tokens under `component/code` (35 vars: surface, header, filename,
  copy button, line-number gutter, line-highlight, scrollbar). The v2.x
  plain-text `<pre>` API is fully backward-compatible — passing just
  `code` and `lang` keeps the previous behaviour.

- `OrigamParallax` — major enrichment. Multi-layer support via new
  `OrigamParallaxLayer` subcomponent (`speed`, `offsetX`, `offsetY`,
  `zIndex` props; layers register themselves into the host runtime and
  receive direct DOM mutations of `transform` outside Vue reactivity).
  Host gains `direction` (`'vertical' | 'horizontal' | 'both'`),
  `easing` (`'linear' | 'ease-out' | 'spring'`, in addition to the
  legacy raw CSS timing-function string), `disabled`, `speed`,
  `threshold` props. New emits: `@enter`, `@leave`,
  `@scroll-progress(0→1)` driven by `IntersectionObserver` +
  `requestAnimationFrame`. `prefers-reduced-motion: reduce` is honoured
  natively — layers stay at `translate3d(offsetX, offsetY, 0)` and the
  rAF loop short-circuits. CSS-first scroll-driven animations
  (`animation-timeline: view()`) when `view-timeline` is supported
  (Chrome 115+, Edge 115+) AND `easing === 'linear'`; JS fallback
  otherwise. Spring easing implemented as a damped lerp in the JS path.
  Existing single-layer / `<OrigamParallaxElement>` API preserved (the
  two layer kinds use independent injection contexts and can coexist
  inside the same host). New tokens: `parallax.transition-duration-spring`,
  `parallax.transition-easing-default` / `-spring`,
  `parallax.layer.will-change` / `.transform-origin`.

### Added

- `OrigamCommandPalette` — ⌘K command launcher. Built on a teleported
  dialog with focus trap + focus restoration. Custom subsequence-based
  fuzzy-match algorithm (no external dep) ranks results by
  consecutive-run + label-prefix + first-position bonuses. Composable
  `useCommand` exposes a process-wide command registry — entries
  registered inside a Vue effect scope auto-unregister on dispose.
  Reuses `OrigamKbd` for inline shortcut display. Hotkey listener
  built on `useHotkey` (default `⌘+K` on macOS, `Ctrl+K` on
  Windows / Linux, configurable per combination or disabled with
  `:hotkey="null"`). ARIA combobox pattern (`role="combobox"` on the
  input, `role="listbox"` on the result list, `role="option"` per
  item, `aria-activedescendant` tracking the keyboard cursor) +
  `role="dialog"` + `aria-modal="true"` on the surface. Tokens exposed
  under `tokens/component/command-palette.json`
  (`--origam-command-palette---*`,
  `--origam-command-palette__input---*`,
  `--origam-command-palette__item---*`,
  `--origam-command-palette__group-title---*`,
  `--origam-command-palette__empty---*`,
  `--origam-command-palette__footer---*`,
  `--origam-command-palette--backdrop---*`).

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

- `OrigamClientOnly` — SSR helper component that renders its default
  slot only after `onMounted`. Optional `#fallback` slot (or
  `placeholder-tag` / `placeholder-class` props) reserves layout space
  during SSR to avoid CLS. Use to wrap fragments whose markup truly must
  differ between server and client (audio, deviceorientation,
  IntersectionObserver-driven features, …) without triggering hydration
  mismatches.

- `useCssSupportClient(feature, { defaultValue })` — hydration-safe
  feature-gate helper. Returns a `Ref<boolean>` that starts at
  `defaultValue` (default `false`) on both SSR and first client render,
  then flips to the real `CSS.supports()` result inside `onMounted`.
  Use to gate **markup** branches (template `v-if`) when the regular
  `useCssSupport().css.value.X` would produce a hydration mismatch
  (class-only branches keep using the existing API — Vue 3 reconciles
  class diffs fine).

### Fixed

- SSR safety — comprehensive audit of all composables and components
  that previously could crash on server render (`window is not defined`,
  `document is not defined`). `useCssSupport` already returned all-false
  flags during SSR; the rest of the surface (`useTheme`, `useCommand`,
  `useSnackbarStack`, `useCode`, `useMask`, `useTouch`, `useHotkey`,
  `useSticky`, `useSheetSwipe`, `useScroll`, `useParallax`, `useStyleTag`,
  `useTeleport`, `useLocationStrategies`, `useScrollStrategies`,
  `useDisplay`) was confirmed safe via the audit and patched where a
  composable's public method or a `computed` could be evaluated during
  SSR. Specifically: `useAspectRatio` no longer dereferences
  `window.innerWidth/Height` when no explicit `aspectRatio` prop is
  given; `useVirtual`'s `viewportHeight` computed guards
  `document.documentElement`; `useSnackbarStack.dismiss()` guards
  `window.clearTimeout`. Overlay components (Dialog, Drawer, Menu,
  Tooltip, Snackbar, ContextualMenu, SnackbarStack, CommandPalette)
  confirmed SSR-safe via `<Teleport>` (Vue defers the mount until the
  client). New guide `docs/guide/ssr.md`. New `src/__tests__/ssr-smoke.spec.ts`
  exercises every refactored composable in a simulated SSR environment
  (window/document/CSS stripped) **and** through `@vue/server-renderer`'s
  real `renderToString()`.

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

