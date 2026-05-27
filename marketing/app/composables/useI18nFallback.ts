import { useI18n } from 'vue-i18n'

/**
 * Wrapper around vue-i18n t() that keeps the (key, fallback) signature
 * historically used in this codebase. If the key resolves to itself
 * (vue-i18n default behaviour when missing), we return the fallback.
 *
 * This preserves backward compat with all the t(key, fallback) calls
 * made during Phases 1-4 before i18n was wired.
 */
export function useI18nFallback () {
    const { t: i18nT, locale } = useI18n()

    function t (key: string, fallback: string): string {
        const resolved = i18nT(key)
        return resolved === key ? fallback : resolved
    }

    return { t, locale }
}
