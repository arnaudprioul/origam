import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_WEEKS_UTIL_DOC: IUtilDoc = {
    slug: 'add-weeks',
    name: 'addWeeks',
    category: 'Commons',
    icon: 'mdi-calendar-plus',
    descriptionKey: 'utils.catalog.add_weeks.description',
    descriptionFallback: 'Return a new Date that is the given number of weeks after the input date. The original date is never mutated.',
    signature: 'function addWeeks(date: Date, amount: number): Date',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.add_weeks.param_date',
            descriptionFallback: 'The base date. A copy is made internally so the input is not modified.',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.add_weeks.param_amount',
            descriptionFallback: 'Number of weeks to add. Negative values subtract weeks.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.add_weeks.returns',
        descriptionFallback: 'A new Date set to date + (amount × 7) days.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_weeks.example_basic',
            titleFallback: 'Add and subtract weeks',
            code: `import { addWeeks } from 'origam'

const base = new Date('2024-01-01')
addWeeks(base, 2)   // → 2024-01-15
addWeeks(base, -1)  // → 2023-12-25`,
            lang: 'typescript',
        },
    ],
    related: ['build-month-matrix', 'build-disabled-predicate'],
}
