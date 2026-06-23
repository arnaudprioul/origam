import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PAD_START_UTIL_DOC: IUtilDoc = {
    slug: 'pad-start',
    name: 'padStart',
    category: 'Commons',
    icon: 'mdi-format-align-right',
    descriptionKey: 'utils.catalog.pad_start.description',
    descriptionFallback: 'Left-pad a string to a target length by prepending a repeat of the padding character. If the string is already at or beyond the target length it is returned unchanged.',
    signature: `function padStart(str: string, length: number, char?: string): string`,
    params: [
        {
            name: 'str',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.pad_start.param_str',
            descriptionFallback: 'The source string to pad.',
        },
        {
            name: 'length',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.pad_start.param_length',
            descriptionFallback: 'The desired minimum total length of the resulting string.',
        },
        {
            name: 'char',
            type: 'string',
            required: false,
            defaultValue: "'0'",
            descriptionKey: 'utils.detail.pad_start.param_char',
            descriptionFallback: 'The character used for padding. Defaults to `\'0\'`.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.pad_start.returns',
        descriptionFallback: 'The padded string. The original string is never mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pad_start.example_basic',
            titleFallback: 'Left-pad for fixed-width formatting',
            code: `import { padStart } from 'origam'

padStart('7', 2)        // → '07'
padStart('42', 5)       // → '00042'
padStart('hello', 3)    // → 'hello'  (already long enough)`,
            lang: 'typescript',
        },
    ],
    related: ['pad-end'],
}
