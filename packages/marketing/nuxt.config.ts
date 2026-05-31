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
        defaultMode: 'auto'
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
                lang: MARKETING_DEFAULTS.defaultLocale
            },
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: MARKETING_DEFAULTS.logoPath },
                { rel: 'icon', type: 'image/x-icon', href: MARKETING_DEFAULTS.faviconPath }
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
                'origam/nuxt': new URL('../ds/src/nuxt/module.ts', import.meta.url).pathname,
                'origam/components': new URL('../ds/src/components', import.meta.url).pathname,
                'origam/composables': new URL('../ds/src/composables', import.meta.url).pathname,
                'origam/directives': new URL('../ds/src/directives', import.meta.url).pathname,
                'origam/enums': new URL('../ds/src/enums', import.meta.url).pathname,
                'origam/consts': new URL('../ds/src/consts', import.meta.url).pathname,
                'origam/utils': new URL('../ds/src/utils', import.meta.url).pathname,
                'origam/types': new URL('../ds/src/types', import.meta.url).pathname,
                'origam/interfaces': new URL('../ds/src/interfaces', import.meta.url).pathname,
                'origam/services': new URL('../ds/src/services', import.meta.url).pathname,
                'origam/themes': new URL('../ds/src/themes', import.meta.url).pathname
            }
        }
    }
})
