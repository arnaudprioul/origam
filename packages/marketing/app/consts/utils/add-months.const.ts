import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_MONTHS_UTIL_DOC: IUtilDoc = {
    slug: 'add-months',
    name: 'addMonths',
    category: 'Date',
    icon: 'mdi-calendar-plus',
    descriptionKey: 'utils.catalog.add_months.description',
    descriptionFallback: 'Return a new Date shifted by the given number of months. To avoid day-overflow issues (e.g. Jan 31 + 1 month), the day-of-month is reset to 1 before advancing the month. The original date is never mutated.',
    signature: `function addMonths(date: Date, amount: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.add_months.param_date',
            descriptionFallback: 'The base date. Not mutated.',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.add_months.param_amount',
            descriptionFallback: 'Number of months to add. Negative values subtract months.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.add_months.returns',
        descriptionFallback: 'A new Date instance at the 1st day of the target month.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_months.example_basic',
            titleFallback: 'Advance a calendar month',
            code: `import { addMonths } from 'origam'

const mar = new Date('2024-03-15')
addMonths(mar, 1)   // → 2024-04-01 (day reset to 1)
addMonths(mar, -3)  // → 2023-12-01`,
            lang: 'typescript',
        },
    ],
    related: ['add-days', 'add-hours'],
    noteFallback: 'addMonths resets the day to 1 before offsetting the month to avoid overflow (e.g. 31 Jan + 1 month becoming 2 or 3 March). This differs from simple setMonth arithmetic.',
}
