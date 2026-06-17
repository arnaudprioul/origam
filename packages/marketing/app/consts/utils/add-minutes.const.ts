import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_MINUTES_UTIL_DOC: IUtilDoc = {
    slug: 'add-minutes',
    name: 'addMinutes',
    category: 'Date',
    icon: 'mdi-clock-plus-outline',
    descriptionKey: 'utils.catalog.add_minutes.description',
    descriptionFallback: 'Return a new Date shifted by the given number of minutes. The original date is never mutated.',
    signature: `function addMinutes(date: Date, amount: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.add_minutes.param_date',
            descriptionFallback: 'The base date. Not mutated.',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.add_minutes.param_amount',
            descriptionFallback: 'Number of minutes to add. Negative values subtract minutes.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.add_minutes.returns',
        descriptionFallback: 'A new Date instance offset by the specified number of minutes.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_minutes.example_basic',
            titleFallback: 'Add minutes to a date',
            code: `import { addMinutes } from 'origam'

const t = new Date('2024-03-15T10:00:00')
addMinutes(t, 90)   // → 2024-03-15T11:30:00
addMinutes(t, -30)  // → 2024-03-15T09:30:00`,
            lang: 'typescript',
        },
    ],
    related: ['add-hours', 'add-days', 'add-months'],
}
