import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const START_OF_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'start-of-month',
    name: 'startOfMonth',
    category: 'Commons',
    icon: 'mdi-calendar-start',
    descriptionKey: 'utils.catalog.start_of_month.description',
    descriptionFallback: 'Return a new Date set to the first day of the same month (day 1, time 00:00:00). The original date is not mutated.',
    signature: `function startOfMonth(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.start_of_month.param_date',
            descriptionFallback: 'The reference date. Year and month are preserved; day is forced to 1 and time fields are cleared.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.start_of_month.returns',
        descriptionFallback: 'A new Date at the first day of the month, time 00:00:00.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.start_of_month.example_basic',
            titleFallback: 'Get the first day of the current month',
            code: `import { startOfMonth } from 'origam'

startOfMonth(new Date('2024-03-15'))
// → 2024-03-01T00:00:00.000`,
            lang: 'typescript',
        },
    ],
    related: ['start-of-day', 'start-of-week', 'start-of-year'],
}
