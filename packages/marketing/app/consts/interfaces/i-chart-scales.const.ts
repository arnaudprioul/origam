import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SCALES_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-scales',
    name: 'IChartScales',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_scales.description',
    descriptionFallback: 'Pair of pixel-mapping functions produced by useChart from the data range and viewBox size. Pure functions — safe to call from computed refs. x maps a value or category index to an SVG horizontal coordinate; y maps a numeric value to an SVG vertical coordinate.',
    definition: `export interface IChartScales {
    x: (value: number | string, dataIndex?: number, categoryCount?: number) => number
    y: (value: number) => number
}`,
    extends: [],
    props: [
        {
            name: 'x',
            type: '(value: number | string, dataIndex?: number, categoryCount?: number) => number',
            optional: false,
            descriptionFallback: 'Maps an X-axis value (numeric or category string) plus an optional data index and category count to an SVG horizontal pixel coordinate.',
        },
        {
            name: 'y',
            type: '(value: number) => number',
            optional: false,
            descriptionFallback: 'Maps a numeric Y value to an SVG vertical pixel coordinate using the primary left-axis scale.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_scales.example',
            titleFallback: 'Using IChartScales to project a data point onto SVG space',
            code: `import type { IChartScales } from 'origam'

function plotPoint(scales: IChartScales, x: number | string, y: number) {
    return { cx: scales.x(x), cy: scales.y(y) }
}`,
            lang: 'typescript',
        },
    ],
}
