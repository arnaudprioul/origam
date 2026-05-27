export interface IFeature {
    readonly id: string
    readonly i18nKey: string
    readonly fallback: string
    readonly descKey: string
    readonly descFallback: string
    readonly iconName: string
    readonly intent: string
}

export interface IShowcaseItem {
    readonly id: string
    readonly labelKey: string
    readonly labelFallback: string
    readonly component: string
    readonly intent: string
    readonly variant: string
}
