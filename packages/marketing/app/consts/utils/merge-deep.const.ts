import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MERGE_DEEP_UTIL_DOC: IUtilDoc = {
    slug: 'merge-deep',
    name: 'mergeDeep',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.merge_deep.description',
    descriptionFallback: 'Recursively merge two plain objects into a new object. Nested objects are merged deeply; arrays are combined via an optional resolver, otherwise the target wins.',
    signature: `function mergeDeep(
  source: Record<string, unknown> = {},
  target: Record<string, unknown> = {},
  arrayFn?: (a: Array<unknown>, b: Array<unknown>) => Array<unknown>
): Record<string, unknown>`,
    params: [
        {
            name: 'source',
            type: 'Record<string, unknown>',
            required: false,
            defaultValue: '{}',
            descriptionKey: 'utils.detail.merge_deep.param_source',
            descriptionFallback: 'The base object. Its keys are copied first and act as defaults.',
        },
        {
            name: 'target',
            type: 'Record<string, unknown>',
            required: false,
            defaultValue: '{}',
            descriptionKey: 'utils.detail.merge_deep.param_target',
            descriptionFallback: 'The overriding object. Its values win over the source unless both sides are mergeable objects.',
        },
        {
            name: 'arrayFn',
            type: '(a: Array<unknown>, b: Array<unknown>) => Array<unknown>',
            required: false,
            descriptionKey: 'utils.detail.merge_deep.param_array_fn',
            descriptionFallback: 'Optional resolver invoked when both properties are arrays. When omitted, the target array replaces the source array.',
        },
    ],
    returns: {
        type: 'Record<string, unknown>',
        descriptionKey: 'utils.detail.merge_deep.returns',
        descriptionFallback: 'A new object combining source and target. Neither input is mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.merge_deep.example_basic',
            titleFallback: 'Deep merge with nested objects',
            code: `import { mergeDeep } from 'origam'

mergeDeep(
  { theme: { color: 'primary', size: 'md' } },
  { theme: { size: 'lg' } }
)
// → { theme: { color: 'primary', size: 'lg' } }`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit'],
}
