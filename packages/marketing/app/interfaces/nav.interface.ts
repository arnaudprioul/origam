export interface INavLink {
    i18nKey: string
    i18nFallback: string
    href: string
    external?: boolean
}

export interface IFooterColumn {
    titleKey: string
    titleFallback: string
    links: INavLink[]
}
