import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const KEYBOARD_MODIFIERS_KEY_ENUM_DOC: IEnumDoc = {
    slug: 'keyboard-modifiers-key',
    name: 'KEYBOARD_MODIFIERS_KEY',
    category: 'Interaction',
    descriptionKey: 'enums.catalog.keyboard_modifiers_key.description',
    descriptionFallback: 'Keyboard modifier key identifiers used for hotkey configuration (ctrl, shift, alt, meta, cmd).',
    definition: `export enum KEYBOARD_MODIFIERS_KEY {
    CONTROL = 'ctrl',
    SHIFT   = 'shift',
    ALT     = 'alt',
    META    = 'meta',
    COMMAND = 'cmd',
}`,
    values: [
        { value: 'KEYBOARD_MODIFIERS_KEY.CONTROL', descriptionKey: 'enums.detail.keyboard_modifiers_key.control', descriptionFallback: 'The Control (Ctrl) modifier key.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.SHIFT', descriptionKey: 'enums.detail.keyboard_modifiers_key.shift', descriptionFallback: 'The Shift modifier key.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.ALT', descriptionKey: 'enums.detail.keyboard_modifiers_key.alt', descriptionFallback: 'The Alt (Option on macOS) modifier key.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.META', descriptionKey: 'enums.detail.keyboard_modifiers_key.meta', descriptionFallback: 'The Meta key (Windows key on PC, Command on macOS).' },
        { value: 'KEYBOARD_MODIFIERS_KEY.COMMAND', descriptionKey: 'enums.detail.keyboard_modifiers_key.command', descriptionFallback: 'Alias for the Command (Cmd) key on macOS.' },
    ],
    usedBy: [
        { slug: 'pagination', name: 'Pagination', propName: 'hotkey modifier' },
        { slug: 'chip', name: 'Chip', propName: 'hotkey modifier' },
        { slug: 'field', name: 'Field', propName: 'hotkey modifier' },
        { slug: 'list', name: 'List', propName: 'hotkey modifier' },
        { slug: 'menu', name: 'Menu', propName: 'hotkey modifier' },
        { slug: 'select', name: 'Select', propName: 'hotkey modifier' },
        { slug: 'overlay', name: 'Overlay', propName: 'hotkey modifier' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/hotkey.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.keyboard_modifiers_key.example',
            titleFallback: 'Defining a hotkey with modifier',
            code: `import { KEYBOARD_MODIFIERS_KEY, KEYBOARD_VALUES } from 'origam'

const hotkey = {
    modifier: KEYBOARD_MODIFIERS_KEY.CONTROL,
    key: KEYBOARD_VALUES.ENTER,
}`,
            lang: 'typescript',
        },
    ],
}
