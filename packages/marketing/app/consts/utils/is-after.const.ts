import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_AFTER_UTIL_DOC: IUtilDoc = {
    slug: 'is-after',
    name: 'isAfter',
    category: 'Calendar',
    icon: 'mdi-calendar-arrow-right',
    descriptionKey: 'utils.catalog.is_after.description',
    descriptionFallback: 'Returns true if date is strictly after comparing by comparing their Unix timestamps.',
    signature: 'function isAfter(date: Date, comparing: Date): boolean',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_after.param_date',
            descriptionFallback: 'The date to test.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_after.param_comparing',
            descriptionFallback: 'The reference date to compare against.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_after.returns',
        descriptionFallback: 'true when date.getTime() > comparing.getTime(); false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_after.example_basic',
            titleFallback: 'Compare two dates',
            code: `import { isAfter } from 'origam'

isAfter(new Date('2025-06-02'), new Date('2025-06-01'))  // → true
isAfter(new Date('2025-06-01'), new Date('2025-06-01'))  // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-before', 'is-equal', 'is-after-day'],
}
