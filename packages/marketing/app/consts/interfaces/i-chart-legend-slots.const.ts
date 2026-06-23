import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_LEGEND_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-legend-slots',
    name: 'IChartLegendSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_legend_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartLegend>. Provides a legend-item slot so a consumer can replace one entry with a custom render (chip, icon, etc.).',
    definition: `export interface IChartLegendSlots {
    'legend-item'?: (bindings: { series: IChartSeries, index: number, visible: boolean }) => any
}`,
    extends: [],
    props: [
        { name: 'legend-item', type: '(bindings: { series: IChartSeries, index: number, visible: boolean }) => any', optional: true, descriptionFallback: 'Replace one legend entry. Receives the series, its index, and the current visibility state.' },
    ],
    usedBy: [
        { slug: 'chart-legend', name: 'ChartLegend', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-legend.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_legend_slots.example',
            titleFallback: 'Custom legend entry with a chip',
            code: `<OrigamChartLegend :items="legend">
    <template #legend-item="{ series, index, visible }">
        <OrigamChip :color="visible ? 'primary' : 'default'">
            {{ series.name }}
        </OrigamChip>
    </template>
</OrigamChartLegend>`,
            lang: 'vue',
        },
    ],
}
