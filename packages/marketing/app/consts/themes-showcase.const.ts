import type { CSSProperties } from 'vue'

import type { IThemeChip, IThemePreviewTile } from '~/interfaces/themes-showcase.interface'

/**
 * Two-column theming layout (text | 2×2 preview grid). `auto-fit` + `minmax`
 * is CSS-first responsive: the two columns collapse to one on narrow viewports
 * with no media query and no `!important` override of the grid's inline
 * `--origam-grid---template-columns` (same pattern as FEATURES_GRID_COLUMNS).
 */
export const THEMES_GRID_COLUMNS = 'repeat(auto-fit, minmax(320px, 1fr))'

/**
 * Tooling / preview pills (OrigamChip) instance override. OrigamChip has NO
 * `variant` prop — the ghost-outlined pill is built from color="neutral" +
 * border + borderColor + pill in the template; only the transparent surface
 * needs a token override here (same pattern as HERO_BADGE_VARS). The mono font
 * (no chip font-family prop/var) is a documented DS gap handled by a scoped
 * `.home-themes__tooling-pill` class in HomeThemes.vue.
 */
export const THEMES_TOOLING_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties

/**
 * Preview-tile (OrigamSheet) radius override. The named `rounded` prop maps to
 * a per-THEME radius rung (each preview theme resolves `radius---*` differently
 * — editorial 0, ecom 10, light 14…), which would make the tiles inconsistent.
 * To keep one uniform 10px corner regardless of the tile's theme, we pin the
 * sheet's public radius custom-prop to the sobre md radius (resolved against
 * the document root, not the tile theme). bg is intentionally NOT set — it
 * comes from each tile theme's surface---default.
 */
export const THEMES_TILE_VARS: CSSProperties = {
    '--origam-sheet---border-radius': 'var(--origam-radius---card, 10px)'
} as CSSProperties

export const THEMES_TOOLING_PILLS: IThemeChip[] = [
    { key: 'tokens-studio', labelKey: 'home.themes.tokensStudio', labelFallback: 'tokens.studio compatible' },
    { key: 'style-dictionary', labelKey: 'home.themes.styleDictionary', labelFallback: 'Style Dictionary v4' }
]

export const THEME_CHIPS: IThemeChip[] = [
    { key: 'glass', labelKey: 'home.themes.chipGlass', labelFallback: 'Glass' },
    { key: 'geek', labelKey: 'home.themes.chipGeek', labelFallback: 'Geek' },
    { key: 'cartoon', labelKey: 'home.themes.chipCartoon', labelFallback: 'Cartoon' },
    { key: 'editorial', labelKey: 'home.themes.chipEditorial', labelFallback: 'Editorial' },
    { key: 'material', labelKey: 'home.themes.chipMaterial', labelFallback: 'Material' },
    { key: 'ecom', labelKey: 'home.themes.chipEcom', labelFallback: 'Ecom' },
    { key: 'apple', labelKey: 'home.themes.chipApple', labelFallback: 'Apple' },
]

/**
 * Four REAL registered themes (packages/ds/tokens/$themes.json), each with a
 * distinct `surface---default` so the tiles prove the theme system live:
 *   light     → #ffffff   dark    → #0a0a0a
 *   editorial → #fafaf7   ecom    → #fff7f0
 * The matching `{theme}-{mode}.css` sheets are loaded in nuxt.config css[].
 */
export const THEME_PREVIEW_TILES: IThemePreviewTile[] = [
    { key: 'light', labelKey: 'home.themes.previewLight', labelFallback: 'light.json', theme: 'light', mode: 'light' },
    { key: 'dark', labelKey: 'home.themes.previewDark', labelFallback: 'dark.json', theme: 'dark', mode: 'dark' },
    { key: 'editorial', labelKey: 'home.themes.previewEditorial', labelFallback: 'editorial.json', theme: 'editorial', mode: 'light' },
    { key: 'ecom', labelKey: 'home.themes.previewEcom', labelFallback: 'ecom.json', theme: 'ecom', mode: 'light' },
]
