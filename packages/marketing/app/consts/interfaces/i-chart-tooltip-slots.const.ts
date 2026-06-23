import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TOOLTIP_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-tooltip-slots',
    name: 'IChartTooltipSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_tooltip_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamChartTooltip. The default slot replaces the entire tooltip body so consumers can render any chip, icon or formatted currency they need.',
    definition: `export interface IChartTooltipSlots {
    default?: (bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any
}`,
    extends: [],
    props: [
        {
            name: 'default',
            type: '(bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip body. Receives the hovered point, its series and the X-axis category.',
        },
    ],
    usedBy: [
        { slug: 'chart-tooltip', name: 'ChartTooltip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-tooltip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_tooltip_slots.example',
            titleFallback: 'Custom tooltip body with icon and formatted value',
            code: `<OrigamChartTooltip v-bind="tooltipProps">
    <template #default="{ point, series, category }">
        <strong>{{ series.name }}</strong><br />
        {{ category }}: {{ point.y.toLocaleString() }}
    </template>
</OrigamChartTooltip>`,
            lang: 'vue',
        },
    ],
}
