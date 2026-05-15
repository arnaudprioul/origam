import { watch } from 'vue'

import { useTheme } from '../composables'

import { ORIGAM_THEME_ATTR } from '../consts'

import type { IOrigamNuxtRuntimeConfig } from '../interfaces'

import { createOrigam } from '../origam'

import type { TTheme } from '../types'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
    name: 'origam:client',
    setup (nuxtApp) {
        const runtimeConfig = useRuntimeConfig().public as { origam: IOrigamNuxtRuntimeConfig }
        const config = runtimeConfig.origam

        const cookie = useCookie<string | null>(config.cookieName, {
            maxAge: config.cookieMaxAge,
            sameSite: 'lax',
            path: '/'
        })

        const fromDom = (typeof document !== 'undefined' && document.documentElement.dataset.theme) || null
        const initialTheme = (fromDom ?? cookie.value ?? config.defaultTheme) as TTheme

        const origam = createOrigam()
        nuxtApp.vueApp.use(origam)

        const themeApi = useTheme()
        themeApi.setTheme(initialTheme)

        watch(themeApi.theme, (next) => {
            cookie.value = next as string
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute(ORIGAM_THEME_ATTR, next as string)
            }
        }, {flush: 'post'})

        return {
            provide: {
                origam: {
                    theme: initialTheme
                }
            }
        }
    }
})
