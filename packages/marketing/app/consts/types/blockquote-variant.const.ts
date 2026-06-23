import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BLOCKQUOTE_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'blockquote-variant',
    name: 'TBlockquoteVariant',
    kind: 'type',
    category: 'Shape & Appearance',
    descriptionKey: 'types.catalog.blockquote_variant.description',
    descriptionFallback: 'Visual typographic variants for OrigamBlockquote — five self-contained treatments from neutral to editorial.',
    definition: `export type TBlockquoteVariant =
    | 'default'
    | 'elegant'
    | 'quoted'
    | 'minimal'
    | 'pull'`,
    values: [
        {
            value: 'default',
            descriptionKey: 'types.detail.blockquote_variant.default',
            descriptionFallback: 'Left accent bar + comfortable padding-inline. Neutral rhythm, fits most prose contexts.',
        },
        {
            value: 'elegant',
            descriptionKey: 'types.detail.blockquote_variant.elegant',
            descriptionFallback: 'Serif face, italic, more breathing room. Designed for editorial long-form content (essays, articles).',
        },
        {
            value: 'quoted',
            descriptionKey: 'types.detail.blockquote_variant.quoted',
            descriptionFallback: 'Large decorative open/close marks, locale-aware via the lang prop. Suited for marketing pages and hero quotes.',
        },
        {
            value: 'minimal',
            descriptionKey: 'types.detail.blockquote_variant.minimal',
            descriptionFallback: 'Bare italic + small indent. Inline citations inside technical docs where the visual must stay quiet.',
        },
        {
            value: 'pull',
            descriptionKey: 'types.detail.blockquote_variant.pull',
            descriptionFallback: 'Pull quote: large body type, centred, extracted out of the flow. Use sparingly — one per article max.',
        },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/Blockquote/blockquote-variant.type.ts',
    examples: [
        {
            titleKey: 'types.detail.blockquote_variant.example',
            titleFallback: 'Five blockquote variants',
            code: `<origam-blockquote variant="default">Default accent bar.</origam-blockquote>
<origam-blockquote variant="elegant">Elegant serif italic.</origam-blockquote>
<origam-blockquote variant="quoted" lang="en">Decorative quote marks.</origam-blockquote>
<origam-blockquote variant="minimal">Minimal inline citation.</origam-blockquote>
<origam-blockquote variant="pull">Pull quote — large and centred.</origam-blockquote>`,
            lang: 'html',
        },
    ],
}
