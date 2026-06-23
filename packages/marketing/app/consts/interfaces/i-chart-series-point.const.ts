import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SERIES_POINT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-series-point',
    name: 'IChartSeriesPoint',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_series_point.description',
    descriptionFallback: 'Object form of a single data point inside IChartSeries.data. Required for scatter charts where the X axis is not a simple categories[index]. The optional z field turns the point into a bubble by scaling its dot radius.',
    definition: `export interface IChartSeriesPoint {
    x: number | string
    y: number
    name?: string
    z?: number
    drilldown?: IChartDrilldownLink
}`,
    extends: [],
    props: [
        {
            name: 'x',
            type: 'number | string',
            optional: false,
            descriptionFallback: 'X coordinate — numeric for scatter, category string for categorical axes.',
        },
        {
            name: 'y',
            type: 'number',
            optional: false,
            descriptionFallback: 'Y value mapped to the vertical scale.',
        },
        {
            name: 'name',
            type: 'string',
            optional: true,
            descriptionFallback: 'Optional friendly label shown in the tooltip instead of the raw x value.',
        },
        {
            name: 'z',
            type: 'number',
            optional: true,
            descriptionFallback: 'Third dimension for scatter — turns the chart into a bubble plot where the dot radius scales with z. Omit to keep the default fixed radius.',
        },
        {
            name: 'drilldown',
            type: 'IChartDrilldownLink',
            optional: true,
            descriptionFallback: 'Drilldown reference. When present and the chart has a matching IChartDrilldownDataset, clicking this point replaces the chart view with the sub-dataset.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-series.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_series_point.example',
            titleFallback: 'Scatter series with bubble sizing',
            code: `import type { IChartSeries, IChartSeriesPoint } from 'origam'

const points: IChartSeriesPoint[] = [
    { x: 10, y: 200, z: 40, name: 'Product A' },
    { x: 25, y: 150, z: 80, name: 'Product B' },
]
const series: IChartSeries[] = [{ name: 'Sales', data: points }]`,
            lang: 'typescript',
        },
    ],
}
