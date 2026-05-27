/**
 * useI18nFallback — minimal `t(key, fallback)` shim until @nuxtjs/i18n is wired up
 * (V2, see SPEC §2 — "i18n (V2)"). Keeps every visible string already running
 * through a function call so the migration to vue-i18n is a one-import swap and
 * not a project-wide find/replace.
 *
 * Phase 1 contract: `t('a11y.skipToContent', 'Skip to content')` returns the
 * fallback. Real translation comes online with task tracked in Phase 2/4.
 */
export function useI18nFallback () {
    const t = (_key: string, fallback: string): string => fallback

    return { t }
}
