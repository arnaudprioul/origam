import type { TLocale } from '~/types/locale.type'

export interface IMarketingDefaults {
    readonly githubRepo: string
    readonly npmPkg: string
    readonly npmVersion: string
    readonly siteUrl: string
    readonly siteName: string
    readonly siteDescription: string
    readonly defaultLocale: TLocale
    readonly plausibleDomain: string
    readonly plausibleApiHost: string
    readonly contactEmail: string
    readonly logoPath: string
    readonly faviconPath: string
}
