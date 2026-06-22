import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-slots',
    name: 'IChartMapSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartMap>. Extends IChartBaseSlots with tooltip and empty slots for full rendering control.',
    definition: `export interface IChartMapSlots extends IChartBaseSlots {
    tooltip?: (bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any
    empty?: () => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        { name: 'tooltip', type: '(bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any', optional: true, descriptionFallback: 'Replace the default tooltip body. Receives the hovered point, series, and category label.' },
        { name: 'empty', type: '() => any', optional: true, descriptionFallback: 'Render when series is empty or has no renderable data.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_slots.example',
            titleFallback: 'Custom tooltip and empty state on a map chart',
            code: `<OrigamChartMap :series="series">
    <template #tooltip="{ point, category }">
        <strong>{{ category }}</strong>: {{ point.value }}
    </template>
    <template #empty>
        <p>No geographic data available.</p>
    </template>
</OrigamChartMap>`,
            lang: 'vue',
        },
    ],
}
