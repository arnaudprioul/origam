import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SPARKLINE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sparkline-slots',
    name: 'IChartSparklineSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sparkline_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamChartSparkline. Two optional slots: tooltip to replace the default hover body, and empty to render when the series carries no data.',
    definition: `export interface IChartSparklineSlots {
    tooltip?: (bindings: { point: IChartPoint, series: IChartSeries, index: number }) => any
    empty?: () => any
}`,
    extends: [],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint, series: IChartSeries, index: number }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip body on hover. Receives the hovered point, its series and the data index.',
        },
        {
            name: 'empty',
            type: '() => any',
            optional: true,
            descriptionFallback: 'Rendered when series is empty or carries no data.',
        },
    ],
    usedBy: [
        { slug: 'chart-sparkline', name: 'ChartSparkline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sparkline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sparkline_slots.example',
            titleFallback: 'Custom sparkline tooltip',
            code: `<OrigamChartSparkline :series="series">
    <template #tooltip="{ point, series, index }">
        <span>{{ series.name }} #{{ index }}: {{ point.y }}</span>
    </template>
    <template #empty>
        <span>–</span>
    </template>
</OrigamChartSparkline>`,
            lang: 'vue',
        },
    ],
}
