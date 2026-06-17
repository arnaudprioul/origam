import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DIRECTION_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'direction-array',
    name: 'DIRECTION_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.direction_array.description',
    descriptionFallback: 'Array of all four directional values (top, bottom, left, right) combining BLOCK and INLINE axes. Used to validate and iterate the full directional surface (e.g. in anchor, popover, and tooltip positioning logic).',
    definition: `export const DIRECTION_ARRAY: Array<TDirectionBoth> = [
    BLOCK.TOP,
    BLOCK.BOTTOM,
    INLINE.LEFT,
    INLINE.RIGHT
]`,
    values: [
        { value: 'BLOCK.TOP', descriptionKey: 'consts.detail.direction_array.top', descriptionFallback: 'The top (block-start) direction.' },
        { value: 'BLOCK.BOTTOM', descriptionKey: 'consts.detail.direction_array.bottom', descriptionFallback: 'The bottom (block-end) direction.' },
        { value: 'INLINE.LEFT', descriptionKey: 'consts.detail.direction_array.left', descriptionFallback: 'The left (inline-start) direction.' },
        { value: 'INLINE.RIGHT', descriptionKey: 'consts.detail.direction_array.right', descriptionFallback: 'The right (inline-end) direction.' },
    ],
    usedBy: [
        { name: 'useAnchor' },
        { name: 'OrigamTooltip', slug: 'tooltip' },
        { name: 'OrigamMenu', slug: 'menu' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/anchor.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.direction_array.example',
            titleFallback: 'Iterating the four directions',
            code: `import { DIRECTION_ARRAY } from 'origam'

for (const dir of DIRECTION_ARRAY) {
  console.log(dir) // 'top', 'bottom', 'left', 'right'
}`,
            lang: 'typescript',
        },
    ],
}
