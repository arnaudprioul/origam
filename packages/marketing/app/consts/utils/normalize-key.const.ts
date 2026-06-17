import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const NORMALIZE_KEY_UTIL_DOC: IUtilDoc = {
    slug: 'normalize-key',
    name: 'normalizeKey',
    category: 'Commons',
    icon: 'mdi-keyboard-variant',
    descriptionKey: 'utils.catalog.normalize_key.description',
    descriptionFallback: 'Normalises a keyboard key string to its canonical lowercase form using the internal alias map. Aliases such as "esc", "escape", "up", "arrowup" are all resolved to a single canonical name.',
    signature: `function normalizeKey(key: string): string`,
    params: [
        {
            name: 'key',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.normalize_key.param_key',
            descriptionFallback: 'A raw key string from a KeyboardEvent (e.g. "Escape", "ArrowUp", "Enter"). Case-insensitive.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.normalize_key.returns',
        descriptionFallback: 'The canonical lowercase key name after alias resolution. Unrecognised keys are returned lowercased as-is.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hotkey.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.normalize_key.example_basic',
            titleFallback: 'Resolve keyboard aliases',
            code: `import { normalizeKey } from 'origam'

normalizeKey('Escape')   // → 'esc' (or canonical alias)
normalizeKey('ArrowUp')  // → canonical up alias
normalizeKey('Enter')    // → 'enter'`,
            lang: 'typescript',
        },
    ],
    related: ['keyboard-ripple-show', 'keyboard-ripple-hide'],
}
