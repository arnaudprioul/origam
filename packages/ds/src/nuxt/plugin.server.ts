import { createOrigam } from '../origam'

import type { IOrigamNuxtRuntimeConfig } from '../interfaces'

import { ORIGAM_THEME_AUTO, ORIGAM_THEME_DARK, ORIGAM_THEME_LIGHT } from '../consts'

import type { TTheme } from '../types'

import { defineNuxtPlugin, useCookie, useHead, useRequestHeaders, useRuntimeConfig } from '#app'

function resolveServerTheme (cookieValue: string | null | undefined, config: IOrigamNuxtRuntimeConfig, headers: Record<string, string | undefined>): TTheme {
    if (cookieValue && cookieValue !== ORIGAM_THEME_AUTO) {
        return cookieValue
    }

    if (config.defaultTheme && config.defaultTheme !== ORIGAM_THEME_AUTO && cookieValue !== ORIGAM_THEME_AUTO) {
        return config.defaultTheme
    }

    const hint = headers['sec-ch-prefers-color-scheme']
    if (hint === ORIGAM_THEME_DARK) {
        return config.themes.includes(ORIGAM_THEME_DARK) ? ORIGAM_THEME_DARK : config.themes[0] ?? ORIGAM_THEME_LIGHT
    }

    return config.themes.includes(ORIGAM_THEME_LIGHT) ? ORIGAM_THEME_LIGHT : (config.themes[0] ?? ORIGAM_THEME_LIGHT)
}

export default defineNuxtPlugin({
    name: 'origam:server',
    enforce: 'pre',
    setup (nuxtApp) {
        const runtimeConfig = useRuntimeConfig().public as { origam: IOrigamNuxtRuntimeConfig }
        const config = runtimeConfig.origam

        const cookie = useCookie<string | null>(config.cookieName, {
            maxAge: config.cookieMaxAge,
            sameSite: 'lax',
            path: '/'
        })

        const headers = useRequestHeaders(['sec-ch-prefers-color-scheme'])
        const resolved = resolveServerTheme(cookie.value, config, headers)

        useHead({
            htmlAttrs: {
                'data-theme': resolved
            }
        })

        const origam = createOrigam()
        nuxtApp.vueApp.use(origam)

        return {
            provide: {
                origam: {
                    theme: resolved
                }
            }
        }
    }
})
