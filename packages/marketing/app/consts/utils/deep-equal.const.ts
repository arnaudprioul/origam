import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DEEP_EQUAL_UTIL_DOC: IUtilDoc = {
    slug: 'deep-equal',
    name: 'deepEqual',
    category: 'Commons',
    icon: 'mdi-equal',
    descriptionKey: 'utils.catalog.deep_equal.description',
    descriptionFallback: 'Recursively compares two values for structural equality. Handles primitives, Date objects, and plain objects. Returns true when both values have identical structure and content.',
    signature: `function deepEqual(a: any, b: any): boolean`,
    params: [
        {
            name: 'a',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.deep_equal.param_a',
            descriptionFallback: 'The first value to compare.',
        },
        {
            name: 'b',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.deep_equal.param_b',
            descriptionFallback: 'The second value to compare.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.deep_equal.returns',
        descriptionFallback: 'true when both values are structurally equal, false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.deep_equal.example_basic',
            titleFallback: 'Comparing objects and dates',
            code: `import { deepEqual } from 'origam'

deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) // → true
deepEqual({ a: 1 }, { a: 2 })                             // → false
deepEqual(new Date('2024-01-01'), new Date('2024-01-01')) // → true`,
            lang: 'typescript',
        },
    ],
    related: ['merge-deep'],
}
