import { watch } from 'vue'

import { useTheme } from '../composables'

import { ORIGAM_MODE_ATTR, ORIGAM_THEME_ATTR } from '../consts'

import type { IOrigamNuxtRuntimeConfig } from '../interfaces'

import { createOrigam } from '../origam'

import type { TMode, TTheme } from '../types'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
    name: 'origam:client',
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

        const themeFromDom = (typeof document !== 'undefined' && document.documentElement.dataset.theme) || null
        const modeFromDom = (typeof document !== 'undefined' && document.documentElement.dataset.mode) || null

        const initialTheme = (themeFromDom ?? themeCookie.value ?? config.defaultTheme) as TTheme
        const initialMode = (modeFromDom ?? modeCookie.value ?? config.defaultMode) as TMode

        const origam = createOrigam()
        nuxtApp.vueApp.use(origam)

        const themeApi = useTheme()
        themeApi.setTheme(initialTheme)
        themeApi.setMode(initialMode)

        watch(themeApi.theme, (next) => {
            themeCookie.value = next as string
            if (typeof document !== 'undefined') {
                if (next === 'auto') {
                    document.documentElement.removeAttribute(ORIGAM_THEME_ATTR)
                } else {
                    document.documentElement.setAttribute(ORIGAM_THEME_ATTR, next as string)
                }
            }
        }, { flush: 'post' })

        watch(themeApi.mode, (next) => {
            modeCookie.value = next as string
            if (typeof document !== 'undefined') {
                if (next === 'auto') {
                    document.documentElement.removeAttribute(ORIGAM_MODE_ATTR)
                } else {
                    document.documentElement.setAttribute(ORIGAM_MODE_ATTR, next as string)
                }
            }
        }, { flush: 'post' })

        return {
            provide: {
                origam: {
                    theme: initialTheme,
                    mode: initialMode
                }
            }
        }
    }
})
