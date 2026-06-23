import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BLOCK_ENUM_DOC: IEnumDoc = {
    slug: 'block',
    name: 'BLOCK',
    category: 'Layout & Positioning',
    descriptionKey: 'enums.catalog.block.description',
    descriptionFallback: 'TypeScript enum for block-axis anchor positions used in overlay and floating element placement (top, bottom).',
    definition: `export enum BLOCK {
    TOP    = 'top',
    BOTTOM = 'bottom',
}`,
    values: [
        { value: 'BLOCK.TOP', descriptionKey: 'enums.detail.block.top', descriptionFallback: 'Anchor or position at the top of the block axis.' },
        { value: 'BLOCK.BOTTOM', descriptionKey: 'enums.detail.block.bottom', descriptionFallback: 'Anchor or position at the bottom of the block axis.' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', propName: 'position' },
        { slug: 'color-picker-field', name: 'ColorPickerField', propName: 'position' },
        { slug: 'date-picker-field', name: 'DatePickerField', propName: 'position' },
        { slug: 'rating-field', name: 'RatingField', propName: 'position' },
        { slug: 'select', name: 'Select', propName: 'position' },
        { slug: 'overlay', name: 'Overlay', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/anchor.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.block.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BLOCK } from 'origam'

const anchor: BLOCK = BLOCK.BOTTOM`,
            lang: 'typescript',
        },
    ],
}
