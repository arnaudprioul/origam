import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CREATE_RANGE_UTIL_DOC: IUtilDoc = {
    slug: 'create-range',
    name: 'createRange',
    category: 'Commons',
    icon: 'mdi-numeric',
    descriptionKey: 'utils.catalog.create_range.description',
    descriptionFallback: 'Generates an array of sequential integers of a given length, starting from an optional offset. Equivalent to Python\'s range() but returns a plain array.',
    signature: `function createRange(length: number, start?: number): number[]`,
    params: [
        {
            name: 'length',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.create_range.param_length',
            descriptionFallback: 'The number of integers to generate.',
        },
        {
            name: 'start',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.create_range.param_start',
            descriptionFallback: 'The first integer in the sequence. Defaults to 0.',
        },
    ],
    returns: {
        type: 'number[]',
        descriptionKey: 'utils.detail.create_range.returns',
        descriptionFallback: 'An array [start, start+1, …, start+length-1].',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.create_range.example_basic',
            titleFallback: 'Generate page indices',
            code: `import { createRange } from 'origam'

createRange(5)     // → [0, 1, 2, 3, 4]
createRange(3, 1)  // → [1, 2, 3]`,
            lang: 'typescript',
        },
    ],
    related: ['chunk'],
}
