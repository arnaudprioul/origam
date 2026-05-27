import { MARKETING_DEFAULTS } from './app/consts/marketing.const'
import { ROUTE_RULES } from './app/consts/route-rules.const'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-05-27',
    devtools: { enabled: true },
    ssr: true,

    typescript: {
        strict: true,
        typeCheck: false,
        shim: false
    },

    modules: [
        '@nuxt/content',
        '@nuxt/image',
        '@nuxtjs/seo',
        '@nuxtjs/plausible'
    ],

    css: [
        'origam/tokens/css/primitive',
        'origam/tokens/css/light',
        'origam/tokens/css/utilities',
        'origam/styles'
    ],

    runtimeConfig: {
        public: {
            githubRepo: MARKETING_DEFAULTS.githubRepo,
            npmPkg: MARKETING_DEFAULTS.npmPkg,
            npmVersion: MARKETING_DEFAULTS.npmVersion,
            plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN ?? MARKETING_DEFAULTS.plausibleDomain,
            plausibleApiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST ?? MARKETING_DEFAULTS.plausibleApiHost
        }
    },

    site: {
        url: MARKETING_DEFAULTS.siteUrl,
        name: MARKETING_DEFAULTS.siteName,
        description: MARKETING_DEFAULTS.siteDescription,
        defaultLocale: MARKETING_DEFAULTS.defaultLocale
    },

    app: {
        head: {
            titleTemplate: `%s · ${MARKETING_DEFAULTS.siteName}`,
            htmlAttrs: {
                lang: MARKETING_DEFAULTS.defaultLocale,
                'data-theme': MARKETING_DEFAULTS.defaultTheme
            },
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
            ]
        }
    },

    plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN ?? MARKETING_DEFAULTS.plausibleDomain,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST ?? MARKETING_DEFAULTS.plausibleApiHost,
        autoOutboundTracking: true,
        autoFileDownloadsTracking: false
    },

    nitro: {
        routeRules: ROUTE_RULES,
        alias: {
            '~app': new URL('./app', import.meta.url).pathname
        }
    },

    image: {
        format: ['webp', 'avif']
    }
})
