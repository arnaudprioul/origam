import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SPLIT_KEY_SEQUENCE_UTIL_DOC: IUtilDoc = {
    slug: 'split-key-sequence',
    name: 'splitKeySequence',
    category: 'Commons',
    icon: 'mdi-keyboard-outline',
    descriptionKey: 'utils.catalog.split_key_sequence.description',
    descriptionFallback: 'Parse a hotkey sequence string (e.g. "ctrl+k-p") into an array of combination strings that must be pressed in order. Validates structure and warns on invalid sequences.',
    signature: `function splitKeySequence(str: string): string[]`,
    params: [
        {
            name: 'str',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.split_key_sequence.param_str',
            descriptionFallback: 'The full sequence string. Combinations within the sequence are separated by "-". The function correctly handles literal "-" keys inside combinations.',
        },
    ],
    returns: {
        type: 'string[]',
        descriptionKey: 'utils.detail.split_key_sequence.returns',
        descriptionFallback: 'Array of combination strings (each parseable by splitKeyCombination). Returns an empty array on invalid input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hotkey.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.split_key_sequence.example_basic',
            titleFallback: 'Parse a chord sequence',
            code: `import { splitKeySequence } from 'origam'

splitKeySequence('ctrl+k-p')      // → ['ctrl+k', 'p']
splitKeySequence('a-b-c')         // → ['a', 'b', 'c']
splitKeySequence('ctrl+-')        // → ['ctrl+-']  (literal minus)`,
            lang: 'typescript',
        },
    ],
    related: ['split-key-combination'],
}
