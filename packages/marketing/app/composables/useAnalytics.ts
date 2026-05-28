import type { TAnalyticsEventName } from '~/types/analytics-event-name.type'

export function useAnalytics () {
    function track (
        name: TAnalyticsEventName,
        props?: Record<string, string | number | boolean>
    ): void {
        if (!import.meta.client) return

        const nuxtApp = useNuxtApp()
        const plausible = (nuxtApp as Record<string, unknown>).$plausible as
            | { trackEvent: (name: string, opts?: { props?: Record<string, string | number | boolean> }) => void }
            | undefined

        if (!plausible) {
            console.debug('[analytics] plausible unavailable — skipping event:', name, props)
            return
        }

        plausible.trackEvent(name, props ? { props } : undefined)
    }

    return { track }
}
