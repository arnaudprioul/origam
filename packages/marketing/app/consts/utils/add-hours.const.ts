import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_HOURS_UTIL_DOC: IUtilDoc = {
    slug: 'add-hours',
    name: 'addHours',
    category: 'Date',
    icon: 'mdi-clock-plus-outline',
    descriptionKey: 'utils.catalog.add_hours.description',
    descriptionFallback: 'Return a new Date shifted by the given number of hours. The original date is never mutated.',
    signature: `function addHours(date: Date, amount: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.add_hours.param_date',
            descriptionFallback: 'The base date. Not mutated.',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.add_hours.param_amount',
            descriptionFallback: 'Number of hours to add. Negative values subtract hours.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.add_hours.returns',
        descriptionFallback: 'A new Date instance offset by the specified number of hours.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_hours.example_basic',
            titleFallback: 'Add hours to a date',
            code: `import { addHours } from 'origam'

const start = new Date('2024-03-15T10:00:00')
addHours(start, 3)   // → 2024-03-15T13:00:00
addHours(start, -2)  // → 2024-03-15T08:00:00`,
            lang: 'typescript',
        },
    ],
    related: ['add-days', 'add-minutes', 'add-months'],
}
