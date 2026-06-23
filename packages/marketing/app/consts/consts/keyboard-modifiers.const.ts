import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const KEYBOARD_MODIFIERS_CONST_DOC: IConstDoc = {
    slug: 'keyboard-modifiers',
    name: 'KEYBOARD_MODIFIERS',
    category: 'Interactivity',
    descriptionKey: 'consts.catalog.keyboard_modifiers.description',
    descriptionFallback: 'Ordered list of the five recognised modifier keys (ctrl, shift, alt, meta, cmd) used by the hotkey system when parsing and matching keyboard shortcuts.',
    definition: `export const KEYBOARD_MODIFIERS: TKeyboardModifiers[] = [
    KEYBOARD_MODIFIERS_KEY.CONTROL,
    KEYBOARD_MODIFIERS_KEY.SHIFT,
    KEYBOARD_MODIFIERS_KEY.ALT,
    KEYBOARD_MODIFIERS_KEY.META,
    KEYBOARD_MODIFIERS_KEY.COMMAND
]`,
    values: [
        { value: 'KEYBOARD_MODIFIERS_KEY.CONTROL', descriptionKey: 'consts.detail.keyboard_modifiers.control', descriptionFallback: 'Ctrl modifier.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.SHIFT', descriptionKey: 'consts.detail.keyboard_modifiers.shift', descriptionFallback: 'Shift modifier.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.ALT', descriptionKey: 'consts.detail.keyboard_modifiers.alt', descriptionFallback: 'Alt / Option modifier.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.META', descriptionKey: 'consts.detail.keyboard_modifiers.meta', descriptionFallback: 'Meta (Windows / Super) modifier.' },
        { value: 'KEYBOARD_MODIFIERS_KEY.COMMAND', descriptionKey: 'consts.detail.keyboard_modifiers.command', descriptionFallback: 'Command (macOS Cmd ⌘) modifier.' },
    ],
    usedBy: [
        { name: 'useHotkey' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/hotkey.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.keyboard_modifiers.example',
            titleFallback: 'Extracting active modifiers from a KeyboardEvent',
            code: `import { KEYBOARD_MODIFIERS } from 'origam'

const activeModifiers = (e: KeyboardEvent) =>
  KEYBOARD_MODIFIERS.filter(mod => e.getModifierState(mod))`,
            lang: 'typescript',
        },
    ],
}
