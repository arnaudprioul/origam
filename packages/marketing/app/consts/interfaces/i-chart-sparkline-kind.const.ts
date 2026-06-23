import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SPARKLINE_KIND_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sparkline-kind',
    name: 'IChartSparklineKind',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sparkline_kind.description',
    descriptionFallback: 'Internal marker descriptor for a highlighted circle rendered on the sparkline SVG. Used by the min / max / last indicator rendering logic inside OrigamChartSparkline.',
    definition: `export interface IChartSparklineKind {
    cx: number
    cy: number
    r: number
    fill: string
    role: 'min' | 'max' | 'last'
    dataIndex: number
}`,
    extends: [],
    props: [
        {
            name: 'cx',
            type: 'number',
            optional: false,
            descriptionFallback: 'SVG cx coordinate of the marker circle centre.',
        },
        {
            name: 'cy',
            type: 'number',
            optional: false,
            descriptionFallback: 'SVG cy coordinate of the marker circle centre.',
        },
        {
            name: 'r',
            type: 'number',
            optional: false,
            descriptionFallback: 'Circle radius in SVG pixels.',
        },
        {
            name: 'fill',
            type: 'string',
            optional: false,
            descriptionFallback: 'Resolved CSS fill colour string applied to the marker circle.',
        },
        {
            name: 'role',
            type: "'min' | 'max' | 'last'",
            optional: false,
            descriptionFallback: "Role of this marker — 'min' highlights the minimum value, 'max' the maximum, 'last' the most recent data point.",
        },
        {
            name: 'dataIndex',
            type: 'number',
            optional: false,
            descriptionFallback: 'Index of the data point this marker corresponds to inside the series data array.',
        },
    ],
    usedBy: [
        { slug: 'chart-sparkline', name: 'ChartSparkline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sparkline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sparkline_kind.example',
            titleFallback: 'IChartSparklineKind used internally by the sparkline renderer',
            code: `import type { IChartSparklineKind } from 'origam'

// Example marker descriptor produced by the sparkline engine:
const marker: IChartSparklineKind = {
    cx: 80, cy: 12, r: 2.5,
    fill: 'var(--origam-color-success)',
    role: 'max',
    dataIndex: 3,
}`,
            lang: 'typescript',
        },
    ],
}
