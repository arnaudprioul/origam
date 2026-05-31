export interface IThemeChip {
    key: string
    labelKey: string
    labelFallback: string
}

export interface IThemePreviewTile {
    key: string
    labelKey: string
    labelFallback: string
    mode: 'light' | 'dark'
    isLight: boolean
}
