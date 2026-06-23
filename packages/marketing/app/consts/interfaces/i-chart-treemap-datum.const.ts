import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TREEMAP_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-treemap-datum',
    name: 'IChartTreemapDatum',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_treemap_datum.description',
    descriptionFallback: 'A single data item for the treemap series. Consumed from series[0].data — each item becomes one tile sized proportionally to its value. The optional color overrides the palette entry for that specific tile. children is reserved for future nested drilldown support and is ignored in v1.',
    definition: `export interface IChartTreemapDatum {
    name: string
    value: number
    color?: TIntent | string
    children?: Array<IChartTreemapDatum>
}`,
    extends: [],
    props: [
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Tile display label shown inside the tile and in the tooltip.',
        },
        {
            name: 'value',
            type: 'number',
            optional: false,
            descriptionFallback: 'Numeric magnitude that drives the tile area. Must be ≥ 0.',
        },
        {
            name: 'color',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'Optional per-tile colour override. Accepts a design-system intent token or any raw CSS colour string.',
        },
        {
            name: 'children',
            type: 'Array<IChartTreemapDatum>',
            optional: true,
            descriptionFallback: 'Reserved for future nested / drilldown support. Currently unused — v1 renders a flat single-level treemap only.',
        },
    ],
    usedBy: [
        { slug: 'chart-treemap', name: 'ChartTreemap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-treemap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_treemap_datum.example',
            titleFallback: 'Flat treemap dataset with per-tile colour overrides',
            code: `import type { IChartTreemapDatum } from 'origam'

const data: IChartTreemapDatum[] = [
    { name: 'Vue', value: 400, color: 'success' },
    { name: 'React', value: 300 },
    { name: 'Angular', value: 200, color: 'danger' },
    { name: 'Svelte', value: 100 },
]`,
            lang: 'typescript',
        },
    ],
}
