import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SET_DATE_UTIL_DOC: IUtilDoc = {
    slug: 'set-date',
    name: 'setDate',
    category: 'Commons',
    icon: 'mdi-calendar-edit',
    descriptionKey: 'utils.catalog.set_date.description',
    descriptionFallback: 'Return a new Date with the day-of-month replaced by the given value. The original date is never mutated.',
    signature: `function setDate(date: Date, day: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.set_date.param_date',
            descriptionFallback: 'The source date. It is cloned before the day is updated.',
        },
        {
            name: 'day',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.set_date.param_day',
            descriptionFallback: 'The day-of-month to set (1–31). Values outside the month range are normalised by the JS Date constructor.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.set_date.returns',
        descriptionFallback: 'A new Date object with the specified day-of-month.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.set_date.example_basic',
            titleFallback: 'Change the day while keeping month and year',
            code: `import { setDate } from 'origam'

const d = new Date('2024-03-15')
setDate(d, 1)   // → 2024-03-01
setDate(d, 31)  // → 2024-03-31`,
            lang: 'typescript',
        },
    ],
    related: ['set-hours', 'set-minutes', 'set-month', 'set-year'],
}
