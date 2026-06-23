import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SERIES_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-series',
    name: 'IChartSeries',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_series.description',
    descriptionFallback: 'A single data series rendered by OrigamChart. The data field accepts either a flat number array (values aligned to categories by index) or an object array of IChartSeriesPoint for explicit x/y coordinates — required for scatter and sparse data.',
    definition: `export interface IChartSeries {
    name: string
    data: Array<number> | Array<IChartSeriesPoint>
    color?: TIntent | string
    visible?: boolean
    type?: TChartType
    yAxis?: 0 | 1
}`,
    extends: [],
    props: [
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Display name shown in the legend and used as the screen-reader description for the series.',
        },
        {
            name: 'data',
            type: 'Array<number> | Array<IChartSeriesPoint>',
            optional: false,
            descriptionFallback: 'Series data. Numbers are aligned to categories[index]. Objects carry their own X coordinate — required for scatter and irregular sampling.',
        },
        {
            name: 'color',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'Intent token (primary, success, …) or raw CSS colour (#ff0080, rgb(…)). When absent the chart pulls the next colour from colorScheme cycling by series index.',
        },
        {
            name: 'visible',
            type: 'boolean',
            optional: true,
            default: 'true',
            descriptionFallback: 'Whether the series is currently visible. Driven from legend-click → series-toggle. Default true.',
        },
        {
            name: 'type',
            type: 'TChartType',
            optional: true,
            descriptionFallback: 'Override the chart-level type for this series only — enables mix charts (a column chart with a line overlay).',
        },
        {
            name: 'yAxis',
            type: '0 | 1',
            optional: true,
            default: '0',
            descriptionFallback: 'Which Y axis this series is mapped to. 0 = left primary axis, 1 = right secondary axis. Only meaningful for cartesian family charts.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', kind: 'component' },
        { slug: 'chart-sparkline', name: 'ChartSparkline', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-series.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_series.example',
            titleFallback: 'Defining a line series and a column series on a mix chart',
            code: `import type { IChartSeries } from 'origam'

const series: IChartSeries[] = [
    { name: 'Revenue', data: [120, 200, 150, 80], color: 'primary' },
    { name: 'Units', data: [40, 70, 55, 30], type: 'column', yAxis: 1 },
]`,
            lang: 'typescript',
        },
    ],
}
