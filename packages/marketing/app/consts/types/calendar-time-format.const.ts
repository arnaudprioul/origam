import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CALENDAR_TIME_FORMAT_TYPE_DOC: ITypeDoc = {
    slug: 'calendar-time-format',
    name: 'TCalendarTimeFormat',
    kind: 'type',
    category: 'Time & Calendar',
    descriptionKey: 'types.catalog.calendar_time_format.description',
    descriptionFallback: 'Clock format for time labels in week, day, and agenda views: 24-hour (00:00–23:59) or 12-hour with AM/PM.',
    definition: `export type TCalendarTimeFormat = '12h' | '24h'`,
    values: [
        { value: '24h', descriptionKey: 'types.detail.calendar_time_format.24h', descriptionFallback: '24-hour clock — 00:00 to 23:59. Default format for all locales except en-US.' },
        { value: '12h', descriptionKey: 'types.detail.calendar_time_format.12h', descriptionFallback: '12-hour clock — 12:00 AM to 11:59 PM. Honours locale-specific AM/PM labels.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', propName: 'timeFormat' },
    ],
    sourceFile: 'packages/ds/src/types/Calendar/calendar-time-format.type.ts',
    examples: [
        {
            titleKey: 'types.detail.calendar_time_format.example',
            titleFallback: 'Calendar with 12-hour clock labels',
            code: `<origam-calendar time-format="12h" view="week" :events="events" />`,
            lang: 'html',
        },
    ],
}
