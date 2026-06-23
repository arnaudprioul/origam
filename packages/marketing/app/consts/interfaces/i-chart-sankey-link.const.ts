import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SANKEY_LINK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sankey-link',
    name: 'IChartSankeyLink',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_sankey_link.description',
    descriptionFallback: 'Internal link descriptor for each IChartSankeyDatum after Sankey layout. Carries the rendered SVG cubic Bezier path d attribute, visual metadata and resolved colour. Produced by the Sankey layout engine — not intended for direct consumer use.',
    definition: `export interface IChartSankeyLink {
    index: number
    from: string
    to: string
    value: number
    formatted: string
    d: string
    color: string
    strokeWidth: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index in the original data array.' },
        { name: 'from', type: 'string', optional: false, descriptionFallback: 'Source node name.' },
        { name: 'to', type: 'string', optional: false, descriptionFallback: 'Target node name.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric flow value.' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string.' },
        { name: 'd', type: 'string', optional: false, descriptionFallback: 'Rendered SVG cubic Bezier path string.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS stroke colour string (defaults to source node color).' },
        { name: 'strokeWidth', type: 'number', optional: false, descriptionFallback: 'Stroke width in SVG user units.' },
    ],
    usedBy: [
        { slug: 'chart-sankey', name: 'OrigamChartSankey', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sankey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sankey_link.example',
            titleFallback: 'Internal Sankey link descriptor',
            code: `// Produced by the Sankey layout engine — internal use only
// Each IChartSankeyLink is rendered as an SVG <path> ribbon:
// <path :d="link.d" :stroke="link.color" :stroke-width="link.strokeWidth" fill="none" />`,
            lang: 'typescript',
        },
    ],
}
