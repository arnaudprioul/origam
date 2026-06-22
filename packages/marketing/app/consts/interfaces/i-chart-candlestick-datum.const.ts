import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CANDLESTICK_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-candlestick-datum',
    name: 'IChartCandlestickDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_candlestick_datum.description',
    descriptionFallback: 'One OHLC data point in a candlestick series. Supplies the date label plus the four price levels (open, high, low, close) for the period. A datum missing any of the four price fields is silently skipped by the chart.',
    definition: `export interface IChartCandlestickDatum {
    date: string
    open: number
    high: number
    low: number
    close: number
}`,
    extends: [],
    props: [
        { name: 'date', type: 'string', optional: false, descriptionFallback: 'ISO date string or any human-readable label rendered on the X axis.' },
        { name: 'open', type: 'number', optional: false, descriptionFallback: 'Opening price of the period.' },
        { name: 'high', type: 'number', optional: false, descriptionFallback: 'Highest price of the period.' },
        { name: 'low', type: 'number', optional: false, descriptionFallback: 'Lowest price of the period.' },
        { name: 'close', type: 'number', optional: false, descriptionFallback: 'Closing price of the period.' },
    ],
    usedBy: [
        { slug: 'chart-candlestick', name: 'OrigamChartCandlestick', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-candlestick.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_candlestick_datum.example',
            titleFallback: 'Providing OHLC data for a candlestick chart',
            code: `import type { IChartCandlestickDatum } from 'origam'

const data: IChartCandlestickDatum[] = [
    { date: '2024-01-02', open: 150, high: 158, low: 148, close: 155 },
    { date: '2024-01-03', open: 155, high: 160, low: 152, close: 149 },
]`,
            lang: 'typescript',
        },
    ],
}
