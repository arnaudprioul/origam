import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCK_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'block-array',
    name: 'BLOCK_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.block_array.description',
    descriptionFallback: "Array of the two block-axis anchor values (top and bottom). Used by the anchor / positioning system to enumerate vertical placement options without including inline or start/end variants.",
    definition: `export const BLOCK_ARRAY: Array<TBlock> = [BLOCK.TOP, BLOCK.BOTTOM]`,
    values: [
        { value: 'BLOCK.TOP', descriptionKey: 'consts.detail.block_array.top', descriptionFallback: 'Top anchor — aligns the element to the top edge.' },
        { value: 'BLOCK.BOTTOM', descriptionKey: 'consts.detail.block_array.bottom', descriptionFallback: 'Bottom anchor — aligns the element to the bottom edge.' },
    ],
    usedBy: [
        { name: 'useAnchor' },
        { name: 'OrigamMenu' },
        { name: 'OrigamTooltip' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/anchor.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.block_array.example',
            titleFallback: 'Checking if a position is block-axis',
            code: `import { BLOCK_ARRAY } from 'origam'

const isBlock = (pos: string) => BLOCK_ARRAY.includes(pos as never)
// isBlock('top')    // true
// isBlock('left')   // false`,
            lang: 'typescript',
        },
    ],
}
