import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const START_OF_YEAR_UTIL_DOC: IUtilDoc = {
    slug: 'start-of-year',
    name: 'startOfYear',
    category: 'Commons',
    icon: 'mdi-calendar-start',
    descriptionKey: 'utils.catalog.start_of_year.description',
    descriptionFallback: 'Return a new Date set to January 1st of the same year at midnight. The original date is not mutated.',
    signature: `function startOfYear(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.start_of_year.param_date',
            descriptionFallback: 'The reference date. Only the year is preserved; month is 0 (January), day is 1, time is 00:00:00.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.start_of_year.returns',
        descriptionFallback: 'A new Date at 2024-01-01T00:00:00 (or the equivalent year).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.start_of_year.example_basic',
            titleFallback: 'Get the first day of the year',
            code: `import { startOfYear } from 'origam'

startOfYear(new Date('2024-08-20'))
// → 2024-01-01T00:00:00.000`,
            lang: 'typescript',
        },
    ],
    related: ['start-of-month', 'start-of-day', 'start-of-week'],
}
