import { watch } from 'vue'

import { useTheme } from '../composables'

import type { IOrigamNuxtRuntimeConfig } from '../interfaces'

import { createOrigam } from '../origam'

import { resolvePresetThemes } from './resolve-themes'

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

        // The brand axis keeps its intent (`auto` removes the attribute, the DS
        // default sheet's `:root` takes over). The mode axis is different: the
        // composable holds the user *intent* (which may be `auto`), but the
        // `data-mode` attribute MUST always stay concrete because the token
        // matrix has no mode-less fallback. So we drive `mode` from the stored
        // intent (cookie / configured default) and write the *resolved* value
        // to the DOM via the `resolvedMode` watcher below.
        const initialTheme = (themeFromDom ?? themeCookie.value ?? config.defaultTheme) as TTheme
        const initialMode = (modeCookie.value ?? config.defaultMode) as TMode

        // Install the configured theme objects (ADR-003): preset names are
        // re-resolved from the bundled presets, inline objects pass through.
        // createOrigam injects each one's name×mode scoped `<style>` block and
        // provides the installed-themes list for `useInstalledThemes()`.
        const themes = [
            ...resolvePresetThemes(config.presetNames ?? []),
            ...(config.customThemes ?? [])
        ]
        const origam = createOrigam({ themes })
        nuxtApp.vueApp.use(origam)

        // `useTheme()` owns the DOM contract: its internal watchers apply
        // `data-theme` (raw brand) and a CONCRETE `data-mode` (resolved) on
        // every change, immediately — including upgrading a stored/system
        // `auto` to the real `prefers-color-scheme` here on the client,
        // replacing the server's safe-default `data-mode`. The plugin only
        // seeds the intent and persists it to the cookies.
        const themeApi = useTheme()
        themeApi.setTheme(initialTheme)
        themeApi.setMode(initialMode)

        watch(themeApi.theme, (next) => {
            themeCookie.value = next as string
        }, { flush: 'post' })

        watch(themeApi.mode, (next) => {
            modeCookie.value = next as string
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
