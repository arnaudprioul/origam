import { resolve } from 'node:path'

import { MARKETING_DEFAULTS } from './app/consts/marketing.const'
import { I18N_LOCALES, I18N_COOKIE_KEY } from './app/consts/i18n.const'

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
        'origam/nuxt',
        '@nuxtjs/seo',
        '@nuxtjs/i18n'
    ],

    origam: {
        defaultTheme: 'sobre',
        defaultMode: 'light'
    },

    ogImage: {
        enabled: false
    },

    components: [
        { path: '~/components', pathPrefix: false }
    ],

    experimental: {
        viewTransition: true
    },

    css: [
        // Sobre brand token sheets (scoped to [data-theme="sobre"][data-mode="…"]).
        // ADR-004: the origam/nuxt module only injects the ROOT origam identity at
        // runtime — brand themes are NOT auto-injected. We load the generated
        // sobre sheets statically; they stay inert until htmlAttrs sets
        // data-theme="sobre" (see app.head.htmlAttrs below).
        'origam/tokens/css/sobre-light',
        'origam/tokens/css/sobre-dark',
        // Marketing display tokens — single source for site presentation tokens
        // (hero/cta sizes, glows, radii). :root:root specificity wins over the
        // theme sheets above. MUST load after them.
        '~/assets/css/marketing-tokens.css',
        '~/assets/css/base.css'
    ],

    runtimeConfig: {
        public: {
            githubRepo: process.env.NUXT_PUBLIC_GITHUB_REPO ?? MARKETING_DEFAULTS.githubRepo,
            npmPkg: process.env.NUXT_PUBLIC_NPM_PKG ?? MARKETING_DEFAULTS.npmPkg,
            npmVersion: process.env.NUXT_PUBLIC_NPM_VERSION ?? MARKETING_DEFAULTS.npmVersion,
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? MARKETING_DEFAULTS.siteUrl
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
                'data-theme': 'sobre',
                'data-mode': 'light'
            },
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: MARKETING_DEFAULTS.logoPath },
                { rel: 'icon', type: 'image/x-icon', href: MARKETING_DEFAULTS.faviconPath },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
            ]
        }
    },

    build: {
        transpile: ['origam']
    },

    i18n: {
        locales: I18N_LOCALES,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        restructureDir: false,
        langDir: 'assets/locales',
        lazy: true,
        bundle: { optimizeTranslationDirective: false },
        compilation: { strictMessage: false },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: I18N_COOKIE_KEY,
            redirectOn: 'root',
            alwaysRedirect: false
        },
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL ?? MARKETING_DEFAULTS.siteUrl
    },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/repl',
                '@vue/repl/codemirror-editor',
                'shiki',
                'qrcode-generator',
                '@vue/devtools-kit'
            ]
        },
        worker: {
            format: 'es'
        },
        resolve: {
            alias: {
                'origam/nuxt': resolve(__dirname, '../ds/src/nuxt/module.ts'),
                'origam/components': resolve(__dirname, '../ds/src/components'),
                'origam/composables': resolve(__dirname, '../ds/src/composables'),
                'origam/directives': resolve(__dirname, '../ds/src/directives'),
                'origam/enums': resolve(__dirname, '../ds/src/enums'),
                'origam/consts': resolve(__dirname, '../ds/src/consts'),
                'origam/utils': resolve(__dirname, '../ds/src/utils'),
                'origam/types': resolve(__dirname, '../ds/src/types'),
                'origam/interfaces': resolve(__dirname, '../ds/src/interfaces'),
                'origam/services': resolve(__dirname, '../ds/src/services'),
                'origam/themes': resolve(__dirname, '../ds/src/themes')
            }
        }
    }
})
