import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TREEMAP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-treemap-props',
    name: 'IChartTreemapProps',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_treemap_props.description',
    descriptionFallback: 'Props for OrigamChartTreemap. Consumes series[0] only — each item in series[0].data becomes one tile sized proportionally to its value. v1 renders a flat single-level treemap; nested children are accepted for forward compatibility but not rendered. Extends IChartBaseProps.',
    definition: `export interface IChartTreemapProps extends IChartBaseProps {
    algorithm?: TChartTreemapAlgorithm
    showLabel?: boolean
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        {
            name: 'algorithm',
            type: 'TChartTreemapAlgorithm',
            optional: true,
            default: "'squarified'",
            descriptionFallback: "Layout algorithm. 'squarified' — minimises tile aspect ratio (default). 'slice-dice' — alternates horizontal / vertical slicing.",
        },
        {
            name: 'showLabel',
            type: 'boolean',
            optional: true,
            default: 'true',
            descriptionFallback: 'Whether to render the name + value text inside each tile when the tile is at least 60 × 24 SVG-px.',
        },
        {
            name: 'yAxisFormat',
            type: '(value: number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to the numeric value in tile labels and the tooltip. Raw number stringified when absent.',
        },
    ],
    usedBy: [
        { slug: 'chart-treemap', name: 'ChartTreemap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-treemap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_treemap_props.example',
            titleFallback: 'Squarified treemap with a K-suffix formatter',
            code: `<OrigamChartTreemap
    :series="[{ name: 'Budget', data: budgetItems }]"
    algorithm="squarified"
    :show-label="true"
    :y-axis-format="v => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(v)"
/>`,
            lang: 'vue',
        },
    ],
}
