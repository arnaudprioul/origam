import type { IOrigamTheme } from 'origam/interfaces'
// Import the DS baseline from SOURCE (not the `origam/themes` package subpath,
// which resolves to `dist/`). `nuxt.config.ts` pulls this file in at config-load
// time (jiti) — before any Vite alias applies and before the DS lib is built —
// so a `dist`-bound import breaks `nuxt prepare` when the lib isn't compiled
// (e.g. the docs-fixtures workflow). The relative source path resolves at both
// config-load and runtime, mirroring the `origam/* → ../ds/src` aliases.
import { origamDarkTheme as baseDark, origamLightTheme as baseLight } from '../../../ds/src/themes/origam.theme'

/**
 * Origam — NAMED reset theme for the /theming playground.
 *
 * PROPS-FIRST, DS-first: the neutral identity (semantic tokens in `vars`,
 * per-component default props in `components`) is REUSED verbatim from the DS
 * baseline `origam` theme (`origam/themes`) — no duplication. We only re-tag it
 * with `name: 'origam'` so the DS emits a `[data-theme="origam"]` block (the DS
 * baseline is ROOT-scoped and never matches a nested `data-theme`).
 *
 * Why the extra `cssVars` residue below:
 * A `[data-theme="origam"]` SUB-TREE (the preview provider) only re-declares the
 * vars IT lists. Component-level vars (`--origam-btn---*`, `--origam-card---*`, …)
 * that a brand overrides at the document root would otherwise INHERIT into the
 * preview and leak the ambient brand's look. So we re-declare the full union of
 * brand-overridden, live component vars at their DS neutral value (sourced from
 * the DS `light.css` `[data-theme="light"]` baseline + SCSS fallbacks for the
 * few unset ones). All values resolve through semantic tokens / generic literals,
 * so this map is mode-agnostic and lives on the mode-less (light) object, which
 * the DS emits at `[data-theme="origam"]` — matching BOTH modes; the dark object
 * only re-tunes the semantic tier via its reused `vars`.
 *
 * Component DEFAULT PROPS reset is handled by `OrigamThemeProvider` (which now
 * applies `theme.components` to its sub-tree) — this file supplies the CSS-var
 * side that props cannot express.
 */
const ORIGAM_COMPONENT_RESET: Record<string, string> = {
    '--origam-alert---backdrop-filter': 'none',
    '--origam-alert---background-color': 'var(--origam-color__surface---disabled)',
    '--origam-alert---border-color': 'rgba(0, 0, 0, 0)',
    '--origam-alert---border-radius': 'var(--origam-radius---none)',
    '--origam-alert---box-shadow-elevated': 'var(--origam-shadow---md)',
    '--origam-appbar---backdrop-filter': 'none',
    '--origam-btn---backdrop-filter-ghost': 'blur(8px)',
    '--origam-btn---border-color': 'currentColor',
    '--origam-btn---border-radius': 'var(--origam-radius---sm)',
    '--origam-btn---border-radius-rounded': 'var(--origam-radius---2xl)',
    '--origam-btn---border-width-ghost': 'var(--origam-border__width---thin)',
    '--origam-btn---border-width-outlined': 'var(--origam-border__width---thin)',
    '--origam-btn---box-shadow-elevated': 'var(--origam-shadow---md)',
    '--origam-btn---box-shadow-ghost': 'none',
    '--origam-card---backdrop-filter': 'none',
    '--origam-card---background': 'var(--origam-color__surface---raised)',
    '--origam-card---border-bottom-width': 'var(--origam-border__width---0)',
    '--origam-card---border-color': 'var(--origam-color__border---subtle)',
    '--origam-card---border-end-end-radius': 'var(--origam-radius---none)',
    '--origam-card---border-end-start-radius': 'var(--origam-radius---none)',
    '--origam-card---border-left-width': 'var(--origam-border__width---0)',
    '--origam-card---border-right-width': 'var(--origam-border__width---0)',
    '--origam-card---border-start-end-radius': 'var(--origam-radius---none)',
    '--origam-card---border-start-start-radius': 'var(--origam-radius---none)',
    '--origam-card---border-style': 'solid',
    '--origam-card---border-top-width': 'var(--origam-border__width---0)',
    '--origam-card---box-shadow': 'var(--origam-shadow---sm)',
    '--origam-chip---background-color': 'var(--origam-color__surface---overlay)',
    '--origam-chip---border-color': 'currentColor',
    '--origam-chip---border-radius': 'var(--origam-radius---full)',
    '--origam-chip---border-style': 'solid',
    '--origam-chip---border-width': 'var(--origam-border__width---0)',
    '--origam-chip---border-width-outlined': 'var(--origam-border__width---thin)',
    '--origam-code---background-color': 'var(--origam-color__surface---sunken)',
    '--origam-code---border-color': 'var(--origam-color__border---subtle)',
    '--origam-code---border-radius': 'var(--origam-radius---md)',
    '--origam-code---border-width': 'var(--origam-border__width---thin)',
    '--origam-field---border-color': 'var(--origam-color__border---default)',
    '--origam-field---border-opacity': '0.38',
    '--origam-field---border-opacity-outlined': '0.38',
    '--origam-field---border-radius': 'var(--origam-radius---sm)',
    '--origam-field---border-width': 'var(--origam-border__width---thin)',
    '--origam-field---border-width-outlined': 'var(--origam-border__width---thin)',
    '--origam-list---background': 'var(--origam-color__surface---default)',
    '--origam-list---padding-block-end': 'var(--origam-space---2)',
    '--origam-list---padding-block-start': 'var(--origam-space---2)',
    '--origam-list-item---padding-inline-end': 'var(--origam-space---4)',
    '--origam-list-item---padding-inline-start': 'var(--origam-space---4)',
    '--origam-menu---backdrop-filter': 'none',
    '--origam-menu---background': 'var(--origam-color__surface---raised)',
    '--origam-menu---border-radius': 'var(--origam-radius---md)',
    '--origam-menu---box-shadow': 'var(--origam-shadow---lg)',
    '--origam-menu---color': 'var(--origam-color__text---primary)',
    '--origam-menu__content---padding': 'var(--origam-space---1)',
    '--origam-sheet---backdrop-filter': 'none',
    '--origam-table---border-radius': '0',
    '--origam-title---font-family': 'var(--origam-font__family---sans)'
}

export const origamLightTheme: IOrigamTheme = {
    ...baseLight,
    name: 'origam',
    cssVars: ORIGAM_COMPONENT_RESET
}

export const origamDarkTheme: IOrigamTheme = {
    ...baseDark,
    name: 'origam'
}

export const origamThemes = [origamLightTheme, origamDarkTheme]
