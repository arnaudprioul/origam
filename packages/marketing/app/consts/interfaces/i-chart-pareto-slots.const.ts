import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PARETO_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pareto-slots',
    name: 'IChartParetoSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pareto_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartPareto>. Extends IChartBaseSlots with a rich tooltip slot that exposes the full bar descriptor including share and cumulative percentage.',
    definition: `export interface IChartParetoSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        category: string
        value: number
        formattedValue: string
        share: number
        cumulative: number
        color: string
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        { name: 'tooltip', type: '(bindings: { point: IChartPoint, category: string, value: number, formattedValue: string, share: number, cumulative: number, color: string }) => any', optional: true, descriptionFallback: 'Custom tooltip content. Receives the full bar descriptor so consumers can show share and cumulative percentage alongside the raw value.' },
    ],
    usedBy: [
        { slug: 'chart-pareto', name: 'ChartPareto', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pareto.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pareto_slots.example',
            titleFallback: 'Custom tooltip showing cumulative percentage',
            code: `<OrigamChartPareto :series="series">
    <template #tooltip="{ category, value, cumulative }">
        <div>
            <strong>{{ category }}</strong>: {{ value }}
            <span>({{ Math.round(cumulative * 100) }}% cumulative)</span>
        </div>
    </template>
</OrigamChartPareto>`,
            lang: 'vue',
        },
    ],
}
