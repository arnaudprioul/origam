import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const KEYBOARD_ALIASES_CONST_DOC: IConstDoc = {
    slug: 'keyboard-aliases',
    name: 'KEYBOARD_ALIASES',
    category: 'Interactivity',
    descriptionKey: 'consts.catalog.keyboard_aliases.description',
    descriptionFallback: 'Centralised key-alias mapping used by the hotkey system to normalise user-friendly shorthand (esc, up, del, space…) to canonical KeyboardEvent.key values in lowercase.',
    definition: `export const KEYBOARD_ALIASES: Record<string, string> = {
    control: 'ctrl',
    command: 'cmd',
    option: 'alt',
    up: 'arrowup',
    down: 'arrowdown',
    left: 'arrowleft',
    right: 'arrowright',
    esc: 'escape',
    spacebar: ' ',
    space: ' ',
    return: 'enter',
    del: 'delete',
    minus: '-',
    hyphen: '-'
}`,
    values: [
        { value: "control: 'ctrl'", descriptionKey: 'consts.detail.keyboard_aliases.control', descriptionFallback: 'Alias for the Ctrl modifier key.' },
        { value: "command: 'cmd'", descriptionKey: 'consts.detail.keyboard_aliases.command', descriptionFallback: 'Alias for the Cmd (Meta) modifier key.' },
        { value: "option: 'alt'", descriptionKey: 'consts.detail.keyboard_aliases.option', descriptionFallback: 'Alias for the Alt/Option modifier key.' },
        { value: "up: 'arrowup'", descriptionKey: 'consts.detail.keyboard_aliases.up', descriptionFallback: 'Alias for ArrowUp.' },
        { value: "down: 'arrowdown'", descriptionKey: 'consts.detail.keyboard_aliases.down', descriptionFallback: 'Alias for ArrowDown.' },
        { value: "left: 'arrowleft'", descriptionKey: 'consts.detail.keyboard_aliases.left', descriptionFallback: 'Alias for ArrowLeft.' },
        { value: "right: 'arrowright'", descriptionKey: 'consts.detail.keyboard_aliases.right', descriptionFallback: 'Alias for ArrowRight.' },
        { value: "esc: 'escape'", descriptionKey: 'consts.detail.keyboard_aliases.esc', descriptionFallback: 'Alias for Escape.' },
        { value: "spacebar: ' '", descriptionKey: 'consts.detail.keyboard_aliases.spacebar', descriptionFallback: 'Alias for the Space key (full name).' },
        { value: "space: ' '", descriptionKey: 'consts.detail.keyboard_aliases.space', descriptionFallback: 'Alias for the Space key (short name).' },
        { value: "return: 'enter'", descriptionKey: 'consts.detail.keyboard_aliases.return', descriptionFallback: 'Alias for Enter.' },
        { value: "del: 'delete'", descriptionKey: 'consts.detail.keyboard_aliases.del', descriptionFallback: 'Alias for Delete.' },
        { value: "minus: '-'", descriptionKey: 'consts.detail.keyboard_aliases.minus', descriptionFallback: 'Alias for the minus/dash key.' },
        { value: "hyphen: '-'", descriptionKey: 'consts.detail.keyboard_aliases.hyphen', descriptionFallback: 'Alias for the hyphen key.' },
    ],
    usedBy: [
        { name: 'useHotkey' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/hotkey.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.keyboard_aliases.example',
            titleFallback: 'Normalising a key string with KEYBOARD_ALIASES',
            code: `import { KEYBOARD_ALIASES } from 'origam'

const normalise = (key: string) =>
  KEYBOARD_ALIASES[key.toLowerCase()] ?? key.toLowerCase()

normalise('Esc')    // → 'escape'
normalise('Space')  // → ' '`,
            lang: 'typescript',
        },
    ],
}
