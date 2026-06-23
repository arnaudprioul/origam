import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PYRAMID_SLICE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pyramid-slice',
    name: 'IChartPyramidSlice',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pyramid_slice.description',
    descriptionFallback: 'Single slice descriptor produced by the pyramid geometry engine. Exposes the pre-computed SVG <path d="…"> for the trapezoid, the label anchor position, and all data needed to render accessibility text and tooltip content.',
    definition: `export interface IChartPyramidSlice {
    index: number
    d: string
    color: string
    category: string
    value: number
    formatted: string
    visible: boolean
    labelX: number
    labelY: number
    labelAnchor: 'middle' | 'start'
    leaderX: number
    labelFitsInside: boolean
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Slice index in the original data array.' },
        { name: 'd', type: 'string', optional: false, descriptionFallback: 'SVG <path d="…"> for the trapezoid.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string.' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label (from categories[index] or fallback).' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value from series.data[index].' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this slice is currently visible (legend toggle).' },
        { name: 'labelX', type: 'number', optional: false, descriptionFallback: 'Label anchor X — centre of the trapezoid face for inside placement; right-edge midpoint + offset for outside.' },
        { name: 'labelY', type: 'number', optional: false, descriptionFallback: 'Label anchor Y.' },
        { name: 'labelAnchor', type: "'middle' | 'start'", optional: false, descriptionFallback: 'SVG text-anchor attribute matching labelX placement.' },
        { name: 'leaderX', type: 'number', optional: false, descriptionFallback: 'Y of the leader-line target (band right edge midpoint).' },
        { name: 'labelFitsInside', type: 'boolean', optional: false, descriptionFallback: 'true when the band is wide enough to host the label inside.' },
    ],
    usedBy: [
        { slug: 'chart-pyramid', name: 'OrigamChartPyramid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pyramid.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pyramid_slice.example',
            titleFallback: 'Consuming slice descriptors from the pyramid engine',
            code: `// Internal use — the geometry engine produces IChartPyramidSlice[]
// Each entry is rendered as an SVG <path> inside OrigamChartPyramid
// <path :d="slice.d" :fill="slice.color" />`,
            lang: 'typescript',
        },
    ],
}
