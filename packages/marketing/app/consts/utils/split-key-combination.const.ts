import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SPLIT_KEY_COMBINATION_UTIL_DOC: IUtilDoc = {
    slug: 'split-key-combination',
    name: 'splitKeyCombination',
    category: 'Commons',
    icon: 'mdi-keyboard-outline',
    descriptionKey: 'utils.catalog.split_key_combination.description',
    descriptionFallback: 'Parse a single hotkey combination string (e.g. "ctrl+k") into an array of individual key names. Validates structure and warns on invalid input.',
    signature: `function splitKeyCombination(combination: string, isInternal?: boolean): string[]`,
    params: [
        {
            name: 'combination',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.split_key_combination.param_combination',
            descriptionFallback: 'The combination string to parse, e.g. "ctrl+shift+k". Keys are separated by "+" or "_". A single "-" is treated as a literal key within a combination.',
        },
        {
            name: 'isInternal',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            descriptionKey: 'utils.detail.split_key_combination.param_is_internal',
            descriptionFallback: 'When true, suppresses consoleWarn calls on invalid input. Used by the hotkey system when parsing partially-typed sequences.',
        },
    ],
    returns: {
        type: 'string[]',
        descriptionKey: 'utils.detail.split_key_combination.returns',
        descriptionFallback: 'Array of normalised key name strings. Returns an empty array when the input is empty or structurally invalid.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hotkey.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.split_key_combination.example_basic',
            titleFallback: 'Parse common combinations',
            code: `import { splitKeyCombination } from 'origam'

splitKeyCombination('ctrl+k')         // → ['ctrl', 'k']
splitKeyCombination('shift+arrowup')  // → ['shift', 'arrowup']
splitKeyCombination('ctrl+-')         // → ['ctrl', '-']
splitKeyCombination('')               // → []`,
            lang: 'typescript',
        },
    ],
    related: ['split-key-sequence'],
}
