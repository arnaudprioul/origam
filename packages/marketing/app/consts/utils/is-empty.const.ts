import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_EMPTY_UTIL_DOC: IUtilDoc = {
    slug: 'is-empty',
    name: 'isEmpty',
    category: 'Commons',
    icon: 'mdi-minus-circle-outline',
    descriptionKey: 'utils.catalog.is_empty.description',
    descriptionFallback: 'Returns true when a value is null, undefined, or a blank string (only whitespace). Typed as accepting any, so it works as a lightweight nil + blank guard across all value types.',
    signature: 'function isEmpty(val: any): boolean',
    params: [
        {
            name: 'val',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.is_empty.param_val',
            descriptionFallback: 'The value to test. Numbers, arrays, and objects always return false — only null, undefined, and whitespace-only strings return true.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_empty.returns',
        descriptionFallback: 'true for null, undefined, or a string that trims to empty; false for all other values.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_empty.example_basic',
            titleFallback: 'Test nil and blank values',
            code: `import { isEmpty } from 'origam'

isEmpty(null)     // → true
isEmpty(undefined) // → true
isEmpty('   ')   // → true
isEmpty('')      // → true
isEmpty(0)       // → false
isEmpty([])      // → false`,
            lang: 'typescript',
        },
    ],
    related: ['has', 'is-equal'],
}
