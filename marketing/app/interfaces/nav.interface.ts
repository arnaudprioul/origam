export interface INavLink {
    readonly id: string
    readonly labelKey: string
    readonly labelFallback: string
    readonly href: string
    readonly external?: boolean
}

export interface IFooterSection {
    readonly id: string
    readonly titleKey: string
    readonly titleFallback: string
    readonly links: ReadonlyArray<INavLink>
}
