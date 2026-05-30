import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { addComponentsDir, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { IOrigamNuxtModuleOptions } from '../interfaces'

import { installedThemeNamesFromEntries, partitionThemeEntries } from './theme-entries'

const MODULE_NAME = 'origam-nuxt'
const CONFIG_KEY = 'origam'

/**
 * Composable names exported by origam that ALSO exist in Nuxt 3/4 core
 * (`#app/composables/router`, `#app/composables/hydrate`, …). Auto-
 * importing them via `addImportsDir` would override Nuxt's built-ins,
 * which leads to `useRouter must be called from inside a setup function`
 * at SSR time — origam's wrappers assume a Vue runtime instance, Nuxt's
 * versions are pure functions that work from anywhere. We skip them
 * during auto-import; consumers who want the origam variants can still
 * import them explicitly via `import { useRouter } from 'origam/composables'`.
 */
const NUXT_COMPOSABLES_BLOCKLIST = new Set([
    'useRoute',
    'useRouter',
    'useLink',
    'useHydration'
])

// Default installed brand (ADR-003): the `'origam'` base brand preset shipped
// in `origam/themes`. Light/dark are the MODE axis (`defaultMode`), never
// themes — a bare install renders the `origam` brand in auto mode.
const DEFAULT_BRAND = 'origam'

// Default array-valued options. They are NOT placed in `defineNuxtModule`'s
// `defaults` because Nuxt merges defaults via `defu`, which CONCATENATES
// arrays — so a consumer passing `themes: ['sobre', …]` would get
// `['origam', 'sobre', …]` (the default prepended), inflating the installed
// list. Array options follow OVERRIDE semantics instead: a consumer-provided
// value replaces the default entirely. We resolve them manually in `setup`.
const DEFAULT_THEMES: string[] = [DEFAULT_BRAND]
const DEFAULT_MODES: string[] = ['light', 'dark']

// Only scalar defaults go through `defu` (safe to merge). The full
// `IOrigamNuxtModuleOptions` defaults (incl. arrays) are still documented via
// `DEFAULTS` for type-checking and the unit specs.
const DEFAULTS: Required<IOrigamNuxtModuleOptions> = {
    themes: DEFAULT_THEMES,
    defaultTheme: 'auto',
    modes: DEFAULT_MODES,
    defaultMode: 'auto',
    cookieName: 'origam-theme',
    modeCookieName: 'origam-mode',
    cookieMaxAge: 60 * 60 * 24 * 365,
    autoImport: true,
    includeUtilities: true,
    prefix: 'Origam'
}

const SCALAR_DEFAULTS = {
    defaultTheme: DEFAULTS.defaultTheme,
    defaultMode: DEFAULTS.defaultMode,
    cookieName: DEFAULTS.cookieName,
    modeCookieName: DEFAULTS.modeCookieName,
    cookieMaxAge: DEFAULTS.cookieMaxAge,
    autoImport: DEFAULTS.autoImport,
    includeUtilities: DEFAULTS.includeUtilities,
    prefix: DEFAULTS.prefix
}

export default defineNuxtModule<IOrigamNuxtModuleOptions>({
    meta: {
        name: MODULE_NAME,
        configKey: CONFIG_KEY,
        compatibility: {
            nuxt: '^3.0.0 || ^4.0.0'
        }
    },
    defaults: SCALAR_DEFAULTS,
    setup (options, nuxt) {
        const resolver = createResolver(import.meta.url)

        // Array options use OVERRIDE semantics (see DEFAULT_THEMES note): the
        // consumer's value replaces the default — never merged/concatenated.
        // `'origam'` is installed ONLY for a bare install (no `themes` given).
        const themeEntries = options.themes ?? DEFAULT_THEMES
        const defaultTheme = options.defaultTheme ?? DEFAULTS.defaultTheme
        const modes = options.modes ?? DEFAULT_MODES
        const defaultMode = options.defaultMode ?? DEFAULTS.defaultMode
        const cookieName = options.cookieName ?? DEFAULTS.cookieName
        const modeCookieName = options.modeCookieName ?? DEFAULTS.modeCookieName
        const cookieMaxAge = options.cookieMaxAge ?? DEFAULTS.cookieMaxAge
        const autoImport = options.autoImport ?? DEFAULTS.autoImport
        const includeUtilities = options.includeUtilities ?? DEFAULTS.includeUtilities

        // ADR-003: themes are installed as runtime OBJECTS, not pre-generated
        // CSS files. We only load the theme-INVARIANT base sheets (primitive +
        // utilities) as CSS; the per-brand blocks are injected at runtime by the
        // plugins via `createOrigam({ themes })`.
        //
        // Payload split: preset NAMES travel as strings and are re-resolved to
        // objects in the plugins (the heavy `vars` come from the bundled
        // presets, never the per-page payload). Inline objects DO travel.
        const { presetNames, customThemes } = partitionThemeEntries(themeEntries)
        // Distinct installed brand names for the switcher — derived WITHOUT
        // resolving presets to objects, so the module never imports the heavy
        // `../themes` bundle at setup time.
        const installedThemeNames = installedThemeNamesFromEntries(themeEntries)

        nuxt.options.css = nuxt.options.css || []
        if (!nuxt.options.css.includes('origam/tokens/css/primitive')) {
            nuxt.options.css.unshift('origam/tokens/css/primitive')
        }
        if (includeUtilities && !nuxt.options.css.includes('origam/tokens/css/utilities')) {
            nuxt.options.css.push('origam/tokens/css/utilities')
        }

        addPlugin({
            src: resolver.resolve('./plugin.server'),
            mode: 'server'
        })
        addPlugin({
            src: resolver.resolve('./plugin.client'),
            mode: 'client'
        })

        if (autoImport) {
            // Scan the composables directory and add each named export
            // individually, EXCEPT the ones that conflict with Nuxt's
            // built-in composables (see NUXT_COMPOSABLES_BLOCKLIST).
            //
            // We used to call `addImportsDir(resolver.resolve('../composables'))`
            // which slurps every named export from every file in that
            // tree, including `useRouter` / `useRoute` / `useHydration` —
            // names also provided by Nuxt core. Nuxt emitted a build-time
            // warning ("Duplicated imports …") but went ahead and pinned
            // origam's version, which then blew up at SSR with:
            //   `[Origam] useRouter must be called from inside a setup function`
            // because origam's wrappers expect a Vue instance and Nuxt
            // calls `useRouter()` from non-setup contexts (router guards,
            // i18n middleware, …).
            const composablesRoot = resolver.resolve('../composables')
            const exportNameRegex = /export\s+(?:async\s+)?(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)/g

            const collect = (dir: string, acc: Array<{name: string, from: string}>): void => {
                let entries: string[]
                try {
                    entries = readdirSync(dir)
                } catch {
                    return
                }
                for (const entry of entries) {
                    const full = join(dir, entry)
                    let s
                    try {
                        s = statSync(full)
                    } catch {
                        continue
                    }
                    if (s.isDirectory()) {
                        collect(full, acc)
                        continue
                    }
                    if (!/\.(?:m?js|ts)$/.test(entry)) continue
                    if (entry.endsWith('.d.ts')) continue
                    let src = ''
                    try {
                        src = readFileSync(full, 'utf-8')
                    } catch {
                        continue
                    }
                    let m: RegExpExecArray | null
                    exportNameRegex.lastIndex = 0
                    while ((m = exportNameRegex.exec(src))) {
                        const name = m[1]
                        if (NUXT_COMPOSABLES_BLOCKLIST.has(name)) continue
                        acc.push({name, from: full})
                    }
                }
            }

            const imports: Array<{name: string, from: string}> = []
            collect(composablesRoot, imports)
            if (imports.length) {
                addImports(imports)
            }

            addComponentsDir({
                path: resolver.resolve('../components'),
                prefix: '',
                pathPrefix: false,
                global: false
            })
        }

        nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
        ;(nuxt.options.runtimeConfig.public as Record<string, unknown>).origam = {
            // Distinct installed brand names (lightweight — for the switcher).
            themes: installedThemeNames,
            // Preset names re-resolved to objects in the plugins (no vars in payload).
            presetNames,
            // Inline objects passed directly (these travel in the payload).
            customThemes,
            defaultTheme,
            modes,
            defaultMode,
            cookieName,
            modeCookieName,
            cookieMaxAge
        }
    }
})

export type { IOrigamNuxtModuleOptions }
