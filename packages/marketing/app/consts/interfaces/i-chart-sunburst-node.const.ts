import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SUNBURST_NODE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sunburst-node',
    name: 'IChartSunburstNode',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sunburst_node.description',
    descriptionFallback: 'Fully-resolved node produced by the sunburst geometry engine. Every field is definite — defaults and inherited values have been applied. Contains SVG arc coordinates, resolved colour and the label rendering mode decision.',
    definition: `export interface IChartSunburstNode {
    id: string
    name: string
    value: number
    depth: number
    rootIndex: number
    startAngle: number
    endAngle: number
    innerR: number
    outerR: number
    d: string
    color: string
    visible: boolean
    path: string
    labelMode: TChartSunburstLabelMode
}`,
    extends: [],
    props: [
        {
            name: 'id',
            type: 'string',
            optional: false,
            descriptionFallback: 'Unique path key built as "Root > Branch > Leaf". Used as the v-for :key.',
        },
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Display name — copy of datum.name.',
        },
        {
            name: 'value',
            type: 'number',
            optional: false,
            descriptionFallback: 'Resolved numeric value — sum of children when absent in the source datum.',
        },
        {
            name: 'depth',
            type: 'number',
            optional: false,
            descriptionFallback: 'Tree depth; root-level nodes are 0.',
        },
        {
            name: 'rootIndex',
            type: 'number',
            optional: false,
            descriptionFallback: 'Index within the root-level array — used for colour inheritance down the tree.',
        },
        {
            name: 'startAngle',
            type: 'number',
            optional: false,
            descriptionFallback: 'Arc start angle in radians [0, 2π).',
        },
        {
            name: 'endAngle',
            type: 'number',
            optional: false,
            descriptionFallback: 'Arc end angle in radians (0, 2π].',
        },
        {
            name: 'innerR',
            type: 'number',
            optional: false,
            descriptionFallback: 'Inner ring radius for this node in SVG user units.',
        },
        {
            name: 'outerR',
            type: 'number',
            optional: false,
            descriptionFallback: 'Outer ring radius for this node in SVG user units.',
        },
        {
            name: 'd',
            type: 'string',
            optional: false,
            descriptionFallback: 'Pre-computed SVG <path d="…"> for the arc segment.',
        },
        {
            name: 'color',
            type: 'string',
            optional: false,
            descriptionFallback: 'Resolved CSS colour string — intent variable or raw value.',
        },
        {
            name: 'visible',
            type: 'boolean',
            optional: false,
            descriptionFallback: 'Whether this node is currently visible (driven by legend toggle on root-level entries).',
        },
        {
            name: 'path',
            type: 'string',
            optional: false,
            descriptionFallback: 'Full ancestor path string "Root > Branch > Leaf" — shown in the tooltip.',
        },
        {
            name: 'labelMode',
            type: 'TChartSunburstLabelMode',
            optional: false,
            descriptionFallback: "How the label for this node should be rendered. 'inline' — centred inside the arc. 'rotated' — tangentially along the arc midpoint. 'leader' — outside the chart with a leader line.",
        },
    ],
    usedBy: [
        { slug: 'chart-sunburst', name: 'ChartSunburst', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sunburst.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sunburst_node.example',
            titleFallback: 'Reading IChartSunburstNode from the tooltip slot',
            code: `<OrigamChartSunburst :series="series">
    <template #tooltip="{ node }">
        <p>{{ node?.path }}</p>
        <p>{{ node?.value }}</p>
    </template>
</OrigamChartSunburst>`,
            lang: 'vue',
        },
    ],
}
