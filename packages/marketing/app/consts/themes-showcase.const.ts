import type { IThemeChip, IThemePreviewTile } from '~/interfaces/themes-showcase.interface'

export const THEME_CHIPS: IThemeChip[] = [
    { key: 'glass', labelKey: 'home.themes.chipGlass', labelFallback: 'Glass' },
    { key: 'geek', labelKey: 'home.themes.chipGeek', labelFallback: 'Geek' },
    { key: 'cartoon', labelKey: 'home.themes.chipCartoon', labelFallback: 'Cartoon' },
    { key: 'editorial', labelKey: 'home.themes.chipEditorial', labelFallback: 'Editorial' },
    { key: 'material', labelKey: 'home.themes.chipMaterial', labelFallback: 'Material' },
    { key: 'ecom', labelKey: 'home.themes.chipEcom', labelFallback: 'Ecom' },
    { key: 'apple', labelKey: 'home.themes.chipApple', labelFallback: 'Apple' },
]

export const THEME_PREVIEW_TILES: IThemePreviewTile[] = [
    { key: 'light', labelKey: 'home.themes.previewLight', labelFallback: 'light', mode: 'light', isLight: true },
    { key: 'dark', labelKey: 'home.themes.previewDark', labelFallback: 'dark', mode: 'dark', isLight: false },
    { key: 'brand-a', labelKey: 'home.themes.previewBrandA', labelFallback: 'brand-a', mode: 'light', isLight: true },
    { key: 'brand-b', labelKey: 'home.themes.previewBrandB', labelFallback: 'brand-b', mode: 'dark', isLight: false },
]
