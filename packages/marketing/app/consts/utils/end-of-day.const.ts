import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const END_OF_DAY_UTIL_DOC: IUtilDoc = {
    slug: 'end-of-day',
    name: 'endOfDay',
    category: 'Commons',
    icon: 'mdi-calendar-end',
    descriptionKey: 'utils.catalog.end_of_day.description',
    descriptionFallback: 'Returns a new Date set to the last millisecond of the given day (23:59:59.999 local time). The input date is not mutated.',
    signature: `function endOfDay(date: Date): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.end_of_day.param_date',
            descriptionFallback: 'The reference date. Only the year/month/day part is used; the time is replaced with 23:59:59.999.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.end_of_day.returns',
        descriptionFallback: 'A new Date at 23:59:59.999 on the same calendar day as the input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.end_of_day.example_basic',
            titleFallback: 'Get the last moment of a day',
            code: `import { endOfDay } from 'origam'

endOfDay(new Date('2024-06-15T08:30:00'))
// → Date: 2024-06-15T23:59:59.999`,
            lang: 'typescript',
        },
    ],
    related: ['end-of-month', 'end-of-week', 'end-of-year'],
}
