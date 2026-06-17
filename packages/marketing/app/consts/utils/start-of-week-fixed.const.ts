import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const START_OF_WEEK_FIXED_UTIL_DOC: IUtilDoc = {
    slug: 'start-of-week-fixed',
    name: 'startOfWeekFixed',
    category: 'Calendar',
    icon: 'mdi-calendar-week',
    descriptionKey: 'utils.catalog.start_of_week_fixed.description',
    descriptionFallback: 'Return a new Date at midnight of the first day of the week containing the given date, using an explicit firstDayOfWeek integer. Unlike startOfWeek, locale is never consulted.',
    signature: `function startOfWeekFixed(date: Date, firstDayOfWeek: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.start_of_week_fixed.param_date',
            descriptionFallback: 'The reference date. Time fields are cleared to 00:00:00.000 on the result.',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.start_of_week_fixed.param_first_day_of_week',
            descriptionFallback: 'Day-of-week index for the first day (0 = Sunday, 1 = Monday … 6 = Saturday). Passed directly as a calendar prop.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.start_of_week_fixed.returns',
        descriptionFallback: 'A new Date at 00:00:00.000 of the first day of the week.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.start_of_week_fixed.example_basic',
            titleFallback: 'Week start on Monday (1)',
            code: `import { startOfWeekFixed } from 'origam'

// Thursday 2024-03-14, week starts Monday
startOfWeekFixed(new Date('2024-03-14'), 1)
// → 2024-03-11T00:00:00.000`,
            lang: 'typescript',
        },
    ],
    related: ['start-of-week', 'start-of-day'],
}
