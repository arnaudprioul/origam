import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_EQUAL_UTIL_DOC: IUtilDoc = {
    slug: 'is-equal',
    name: 'isEqual',
    category: 'Calendar',
    icon: 'mdi-equal',
    descriptionKey: 'utils.catalog.is_equal.description',
    descriptionFallback: 'Returns true when two Date objects represent the exact same point in time, compared via their Unix timestamps.',
    signature: 'function isEqual(date: Date, comparing: Date): boolean',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_equal.param_date',
            descriptionFallback: 'The date to test.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_equal.param_comparing',
            descriptionFallback: 'The reference date to compare against.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_equal.returns',
        descriptionFallback: 'true when date.getTime() === comparing.getTime(); false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_equal.example_basic',
            titleFallback: 'Check date equality',
            code: `import { isEqual } from 'origam'

const d1 = new Date('2025-06-01T12:00:00')
const d2 = new Date('2025-06-01T12:00:00')

isEqual(d1, d2)  // → true`,
            lang: 'typescript',
        },
    ],
    related: ['is-after', 'is-before', 'is-same-day'],
}
