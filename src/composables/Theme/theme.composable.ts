import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, readonly, ref, watch } from 'vue'
import type { TTheme, TThemeResolved } from '../../types'

const STORAGE_KEY = 'origam-theme'
const ATTR = 'data-theme'

/**
 * Module-level singleton — every call to `useTheme()` shares the same Ref so
 * components stay in sync without prop drilling. We store it lazily so SSR
 * doesn't touch `window`/`document` until mount.
 */
let _theme: Ref<TTheme> | null = null

function readPersisted (): TTheme {
    if (typeof window === 'undefined') return 'auto'
    try {
        const v = window.localStorage?.getItem(STORAGE_KEY)
        if (v === 'auto' || v === 'light' || v === 'dark') return v
        if (v && typeof v === 'string') return v
    } catch { /* localStorage may throw in private mode */ }
    return 'auto'
}

function writePersisted (theme: TTheme) {
    if (typeof window === 'undefined') return
    try {
        window.localStorage?.setItem(STORAGE_KEY, theme)
    } catch { /* ignore */ }
}

function applyToDocument (theme: TTheme) {
    if (typeof document === 'undefined') return
    if (theme === 'auto') {
        document.documentElement.removeAttribute(ATTR)
    } else {
        document.documentElement.setAttribute(ATTR, theme)
    }
}

function resolveAuto (): TThemeResolved {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * `useTheme()` returns a shared, reactive theme handle.
 *
 * - `theme` (read-only ref): the current setting — `'auto' | 'light' | 'dark' | string`.
 * - `setTheme(t)`: imperative setter. Persists to `localStorage` and applies
 *   `data-theme` to `<html>`.
 * - `resolved` (computed): the effective theme after resolving `'auto'`
 *   against `prefers-color-scheme`. Useful for SVG asset switching.
 * - `toggle()`: convenience to flip light ↔ dark (treats `'auto'` as light).
 *
 * The composable does NOT auto-mount a media-query listener at import time
 * (SSR safety). It does so on `onMounted` and cleans up on `onUnmounted`.
 */
export function useTheme () {
    if (_theme === null) {
        _theme = ref<TTheme>(readPersisted())
    }
    const theme = _theme

    const systemPrefersDark = ref(false)
    const resolved = computed<TThemeResolved>(() => {
        if (theme.value === 'auto') return systemPrefersDark.value ? 'dark' : 'light'
        // Treat any non-light/dark value as opaque (custom theme like brand-x);
        // assume "light-like" for resolved fallback.
        return theme.value === 'dark' ? 'dark' : 'light'
    })

    let mediaQuery: MediaQueryList | null = null
    const onSystemChange = (e: MediaQueryListEvent) => {
        systemPrefersDark.value = e.matches
    }

    onMounted(() => {
        if (typeof window === 'undefined') return
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        systemPrefersDark.value = mediaQuery.matches
        mediaQuery.addEventListener?.('change', onSystemChange)
        applyToDocument(theme.value)
    })

    onUnmounted(() => {
        mediaQuery?.removeEventListener?.('change', onSystemChange)
    })

    watch(theme, (next) => {
        applyToDocument(next)
        writePersisted(next)
    })

    function setTheme (next: TTheme) {
        theme.value = next
    }

    function toggle () {
        const effective = resolved.value
        theme.value = effective === 'dark' ? 'light' : 'dark'
    }

    return {
        theme: readonly(theme),
        resolved: readonly(resolved),
        setTheme,
        toggle
    }
}

/**
 * Internal helper for SSR / no-flash plugins: apply a theme to the document
 * synchronously (called BEFORE first render). Bypasses Vue reactivity.
 */
export function applyThemeSync (theme: TTheme) {
    applyToDocument(theme)
}

/**
 * Internal helper for SSR / no-flash plugins: read the persisted theme from
 * localStorage without instantiating the composable.
 */
export function readPersistedTheme (): TTheme {
    return readPersisted()
}
