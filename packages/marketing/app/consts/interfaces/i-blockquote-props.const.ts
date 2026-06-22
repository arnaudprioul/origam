import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BLOCKQUOTE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-blockquote-props',
    name: 'IBlockquoteProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_blockquote_props.description',
    descriptionFallback: 'Full props contract for <OrigamBlockquote> — typographic citation component built on <blockquote>. Exposes five visual variants, author/source attribution, locale-aware decorative quote marks, horizontal alignment, and the full design surface (color, border, spacing, elevation, rounded).',
    definition: `export interface IBlockquoteProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IRoundedProps, IElevationProps, IBorderProps, IPaddingProps, IMarginProps {
    variant?: TBlockquoteVariant
    author?: string
    source?: string
    cite?: string
    lang?: TBlockquoteLang
    align?: TBlockquoteAlign
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IColorProps', 'IBgColorProps',
        'IRoundedProps', 'IElevationProps', 'IBorderProps', 'IPaddingProps', 'IMarginProps',
    ],
    props: [
        { name: 'variant', type: 'TBlockquoteVariant', optional: true, default: "'default'", descriptionFallback: "Visual variant — 'default', 'bordered', 'pull', 'quoted' or 'minimal'. Controls typography and decorative elements." },
        { name: 'author', type: 'string', optional: true, descriptionFallback: 'Author of the citation. Rendered after the body as "— Author". Can be overridden via the #author slot.' },
        { name: 'source', type: 'string', optional: true, descriptionFallback: 'Source of the citation (book, publication, URL label). Rendered after author as ", Source". Can be overridden via the #source slot.' },
        { name: 'cite', type: 'string', optional: true, descriptionFallback: 'URL the citation references. Maps 1:1 to the HTML cite attribute on the rendered <blockquote>.' },
        { name: 'lang', type: 'TBlockquoteLang', optional: true, default: "'auto'", descriptionFallback: "Locale hint that determines which decorative quote glyphs render for variant='quoted'." },
        { name: 'align', type: 'TBlockquoteAlign', optional: true, default: "'left'", descriptionFallback: "Horizontal alignment of the citation body and attribution. The 'pull' variant forces 'center' when this prop is left empty." },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Blockquote/blockquote.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_blockquote_props.example',
            titleFallback: 'Quoted blockquote with author and source',
            code: `<OrigamBlockquote
    variant="quoted"
    author="Marie Curie"
    source="Nobel Lecture, 1911"
    lang="fr"
>
    Rien dans la vie n'est a craindre, tout est a comprendre.
</OrigamBlockquote>`,
            lang: 'vue',
        },
    ],
}
