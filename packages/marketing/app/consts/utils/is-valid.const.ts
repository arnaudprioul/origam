import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_VALID_UTIL_DOC: IUtilDoc = {
    slug: 'is-valid',
    name: 'isValid',
    category: 'Commons',
    icon: 'mdi-check-circle-outline',
    descriptionKey: 'utils.catalog.is_valid.description',
    descriptionFallback: 'Returns true when the given value can be coerced into a valid JavaScript Date (not NaN). Accepts any input type.',
    signature: `function isValid(date: any): boolean`,
    params: [
        {
            name: 'date',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.is_valid.param_date',
            descriptionFallback: 'The value to test. Can be a Date object, a date string, a timestamp number, or any other value.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_valid.returns',
        descriptionFallback: 'true when the value produces a valid Date (not NaN), false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_valid.example_basic',
            titleFallback: 'Valid and invalid date inputs',
            code: `import { isValid } from 'origam'

isValid('2024-01-15')   // → true
isValid(new Date())     // → true
isValid('not-a-date')   // → false
isValid(null)           // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-within-range', 'is-weekend'],
}
