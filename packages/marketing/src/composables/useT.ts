import { useI18n } from 'vue-i18n'

/**
 * Thin i18n helper enforcing the `t('key', 'fallback')` contract used across
 * the marketing site. When the key is missing from the active locale we return
 * the inline fallback instead of leaking the raw key into the DOM — so a not-
 * yet-translated string still renders human-readable copy.
 */
export function useT () {
    const { t: $t, te, locale, locales } = useI18n()

    const t = (key: string, fallback?: string, named?: Record<string, unknown>): string => {
        if (te(key)) {
            return named ? $t(key, named) : $t(key)
        }

        return fallback ?? key
    }

    return { t, locale, locales }
}
