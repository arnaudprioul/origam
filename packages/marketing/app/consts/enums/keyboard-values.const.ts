import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const KEYBOARD_VALUES_ENUM_DOC: IEnumDoc = {
    slug: 'keyboard-values',
    name: 'KEYBOARD_VALUES',
    category: 'Interaction',
    descriptionKey: 'enums.catalog.keyboard_values.description',
    descriptionFallback: 'Standard KeyboardEvent.key values used for hotkey detection and keyboard navigation.',
    definition: `export enum KEYBOARD_VALUES {
    ENTER     = 'Enter',
    TAB       = 'Tab',
    DELETE    = 'Delete',
    ESC       = 'Escape',
    SPACE     = 'Space',
    UP        = 'ArrowUp',
    DOWN      = 'ArrowDown',
    LEFT      = 'ArrowLeft',
    RIGHT     = 'ArrowRight',
    END       = 'End',
    HOME      = 'Home',
    BACKSPACE = 'Backspace',
    INSERT    = 'Insert',
    PAGEUP    = 'PageUp',
    PAGEDOWN  = 'PageDown',
    SHIFT     = 'Shift',
    EMPTY     = ' ',
}`,
    values: [
        { value: 'KEYBOARD_VALUES.ENTER', descriptionKey: 'enums.detail.keyboard_values.enter', descriptionFallback: 'The Enter key.' },
        { value: 'KEYBOARD_VALUES.TAB', descriptionKey: 'enums.detail.keyboard_values.tab', descriptionFallback: 'The Tab key.' },
        { value: 'KEYBOARD_VALUES.DELETE', descriptionKey: 'enums.detail.keyboard_values.delete', descriptionFallback: 'The Delete key.' },
        { value: 'KEYBOARD_VALUES.ESC', descriptionKey: 'enums.detail.keyboard_values.esc', descriptionFallback: 'The Escape key.' },
        { value: 'KEYBOARD_VALUES.SPACE', descriptionKey: 'enums.detail.keyboard_values.space', descriptionFallback: 'The Space key.' },
        { value: 'KEYBOARD_VALUES.UP', descriptionKey: 'enums.detail.keyboard_values.up', descriptionFallback: 'The Arrow Up key.' },
        { value: 'KEYBOARD_VALUES.DOWN', descriptionKey: 'enums.detail.keyboard_values.down', descriptionFallback: 'The Arrow Down key.' },
        { value: 'KEYBOARD_VALUES.LEFT', descriptionKey: 'enums.detail.keyboard_values.left', descriptionFallback: 'The Arrow Left key.' },
        { value: 'KEYBOARD_VALUES.RIGHT', descriptionKey: 'enums.detail.keyboard_values.right', descriptionFallback: 'The Arrow Right key.' },
        { value: 'KEYBOARD_VALUES.END', descriptionKey: 'enums.detail.keyboard_values.end', descriptionFallback: 'The End key.' },
        { value: 'KEYBOARD_VALUES.HOME', descriptionKey: 'enums.detail.keyboard_values.home', descriptionFallback: 'The Home key.' },
        { value: 'KEYBOARD_VALUES.BACKSPACE', descriptionKey: 'enums.detail.keyboard_values.backspace', descriptionFallback: 'The Backspace key.' },
        { value: 'KEYBOARD_VALUES.INSERT', descriptionKey: 'enums.detail.keyboard_values.insert', descriptionFallback: 'The Insert key.' },
        { value: 'KEYBOARD_VALUES.PAGEUP', descriptionKey: 'enums.detail.keyboard_values.pageup', descriptionFallback: 'The Page Up key.' },
        { value: 'KEYBOARD_VALUES.PAGEDOWN', descriptionKey: 'enums.detail.keyboard_values.pagedown', descriptionFallback: 'The Page Down key.' },
        { value: 'KEYBOARD_VALUES.SHIFT', descriptionKey: 'enums.detail.keyboard_values.shift', descriptionFallback: 'The Shift key.' },
        { value: 'KEYBOARD_VALUES.EMPTY', descriptionKey: 'enums.detail.keyboard_values.empty', descriptionFallback: 'A single space character, used as an empty key sentinel.' },
    ],
    usedBy: [
        { slug: 'pagination', name: 'Pagination', propName: 'hotkey key' },
        { slug: 'chip', name: 'Chip', propName: 'hotkey key' },
        { slug: 'field', name: 'Field', propName: 'hotkey key' },
        { slug: 'list', name: 'List', propName: 'hotkey key' },
        { slug: 'list-item', name: 'ListItem', propName: 'hotkey key' },
        { slug: 'menu', name: 'Menu', propName: 'hotkey key' },
        { slug: 'select', name: 'Select', propName: 'hotkey key' },
        { slug: 'overlay', name: 'Overlay', propName: 'hotkey key' },
        { slug: 'color-picker-canvas', name: 'ColorPickerCanvas', propName: 'hotkey key' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/hotkey.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.keyboard_values.example',
            titleFallback: 'Listening to a keyboard event',
            code: `import { KEYBOARD_VALUES } from 'origam'

function onKeydown(e: KeyboardEvent) {
    if (e.key === KEYBOARD_VALUES.ENTER) {
        // handle confirm
    }
}`,
            lang: 'typescript',
        },
    ],
}
