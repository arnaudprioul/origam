import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const START_OF_DAY_UTIL_DOC: IUtilDoc = {
    slug: 'start-of-day',
    name: 'startOfDay',
    category: 'Commons',
    icon: 'mdi-weather-sunset-up',
    descriptionKey: 'utils.catalog.start_of_day.description',
    descriptionFallback: 'Return a new Date set to midnight (00:00:00.000) of the same calendar day. The original date is not mutated.',
    signature: `function startOfDay(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.start_of_day.param_date',
            descriptionFallback: 'The reference date. Year, month and day are preserved; time fields are set to zero.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.start_of_day.returns',
        descriptionFallback: 'A new Date at 00:00:00.000 of the given day.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.start_of_day.example_basic',
            titleFallback: 'Strip the time part from a datetime',
            code: `import { startOfDay } from 'origam'

startOfDay(new Date('2024-03-15T14:30:00'))
// → 2024-03-15T00:00:00.000`,
            lang: 'typescript',
        },
    ],
    related: ['start-of-month', 'start-of-week', 'start-of-year'],
}
