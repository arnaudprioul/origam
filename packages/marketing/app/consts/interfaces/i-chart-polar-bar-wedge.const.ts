import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POLAR_BAR_WEDGE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-polar-bar-wedge',
    name: 'IChartPolarBarWedge',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_polar_bar_wedge.description',
    descriptionFallback: 'Single wedge descriptor produced by the polar-bar geometry engine. Exposes the pre-computed SVG <path d="…"> for the arc, label anchor position, and all data needed to render accessibility text and tooltip content.',
    definition: `export interface IChartPolarBarWedge {
    index: number
    d: string
    color: string
    category: string
    value: number
    formatted: string
    visible: boolean
    outerR: number
    innerR: number
    startAngle: number
    endAngle: number
    midAngle: number
    labelX: number
    labelY: number
    labelAnchor: 'start' | 'middle' | 'end'
    percentage: string
    showValueLabel: boolean
    valueLabelX: number
    valueLabelY: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Wedge index in the original data array.' },
        { name: 'd', type: 'string', optional: false, descriptionFallback: 'SVG <path d="…"> for the annular wedge shape.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string (intended for :style="{ fill: … }").' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value.' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string (via yAxisFormat or String(value)).' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this wedge is currently visible (legend toggle).' },
        { name: 'outerR', type: 'number', optional: false, descriptionFallback: 'Computed outer radius for this wedge.' },
        { name: 'innerR', type: 'number', optional: false, descriptionFallback: 'Fixed inner radius (shared across all wedges).' },
        { name: 'startAngle', type: 'number', optional: false, descriptionFallback: 'Start angle (radians).' },
        { name: 'endAngle', type: 'number', optional: false, descriptionFallback: 'End angle (radians).' },
        { name: 'midAngle', type: 'number', optional: false, descriptionFallback: 'Midpoint angle used for label placement.' },
        { name: 'labelX', type: 'number', optional: false, descriptionFallback: 'X coordinate of the category label anchor.' },
        { name: 'labelY', type: 'number', optional: false, descriptionFallback: 'Y coordinate of the category label anchor.' },
        { name: 'labelAnchor', type: "'start' | 'middle' | 'end'", optional: false, descriptionFallback: 'SVG text-anchor for the category label.' },
        { name: 'percentage', type: 'string', optional: false, descriptionFallback: 'Percentage of total as a formatted string (e.g. "23.4%").' },
        { name: 'showValueLabel', type: 'boolean', optional: false, descriptionFallback: 'Whether the wedge is wide enough to host a value label inside.' },
        { name: 'valueLabelX', type: 'number', optional: false, descriptionFallback: 'X coordinate of the in-wedge value label.' },
        { name: 'valueLabelY', type: 'number', optional: false, descriptionFallback: 'Y coordinate of the in-wedge value label.' },
    ],
    usedBy: [
        { slug: 'chart-polar-bar', name: 'OrigamChartPolarBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-polar-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_polar_bar_wedge.example',
            titleFallback: 'Consuming wedge descriptors from the polar-bar engine',
            code: `// Internal use — the geometry engine produces IChartPolarBarWedge[]
// Each entry is rendered as an SVG <path> inside OrigamChartPolarBar
// <path :d="wedge.d" :fill="wedge.color" />`,
            lang: 'typescript',
        },
    ],
}
