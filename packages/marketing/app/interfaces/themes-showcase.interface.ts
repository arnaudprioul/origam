import type { TMode, TTheme } from 'origam/types'

export interface IThemeChip {
    key: string
    labelKey: string
    labelFallback: string
}

export interface IThemePreviewTile {
    key: string
    labelKey: string
    labelFallback: string
    /**
     * Real registered DS theme id (see packages/ds/tokens/$themes.json) applied
     * to the tile sub-tree via <OrigamThemeProvider theme>. The tile surface
     * comes from THIS theme's `--origam-color__surface---default` — no hardcoded
     * hex. The matching `{theme}-{mode}.css` sheet must be loaded in nuxt.config.
     */
    theme: TTheme
    /** Color mode applied via <OrigamThemeProvider mode>. */
    mode: TMode
}

/**
 * Extended tile variant that allows decorative brand overrides.
 * `surfaceColor` / `btnBgColor` / `barColors` are null for real DS-themed
 * tiles (light/dark) and set to CSS color values for brand demo tiles that
 * don't have a registered DS theme yet.
 *
 * DS gap: brand-a and brand-b themes are not registered in
 * packages/ds/tokens/$themes.json — these overrides are a temporary
 * decorative layer until those themes exist.
 */
export interface IThemePreviewTileDecorative extends IThemePreviewTile {
    /** Override the tile surface color (null = use DS theme surface token). */
    surfaceColor: string | null
    /** Override the preview button background color (null = use DS primary). */
    btnBgColor: string | null
    /** Two bar colors [dark, light] (null = use DS neutral skeleton tokens). */
    barColors: [string, string] | null
}
