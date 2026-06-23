import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCK_START_END_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'block-start-end-array',
    name: 'BLOCK_START_END_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.block_start_end_array.description',
    descriptionFallback: "Extended block-axis anchor array that includes logical start/end values in addition to the physical top/bottom from BLOCK_ARRAY. Enables logical CSS property alignment alongside physical positioning.",
    definition: `export const BLOCK_START_END_ARRAY: Array<TBlockStartEnd> = [...BLOCK_ARRAY, START_END.START, START_END.END]`,
    values: [
        { value: 'BLOCK.TOP', descriptionKey: 'consts.detail.block_start_end_array.top', descriptionFallback: 'Physical top anchor.' },
        { value: 'BLOCK.BOTTOM', descriptionKey: 'consts.detail.block_start_end_array.bottom', descriptionFallback: 'Physical bottom anchor.' },
        { value: 'START_END.START', descriptionKey: 'consts.detail.block_start_end_array.start', descriptionFallback: 'Logical block-start (maps to top in LTR).' },
        { value: 'START_END.END', descriptionKey: 'consts.detail.block_start_end_array.end', descriptionFallback: 'Logical block-end (maps to bottom in LTR).' },
    ],
    usedBy: [
        { name: 'useAnchor' },
        { name: 'OrigamMenu' },
        { name: 'OrigamTooltip' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/anchor.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.block_start_end_array.example',
            titleFallback: 'Checking if a value is a block or logical axis anchor',
            code: `import { BLOCK_START_END_ARRAY } from 'origam'

const isBlockOrLogical = (pos: string) =>
  BLOCK_START_END_ARRAY.includes(pos as never)`,
            lang: 'typescript',
        },
    ],
}
