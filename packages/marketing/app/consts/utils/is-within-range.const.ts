import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_WITHIN_RANGE_UTIL_DOC: IUtilDoc = {
    slug: 'is-within-range',
    name: 'isWithinRange',
    category: 'Commons',
    icon: 'mdi-calendar-range-outline',
    descriptionKey: 'utils.catalog.is_within_range.description',
    descriptionFallback: 'Returns true when a date is strictly after range[0] and strictly before range[1]. Both bounds are exclusive.',
    signature: `function isWithinRange(date: Date, range: [Date, Date]): boolean`,
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_within_range.param_date',
            descriptionFallback: 'The date to test against the range.',
        },
        {
            name: 'range',
            type: '[Date, Date]',
            required: true,
            descriptionKey: 'utils.detail.is_within_range.param_range',
            descriptionFallback: 'A two-element tuple [start, end]. Both bounds are exclusive (strict comparison).',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_within_range.returns',
        descriptionFallback: 'true when date > range[0] && date < range[1].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_within_range.example_basic',
            titleFallback: 'Range inclusion check',
            code: `import { isWithinRange } from 'origam'

const start = new Date('2024-01-01')
const end   = new Date('2024-12-31')
const mid   = new Date('2024-06-15')

isWithinRange(mid, [start, end])   // → true
isWithinRange(start, [start, end]) // → false (exclusive bounds)`,
            lang: 'typescript',
        },
    ],
    related: ['is-valid', 'is-weekend'],
}
