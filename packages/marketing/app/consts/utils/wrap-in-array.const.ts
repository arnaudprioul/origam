import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const WRAP_IN_ARRAY_UTIL_DOC: IUtilDoc = {
    slug: 'wrap-in-array',
    name: 'wrapInArray',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.wrap_in_array.description',
    descriptionFallback: 'Normalise a value into an array: null/undefined becomes [], an existing array passes through untouched, and any other value is wrapped in a single-element array.',
    signature: `function wrapInArray<T>(
  v: T | null | undefined
): T[] | [T]`,
    params: [
        {
            name: 'v',
            type: 'T | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.wrap_in_array.param_v',
            descriptionFallback: 'The value to normalise. May be a scalar, an array, null, or undefined.',
        },
    ],
    returns: {
        type: 'T[] | [T]',
        descriptionKey: 'utils.detail.wrap_in_array.returns',
        descriptionFallback: '[] for null/undefined, the original array when v is already an array, or [v] for any other value.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.wrap_in_array.example_basic',
            titleFallback: 'Scalar, array and null inputs',
            code: `import { wrapInArray } from 'origam'

wrapInArray('primary')          // → ['primary']
wrapInArray(['a', 'b'])         // → ['a', 'b']
wrapInArray(null)               // → []
wrapInArray(undefined)          // → []`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit', 'merge-deep'],
}
