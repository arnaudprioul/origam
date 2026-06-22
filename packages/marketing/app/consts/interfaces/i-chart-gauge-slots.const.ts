import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_GAUGE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-gauge-slots',
    name: 'IChartGaugeSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_gauge_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartGauge>. Extends IChartBaseSlots with three gauge-specific slots for the centre value label and the min / max arc endpoint labels.',
    definition: `export interface IChartGaugeSlots extends IChartBaseSlots {
    'gauge-value'?: (bindings: { value: number, ratio: number, formatted: string, unit: string }) => any
    'gauge-min'?: (bindings: { value: number }) => any
    'gauge-max'?: (bindings: { value: number }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'gauge-value',
            type: "(bindings: { value: number; ratio: number; formatted: string; unit: string }) => any",
            optional: true,
            descriptionFallback: 'Replace the centre value label. Receives the formatted value, raw datum, ratio (0..1) and unit string for custom rendering.',
        },
        {
            name: 'gauge-min',
            type: '(bindings: { value: number }) => any',
            optional: true,
            descriptionFallback: 'Replace the min label at the start of the arc.',
        },
        {
            name: 'gauge-max',
            type: '(bindings: { value: number }) => any',
            optional: true,
            descriptionFallback: 'Replace the max label at the end of the arc.',
        },
    ],
    usedBy: [
        { slug: 'chart-gauge', name: 'OrigamChartGauge', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-gauge.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_gauge_slots.example',
            titleFallback: 'Custom centre label with icon in a gauge chart',
            code: `<OrigamChartGauge :series="series" gauge-unit="%" :gauge-max="100">
    <template #gauge-value="{ formatted, unit }">
        <origam-icon>mdi-speedometer</origam-icon>
        <span>{{ formatted }}{{ unit }}</span>
    </template>
    <template #gauge-min="{ value }">{{ value }}%</template>
    <template #gauge-max="{ value }">{{ value }}%</template>
</OrigamChartGauge>`,
            lang: 'vue',
        },
    ],
}
