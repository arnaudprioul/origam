import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_VARIWIDE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-variwide-slots',
    name: 'IChartVariwideSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_variwide_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartVariwide>. Extends IChartBaseSlots with a richer tooltip slot that receives both the primary value and the secondary (width) encoding so consumers can format them freely.',
    definition: `export interface IChartVariwideSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        category: string
        value: number
        widthValue: number
        formattedValue: string
        formattedWidth: string
        color: string
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; category: string; value: number; widthValue: number; formattedValue: string; formattedWidth: string; color: string }) => any',
            optional: true,
            descriptionFallback: 'Custom tooltip content. Receives the IChartPoint, category label, raw primary value, raw secondary (width) value, and their pre-formatted strings.',
        },
    ],
    usedBy: [
        { slug: 'chart-variwide', name: 'OrigamChartVariwide', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-variwide.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_variwide_slots.example',
            titleFallback: 'Custom tooltip showing both dimensions',
            code: `<OrigamChartVariwide :series="series">
    <template #tooltip="{ category, formattedValue, formattedWidth }">
        <strong>{{ category }}</strong>
        <div>GDP: {{ formattedValue }}</div>
        <div>Population: {{ formattedWidth }}M</div>
    </template>
</OrigamChartVariwide>`,
            lang: 'vue',
        },
    ],
}
