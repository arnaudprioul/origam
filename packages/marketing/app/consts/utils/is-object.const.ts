import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_OBJECT_UTIL_DOC: IUtilDoc = {
    slug: 'is-object',
    name: 'isObject',
    category: 'Commons',
    icon: 'mdi-code-braces',
    descriptionKey: 'utils.catalog.is_object.description',
    descriptionFallback: 'Type guard that returns true when the value is a plain (non-null, non-array) object. Excludes null and arrays which typeof incorrectly reports as "object".',
    signature: `function isObject(obj: any): obj is object`,
    params: [
        {
            name: 'obj',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.is_object.param_obj',
            descriptionFallback: 'The value to test. null returns false even though typeof null === "object". Arrays also return false.',
        },
    ],
    returns: {
        type: 'obj is object',
        descriptionKey: 'utils.detail.is_object.returns',
        descriptionFallback: 'true and narrows the type to object when the value is a non-null, non-array object; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_object.example_basic',
            titleFallback: 'Distinguishing plain objects from other types',
            code: `import { isObject } from 'origam'

isObject({ a: 1 })    // → true
isObject([1, 2])      // → false (array)
isObject(null)        // → false
isObject('string')    // → false
isObject(42)          // → false`,
            lang: 'typescript',
        },
    ],
    related: ['merge-deep'],
}
