import type { IMarketingDefaults } from '~/interfaces/marketing.interface'

export const MARKETING_DEFAULTS: IMarketingDefaults = {
    githubRepo: 'arnaudprioul/origam',
    npmPkg: 'origam',
    npmVersion: '2.5.1',
    siteUrl: 'https://origam.dev.elysera.net',
    siteName: 'origam',
    siteDescription: 'The Vue 3 design system that just works — 29 chart primitives, ~95 components, accessibility-first, design tokens.',
    defaultLocale: 'en',
    plausibleDomain: '',
    plausibleApiHost: '',
    contactEmail: '',
    logoPath: '/logo.svg',
    faviconPath: '/favicon.ico'
} as const
