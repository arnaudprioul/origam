import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const KEYCODES_CONST_DOC: IConstDoc = {
    slug: 'keycodes',
    name: 'KEYCODES',
    category: 'Interactivity',
    descriptionKey: 'consts.catalog.keycodes.description',
    descriptionFallback: 'Frozen map of legacy numeric keyCodes used by the ripple system and other low-level keyboard handlers. Covers the most common interaction keys (enter, tab, arrows, escape, space, etc.).',
    definition: `export const KEYCODES = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16
})`,
    values: [
        { value: 'enter: 13', descriptionKey: 'consts.detail.keycodes.enter', descriptionFallback: 'Enter key.' },
        { value: 'tab: 9', descriptionKey: 'consts.detail.keycodes.tab', descriptionFallback: 'Tab key.' },
        { value: 'delete: 46', descriptionKey: 'consts.detail.keycodes.delete', descriptionFallback: 'Delete key.' },
        { value: 'esc: 27', descriptionKey: 'consts.detail.keycodes.esc', descriptionFallback: 'Escape key.' },
        { value: 'space: 32', descriptionKey: 'consts.detail.keycodes.space', descriptionFallback: 'Space bar.' },
        { value: 'up: 38', descriptionKey: 'consts.detail.keycodes.up', descriptionFallback: 'Arrow Up.' },
        { value: 'down: 40', descriptionKey: 'consts.detail.keycodes.down', descriptionFallback: 'Arrow Down.' },
        { value: 'left: 37', descriptionKey: 'consts.detail.keycodes.left', descriptionFallback: 'Arrow Left.' },
        { value: 'right: 39', descriptionKey: 'consts.detail.keycodes.right', descriptionFallback: 'Arrow Right.' },
        { value: 'home: 36', descriptionKey: 'consts.detail.keycodes.home', descriptionFallback: 'Home key.' },
        { value: 'end: 35', descriptionKey: 'consts.detail.keycodes.end', descriptionFallback: 'End key.' },
        { value: 'backspace: 8', descriptionKey: 'consts.detail.keycodes.backspace', descriptionFallback: 'Backspace key.' },
        { value: 'pageup: 33', descriptionKey: 'consts.detail.keycodes.pageup', descriptionFallback: 'Page Up key.' },
        { value: 'pagedown: 34', descriptionKey: 'consts.detail.keycodes.pagedown', descriptionFallback: 'Page Down key.' },
        { value: 'shift: 16', descriptionKey: 'consts.detail.keycodes.shift', descriptionFallback: 'Shift key.' },
    ],
    usedBy: [
        { name: 'v-ripple' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/ripple.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.keycodes.example',
            titleFallback: 'Matching a keydown event with KEYCODES',
            code: `import { KEYCODES } from 'origam'

document.addEventListener('keydown', (e) => {
  if (e.keyCode === KEYCODES.enter) {
    // trigger action
  }
})`,
            lang: 'typescript',
        },
    ],
}
