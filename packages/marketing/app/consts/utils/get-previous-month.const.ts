import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_PREVIOUS_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'get-previous-month',
    name: 'getPreviousMonth',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_previous_month.description',
    descriptionFallback: 'Returns a new Date set to the first day of the month that precedes the given date, without mutating the input.',
    signature: `function getPreviousMonth(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_previous_month.param_date',
            descriptionFallback: 'The reference date. Its year and month are used to compute the preceding month; the input is not mutated.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.get_previous_month.returns',
        descriptionFallback: 'A new Date object pointing to the 1st of the previous month at midnight local time.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_previous_month.example_basic',
            titleFallback: 'Navigate to the previous calendar month',
            code: `import { getPreviousMonth } from 'origam'

const march = new Date('2024-03-15')
getPreviousMonth(march) // → 2024-02-01T00:00:00

// Works across year boundaries
const jan = new Date('2024-01-10')
getPreviousMonth(jan)   // → 2023-12-01T00:00:00`,
            lang: 'typescript',
        },
    ],
    related: ['get-month', 'get-minutes', 'get-next-month'],
}
