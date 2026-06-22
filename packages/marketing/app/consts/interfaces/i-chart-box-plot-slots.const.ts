import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BOX_PLOT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-box-plot-slots',
    name: 'IChartBoxPlotSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_box_plot_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartBoxPlot>. Extends IChartBaseSlots with an enriched tooltip slot that receives the full five-number summary and box geometry descriptor.',
    definition: `export interface IChartBoxPlotSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        series: IChartSeries
        category: string | number
        box: IChartBoxPlotBox
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; series: IChartSeries; category: string | number; box: IChartBoxPlotBox }) => any',
            optional: true,
            descriptionFallback: 'Override the default tooltip card. Receives point (carries x = category, y = median), series, category, and the extended box descriptor with the full five-number summary.',
        },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_box_plot_slots.example',
            titleFallback: 'Custom tooltip slot on a box-plot chart',
            code: `<OrigamChartBoxPlot :series="series" :categories="cats">
    <template #tooltip="{ box, category }">
        <div>{{ category }} — Median: {{ box.rawStats.median }}</div>
        <div>IQR: {{ box.iqr }}</div>
    </template>
</OrigamChartBoxPlot>`,
            lang: 'vue',
        },
    ],
}
