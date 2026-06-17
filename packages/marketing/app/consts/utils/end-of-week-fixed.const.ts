import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const END_OF_WEEK_FIXED_UTIL_DOC: IUtilDoc = {
    slug: 'end-of-week-fixed',
    name: 'endOfWeekFixed',
    category: 'Calendar',
    icon: 'mdi-calendar-week-end',
    descriptionKey: 'utils.catalog.end_of_week_fixed.description',
    descriptionFallback: 'Returns the last day of the week starting on a given weekday index (0 = Sunday, 1 = Monday …). Symmetric counterpart to startOfWeekFixed. Used by the calendar\'s week/day views.',
    signature: `function endOfWeekFixed(date: Date, firstDayOfWeek: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.end_of_week_fixed.param_date',
            descriptionFallback: 'Any date within the target week.',
        },
        {
            name: 'firstDayOfWeek',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.end_of_week_fixed.param_first_day_of_week',
            descriptionFallback: 'Weekday index for the first day of the week. 0 = Sunday, 1 = Monday, …, 6 = Saturday.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.end_of_week_fixed.returns',
        descriptionFallback: 'A new Date at midnight on the last day of the week (startOfWeekFixed + 6 days).',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.end_of_week_fixed.example_basic',
            titleFallback: 'Week ending on Saturday (Sunday-first)',
            code: `import { endOfWeekFixed } from 'origam'

// Week starts Sunday → ends Saturday
endOfWeekFixed(new Date('2024-06-12'), 0) // → Date: 2024-06-15 (Saturday)

// Week starts Monday → ends Sunday
endOfWeekFixed(new Date('2024-06-12'), 1) // → Date: 2024-06-16 (Sunday)`,
            lang: 'typescript',
        },
    ],
    related: ['end-of-week', 'each-day-of-interval'],
}
