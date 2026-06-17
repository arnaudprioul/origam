import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CHUNK_UTIL_DOC: IUtilDoc = {
    slug: 'chunk',
    name: 'chunk',
    category: 'Commons',
    icon: 'mdi-format-list-group',
    descriptionKey: 'utils.catalog.chunk.description',
    descriptionFallback: 'Splits a string into an array of fixed-size substrings. Used internally to segment colour codes and similar fixed-width token sequences.',
    signature: `function chunk(str: string, size?: number): string[]`,
    params: [
        {
            name: 'str',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.chunk.param_str',
            descriptionFallback: 'The source string to split.',
        },
        {
            name: 'size',
            type: 'number',
            required: false,
            defaultValue: '1',
            descriptionKey: 'utils.detail.chunk.param_size',
            descriptionFallback: 'The length of each chunk. Defaults to 1 (individual characters).',
        },
    ],
    returns: {
        type: 'string[]',
        descriptionKey: 'utils.detail.chunk.returns',
        descriptionFallback: 'An array of substrings of the given size. The last element may be shorter if the string length is not divisible by size.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.chunk.example_basic',
            titleFallback: 'Split a hex colour into pairs',
            code: `import { chunk } from 'origam'

chunk('ff8800', 2) // → ['ff', '88', '00']
chunk('abc')      // → ['a', 'b', 'c']`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit'],
}
