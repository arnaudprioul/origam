import type { TAnalyticsEventName } from '~/types/analytics-event-name.type'

export interface IAnalyticsEvent {
    name: TAnalyticsEventName
    props?: Record<string, string | number | boolean>
}
