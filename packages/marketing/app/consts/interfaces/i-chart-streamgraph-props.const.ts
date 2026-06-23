import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_STREAMGRAPH_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-streamgraph-props',
    name: 'IChartStreamgraphProps',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_streamgraph_props.description',
    descriptionFallback: 'Props for OrigamChartStreamgraph. Multiple series are rendered as continuous flowing ribbons stacked over time on the X axis. The baseline offset algorithm is controlled by offsetMode: wiggle (canonical streamgraph), silhouette, expand, or zero.',
    definition: `export interface IChartStreamgraphProps extends IChartBaseProps {
    offsetMode?: TChartStreamgraphOffset
    smoothing?: 'none' | 'curve'
    showAxis?: boolean
    showGrid?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        {
            name: 'offsetMode',
            type: 'TChartStreamgraphOffset',
            optional: true,
            default: "'wiggle'",
            descriptionFallback: "Baseline offset algorithm. 'wiggle' — Byron-Wattenberg: centred baseline minimising total slope change (canonical). 'silhouette' — centred at half total stack. 'expand' — normalised to 100% height. 'zero' — traditional stacked area.",
        },
        {
            name: 'smoothing',
            type: "'none' | 'curve'",
            optional: true,
            default: "'curve'",
            descriptionFallback: "Path interpolation. 'curve' applies Catmull-Rom smoothing on each ribbon's top and bottom polylines. 'none' uses straight linear segments.",
        },
        {
            name: 'showAxis',
            type: 'boolean',
            optional: true,
            default: 'true',
            descriptionFallback: 'Toggle the X / Y axis guides.',
        },
        {
            name: 'showGrid',
            type: 'boolean',
            optional: true,
            default: 'false',
            descriptionFallback: 'Toggle background grid lines.',
        },
        {
            name: 'xAxisFormat',
            type: '(value: string | number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to each X-axis category label.',
        },
        {
            name: 'yAxisFormat',
            type: '(value: number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to Y-axis tick labels.',
        },
    ],
    usedBy: [
        { slug: 'chart-streamgraph', name: 'ChartStreamgraph', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-streamgraph.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_streamgraph_props.example',
            titleFallback: 'Streamgraph with percent-normalised expand mode',
            code: `<OrigamChartStreamgraph
    :series="series"
    :categories="months"
    offset-mode="expand"
    smoothing="curve"
    :y-axis-format="v => v + '%'"
/>`,
            lang: 'vue',
        },
    ],
}
