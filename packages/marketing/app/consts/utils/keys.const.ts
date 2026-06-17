import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const KEYS_UTIL_DOC: IUtilDoc = {
    slug: 'keys',
    name: 'keys',
    category: 'Commons',
    icon: 'mdi-key-variant',
    descriptionKey: 'utils.catalog.keys.description',
    descriptionFallback: 'Type-safe wrapper around Object.keys(). Returns the keys of a plain object typed as (keyof O)[] instead of string[], preserving the original key union.',
    signature: `function keys<O extends Record<string, unknown>>(o: O): (keyof O)[]`,
    params: [
        {
            name: 'o',
            type: 'O extends Record<string, unknown>',
            required: true,
            descriptionKey: 'utils.detail.keys.param_o',
            descriptionFallback: 'The object whose keys are returned. The generic O is inferred from the argument.',
        },
    ],
    returns: {
        type: '(keyof O)[]',
        descriptionKey: 'utils.detail.keys.returns',
        descriptionFallback: 'An array of the object\'s own enumerable property keys, typed as (keyof O)[].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.keys.example_basic',
            titleFallback: 'Type-safe key iteration',
            code: `import { keys } from 'origam'

const config = { color: 'primary', size: 'md', disabled: false }

for (const k of keys(config)) {
    console.log(k, config[k])
    // k is typed as 'color' | 'size' | 'disabled'
}`,
            lang: 'typescript',
        },
    ],
    related: ['omit'],
}
