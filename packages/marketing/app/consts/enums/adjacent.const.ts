import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const ADJACENT_ENUM_DOC: IEnumDoc = {
    slug: 'adjacent',
    name: 'ADJACENT',
    category: 'Layout & Positioning',
    descriptionKey: 'enums.catalog.adjacent.description',
    descriptionFallback: 'TypeScript enum for slot positions adjacent to a form control (clear, prepend, append, appendInner, prependInner).',
    definition: `export enum ADJACENT {
    CLEAR          = 'clear',
    PREPEND        = 'prepend',
    APPEND         = 'append',
    APPEND_INNER   = 'appendInner',
    PREPEND_INNER  = 'prependInner',
}`,
    values: [
        { value: 'ADJACENT.CLEAR', descriptionKey: 'enums.detail.adjacent.clear', descriptionFallback: 'Clear action slot — renders a dismiss / clear button.' },
        { value: 'ADJACENT.PREPEND', descriptionKey: 'enums.detail.adjacent.prepend', descriptionFallback: 'Outer prepend slot — rendered before the control, outside the input wrapper.' },
        { value: 'ADJACENT.APPEND', descriptionKey: 'enums.detail.adjacent.append', descriptionFallback: 'Outer append slot — rendered after the control, outside the input wrapper.' },
        { value: 'ADJACENT.APPEND_INNER', descriptionKey: 'enums.detail.adjacent.append_inner', descriptionFallback: 'Inner append slot — rendered inside the input wrapper, trailing edge.' },
        { value: 'ADJACENT.PREPEND_INNER', descriptionKey: 'enums.detail.adjacent.prepend_inner', descriptionFallback: 'Inner prepend slot — rendered inside the input wrapper, leading edge.' },
    ],
    usedBy: [
        { slug: 'drawer', name: 'Drawer', propName: 'adjacent' },
        { slug: 'date-picker-month', name: 'DatePickerMonth', propName: 'adjacent' },
        { slug: 'timeline', name: 'Timeline', propName: 'adjacent' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/adjacent.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.adjacent.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { ADJACENT } from 'origam'

const position: ADJACENT = ADJACENT.APPEND_INNER`,
            lang: 'typescript',
        },
    ],
}
