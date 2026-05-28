import { useI18n } from 'vue-i18n'

/**
 * Wrapper around vue-i18n t() that keeps the (key, fallback) signature
 * historically used in this codebase. If the key resolves to itself
 * (vue-i18n default behaviour when missing), we return the fallback.
 *
 * 3rd argument: optional named params for vue-i18n interpolation
 * (e.g. `t('foo.bar', '{n} items', { n: 5 })`). When the fallback is
 * used (key missing), the params are interpolated manually so the
 * fallback string stays human-readable rather than printing raw
 * `{n}` placeholders.
 *
 * This preserves backward compat with all the t(key, fallback) calls
 * made during Phases 1-4 before i18n was wired.
 */
export function useI18nFallback () {
    const { t: i18nT, locale } = useI18n()

    function t (
        key: string,
        fallback: string,
        params?: Record<string, string | number>
    ): string {
        const resolved = params ? i18nT(key, params) : i18nT(key)
        if (resolved !== key) {
            return resolved
        }
        // Missing key — interpolate fallback ourselves.
        if (!params) {
            return fallback
        }
        return Object.entries(params).reduce(
            (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
            fallback
        )
    }

    return { t, locale }
}
