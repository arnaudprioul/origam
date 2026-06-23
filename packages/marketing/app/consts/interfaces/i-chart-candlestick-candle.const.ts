import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CANDLESTICK_CANDLE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-candlestick-candle',
    name: 'IChartCandlestickCandle',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_candlestick_candle.description',
    descriptionFallback: 'Resolved per-candle descriptor produced by the geometry engine inside OrigamChartCandlestick. All numeric fields are expressed in SVG user-units; pre-computes change and direction so the template renders without arithmetic.',
    definition: `export interface IChartCandlestickCandle {
    index: number
    datum: IChartCandlestickDatum
    cx: number
    bodyX: number
    bodyY: number
    bodyWidth: number
    bodyHeight: number
    wickTop: number
    wickBottom: number
    color: string
    isBullish: boolean
    change: number
    changePct: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index in the data array.' },
        { name: 'datum', type: 'IChartCandlestickDatum', optional: false, descriptionFallback: 'The raw OHLC datum.' },
        { name: 'cx', type: 'number', optional: false, descriptionFallback: 'Center X of the slot.' },
        { name: 'bodyX', type: 'number', optional: false, descriptionFallback: 'Body left X.' },
        { name: 'bodyY', type: 'number', optional: false, descriptionFallback: 'Body top Y (min of yOpen, yClose).' },
        { name: 'bodyWidth', type: 'number', optional: false, descriptionFallback: 'Body width in SVG-px.' },
        { name: 'bodyHeight', type: 'number', optional: false, descriptionFallback: 'Body height in SVG-px.' },
        { name: 'wickTop', type: 'number', optional: false, descriptionFallback: 'Wick top Y (yHigh).' },
        { name: 'wickBottom', type: 'number', optional: false, descriptionFallback: 'Wick bottom Y (yLow).' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string for the candle.' },
        { name: 'isBullish', type: 'boolean', optional: false, descriptionFallback: 'true when close >= open.' },
        { name: 'change', type: 'number', optional: false, descriptionFallback: 'Pre-computed change (close - open).' },
        { name: 'changePct', type: 'number', optional: false, descriptionFallback: 'Pre-computed percentage change.' },
    ],
    usedBy: [
        { slug: 'chart-candlestick', name: 'OrigamChartCandlestick', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-candlestick.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_candlestick_candle.example',
            titleFallback: 'Reading candle data in a custom tooltip slot',
            code: `<OrigamChartCandlestick :series="ohlcSeries">
    <template #tooltip="{ datum, change, changePct, isBullish }">
        <p>O: {{ datum.open }} H: {{ datum.high }} L: {{ datum.low }} C: {{ datum.close }}</p>
        <p :class="isBullish ? 'success' : 'danger'">{{ changePct.toFixed(2) }}%</p>
    </template>
</OrigamChartCandlestick>`,
            lang: 'vue',
        },
    ],
}
