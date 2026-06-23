import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCKQUOTE_ALIGNS_CONST_DOC: IConstDoc = {
    slug: 'blockquote-aligns',
    name: 'BLOCKQUOTE_ALIGNS',
    category: 'Typography',
    descriptionKey: 'consts.catalog.blockquote_aligns.description',
    descriptionFallback: 'Closed list of valid text alignment values for the align prop of OrigamBlockquote. Use to iterate in stories or validate consumer input.',
    definition: `export const BLOCKQUOTE_ALIGNS: ReadonlyArray<TBlockquoteAlign> = [
    'left',
    'center',
    'right'
]`,
    values: [
        { value: "'left'", descriptionKey: 'consts.detail.blockquote_aligns.left', descriptionFallback: 'Align blockquote text to the left.' },
        { value: "'center'", descriptionKey: 'consts.detail.blockquote_aligns.center', descriptionFallback: 'Centre-align blockquote text.' },
        { value: "'right'", descriptionKey: 'consts.detail.blockquote_aligns.right', descriptionFallback: 'Align blockquote text to the right.' },
    ],
    usedBy: [
        { name: 'OrigamBlockquote' },
    ],
    sourceFile: 'packages/ds/src/consts/Blockquote/blockquote.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blockquote_aligns.example',
            titleFallback: 'Iterating alignment options in a story',
            code: `import { BLOCKQUOTE_ALIGNS } from 'origam'

for (const align of BLOCKQUOTE_ALIGNS) {
  console.log(align) // 'left', 'center', 'right'
}`,
            lang: 'typescript',
        },
    ],
}
