import { createOrigam } from '../origam'

import type { IOrigamNuxtRuntimeConfig } from '../interfaces'

import {
    ORIGAM_MODE_ATTR,
    ORIGAM_MODE_AUTO,
    ORIGAM_MODE_DARK,
    ORIGAM_MODE_LIGHT,
    ORIGAM_THEME_ATTR,
    ORIGAM_THEME_AUTO
} from '../consts'

import type { TMode, TTheme } from '../types'

import { defineNuxtPlugin, useCookie, useHead, useRequestHeaders, useRuntimeConfig } from '#app'

/**
 * Resolve the brand theme SSR-side. The brand axis is driven exclusively by
 * the cookie and the configured default — never by the color-scheme hint
 * (that hint feeds the `mode` axis).
 */
function resolveServerTheme (cookieValue: string | null | undefined, config: IOrigamNuxtRuntimeConfig): TTheme {
    if (cookieValue && cookieValue !== ORIGAM_THEME_AUTO) {
        return cookieValue
    }

    if (config.defaultTheme && config.defaultTheme !== ORIGAM_THEME_AUTO) {
        return config.defaultTheme
    }

    return ORIGAM_THEME_AUTO
}

/**
 * Resolve the color mode SSR-side. Priority:
 * 1. explicit cookie (user choice),
 * 2. configured default (when not `'auto'`),
 * 3. `Sec-CH-Prefers-Color-Scheme` client hint,
 * 4. `'auto'` (no attribute → tokens fall back to `prefers-color-scheme`).
 */
function resolveServerMode (cookieValue: string | null | undefined, config: IOrigamNuxtRuntimeConfig, headers: Record<string, string | undefined>): TMode {
    if (cookieValue === ORIGAM_MODE_LIGHT || cookieValue === ORIGAM_MODE_DARK) {
        return cookieValue
    }

    if (config.defaultMode === ORIGAM_MODE_LIGHT || config.defaultMode === ORIGAM_MODE_DARK) {
        return config.defaultMode
    }

    const hint = headers['sec-ch-prefers-color-scheme']
    if (hint === ORIGAM_MODE_DARK && config.modes.includes(ORIGAM_MODE_DARK)) {
        return ORIGAM_MODE_DARK
    }
    if (hint === ORIGAM_MODE_LIGHT && config.modes.includes(ORIGAM_MODE_LIGHT)) {
        return ORIGAM_MODE_LIGHT
    }

    return ORIGAM_MODE_AUTO
}

export default defineNuxtPlugin({
    name: 'origam:server',
    enforce: 'pre',
    setup (nuxtApp) {
        const runtimeConfig = useRuntimeConfig().public as { origam: IOrigamNuxtRuntimeConfig }
        const config = runtimeConfig.origam

        const themeCookie = useCookie<string | null>(config.cookieName, {
            maxAge: config.cookieMaxAge,
            sameSite: 'lax',
            path: '/'
        })
        const modeCookie = useCookie<string | null>(config.modeCookieName, {
            maxAge: config.cookieMaxAge,
            sameSite: 'lax',
            path: '/'
        })

        const headers = useRequestHeaders(['sec-ch-prefers-color-scheme'])
        const resolvedTheme = resolveServerTheme(themeCookie.value, config)
        const resolvedMode = resolveServerMode(modeCookie.value, config, headers)

        const htmlAttrs: Record<string, string> = {}
        if (resolvedTheme !== ORIGAM_THEME_AUTO) {
            htmlAttrs[ORIGAM_THEME_ATTR] = resolvedTheme
        }
        if (resolvedMode !== ORIGAM_MODE_AUTO) {
            htmlAttrs[ORIGAM_MODE_ATTR] = resolvedMode
        }
        useHead({ htmlAttrs })

        const origam = createOrigam()
        nuxtApp.vueApp.use(origam)

        return {
            provide: {
                origam: {
                    theme: resolvedTheme,
                    mode: resolvedMode
                }
            }
        }
    }
})
