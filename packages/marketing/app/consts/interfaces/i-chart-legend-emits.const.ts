import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_LEGEND_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-legend-emits',
    name: 'IChartLegendEmits',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_legend_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamChartLegend>. The parent chart wires these into its own legend-click and series-toggle emits so consumers don\'t need to know about the extracted sub-component.',
    definition: `export interface IChartLegendEmits {
    (e: 'legend-click', series: IChartSeries, index: number): void
    (e: 'series-toggle', series: IChartSeries, visible: boolean): void
}`,
    extends: [],
    props: [
        { name: 'legend-click', type: '(series: IChartSeries, index: number) => void', optional: false, descriptionFallback: 'Click on a legend entry — pair with series-toggle to update visibility state.' },
        { name: 'series-toggle', type: '(series: IChartSeries, visible: boolean) => void', optional: false, descriptionFallback: 'Resulting visibility flip after a legend click.' },
    ],
    usedBy: [
        { slug: 'chart-legend', name: 'ChartLegend', kind: 'component' },
        { slug: 'chart', name: 'Chart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-legend.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_legend_emits.example',
            titleFallback: 'Listening to legend visibility toggles',
            code: `<OrigamChart
    :series="series"
    @legend-click="(s, i) => console.log('clicked', s.name, i)"
    @series-toggle="(s, visible) => console.log(s.name, visible)"
/>`,
            lang: 'vue',
        },
    ],
}
