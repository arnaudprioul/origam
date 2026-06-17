import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COMMAND_PALETTE_DEFAULT_HOTKEY_CONST_DOC: IConstDoc = {
    slug: 'command-palette-default-hotkey',
    name: 'COMMAND_PALETTE_DEFAULT_HOTKEY',
    category: 'Components',
    descriptionKey: 'consts.catalog.command_palette_default_hotkey.description',
    descriptionFallback: 'Default global hotkey combinations for OrigamCommandPalette. Registers both ⌘+K (macOS) and Ctrl+K (Windows/Linux) so the palette works cross-platform without consumer branching.',
    definition: `export const COMMAND_PALETTE_DEFAULT_HOTKEY: ReadonlyArray<ReadonlyArray<string>> = [
    ['meta', 'k'],
    ['ctrl', 'k']
]`,
    values: [
        { value: "['meta', 'k']", descriptionKey: 'consts.detail.command_palette_default_hotkey.meta_k', descriptionFallback: '⌘+K on macOS / Windows key + K.' },
        { value: "['ctrl', 'k']", descriptionKey: 'consts.detail.command_palette_default_hotkey.ctrl_k', descriptionFallback: 'Ctrl+K on Windows and Linux.' },
    ],
    usedBy: [
        { name: 'OrigamCommandPalette', slug: 'command-palette' },
        { name: 'useCommand' },
        { name: 'useHotkey' },
    ],
    sourceFile: 'packages/ds/src/consts/CommandPalette/command-palette.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.command_palette_default_hotkey.example',
            titleFallback: 'Overriding the default hotkey',
            code: `import { COMMAND_PALETTE_DEFAULT_HOTKEY } from 'origam'

// Use the default or supply your own
const hotkey = COMMAND_PALETTE_DEFAULT_HOTKEY`,
            lang: 'typescript',
        },
    ],
}
