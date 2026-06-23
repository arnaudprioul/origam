import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_SAME_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'is-same-month',
    name: 'isSameMonth',
    category: 'Commons',
    icon: 'mdi-calendar-month-outline',
    descriptionKey: 'utils.catalog.is_same_month.description',
    descriptionFallback: 'Returns true when two Date objects fall in the same calendar month and year. Used in date pickers to determine which cells belong to the current month view.',
    signature: `function isSameMonth(date: Date, comparing: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_month.param_date',
            descriptionFallback: 'The first date to compare.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_month.param_comparing',
            descriptionFallback: 'The second date to compare against. Both month index and full year must match.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_same_month.returns',
        descriptionFallback: 'true when the month index and year are identical for both dates; false when either differs.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_same_month.example_basic',
            titleFallback: 'Comparing dates for same-month equality',
            code: `import { isSameMonth } from 'origam'

isSameMonth(new Date('2024-06-01'), new Date('2024-06-30')) // → true
isSameMonth(new Date('2024-06-01'), new Date('2024-07-01')) // → false
isSameMonth(new Date('2023-06-01'), new Date('2024-06-01')) // → false (different year)`,
            lang: 'typescript',
        },
    ],
    related: ['is-same-day', 'is-same-year'],
}
