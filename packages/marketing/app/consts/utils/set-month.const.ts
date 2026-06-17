import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SET_MONTH_UTIL_DOC: IUtilDoc = {
    slug: 'set-month',
    name: 'setMonth',
    category: 'Commons',
    icon: 'mdi-calendar-edit',
    descriptionKey: 'utils.catalog.set_month.description',
    descriptionFallback: 'Return a new Date with the month replaced by the given zero-based index (0 = January). The original date is never mutated.',
    signature: `function setMonth(date: Date, count: number): Date`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.set_month.param_date',
            descriptionFallback: 'The source date. It is cloned before the month is updated.',
        },
        {
            name: 'count',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.set_month.param_count',
            descriptionFallback: 'Zero-based month index (0 = January … 11 = December). Values outside 0–11 roll over into adjacent years.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.set_month.returns',
        descriptionFallback: 'A new Date object with the specified month.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.set_month.example_basic',
            titleFallback: 'Switch to a different month',
            code: `import { setMonth } from 'origam'

const d = new Date('2024-03-15')
setMonth(d, 0)   // → 2024-01-15  (January)
setMonth(d, 11)  // → 2024-12-15  (December)`,
            lang: 'typescript',
        },
    ],
    related: ['set-date', 'set-hours', 'set-minutes', 'set-year'],
}
