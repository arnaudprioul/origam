import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_NEXT_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'get-next-month',
    name: 'getNextMonth',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_next_month.description',
    descriptionFallback: 'Returns a new Date set to the first day of the month that follows the given date, without mutating the input.',
    signature: `function getNextMonth(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.get_next_month.param_date',
            descriptionFallback: 'The reference date. Its year and month are used to compute the following month; the input is not mutated.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.get_next_month.returns',
        descriptionFallback: 'A new Date object pointing to the 1st of the next month at midnight local time.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_next_month.example_basic',
            titleFallback: 'Navigate to the next calendar month',
            code: `import { getNextMonth } from 'origam'

const march = new Date('2024-03-15')
getNextMonth(march) // → 2024-04-01T00:00:00

// Works across year boundaries
const dec = new Date('2024-12-01')
getNextMonth(dec)   // → 2025-01-01T00:00:00`,
            lang: 'typescript',
        },
    ],
    related: ['get-month', 'get-minutes', 'get-previous-month'],
}
