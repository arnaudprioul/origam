import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BASE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-base-emits',
    name: 'IChartBaseEmits',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_base_emits.description',
    descriptionFallback: 'Emit signatures shared across every per-type chart component (ChartBar, ChartLine, ChartPie, …). Covers data-point click, legend-entry click and legend visibility toggle.',
    definition: `export interface IChartBaseEmits {
    (e: 'point-click', point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent): void
    (e: 'legend-click', series: IChartSeries, index: number): void
    (e: 'series-toggle', series: IChartSeries, visible: boolean): void
}`,
    extends: [],
    props: [
        { name: 'point-click', type: '(point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent) => void', optional: false, descriptionFallback: 'Mouse or keyboard activation on a data point. Payload includes the IChartPoint and the DOM event.' },
        { name: 'legend-click', type: '(series: IChartSeries, index: number) => void', optional: false, descriptionFallback: 'Click on a legend entry. Pair with series-toggle to manage visibility state externally.' },
        { name: 'series-toggle', type: '(series: IChartSeries, visible: boolean) => void', optional: false, descriptionFallback: 'Resulting visibility flip after a legend click. visible=false means the series is now hidden.' },
    ],
    usedBy: [
        { slug: 'chart-bar', name: 'OrigamChartBar', kind: 'component' },
        { slug: 'chart-line', name: 'OrigamChartLine', kind: 'component' },
        { slug: 'chart-pie', name: 'OrigamChartPie', kind: 'component' },
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-base.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_base_emits.example',
            titleFallback: 'Listening to chart data point and legend events',
            code: `<OrigamChartBar
    :series="series"
    @point-click="onPointClick"
    @legend-click="onLegendClick"
    @series-toggle="onSeriesToggle"
/>`,
            lang: 'vue',
        },
    ],
}
