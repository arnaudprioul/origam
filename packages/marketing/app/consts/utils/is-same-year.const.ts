import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_SAME_YEAR_UTIL_DOC: IUtilDoc = {
    slug: 'is-same-year',
    name: 'isSameYear',
    category: 'Commons',
    icon: 'mdi-calendar-range-outline',
    descriptionKey: 'utils.catalog.is_same_year.description',
    descriptionFallback: 'Returns true when two Date objects fall in the same calendar year. Used in year pickers and date range validation.',
    signature: `function isSameYear(date: Date, comparing: Date): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_year.param_date',
            descriptionFallback: 'The first date to compare.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_same_year.param_comparing',
            descriptionFallback: 'The second date to compare against. Only the full year (getFullYear()) is compared.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_same_year.returns',
        descriptionFallback: 'true when both dates have the same full year; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_same_year.example_basic',
            titleFallback: 'Comparing dates for same-year equality',
            code: `import { isSameYear } from 'origam'

isSameYear(new Date('2024-01-01'), new Date('2024-12-31')) // → true
isSameYear(new Date('2023-12-31'), new Date('2024-01-01')) // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-same-day', 'is-same-month'],
}
