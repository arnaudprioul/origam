import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SANKEY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sankey-props',
    name: 'IChartSankeyProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_sankey_props.description',
    descriptionFallback: 'Props for <OrigamChartSankey>. The component consumes series[0] only — each item in series[0].data must conform to IChartSankeyDatum ({ from, to, value }). Nodes are inferred automatically; columns are assigned by topological depth. Extends IChartBaseProps.',
    definition: `export interface IChartSankeyProps extends IChartBaseProps {
    nodeWidth?: number
    nodePadding?: number
    linkOpacity?: number
    showLabel?: boolean
    xAxisFormat?: (value: number | string) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'nodeWidth', type: 'number', optional: true, descriptionFallback: 'Width of each node rectangle in SVG pixels. Default 16.' },
        { name: 'nodePadding', type: 'number', optional: true, descriptionFallback: 'Minimum vertical gap between sibling nodes within the same column, in SVG pixels. Default 8.' },
        { name: 'linkOpacity', type: 'number', optional: true, descriptionFallback: 'Opacity of the flow ribbons (links). Range [0, 1]. Default 0.4.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Whether to render node labels. Left-column nodes are right-aligned outside their rect; right-column nodes are left-aligned outside. Default true.' },
        { name: 'xAxisFormat', type: '(value: number | string) => string', optional: true, descriptionFallback: 'X-axis / value formatter applied to node labels and tooltip values. When omitted the raw number is displayed.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis formatter — alias kept for API symmetry with other families. Same as xAxisFormat for this geometry.' },
    ],
    usedBy: [
        { slug: 'chart-sankey', name: 'OrigamChartSankey', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sankey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sankey_props.example',
            titleFallback: 'Sankey diagram showing energy flows',
            code: `<OrigamChartSankey
    :series="[{
        name: 'Energy',
        data: [
            { from: 'Solar',   to: 'Electricity', value: 40 },
            { from: 'Wind',    to: 'Electricity', value: 30 },
            { from: 'Electricity', to: 'Homes',   value: 50 },
            { from: 'Electricity', to: 'Industry', value: 20 },
        ]
    }]"
    :nodeWidth="20"
    :nodePadding="12"
    :linkOpacity="0.35"
    showLabel
/>`,
            lang: 'vue',
        },
    ],
}
