import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_SAME_DAY_UTIL_DOC: IUtilDoc = {
    slug: 'is-same-day',
    name: 'isSameDay',
    category: 'Commons',
    icon: 'mdi-calendar-today',
    descriptionKey: 'utils.catalog.is_same_day.description',
    descriptionFallback: 'Returns true when two Date objects fall on the same calendar day (same date, month, and year in local timezone). Used in date pickers and calendar views to highlight selected or today cells.',
    signature: `function isSameDay(date: Date, comparing: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_day.param_date',
            descriptionFallback: 'The first date to compare.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_day.param_comparing',
            descriptionFallback: 'The second date to compare against. Day, month, and full year must all match for the function to return true.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_same_day.returns',
        descriptionFallback: 'true when date and comparing share the same local calendar day; false when any of day, month, or year differ.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_same_day.example_basic',
            titleFallback: 'Comparing two dates for same-day equality',
            code: `import { isSameDay } from 'origam'

isSameDay(new Date('2024-06-01'), new Date('2024-06-01')) // → true
isSameDay(new Date('2024-06-01'), new Date('2024-06-02')) // → false
isSameDay(new Date('2024-06-01T08:00'), new Date('2024-06-01T22:00')) // → true`,
            lang: 'typescript',
        },
    ],
    related: ['is-same-month', 'is-same-year', 'is-today'],
}
