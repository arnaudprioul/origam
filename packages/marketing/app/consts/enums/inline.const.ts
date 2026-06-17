import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const INLINE_ENUM_DOC: IEnumDoc = {
    slug: 'inline',
    name: 'INLINE',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.inline.description',
    descriptionFallback: 'Horizontal anchor axis values (left, right) used for overlay positioning.',
    definition: `export enum INLINE {
    LEFT  = 'left',
    RIGHT = 'right',
}`,
    values: [
        { value: 'INLINE.LEFT', descriptionKey: 'enums.detail.inline.left', descriptionFallback: 'Anchor or position element to the left.' },
        { value: 'INLINE.RIGHT', descriptionKey: 'enums.detail.inline.right', descriptionFallback: 'Anchor or position element to the right.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', propName: 'location (inline axis)' },
        { slug: 'tooltip', name: 'Tooltip', propName: 'location (inline axis)' },
        { slug: 'drawer', name: 'Drawer', propName: 'location (inline axis)' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/anchor.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.inline.example',
            titleFallback: 'Using INLINE in script setup',
            code: `import { INLINE } from 'origam'

const side: INLINE = INLINE.RIGHT`,
            lang: 'typescript',
        },
    ],
}
