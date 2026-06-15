import type { IThemeChip, IThemePreviewTileDecorative } from '~/interfaces/themes-showcase.interface'

/**
 * Two-column theming layout (text | 2×2 preview grid). `auto-fit` + `minmax`
 * is CSS-first responsive: the two columns collapse to one on narrow viewports
 * with no media query and no `!important` override of the grid's inline
 * `--origam-grid---template-columns` (same pattern as FEATURES_GRID_COLUMNS).
 */
export const THEMES_GRID_COLUMNS = 'repeat(auto-fit, minmax(320px, 1fr))'

/**
 * Preview-tile (OrigamSheet) uniform radius. Each preview theme resolves
 * `radius---*` differently (editorial 0, ecom 10, light 14…), which would make
 * the tiles inconsistent. To keep one uniform corner regardless of the tile's
 * theme, we pin a single radius — the `--origam-radius---card` ref resolved
 * against the document root (sobre), NOT the tile theme. Since the v2.6 DS fix
 * `useRounded` accepts custom-property refs, so this rides the typed `rounded`
 * prop. bg is intentionally NOT set — it comes from each tile theme's
 * `surface---default`.
 */
export const THEMES_TILE_RADIUS = 'var(--origam-radius---card, 10px)'

/**
 * Theme chips — Sobre first (current page theme), then alphabetical variants.
 * Rendered as a plain flex-wrap <ul> (no OrigamChipGroup slide behaviour).
 */
export const THEME_CHIPS: IThemeChip[] = [
    { key: 'sobre', labelKey: 'home.themes.chip_sobre', labelFallback: 'Sobre' },
    { key: 'glass', labelKey: 'home.themes.chip_glass', labelFallback: 'Glass' },
    { key: 'geek', labelKey: 'home.themes.chip_geek', labelFallback: 'Geek' },
    { key: 'cartoon', labelKey: 'home.themes.chip_cartoon', labelFallback: 'Cartoon' },
    { key: 'editorial', labelKey: 'home.themes.chip_editorial', labelFallback: 'Editorial' },
    { key: 'material', labelKey: 'home.themes.chip_material', labelFallback: 'Material' },
    { key: 'ecom', labelKey: 'home.themes.chip_ecom', labelFallback: 'Ecom' },
    { key: 'apple', labelKey: 'home.themes.chip_apple', labelFallback: 'Apple' },
]

/**
 * Tooling meta line — monospaced, grey, displayed below the chips as a
 * separate <p> row (NOT inside the chip group / carousel).
 */
export const THEMES_TOOLING_TEXT: IThemeChip[] = [
    { key: 'tokens-studio', labelKey: 'home.themes.tokens_studio', labelFallback: '→ tokens.studio compatible' },
    { key: 'style-dictionary', labelKey: 'home.themes.style_dictionary', labelFallback: '→ Style Dictionary v4' },
]

/**
 * Four preview tiles.
 *   light / dark  → real DS registered themes, surface comes from their token sheet.
 *   brand-a       → decorative (editorial theme surface ≈ cream #fafaf7 → close to
 *                   maquette brand-a; button uses amber override vars).
 *   brand-b       → decorative (uses local CSS vars for mint-green surface; no DS
 *                   theme registered yet — documented DS gap).
 *
 * DS gap: no "brand-a" / "brand-b" themes registered in packages/ds/tokens/$themes.json.
 * The two brand tiles use the closest real themes (editorial / ecom) as base for
 * OrigamThemeProvider, then override surface + button color via CSS custom props on
 * the tile element (--themes-tile--surface, --themes-tile--btn-bg, etc.).
 */
export const THEME_PREVIEW_TILES: IThemePreviewTileDecorative[] = [
    {
        key: 'light',
        labelKey: 'home.themes.preview_light',
        labelFallback: 'light.json',
        theme: 'light',
        mode: 'light',
        surfaceColor: null,
        btnBgColor: null,
        barColors: null,
    },
    {
        key: 'dark',
        labelKey: 'home.themes.preview_dark',
        labelFallback: 'dark.json',
        theme: 'dark',
        mode: 'dark',
        surfaceColor: null,
        btnBgColor: null,
        barColors: null,
    },
    {
        key: 'brand-a',
        labelKey: 'home.themes.preview_brand_a',
        labelFallback: 'brand-a.json',
        theme: 'editorial',
        mode: 'light',
        surfaceColor: '#f5f0e8',
        btnBgColor: '#d97706',
        barColors: ['#92400e', '#c4a47a'],
    },
    {
        key: 'brand-b',
        labelKey: 'home.themes.preview_brand_b',
        labelFallback: 'brand-b.json',
        theme: 'ecom',
        mode: 'light',
        surfaceColor: '#e8f5f0',
        btnBgColor: '#059669',
        barColors: ['#065f46', '#6ee7b7'],
    },
]
