import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SET_MINUTES_UTIL_DOC: IUtilDoc = {
    slug: 'set-minutes',
    name: 'setMinutes',
    category: 'Commons',
    icon: 'mdi-clock-edit-outline',
    descriptionKey: 'utils.catalog.set_minutes.description',
    descriptionFallback: 'Return a new Date with the minutes field replaced by the given count. The original date is never mutated.',
    signature: `function setMinutes(date: Date, count: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.set_minutes.param_date',
            descriptionFallback: 'The source date. It is cloned before the minutes field is updated.',
        },
        {
            name: 'count',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.set_minutes.param_count',
            descriptionFallback: 'The minutes value to set (0–59).',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.set_minutes.returns',
        descriptionFallback: 'A new Date object with the specified minutes field.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.set_minutes.example_basic',
            titleFallback: 'Set minutes on a time value',
            code: `import { setMinutes } from 'origam'

const d = new Date('2024-03-15T10:30:00')
setMinutes(d, 0)   // → 2024-03-15T10:00:00
setMinutes(d, 45)  // → 2024-03-15T10:45:00`,
            lang: 'typescript',
        },
    ],
    related: ['set-date', 'set-hours', 'set-month', 'set-year'],
}
