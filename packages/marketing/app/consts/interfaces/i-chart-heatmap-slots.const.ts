import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HEATMAP_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-heatmap-slots',
    name: 'IChartHeatmapSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_heatmap_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartHeatmap>. Extends IChartBaseSlots with a custom tooltip slot for hovered cells.',
    definition: `export interface IChartHeatmapSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        color: string
        xLabel: string
        yLabel: string
        value: number
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        { name: 'tooltip', type: '(bindings: { point: IChartPoint, color: string, xLabel: string, yLabel: string, value: number }) => any', optional: true, descriptionFallback: 'Replace the tooltip body for a hovered cell. Receives the hovered point, its resolved colour, and the formatted x / y / value strings.' },
    ],
    usedBy: [
        { slug: 'chart-heatmap', name: 'ChartHeatmap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-heatmap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_heatmap_slots.example',
            titleFallback: 'Custom tooltip for a heatmap cell',
            code: `<OrigamChartHeatmap :series="series">
    <template #tooltip="{ point, color, xLabel, yLabel, value }">
        <div :style="{ color }">
            {{ xLabel }} / {{ yLabel }}: <strong>{{ value }}</strong>
        </div>
    </template>
</OrigamChartHeatmap>`,
            lang: 'vue',
        },
    ],
}
