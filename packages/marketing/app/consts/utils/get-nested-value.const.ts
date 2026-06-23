import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_NESTED_VALUE_UTIL_DOC: IUtilDoc = {
    slug: 'get-nested-value',
    name: 'getNestedValue',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_nested_value.description',
    descriptionFallback: 'Safely drills into a nested object following an array path of string/number keys and returns the value found, or a fallback when any segment is null or the key is absent.',
    signature: `function getNestedValue(obj: any, path: Array<string | number>, fallback?: any): any`,
    params: [
        {
            name: 'obj',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_nested_value.param_obj',
            descriptionFallback: 'The root object or array to traverse.',
        },
        {
            name: 'path',
            type: 'Array<string | number>',
            required: true,
            descriptionKey: 'utils.detail.get_nested_value.param_path',
            descriptionFallback: 'An array of property keys (strings) or array indices (numbers) describing the access path from the root.',
        },
        {
            name: 'fallback',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.get_nested_value.param_fallback',
            descriptionFallback: 'Value returned when any segment in the path is null, or the final key is absent. Defaults to undefined.',
        },
    ],
    returns: {
        type: 'any',
        descriptionKey: 'utils.detail.get_nested_value.returns',
        descriptionFallback: 'The value at the end of the path, or the fallback if the path cannot be resolved.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_nested_value.example_basic',
            titleFallback: 'Read a deeply nested property safely',
            code: `import { getNestedValue } from 'origam'

const data = { user: { profile: { name: 'Alice' } } }

getNestedValue(data, ['user', 'profile', 'name'])  // → 'Alice'
getNestedValue(data, ['user', 'age'], 0)           // → 0 (fallback)
getNestedValue(null, ['a', 'b'], 'n/a')            // → 'n/a'`,
            lang: 'typescript',
        },
    ],
    related: ['get-object-value-by-path', 'get-property-from-item'],
}
