import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_ANNOTATION_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-annotation',
    name: 'IChartAnnotation',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_annotation.description',
    descriptionFallback: 'A single overlay annotation drawn on top of a cartesian chart SVG surface. Supports four kinds: arrow, label, circle and bracket. Positioned in data coordinates and projected to pixel space by the chart X/Y scales.',
    definition: `export interface IChartAnnotation {
    kind: 'arrow' | 'label' | 'circle' | 'bracket'
    x: number | string
    y: number
    x2?: number | string
    y2?: number
    text?: string
    color?: TIntent | string
    width?: number
    radius?: number
    dx?: number
    dy?: number
}`,
    extends: [],
    props: [
        { name: 'kind', type: "'arrow' | 'label' | 'circle' | 'bracket'", optional: false, descriptionFallback: 'Annotation kind. arrow = directed line with arrowhead; label = callout box; circle = stroked circle; bracket = horizontal or L-shaped span.' },
        { name: 'x', type: 'number | string', optional: false, descriptionFallback: 'Source / anchor X coordinate in data space (category string or numeric index).' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'Source / anchor Y coordinate in data space.' },
        { name: 'x2', type: 'number | string', optional: true, descriptionFallback: 'End-point X in data space. Required for arrow (head position) and bracket (right edge).' },
        { name: 'y2', type: 'number', optional: true, descriptionFallback: 'End-point Y in data space. Optional for bracket — when omitted the bracket stays horizontal.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text content rendered alongside the annotation.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Stroke / fill colour — accepts a TIntent name or any CSS colour string.' },
        { name: 'width', type: 'number', optional: true, descriptionFallback: 'Stroke width in SVG units. Default 1.5.' },
        { name: 'radius', type: 'number', optional: true, descriptionFallback: 'Circle radius in SVG units. Applies to the circle kind only. Default 12.' },
        { name: 'dx', type: 'number', optional: true, descriptionFallback: 'Horizontal offset of the text label relative to its anchor point in SVG units. Default 0.' },
        { name: 'dy', type: 'number', optional: true, descriptionFallback: 'Vertical offset of the text label relative to its anchor point in SVG units. Default -14.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-annotation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_annotation.example',
            titleFallback: 'Annotating a chart data point with an arrow',
            code: `const annotations: IChartAnnotation[] = [
    {
        kind: 'arrow',
        x: 'Mar',
        y: 120,
        x2: 'Mar',
        y2: 200,
        text: 'Peak month',
        color: 'danger',
    },
]

<OrigamChartCartesian :series="series" :annotations="annotations" />`,
            lang: 'typescript',
        },
    ],
}
