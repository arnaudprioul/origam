import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { addComponentsDir, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { IOrigamNuxtModuleOptions } from '../interfaces'

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

const DEFAULTS: Required<IOrigamNuxtModuleOptions> = {
    themes: ['light', 'dark'],
    defaultTheme: 'auto',
    cookieName: 'origam-theme',
    cookieMaxAge: 60 * 60 * 24 * 365,
    autoImport: true,
    includeUtilities: true,
    prefix: 'Origam'
}

export default defineNuxtModule<IOrigamNuxtModuleOptions>({
    meta: {
        name: MODULE_NAME,
        configKey: CONFIG_KEY,
        compatibility: {
            nuxt: '^3.0.0 || ^4.0.0'
        }
    },
    defaults: DEFAULTS,
    setup (options, nuxt) {
        const resolver = createResolver(import.meta.url)

        const themes = options.themes ?? DEFAULTS.themes
        const defaultTheme = options.defaultTheme ?? DEFAULTS.defaultTheme
        const cookieName = options.cookieName ?? DEFAULTS.cookieName
        const cookieMaxAge = options.cookieMaxAge ?? DEFAULTS.cookieMaxAge
        const autoImport = options.autoImport ?? DEFAULTS.autoImport
        const includeUtilities = options.includeUtilities ?? DEFAULTS.includeUtilities

        nuxt.options.css = nuxt.options.css || []
        if (!nuxt.options.css.includes('origam/tokens/css/primitive')) {
            nuxt.options.css.unshift('origam/tokens/css/primitive')
        }
        for (const theme of themes) {
            const cssId = `origam/tokens/css/${theme}`
            if (!nuxt.options.css.includes(cssId)) {
                nuxt.options.css.push(cssId)
            }
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
                        src = require('node:fs').readFileSync(full, 'utf-8') as string
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
            themes,
            defaultTheme,
            cookieName,
            cookieMaxAge
        }
    }
})

export type { IOrigamNuxtModuleOptions }
