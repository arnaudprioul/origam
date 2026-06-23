import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const INLINE_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'inline-array',
    name: 'INLINE_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.inline_array.description',
    descriptionFallback: 'Array of the two horizontal anchor positions (left, right) used by the anchor and location systems. Building block for INLINE_START_END_ARRAY.',
    definition: `export const INLINE_ARRAY: Array<TInline> = [INLINE.LEFT, INLINE.RIGHT]`,
    values: [
        { value: 'INLINE.LEFT', descriptionKey: 'consts.detail.inline_array.left', descriptionFallback: 'Left horizontal anchor.' },
        { value: 'INLINE.RIGHT', descriptionKey: 'consts.detail.inline_array.right', descriptionFallback: 'Right horizontal anchor.' },
    ],
    usedBy: [
        { name: 'useAnchor' },
        { name: 'INLINE_START_END_ARRAY' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/anchor.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.inline_array.example',
            titleFallback: 'Checking whether a position is inline',
            code: `import { INLINE_ARRAY } from 'origam'

const isInline = (pos: string) =>
  (INLINE_ARRAY as string[]).includes(pos)`,
            lang: 'typescript',
        },
    ],
}
