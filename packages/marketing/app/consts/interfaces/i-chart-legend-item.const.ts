import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_LEGEND_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-legend-item',
    name: 'IChartLegendItem',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_legend_item.description',
    descriptionFallback: 'Aggregated legend entry — one per series. Pre-resolved colour so the legend renderer doesn\'t have to re-look-up the palette. Produced by useChart().legend.value.',
    definition: `export interface IChartLegendItem {
    series: IChartSeries
    index: number
    color: string
    visible: boolean
}`,
    extends: [],
    props: [
        { name: 'series', type: 'IChartSeries', optional: false, descriptionFallback: 'The series this legend entry represents.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based index of the series in the parent chart series array.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Pre-resolved CSS colour string for the swatch.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Current visibility state — toggled when the user clicks the legend entry.' },
    ],
    usedBy: [
        { slug: 'chart-legend', name: 'ChartLegend', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_legend_item.example',
            titleFallback: 'Rendering a custom legend from the composable',
            code: `import { useChart } from 'origam'

const { legend } = useChart(options)
// legend.value: IChartLegendItem[]
legend.value.forEach(item => {
    console.log(item.series.name, item.color, item.visible)
})`,
            lang: 'typescript',
        },
    ],
}
