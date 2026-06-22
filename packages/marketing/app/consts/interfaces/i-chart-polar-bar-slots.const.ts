import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POLAR_BAR_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-polar-bar-slots',
    name: 'IChartPolarBarSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_polar_bar_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartPolarBar>. Extends IChartBaseSlots with an enriched tooltip slot that also receives the pre-computed percentage string for the hovered wedge.',
    definition: `export interface IChartPolarBarSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        category: string | number
        percentage: string
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; category: string | number; percentage: string }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip body. Receives the standard bindings plus the pre-computed percentage string for the hovered wedge.',
        },
    ],
    usedBy: [
        { slug: 'chart-polar-bar', name: 'OrigamChartPolarBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-polar-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_polar_bar_slots.example',
            titleFallback: 'Custom tooltip with percentage on a polar-bar chart',
            code: `<OrigamChartPolarBar :series="series" :categories="cats">
    <template #tooltip="{ point, category, percentage }">
        <strong>{{ category }}</strong>: {{ point.y }} ({{ percentage }})
    </template>
</OrigamChartPolarBar>`,
            lang: 'vue',
        },
    ],
}
