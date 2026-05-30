import { MARKETING_DEFAULTS } from './app/consts/marketing.const'
import { ROUTE_RULES } from './app/consts/route-rules.const'
import { I18N_LOCALES } from './app/consts/i18n.const'
import { MARKETING_THEMES_INSTALLED } from './app/themes'

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
        // origam/nuxt MUST come first: it registers every <Origam*> component
        // and bundles their scoped CSS into the build. Without it, every
        // <OrigamBtn> / <OrigamChip> / <OrigamCard> in the templates falls
        // back to rendering its slot as plain text with no styling at all
        // (which is what was happening on the first prod deploy — the page
        // showed component slot text on top of a white page, no chips, no
        // buttons, no card chrome). The module also auto-injects the token
        // CSS (primitive + light/dark + utilities) so we don't need to
        // list those in `css:` below.
        'origam/nuxt',
        '@nuxt/content',
        '@nuxt/image',
        '@nuxtjs/seo',
        '@nuxtjs/plausible',
        '@nuxtjs/i18n'
    ],

    // origam/nuxt — install theme OBJECTS, the public consumer install path
    // (ADR-004). The marketing site OWNS its 7 brand themes (glass, geek,
    // cartoon, editorial, material, ecom, apple) plus a local copy of the
    // DS base `sobre`; each is authored in plain semantic JSON under
    // app/themes/ and exported as IOrigamTheme objects. createOrigam (driven
    // by the plugins) injects each brand×mode as a scoped
    // <style id="origam-theme-{name}-{mode}"> block at runtime — no
    // preset-name resolution, no pre-generated themes-all.css. ThemeSwitcher
    // derives its list from useInstalledThemes(), so the menu lists exactly
    // these 8 brands. `defaultTheme: 'sobre'` activates the sobre block on
    // first paint; `defaultMode: 'auto'` follows prefers-color-scheme.
    origam: {
        themes: MARKETING_THEMES_INSTALLED,
        defaultTheme: 'sobre',
        defaultMode: 'auto'
    },

    // Nuxt's default component auto-import prefixes nested directories
    // (e.g. `app/components/icons/MarketingIcon.vue` becomes
    // `<IconsMarketingIcon>`). Our marketing templates use `<MarketingIcon>`
    // directly because the icons subfolder is just an organizational
    // convenience, not part of the API surface. Disabling `pathPrefix`
    // resolves the components by file name only — no more unresolved
    // `<MarketingIcon>` tags leaking into the rendered HTML.
    components: [
        { path: '~/components', pathPrefix: false }
    ],

    experimental: {
        viewTransition: true
    },

    // The origam Nuxt module injects token CSS (primitive + light + dark +
    // utilities) on its own. We add ONLY the marketing-specific globals
    // here: base body typography / colours pulled from origam tokens, and
    // the view-transition keyframes.
    //
    // Note: the old `origam/styles` import that used to live here pointed
    // at `dist/src/assets/css/main.css` which is a 0-byte file (the real
    // entry is `main.scss`, never compiled by unbuild). Removed.
    css: [
        '~/assets/css/base.css',
        '~/assets/css/marketing-chrome.css',
        '~/assets/css/theme-effects.css',
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
                lang: MARKETING_DEFAULTS.defaultLocale
            },
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&family=JetBrains+Mono:wght@400;500;700&display=swap' },
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

    // Push the `origam` workspace package through the full build
    // pipeline (Vue + TS + Vite plugins). Without `transpile`, the .vue
    // files under origam/dist/ are treated as plain JS by Rollup and
    // any template binding with TS-shaped syntax breaks the parse.
    build: {
        transpile: ['origam']
    },

    nitro: {
        routeRules: ROUTE_RULES,
        alias: {
            '~app': new URL('./app', import.meta.url).pathname
        },
        // Nitro 2.13.4 + pnpm hoisting copies `vue` and `@vue/server-
        // renderer` into `.output/server/node_modules/.nitro/` with
        // their own nested `node_modules/` that symlink back to each
        // other — vue → @vue/server-renderer → vue → … On Linux
        // scandir blows up with ELOOP during the post-build stats
        // pass and `nuxt build` exits 1 (Coolify deploy log). On
        // macOS APFS the same loop is tolerated so the local docker
        // build succeeds. Inlining the Vue packages into the server
        // bundle skips the node_modules copy entirely — no nested
        // dirs, no symlinks, no loop. Externals.inline accepts regex
        // so `^vue$|^@vue/` catches `vue`, `@vue/server-renderer`,
        // `@vue/runtime-dom`, `@vue/shared`, … all in one rule.
        externals: {
            inline: [/^vue$/, /^@vue\//]
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
        restructureDir: false,
        langDir: 'assets/locales',
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
        // Resolve `origam` (and its sub-paths) to the workspace SOURCE
        // instead of the published `dist/`. The dist build (mkdist) keeps
        // a few TS-shaped expressions inside .vue templates / scripts
        // (e.g. `(child as any)?.key`, computed-key object literals)
        // that don't round-trip cleanly through Rollup's plain-JS parser
        // when the lib is consumed from `node_modules`. Pointing at the
        // source side-steps the issue: the .vue files go through Vite's
        // @vitejs/plugin-vue with TS support enabled, which is the
        // pipeline they were written for.
        //
        // Trade-off: incremental builds get a bit slower (Vite re-
        // compiles ~95 .vue files on each marketing build) but they
        // build correctly. A follow-up ticket should harden the lib
        // dist build so this alias becomes optional.
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
        },
        optimizeDeps: {
            include: ['monaco-editor', '@vue/repl', '@vue/repl/monaco-editor']
        },
        worker: {
            format: 'es' as const
        }
    }
})
