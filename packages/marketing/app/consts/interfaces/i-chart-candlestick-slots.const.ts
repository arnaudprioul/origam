import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CANDLESTICK_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-candlestick-slots',
    name: 'IChartCandlestickSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_candlestick_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartCandlestick>. Extends IChartBaseSlots with an enriched tooltip slot that receives the full OHLC datum plus pre-computed change and direction.',
    definition: `export interface IChartCandlestickSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        series: IChartBaseProps['series'][0]
        category: string | number
        datum: IChartCandlestickDatum
        change: number
        changePct: number
        isBullish: boolean
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; series: IChartBaseProps[\'series\'][0]; category: string | number; datum: IChartCandlestickDatum; change: number; changePct: number; isBullish: boolean }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip card. Receives the usual point / series / category bindings plus the full OHLC datum, change value, change percentage, and bullish direction flag.',
        },
    ],
    usedBy: [
        { slug: 'chart-candlestick', name: 'OrigamChartCandlestick', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-candlestick.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_candlestick_slots.example',
            titleFallback: 'Custom OHLC tooltip with change percentage',
            code: `<OrigamChartCandlestick :series="series">
    <template #tooltip="{ datum, changePct, isBullish }">
        <p>O: {{ datum.open }} H: {{ datum.high }} L: {{ datum.low }} C: {{ datum.close }}</p>
        <p :class="isBullish ? 'text-success' : 'text-danger'">
            {{ changePct.toFixed(2) }}%
        </p>
    </template>
</OrigamChartCandlestick>`,
            lang: 'vue',
        },
    ],
}
