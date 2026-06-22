import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GRID_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-grid-props',
    name: 'IGridProps',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_grid_props.description',
    descriptionFallback: 'Props contract for OrigamGrid — a declarative CSS Grid container. Covers track templates (columns/rows), gap, areas, auto-flow, alignment, and all standard visual surfaces (color, border, elevation, dimension).',
    definition: `export interface IGridProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IMarginProps, IPaddingProps, IRoundedProps, IElevationProps, IBgColorProps, IColorProps, IBorderProps {
    columns?: TGridTracks
    rows?: TGridTracks
    gap?: TGridGapSize | string | number
    columnGap?: TGridGapSize | string | number
    rowGap?: TGridGapSize | string | number
    areas?: string | ReadonlyArray<string>
    autoFlow?: TGridAutoFlow
    autoColumns?: string
    autoRows?: string
    alignItems?: TGridPlaceItems
    justifyItems?: TGridPlaceItems
    alignContent?: TGridPlaceContent
    justifyContent?: TGridPlaceContent
    inline?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IDimensionProps',
        'IMarginProps',
        'IPaddingProps',
        'IRoundedProps',
        'IElevationProps',
        'IBgColorProps',
        'IColorProps',
        'IBorderProps',
    ],
    props: [
        { name: 'columns', type: 'TGridTracks', optional: true, default: "'auto'", descriptionFallback: 'Track template for the inline axis (grid-template-columns). Accepts a number (repeat N 1fr), a raw CSS string, or an array of track sizes.' },
        { name: 'rows', type: 'TGridTracks', optional: true, default: "'auto'", descriptionFallback: 'Track template for the block axis (grid-template-rows). Same shapes as columns.' },
        { name: 'gap', type: 'TGridGapSize | string | number', optional: true, default: "'md'", descriptionFallback: 'Both-axis gap. Accepts a size token (xs/sm/md/lg/xl), a CSS length string, or a number (px).' },
        { name: 'columnGap', type: 'TGridGapSize | string | number', optional: true, descriptionFallback: 'Inline-axis gap override. Takes precedence over gap on the column axis.' },
        { name: 'rowGap', type: 'TGridGapSize | string | number', optional: true, descriptionFallback: 'Block-axis gap override. Takes precedence over gap on the row axis.' },
        { name: 'areas', type: 'string | ReadonlyArray<string>', optional: true, descriptionFallback: 'grid-template-areas. Pass a string[] (one row per entry) or a raw CSS string.' },
        { name: 'autoFlow', type: 'TGridAutoFlow', optional: true, default: "'row'", descriptionFallback: 'grid-auto-flow. Controls how implicit tracks are placed when items have no explicit area.' },
        { name: 'autoColumns', type: 'string', optional: true, descriptionFallback: 'grid-auto-columns sizes for implicit columns. Free-form CSS.' },
        { name: 'autoRows', type: 'string', optional: true, descriptionFallback: 'grid-auto-rows sizes for implicit rows. Free-form CSS.' },
        { name: 'alignItems', type: 'TGridPlaceItems', optional: true, default: "'stretch'", descriptionFallback: 'align-items — block-axis alignment of grid items inside their cells.' },
        { name: 'justifyItems', type: 'TGridPlaceItems', optional: true, default: "'stretch'", descriptionFallback: 'justify-items — inline-axis alignment of grid items inside their cells.' },
        { name: 'alignContent', type: 'TGridPlaceContent', optional: true, descriptionFallback: 'align-content — block-axis alignment of the whole grid inside its container.' },
        { name: 'justifyContent', type: 'TGridPlaceContent', optional: true, descriptionFallback: 'justify-content — inline-axis alignment of the whole grid inside its container.' },
        { name: 'inline', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Toggles display: inline-grid instead of display: grid.' },
    ],
    usedBy: [
        { slug: 'grid', name: 'Grid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grid/grid.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_grid_props.example',
            titleFallback: 'Responsive 3-column grid with named areas',
            code: `<OrigamGrid
    :columns="3"
    gap="md"
    :areas="['header header header', 'sidebar main aside']"
>
    <OrigamGridItem area="header">…</OrigamGridItem>
    <OrigamGridItem area="sidebar">…</OrigamGridItem>
    <OrigamGridItem area="main">…</OrigamGridItem>
    <OrigamGridItem area="aside">…</OrigamGridItem>
</OrigamGrid>`,
            lang: 'vue',
        },
    ],
}
