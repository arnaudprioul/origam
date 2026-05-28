export interface INavLink {
    readonly id: string
    readonly labelKey: string
    readonly labelFallback: string
    readonly href: string
    readonly external?: boolean
    readonly descKey?: string
    readonly descFallback?: string
    readonly icon?: string
    readonly children?: ReadonlyArray<INavLink>
}

export interface IFooterSection {
    readonly id: string
    readonly titleKey: string
    readonly titleFallback: string
    readonly links: ReadonlyArray<INavLink>
}
