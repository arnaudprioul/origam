export interface IFigmaFeature {
    readonly id: string
    readonly icon: string
    readonly titleKey: string
    readonly titleFallback: string
    readonly bodyKey: string
    readonly bodyFallback: string
}

export interface IFigmaRequirement {
    readonly id: string
    readonly labelKey: string
    readonly labelFallback: string
    readonly url?: string
}

export interface IFigmaDownloadAsset {
    readonly id: string
    readonly labelKey: string
    readonly labelFallback: string
    readonly url: string
    readonly icon: string
}
