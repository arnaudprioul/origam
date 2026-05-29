# origam Marketing — Engineering Overlay

Marketing-specific rules for `packages/marketing` (Nuxt 4 site consuming
the origam DS). This overlay **complements**, and never overrides, the
repo-root `/CLAUDE.md` and the global `~/.claude/CLAUDE.md`. When a rule
here is silent, the parent conventions apply (structure-by-feature,
`I`/`T`/`use*`/SCREAMING_SNAKE naming, interfaces/types/enums/consts in
their own folders, semantic HTML, CSS-first, no logic/comments in
templates, `props.` banned in `<template>`, i18n everywhere).

See `packages/docs/internal/adr-001-two-axis-theming.md` for the theming
decision these rules enforce.

---

## 1. Zero parallel theming layer

**Theming is the DS, and only the DS**: tokens (`origam/tokens/css/*`) +
`useTheme()` + `OrigamThemeProvider`. The marketing site never invents its
own theme system.

Forbidden:

- Redefining theme-scoped variables in marketing CSS
  (`[data-theme="…"] { --foo: … }`).
- Setting `data-theme` / `data-mode` by hand anywhere except through
  `useTheme()` (or `OrigamThemeProvider` for a scoped sub-tree).
- A `--m-*` (or equivalent) variable set that mirrors the DS token surface
  per theme.

`--m-*` may survive **only** for marketing-chrome decor that has no DS
token equivalent (hero gradients, section dividers), and each such
variable must derive from a DS token: `--m-foo: var(--origam-…)`.

## 2. Look comes from tokens first

Every per-theme visual difference (color, radius, border, shadow,
typography, spacing) is expressed in DS tokens
(`packages/ds/tokens/semantic/{theme}-{mode}.json` and
`tokens/component/*.json`), never in marketing CSS.

A scoped CSS overlay is permitted **only** for what a token genuinely
cannot express:

- gradient fills,
- `backdrop-filter` (glass),
- `::first-letter` drop-caps (editorial),
- multi-layer `drop-shadow` glow (geek).

Such overlays live in `app/assets/css/theme-effects.css`, are scoped to
`[data-theme="<brand>"]` (and `[data-mode]` when mode-specific), kept to a
handful of rules, and each block carries a one-line comment stating *why a
token cannot do it*. No component-look CSS in `marketing-chrome.css`.

## 3. DS components first

Use `<Origam*>` components. Do not re-implement a `.m-btn` / `.m-card`
clone when `<OrigamBtn>` / `<OrigamCard>` exists. Marketing-only chrome
(nav, footer, hero decor) may stay custom, but anything the DS ships is
consumed from the DS.

## 4. Two axes, never conflated

`data-theme` = brand (`sobre | glass | geek | cartoon | editorial |
material | ecom | apple | <custom>`). `data-mode` = `light | dark`. Never
put a mode value in `data-theme` or a brand value in `data-mode`. The
theme switcher drives both through `useTheme()`.

## 5. Builder & export reuse the DS token pipeline

The Theme Builder and its export system **do not ship a second CSS-var
generator**. The `path → --origam-*` naming convention is the DS's
(`origam/name/css` transform); it is consumed from a shared util exported
by the DS, not re-derived in marketing. Exported JSON is DTCG-shaped so it
round-trips back into Tokens Studio / the build. See ADR-002.

## 6. i18n source of truth

User-facing strings live in `app/assets/locales/en.json` (source of
truth), wrapped in `t('key', 'fallback')`. New keys land in `en.json` in
the **same commit** as the feature. Locale config points at
`app/assets/locales/`; the `i18n/` magic dir is disabled
(`restructureDir: false`). Locale cookie: `origam_locale`.

---

## Pre-commit checklist (marketing)

- `grep -rn "data-theme\|data-mode" app/` returns only `useTheme` /
  `OrigamThemeProvider` usages — no manual `setAttribute` / `useHead`
  theme writes.
- No new `[data-theme]` block in `marketing-chrome.css`; per-theme look
  lives in tokens (or, if inexpressible, in `theme-effects.css` with a
  justification comment).
- No `$fetch` in components/pages — calls go through composables (then
  services).
- Every visible string is `t('…')` and the key exists in `en.json`.
- `props.` does not appear inside any `<template>` block.
