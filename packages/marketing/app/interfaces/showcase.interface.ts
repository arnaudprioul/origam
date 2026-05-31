export interface IShowcaseTableRow {
    nameKey: string
    nameFallback: string
    ownerKey: string
    ownerFallback: string
    statusKey: string
    statusFallback: string
}

export interface IShowcaseChipItem {
    intent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'ghost'
    labelKey: string
    labelFallback: string
}
