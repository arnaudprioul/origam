import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-slots',
    name: 'IChartSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_slots.description',
    descriptionFallback: 'Slot signatures for the universal OrigamChart component. Replace the default tooltip card, a legend entry, the title block, or the empty state without losing the rest of the chart chrome.',
    definition: `export interface IChartSlots {
    tooltip?: (bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any
    'legend-item'?: (bindings: { series: IChartSeries, index: number, visible: boolean }) => any
    title?: () => any
    empty?: () => any
}`,
    extends: [],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any',
            optional: true,
            descriptionFallback: 'Replace the default floating tooltip body. Receives the hovered point, its series and the X-axis category.',
        },
        {
            name: 'legend-item',
            type: '(bindings: { series: IChartSeries, index: number, visible: boolean }) => any',
            optional: true,
            descriptionFallback: 'Replace the rendering of a single legend entry. Receives the series descriptor, its index, and its current visibility state.',
        },
        {
            name: 'title',
            type: '() => any',
            optional: true,
            descriptionFallback: 'Replace the title + subtitle block rendered above the plotting area.',
        },
        {
            name: 'empty',
            type: '() => any',
            optional: true,
            descriptionFallback: 'Rendered when series is an empty array or every series is hidden via the legend.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_slots.example',
            titleFallback: 'Custom tooltip and empty state',
            code: `<OrigamChart :series="series">
    <template #tooltip="{ point, series, category }">
        <strong>{{ series.name }}</strong>: {{ point.y }} ({{ category }})
    </template>
    <template #empty>
        <p>No data available yet.</p>
    </template>
</OrigamChart>`,
            lang: 'vue',
        },
    ],
}
