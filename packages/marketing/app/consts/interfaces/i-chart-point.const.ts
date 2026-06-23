import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POINT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-point',
    name: 'IChartPoint',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_point.description',
    descriptionFallback: 'Hover / click payload bubbled by <OrigamChart> whenever a data point is interacted with. Fields are denormalised — the consumer does not need to re-look-up the series or resolve the colour from the palette.',
    definition: `export interface IChartPoint {
    seriesIndex: number
    seriesName: string
    dataIndex: number
    x: number | string
    y: number
    color: string
}`,
    extends: [],
    props: [
        { name: 'seriesIndex', type: 'number', optional: false, descriptionFallback: 'Index of the series in props.series.' },
        { name: 'seriesName', type: 'string', optional: false, descriptionFallback: 'Series name (mirrors IChartSeries.name).' },
        { name: 'dataIndex', type: 'number', optional: false, descriptionFallback: 'Index of the data point inside the series.' },
        { name: 'x', type: 'number | string', optional: false, descriptionFallback: 'X coordinate (number or category string).' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'Y value.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string (intent → token → CSS or raw).' },
    ],
    usedBy: [
        { slug: 'chart', name: 'OrigamChart', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-point.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_point.example',
            titleFallback: 'Handling the point-click emit',
            code: `<OrigamChart
    type="line"
    :series="series"
    @point-click="(point: IChartPoint, event) => console.log(point.seriesName, point.x, point.y)"
/>`,
            lang: 'vue',
        },
    ],
}
