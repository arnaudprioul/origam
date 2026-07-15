/**
 * Marketing client plugin — theme cookie persistence workaround.
 *
 * The DS plugin.client sets `themeCookie.value = next` via useCookie to persist
 * the brand theme across SSR reloads. In the current Nuxt 4 setup, `useCookie`
 * values assigned on the client side do not reliably write to `document.cookie`
 * (pre-existing gap tracked as DS issue). Without the cookie, the SSR plugin
 * falls back to `defaultTheme` on each reload, overwriting the localStorage
 * value written by useTheme().writePersisted().
 *
 * This plugin directly watches useTheme().theme and writes the cookie via
 * `document.cookie` as a fallback, ensuring SSR-aware reload persistence.
 * The cookie name matches config.origam.cookieName ('origam-theme').
 */
import { watch } from 'vue'
import { useTheme } from 'origam/composables'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { IOrigamNuxtRuntimeConfig } from 'origam/interfaces'

export default defineNuxtPlugin({
    name: 'marketing:theme-persist-client',
    enforce: 'post',
    setup () {
        const runtimeConfig = useRuntimeConfig().public as { origam: IOrigamNuxtRuntimeConfig }
        const config = runtimeConfig.origam
        const cookieName = config.cookieName ?? 'origam-theme'
        const cookieMaxAge = config.cookieMaxAge ?? 31536000

        const { theme } = useTheme()

        watch(theme, (next) => {
            if (typeof document === 'undefined') return
            const value = encodeURIComponent(String(next))
            document.cookie = `${cookieName}=${value}; max-age=${cookieMaxAge}; path=/; samesite=lax`
        }, { flush: 'post' })
    }
})
