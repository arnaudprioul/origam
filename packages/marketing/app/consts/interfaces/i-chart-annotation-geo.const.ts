import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_ANNOTATION_GEO_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-annotation-geo',
    name: 'IChartAnnotationGeo',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_annotation_geo.description',
    descriptionFallback: 'Resolved SVG geometry for one chart annotation. Produced by computeAnnotationGeometry in chart.composable.ts and consumed directly by OrigamChartCartesian for rendering. Fields are gated per kind.',
    definition: `export interface IChartAnnotationGeo {
    kind: IChartAnnotation['kind']
    stroke: string
    strokeWidth: number
    ax: number
    ay: number
    bx: number
    by: number
    arrowPoints?: string
    text?: string
    dx: number
    dy: number
    radius: number
    callout?: { x: number, y: number, width: number, height: number }
    leaderEnd?: { x: number, y: number }
}`,
    extends: [],
    props: [
        { name: 'kind', type: "IChartAnnotation['kind']", optional: false, descriptionFallback: 'Annotation kind — mirrors the kind declared on IChartAnnotation.' },
        { name: 'stroke', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string for the annotation stroke and fill.' },
        { name: 'strokeWidth', type: 'number', optional: false, descriptionFallback: 'Resolved stroke width in SVG units.' },
        { name: 'ax', type: 'number', optional: false, descriptionFallback: 'Anchor pixel X coordinate (tail of arrow / anchor of label / centre of circle / left edge of bracket).' },
        { name: 'ay', type: 'number', optional: false, descriptionFallback: 'Anchor pixel Y coordinate.' },
        { name: 'bx', type: 'number', optional: false, descriptionFallback: 'End pixel X coordinate (head of arrow / right edge of bracket). Equals ax when unused.' },
        { name: 'by', type: 'number', optional: false, descriptionFallback: 'End pixel Y coordinate. Equals ay when unused.' },
        { name: 'arrowPoints', type: 'string', optional: true, descriptionFallback: 'Arrowhead polygon points attribute — populated for kind === arrow.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text content to display alongside the annotation.' },
        { name: 'dx', type: 'number', optional: false, descriptionFallback: 'Resolved horizontal text offset in SVG units.' },
        { name: 'dy', type: 'number', optional: false, descriptionFallback: 'Resolved vertical text offset in SVG units.' },
        { name: 'radius', type: 'number', optional: false, descriptionFallback: 'Circle radius in SVG units — populated for kind === circle.' },
        { name: 'callout', type: '{ x: number, y: number, width: number, height: number }', optional: true, descriptionFallback: 'Callout rounded-rect geometry — populated for kind === label.' },
        { name: 'leaderEnd', type: '{ x: number, y: number }', optional: true, descriptionFallback: 'Bottom-centre of the callout box where the leader line terminates — populated for kind === label.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-annotation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_annotation_geo.example',
            titleFallback: 'IChartAnnotationGeo is an internal type — consumed by the chart renderer',
            code: `// Produced internally by useChart().annotations
// You typically interact with IChartAnnotation (the input shape)
// rather than IChartAnnotationGeo (the resolved output shape).
import type { IChartAnnotation } from 'origam'`,
            lang: 'typescript',
        },
    ],
}
