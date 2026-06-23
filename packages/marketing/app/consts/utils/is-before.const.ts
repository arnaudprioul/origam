import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_BEFORE_UTIL_DOC: IUtilDoc = {
    slug: 'is-before',
    name: 'isBefore',
    category: 'Calendar',
    icon: 'mdi-calendar-arrow-left',
    descriptionKey: 'utils.catalog.is_before.description',
    descriptionFallback: 'Returns true if date is strictly before comparing by comparing their Unix timestamps.',
    signature: 'function isBefore(date: Date, comparing: Date): boolean',
    params: [
        {
            name: 'date',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_before.param_date',
            descriptionFallback: 'The date to test.',
        },
        {
            name: 'comparing',
            type: 'Date',
            required: true,
            descriptionKey: 'utils.detail.is_before.param_comparing',
            descriptionFallback: 'The reference date to compare against.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_before.returns',
        descriptionFallback: 'true when date.getTime() < comparing.getTime(); false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_before.example_basic',
            titleFallback: 'Compare two dates',
            code: `import { isBefore } from 'origam'

isBefore(new Date('2025-06-01'), new Date('2025-06-02'))  // → true
isBefore(new Date('2025-06-02'), new Date('2025-06-01'))  // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-after', 'is-equal'],
}
