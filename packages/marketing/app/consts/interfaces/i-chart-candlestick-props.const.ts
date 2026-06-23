import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CANDLESTICK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-candlestick-props',
    name: 'IChartCandlestickProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_candlestick_props.description',
    descriptionFallback: 'Props for <OrigamChartCandlestick> — the financial OHLC chart. Renders one candlestick per datum with a body between open/close and a wick from low to high. Extends IChartBaseProps (omitting categories).',
    definition: `export interface IChartCandlestickProps extends Omit<IChartBaseProps, 'categories'> {
    height?: number | string
    bullishColor?: TIntent | string
    bearishColor?: TIntent | string
    candleWidth?: number
    wickWidth?: number
    showLegend?: boolean
    showTooltip?: boolean
    showGrid?: boolean
    showAxis?: boolean
    yMin?: number
    yMax?: number
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'height', type: 'number | string', optional: true, default: '400', descriptionFallback: 'Chart height. Accepts a number (interpreted as px) or any valid CSS length. Ignored when aspectRatio is set.' },
        { name: 'bullishColor', type: 'TIntent | string', optional: true, default: "'success'", descriptionFallback: "Fill colour for bullish candles (close >= open). Default 'success'." },
        { name: 'bearishColor', type: 'TIntent | string', optional: true, default: "'danger'", descriptionFallback: "Fill colour for bearish candles (close < open). Default 'danger'." },
        { name: 'candleWidth', type: 'number', optional: true, default: '0.6', descriptionFallback: 'Fraction of the per-slot width occupied by the candle body [0..1]. Default 0.6.' },
        { name: 'wickWidth', type: 'number', optional: true, default: '1', descriptionFallback: 'Wick stroke width in SVG user-units. Default 1.' },
        { name: 'showLegend', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Toggle the legend. Candlestick charts rarely need a legend — default is false.' },
        { name: 'showTooltip', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Toggle the hover tooltip. Default true.' },
        { name: 'showGrid', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render background grid lines. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render X / Y axes + tick labels. Default true.' },
        { name: 'yMin', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y axis minimum. When omitted derived from min(low) with 5% padding.' },
        { name: 'yMax', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y axis maximum. When omitted derived from max(high) with 5% padding.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis (date) tick labels.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis (price) tick labels.' },
    ],
    usedBy: [
        { slug: 'chart-candlestick', name: 'OrigamChartCandlestick', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-candlestick.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_candlestick_props.example',
            titleFallback: 'Basic OHLC candlestick chart setup',
            code: `<OrigamChartCandlestick
    :series="[{ name: 'AAPL', data: ohlcData }]"
    bullish-color="success"
    bearish-color="danger"
    :candle-width="0.7"
    :show-axis="true"
/>`,
            lang: 'vue',
        },
    ],
}
