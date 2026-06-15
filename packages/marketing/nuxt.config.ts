import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { MARKETING_DEFAULTS } from './app/consts/marketing.const'
import { I18N_LOCALES, I18N_COOKIE_KEY } from './app/consts/i18n.const'

// Single source of truth for the displayed version: the published `origam`
// package version. Read at build time so badges/translations never need a
// manual edit on release — bump packages/ds/package.json and it flows here.
const DS_VERSION = JSON.parse(
    readFileSync(fileURLToPath(new URL('../ds/package.json', import.meta.url)), 'utf-8')
).version as string

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
        defaultTheme: 'geek',
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
        // DS base identity sheets — light/dark neutral DS root (no brand).
        // The origam/nuxt module injects the active token block at runtime via
        // createOrigam({ themes }). These static sheets provide the DS primitive
        // layer (spaces, radii, shadows, feedback colours) as the neutral base.
        'origam/tokens/css/dark',
        // Marketing brand themes — autonomous CSS layers, self-contained.
        // ADR-004: brand themes live in packages/marketing/, not in the DS.
        // Each file declares :root:root[data-theme="X"] (specificity 0,3,0)
        // to beat the DS identity root (0,1,0). Order matters: shared geometry
        // first, then individual brand files. All stay inert until data-theme
        // is set on <html>.
        '~/assets/css/themes/_shared.css',
        '~/assets/css/themes/sobre.css',
        '~/assets/css/themes/geek.css',
        '~/assets/css/themes/glass.css',
        '~/assets/css/themes/cartoon.css',
        '~/assets/css/themes/editorial.css',
        '~/assets/css/themes/material.css',
        '~/assets/css/themes/ecom.css',
        '~/assets/css/themes/apple.css',
        '~/assets/css/base.css'
    ],

    runtimeConfig: {
        public: {
            githubRepo: process.env.NUXT_PUBLIC_GITHUB_REPO ?? MARKETING_DEFAULTS.githubRepo,
            npmPkg: process.env.NUXT_PUBLIC_NPM_PKG ?? MARKETING_DEFAULTS.npmPkg,
            npmVersion: process.env.NUXT_PUBLIC_NPM_VERSION ?? DS_VERSION,
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
                'data-theme': 'geek',
                'data-mode': 'light'
            },
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: MARKETING_DEFAULTS.logoPath },
                { rel: 'icon', type: 'image/x-icon', href: MARKETING_DEFAULTS.faviconPath },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,600&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
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
                'origam/services': resolve(__dirname, '../ds/src/services')
            }
        }
    }
})
