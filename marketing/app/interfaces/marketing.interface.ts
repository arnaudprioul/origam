import type { TLocale } from '~/types/locale.type'
import type { TTheme } from '~/types/theme.type'

export interface IMarketingDefaults {
    readonly githubRepo: string
    readonly npmPkg: string
    readonly npmVersion: string
    readonly siteUrl: string
    readonly siteName: string
    readonly siteDescription: string
    readonly defaultLocale: TLocale
    readonly defaultTheme: TTheme
    readonly plausibleDomain: string
    readonly plausibleApiHost: string
}
