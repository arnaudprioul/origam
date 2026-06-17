import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BLOCKQUOTE_ALIGN_TYPE_DOC: ITypeDoc = {
    slug: 'blockquote-align',
    name: 'TBlockquoteAlign',
    kind: 'type',
    category: 'Layout',
    descriptionKey: 'types.catalog.blockquote_align.description',
    descriptionFallback: 'Horizontal alignment of the citation body in OrigamBlockquote.',
    definition: `export type TBlockquoteAlign =
    | 'left'
    | 'center'
    | 'right'`,
    values: [
        {
            value: 'left',
            descriptionKey: 'types.detail.blockquote_align.left',
            descriptionFallback: 'Left-aligned text. Default for all variants except pull.',
        },
        {
            value: 'center',
            descriptionKey: 'types.detail.blockquote_align.center',
            descriptionFallback: 'Centred text. Default for the pull variant.',
        },
        {
            value: 'right',
            descriptionKey: 'types.detail.blockquote_align.right',
            descriptionFallback: 'Right-aligned text.',
        },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', propName: 'align' },
        { slug: 'text-mask', name: 'TextMask', propName: 'align' },
    ],
    sourceFile: 'packages/ds/src/types/Blockquote/blockquote-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.blockquote_align.example',
            titleFallback: 'Pull quote centred vs left-aligned',
            code: `<!-- centre (default for pull) -->
<origam-blockquote variant="pull" align="center">
  Great things are done by a series of small things.
</origam-blockquote>

<!-- override to left -->
<origam-blockquote variant="pull" align="left">
  Great things are done by a series of small things.
</origam-blockquote>`,
            lang: 'html',
        },
    ],
}
