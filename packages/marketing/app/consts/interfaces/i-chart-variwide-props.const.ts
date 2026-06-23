import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_VARIWIDE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-variwide-props',
    name: 'IChartVariwideProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_variwide_props.description',
    descriptionFallback: 'Props for <OrigamChartVariwide>. A variwide chart encodes two metrics per category: height for the primary value (Y axis) and width for the secondary value (proportional share of the plot width). Typical uses: GDP × population, revenue × market share, response time × request count.',
    definition: `export interface IChartVariwideProps extends IChartBaseProps {
    barGap?: number
    showLabel?: boolean
    showAxis?: boolean
    showGrid?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    yMin?: number
    yMax?: number
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'barGap', type: 'number', optional: true, default: '2', descriptionFallback: 'Gap in SVG pixels between adjacent columns.' },
        { name: 'showLabel', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Show the value label above each column.' },
        { name: 'showAxis', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render X (category) and Y (value) axes.' },
        { name: 'showGrid', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render horizontal grid lines aligned with Y-axis ticks.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis category tick labels. When omitted the category string is shown as-is.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis value tick labels and to the primary-value display in tooltip and above-bar label.' },
        { name: 'yMin', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y minimum. Useful when the data starts well above zero.' },
        { name: 'yMax', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y maximum.' },
    ],
    usedBy: [
        { slug: 'chart-variwide', name: 'OrigamChartVariwide', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-variwide.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_variwide_props.example',
            titleFallback: 'GDP × population variwide chart',
            code: `<OrigamChartVariwide
    :series="[{ name: 'GDP', data: gdpData }]"
    :bar-gap="4"
    :show-label="true"
    :y-axis-format="v => v.toFixed(1) + 'T'"
/>`,
            lang: 'vue',
        },
    ],
}
