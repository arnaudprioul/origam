import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_DAYS_UTIL_DOC: IUtilDoc = {
    slug: 'add-days',
    name: 'addDays',
    category: 'Date',
    icon: 'mdi-calendar-plus',
    descriptionKey: 'utils.catalog.add_days.description',
    descriptionFallback: 'Return a new Date shifted by the given number of days. The original date is never mutated.',
    signature: `function addDays(date: Date, amount: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.add_days.param_date',
            descriptionFallback: 'The base date. Not mutated.',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.add_days.param_amount',
            descriptionFallback: 'Number of days to add. Negative values subtract days.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.add_days.returns',
        descriptionFallback: 'A new Date instance offset by the specified number of days.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_days.example_basic',
            titleFallback: 'Add and subtract days',
            code: `import { addDays } from 'origam'

const today = new Date('2024-03-15')
addDays(today, 7)   // → 2024-03-22
addDays(today, -1)  // → 2024-03-14`,
            lang: 'typescript',
        },
    ],
    related: ['add-hours', 'add-minutes', 'add-months'],
}
