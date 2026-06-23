import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COMPOSITION_IGNORE_KEYS_CONST_DOC: IConstDoc = {
    slug: 'composition-ignore-keys',
    name: 'COMPOSITION_IGNORE_KEYS',
    category: 'Input',
    descriptionKey: 'consts.catalog.composition_ignore_keys.description',
    descriptionFallback: 'List of keyboard keys that autocomplete and combobox inputs ignore during IME composition sessions. Prevents arrow-key navigation, Enter, Escape, Tab and the empty key from triggering selection while the user is composing a CJK or other multi-keystroke character.',
    definition: `export const COMPOSITION_IGNORE_KEYS = [
    KEYBOARD_VALUES.UP,
    KEYBOARD_VALUES.DOWN,
    KEYBOARD_VALUES.RIGHT,
    KEYBOARD_VALUES.LEFT,
    KEYBOARD_VALUES.ENTER,
    KEYBOARD_VALUES.ESC,
    KEYBOARD_VALUES.TAB,
    KEYBOARD_VALUES.EMPTY
]`,
    values: [
        { value: 'KEYBOARD_VALUES.UP', descriptionKey: 'consts.detail.composition_ignore_keys.up', descriptionFallback: 'Arrow Up — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.DOWN', descriptionKey: 'consts.detail.composition_ignore_keys.down', descriptionFallback: 'Arrow Down — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.RIGHT', descriptionKey: 'consts.detail.composition_ignore_keys.right', descriptionFallback: 'Arrow Right — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.LEFT', descriptionKey: 'consts.detail.composition_ignore_keys.left', descriptionFallback: 'Arrow Left — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.ENTER', descriptionKey: 'consts.detail.composition_ignore_keys.enter', descriptionFallback: 'Enter — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.ESC', descriptionKey: 'consts.detail.composition_ignore_keys.esc', descriptionFallback: 'Escape — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.TAB', descriptionKey: 'consts.detail.composition_ignore_keys.tab', descriptionFallback: 'Tab — ignored during composition.' },
        { value: 'KEYBOARD_VALUES.EMPTY', descriptionKey: 'consts.detail.composition_ignore_keys.empty', descriptionFallback: 'Empty string key — ignored during composition.' },
    ],
    usedBy: [
        { name: 'OrigamAutocomplete', slug: 'autocomplete' },
        { name: 'OrigamCombobox', slug: 'combobox' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/autocomplete.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.composition_ignore_keys.example',
            titleFallback: 'Guarding keydown events during IME composition',
            code: `import { COMPOSITION_IGNORE_KEYS } from 'origam'

function onKeydown(e: KeyboardEvent, isComposing: boolean) {
  if (isComposing && COMPOSITION_IGNORE_KEYS.includes(e.key as never)) return
  // handle the key normally
}`,
            lang: 'typescript',
        },
    ],
}
