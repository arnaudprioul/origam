import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PAD_END_UTIL_DOC: IUtilDoc = {
    slug: 'pad-end',
    name: 'padEnd',
    category: 'Commons',
    icon: 'mdi-format-align-left',
    descriptionKey: 'utils.catalog.pad_end.description',
    descriptionFallback: 'Right-pad a string to a target length by appending a repeat of the padding character. If the string is already at or beyond the target length it is returned unchanged.',
    signature: `function padEnd(str: string, length: number, char?: string): string`,
    params: [
        {
            name: 'str',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.pad_end.param_str',
            descriptionFallback: 'The source string to pad.',
        },
        {
            name: 'length',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.pad_end.param_length',
            descriptionFallback: 'The desired minimum total length of the resulting string.',
        },
        {
            name: 'char',
            type: 'string',
            required: false,
            defaultValue: "'0'",
            descriptionKey: 'utils.detail.pad_end.param_char',
            descriptionFallback: 'The character used for padding. Defaults to `\'0\'`.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.pad_end.returns',
        descriptionFallback: 'The padded string. The original string is never mutated.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pad_end.example_basic',
            titleFallback: 'Right-pad with zeros and custom chars',
            code: `import { padEnd } from 'origam'

padEnd('42', 5)        // → '42000'
padEnd('42', 5, ' ')   // → '42   '
padEnd('hello', 3)     // → 'hello'  (already long enough)`,
            lang: 'typescript',
        },
    ],
    related: ['pad-start'],
}
