import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PICTORIAL_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pictorial-slots',
    name: 'IChartPictorialSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pictorial_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartPictorial>. Extends IChartBaseSlots with a tooltip slot that receives the hovered point, its series and the resolved category label, plus an empty slot rendered when the series array is empty.',
    definition: `export interface IChartPictorialSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        series: IChartSeries
        category: string | number
    }) => any
    empty?: () => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; series: IChartSeries; category: string | number }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip card. Receives the hovered point, its series and the resolved category label.',
        },
        {
            name: 'empty',
            type: '() => any',
            optional: true,
            descriptionFallback: 'Rendered when series is empty or has no data.',
        },
    ],
    usedBy: [
        { slug: 'chart-pictorial', name: 'OrigamChartPictorial', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pictorial.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pictorial_slots.example',
            titleFallback: 'Custom tooltip in a pictorial chart',
            code: `<OrigamChartPictorial :series="series" :categories="cats">
    <template #tooltip="{ point, category }">
        <strong>{{ category }}</strong>: {{ point.y }} units
    </template>
    <template #empty>
        <p>No data to display</p>
    </template>
</OrigamChartPictorial>`,
            lang: 'vue',
        },
    ],
}
