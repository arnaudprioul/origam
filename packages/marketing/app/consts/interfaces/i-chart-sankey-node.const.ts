import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SANKEY_NODE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sankey-node',
    name: 'IChartSankeyNode',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_sankey_node.description',
    descriptionFallback: 'Internal node descriptor produced by the Sankey layout engine. All coordinates are in SVG-user-unit space. Nodes are inferred from the union of all from and to strings in IChartSankeyDatum; column is assigned by topological depth (Kahn\'s algorithm).',
    definition: `export interface IChartSankeyNode {
    name: string
    column: number
    value: number
    formatted: string
    color: string
    x: number
    y: number
    height: number
    outgoingOffset: number
    incomingOffset: number
}`,
    extends: [],
    props: [
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Unique node name (inferred from from / to values).' },
        { name: 'column', type: 'number', optional: false, descriptionFallback: 'Column index (0-based topological depth).' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Total flow value (max of incoming and outgoing sums).' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string.' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'SVG x coordinate of the node rect\'s left edge.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'SVG y coordinate of the node rect\'s top edge.' },
        { name: 'height', type: 'number', optional: false, descriptionFallback: 'Node rect height in SVG user units, proportional to value.' },
        { name: 'outgoingOffset', type: 'number', optional: false, descriptionFallback: 'Accumulated outgoing y offset (used during link placement).' },
        { name: 'incomingOffset', type: 'number', optional: false, descriptionFallback: 'Accumulated incoming y offset (used during link placement).' },
    ],
    usedBy: [
        { slug: 'chart-sankey', name: 'OrigamChartSankey', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sankey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sankey_node.example',
            titleFallback: 'Internal Sankey node descriptor',
            code: `// Produced by the Sankey layout engine — internal use only
// Each IChartSankeyNode is rendered as an SVG <rect> plus a <text> label:
// <rect :x="node.x" :y="node.y" :height="node.height" :fill="node.color" />`,
            lang: 'typescript',
        },
    ],
}
