import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_OBJECT_VALUE_BY_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'get-object-value-by-path',
    name: 'getObjectValueByPath',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_object_value_by_path.description',
    descriptionFallback: 'Resolves a dot-notation (or bracket-notation) path string against an object and returns the found value, or a fallback when null or absent.',
    signature: `function getObjectValueByPath(obj: any, path?: string | null, fallback?: any): any`,
    params: [
        {
            name: 'obj',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_object_value_by_path.param_obj',
            descriptionFallback: 'The root object to traverse. Returns fallback immediately when null or undefined.',
        },
        {
            name: 'path',
            type: 'string | null | undefined',
            required: false,
            descriptionKey: 'utils.detail.get_object_value_by_path.param_path',
            descriptionFallback: 'A dot-separated property path (e.g. "user.profile.name") or bracket notation (e.g. "items[0].value"). Leading dots and bracket indices are normalised automatically.',
        },
        {
            name: 'fallback',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.get_object_value_by_path.param_fallback',
            descriptionFallback: 'Value returned when the path cannot be resolved. Defaults to undefined.',
        },
    ],
    returns: {
        type: 'any',
        descriptionKey: 'utils.detail.get_object_value_by_path.returns',
        descriptionFallback: 'The value found at the specified path, or the fallback.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_object_value_by_path.example_basic',
            titleFallback: 'Dot-path and bracket-path traversal',
            code: `import { getObjectValueByPath } from 'origam'

const data = { user: { roles: ['admin', 'editor'] } }

getObjectValueByPath(data, 'user.roles[0]')  // → 'admin'
getObjectValueByPath(data, 'user.age', 0)    // → 0 (fallback)`,
            lang: 'typescript',
        },
    ],
    related: ['get-nested-value', 'get-property-from-item'],
}
