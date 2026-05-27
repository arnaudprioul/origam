import { MARKETING_DEFAULTS } from './app/consts/marketing.const'
import { ROUTE_RULES } from './app/consts/route-rules.const'
import { I18N_LOCALES } from './app/consts/i18n.const'

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
        '@nuxtjs/plausible',
        '@nuxtjs/i18n'
    ],

    experimental: {
        viewTransition: true
    },

    css: [
        'origam/tokens/css/primitive',
        'origam/tokens/css/light',
        'origam/tokens/css/utilities',
        'origam/styles',
        '~/assets/css/view-transitions.css'
    ],

    runtimeConfig: {
        public: {
            githubRepo: process.env.NUXT_PUBLIC_GITHUB_REPO ?? MARKETING_DEFAULTS.githubRepo,
            npmPkg: process.env.NUXT_PUBLIC_NPM_PKG ?? MARKETING_DEFAULTS.npmPkg,
            npmVersion: process.env.NUXT_PUBLIC_NPM_VERSION ?? MARKETING_DEFAULTS.npmVersion,
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? MARKETING_DEFAULTS.siteUrl,
            contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL ?? MARKETING_DEFAULTS.contactEmail,
            plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN ?? MARKETING_DEFAULTS.plausibleDomain,
            plausibleApiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST ?? MARKETING_DEFAULTS.plausibleApiHost
        }
    },

    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL ?? MARKETING_DEFAULTS.siteUrl,
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
                { rel: 'icon', type: 'image/svg+xml', href: MARKETING_DEFAULTS.logoPath },
                { rel: 'icon', type: 'image/x-icon', href: MARKETING_DEFAULTS.faviconPath }
            ]
        }
    },

    plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN ?? MARKETING_DEFAULTS.plausibleDomain,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST ?? MARKETING_DEFAULTS.plausibleApiHost,
        autoOutboundTracking: true,
        autoFileDownloadsTracking: false,
        enabled: Boolean(process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN && process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST)
    },

    nitro: {
        routeRules: ROUTE_RULES,
        alias: {
            '~app': new URL('./app', import.meta.url).pathname
        }
    },

    image: {
        format: ['webp', 'avif']
    },

    /*
     * nuxt-og-image (loaded via @nuxtjs/seo) ships unenv 2.x mock paths
     * that don't resolve under pnpm hoisting (ENOENT empty.mjs). Disable
     * its runtime entirely for now — defineOgImageComponent() calls in
     * pages become no-op. To re-enable: drop the disabled flag once the
     * upstream unenv/nuxt-og-image compat is resolved.
     */
    ogImage: {
        enabled: false,
        fonts: ['Inter:400', 'Inter:700']
    },

    sitemap: {
        autoLastmod: true,
        exclude: ['/playground', '/playground/**']
    },

    robots: {
        disallow: ['/playground/share']
    },

    i18n: {
        locales: I18N_LOCALES,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        langDir: 'locales',
        lazy: true,
        compilation: { strictMessage: false },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'origam_locale',
            redirectOn: 'root',
            alwaysRedirect: false
        },
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL ?? MARKETING_DEFAULTS.siteUrl
    },

    vite: {
        optimizeDeps: {
            include: ['monaco-editor', '@vue/repl']
        },
        worker: {
            format: 'es' as const
        }
    }
})
