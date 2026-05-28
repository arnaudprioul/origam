import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { IOrigamNuxtModuleOptions } from '../interfaces'

const MODULE_NAME = 'origam-nuxt'
const CONFIG_KEY = 'origam'

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
            addImportsDir(resolver.resolve('../composables'))
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
