import type { TAnalyticsEventName } from '~/types/analytics-event-name.type'

export const ANALYTICS_EVENT_NAMES: ReadonlyArray<TAnalyticsEventName> = [
    'cta:install:copy',
    'cta:github:click',
    'cta:browse-components:click',
    'component:click',
    'theme:change',
    'playground:share',
    'playground:reset',
    'playground:template:load',
    'search:open',
    'search:select',
    'nav:link:click'
] as const
