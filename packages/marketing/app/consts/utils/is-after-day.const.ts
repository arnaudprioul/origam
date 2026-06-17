import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_AFTER_DAY_UTIL_DOC: IUtilDoc = {
    slug: 'is-after-day',
    name: 'isAfterDay',
    category: 'Calendar',
    icon: 'mdi-calendar-arrow-right',
    descriptionKey: 'utils.catalog.is_after_day.description',
    descriptionFallback: 'Returns true if date falls on a calendar day strictly after comparing, ignoring the time component. Both dates are compared at the start of their respective day.',
    signature: 'function isAfterDay(date: Date, comparing: Date): boolean',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_after_day.param_date',
            descriptionFallback: 'The date to test.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_after_day.param_comparing',
            descriptionFallback: 'The reference date. The time component is ignored — only the calendar day is compared.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_after_day.returns',
        descriptionFallback: 'true when startOfDay(date) > startOfDay(comparing).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_after_day.example_basic',
            titleFallback: 'Day-level comparison (time ignored)',
            code: `import { isAfterDay } from 'origam'

isAfterDay(new Date('2025-06-02T08:00'), new Date('2025-06-01T23:59'))
// → true  (day 2 > day 1, despite earlier clock time)`,
            lang: 'typescript',
        },
    ],
    related: ['is-after', 'is-before', 'is-equal'],
}
