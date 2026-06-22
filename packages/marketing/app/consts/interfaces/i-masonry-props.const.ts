import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MASONRY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-masonry-props',
    name: 'IMasonryProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_masonry_props.description',
    descriptionFallback: 'Props for <OrigamMasonry> — Pinterest-style masonry layout with CSS-first grid-template-rows:masonry implementation gated on browser support and a JS ResizeObserver fallback.',
    definition: `export interface IMasonryProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IMarginProps, IPaddingProps, IRoundedProps, IElevationProps, IBgColorProps, IColorProps, IBorderProps {
    columns?: number
    columnBreakpoints?: TMasonryColumnBreakpoints
    gap?: TGridGapSize | string | number
    animated?: boolean
    align?: TMasonryAlign
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IDimensionProps', 'IMarginProps',
        'IPaddingProps', 'IRoundedProps', 'IElevationProps', 'IBgColorProps',
        'IColorProps', 'IBorderProps',
    ],
    props: [
        { name: 'columns', type: 'number', optional: true, default: '3', descriptionFallback: 'Number of columns to use when no container-query breakpoint matches. Must be a positive integer >= 1.' },
        { name: 'columnBreakpoints', type: 'TMasonryColumnBreakpoints', optional: true, descriptionFallback: 'Container-query column breakpoints — a map of min-width (px) to column count. The masonry observes its own size and picks the matching column count automatically.' },
        { name: 'gap', type: "TGridGapSize | string | number", optional: true, default: "'md'", descriptionFallback: "Gap between items. Accepts a grid size token ('xs'|'sm'|'md'|'lg'|'xl'), a CSS length string, or a number interpreted as pixels." },
        { name: 'animated', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Animate transform when an item moves to a different position on column-count change. CSS-only transition applied to children.' },
        { name: 'align', type: 'TMasonryAlign', optional: true, default: "'top'", descriptionFallback: "Vertical alignment of items inside a column. 'center' centres each column's cumulative content; only the JS fallback honours this." },
    ],
    usedBy: [
        { slug: 'masonry', name: 'Masonry', kind: 'component' },
        { slug: 'use-masonry', name: 'useMasonry', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Masonry/masonry.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_masonry_props.example',
            titleFallback: 'Responsive masonry with container breakpoints',
            code: `<OrigamMasonry
    :column-breakpoints="{ 600: 2, 900: 3, 1200: 4 }"
    gap="md"
    animated
>
    <div v-for="item in items" :key="item.id">…</div>
</OrigamMasonry>`,
            lang: 'vue',
        },
    ],
}
