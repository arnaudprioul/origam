import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SET_HOURS_UTIL_DOC: IUtilDoc = {
    slug: 'set-hours',
    name: 'setHours',
    category: 'Commons',
    icon: 'mdi-clock-edit-outline',
    descriptionKey: 'utils.catalog.set_hours.description',
    descriptionFallback: 'Return a new Date with the hours field replaced by the given count. The original date is never mutated.',
    signature: `function setHours(date: Date, count: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.set_hours.param_date',
            descriptionFallback: 'The source date. It is cloned before the hours field is updated.',
        },
        {
            name: 'count',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.set_hours.param_count',
            descriptionFallback: 'The hours value to set (0–23).',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.set_hours.returns',
        descriptionFallback: 'A new Date object with the specified hours field.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.set_hours.example_basic',
            titleFallback: 'Set the hour on a date',
            code: `import { setHours } from 'origam'

const d = new Date('2024-03-15T10:30:00')
setHours(d, 0)   // → 2024-03-15T00:30:00
setHours(d, 23)  // → 2024-03-15T23:30:00`,
            lang: 'typescript',
        },
    ],
    related: ['set-date', 'set-minutes', 'set-month', 'set-year'],
}
