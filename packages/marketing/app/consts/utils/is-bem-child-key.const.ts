import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_BEM_CHILD_KEY_UTIL_DOC: IUtilDoc = {
    slug: 'is-bem-child-key',
    name: 'isBemChildKey',
    category: 'Theme',
    icon: 'mdi-code-braces',
    descriptionKey: 'utils.catalog.is_bem_child_key.description',
    descriptionFallback: 'Returns true when a token path segment is a BEM child key — a single word containing only letters, with no hyphens or digits. Used by the token-name resolver to emit __child vs ---property separators.',
    signature: 'function isBemChildKey(key: string): boolean',
    params: [
        {
            name: 'key',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.is_bem_child_key.param_key',
            descriptionFallback: 'A single segment from a token path, e.g. "overlay", "background-color", "500". Only bare alpha words pass the guard.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_bem_child_key.returns',
        descriptionFallback: 'true for strings that match /^[a-zA-Z]+$/ and contain no hyphen; false for any string with a hyphen, digit, or other character.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/token-name.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_bem_child_key.example_basic',
            titleFallback: 'Detect BEM child segments',
            code: `import { isBemChildKey } from 'origam'

isBemChildKey('overlay')           // → true  (__overlay)
isBemChildKey('background-color')  // → false (---background-color)
isBemChildKey('500')               // → false`,
            lang: 'typescript',
        },
    ],
    related: ['token-path-to-css-var-name'],
}
