import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const END_OF_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'end-of-month',
    name: 'endOfMonth',
    category: 'Commons',
    icon: 'mdi-calendar-end',
    descriptionKey: 'utils.catalog.end_of_month.description',
    descriptionFallback: 'Returns a new Date set to the last calendar day of the month containing the given date (midnight, day 0 of next month trick). The input date is not mutated.',
    signature: `function endOfMonth(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.end_of_month.param_date',
            descriptionFallback: 'Any date within the target month. Only the year and month parts are used.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.end_of_month.returns',
        descriptionFallback: 'A new Date at midnight on the last day of the same month as the input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.end_of_month.example_basic',
            titleFallback: 'Last day of the month',
            code: `import { endOfMonth } from 'origam'

endOfMonth(new Date('2024-02-10'))
// → Date: 2024-02-29 (2024 is a leap year)

endOfMonth(new Date('2024-06-01'))
// → Date: 2024-06-30`,
            lang: 'typescript',
        },
    ],
    related: ['end-of-day', 'end-of-week', 'end-of-year', 'each-day-of-interval'],
}
