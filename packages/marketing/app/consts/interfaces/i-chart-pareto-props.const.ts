import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PARETO_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pareto-props',
    name: 'IChartParetoProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pareto_props.description',
    descriptionFallback: 'Props for <OrigamChartPareto> — combines vertical columns sorted descending by value with a cumulative percentage line on a secondary right Y-axis. Typical uses: quality control, root-cause analysis, 80/20 rule. Extends IChartBaseProps.',
    definition: `export interface IChartParetoProps extends IChartBaseProps {
    barColor?: TIntent | string
    lineColor?: TIntent | string
    barGap?: number
    showLine?: boolean
    showLabel?: boolean
    showAxis?: boolean
    showGrid?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    cumulativeFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'barColor', type: 'TIntent | string', optional: true, descriptionFallback: 'Colour of all columns. Accepts a TIntent token or any raw CSS colour string. Default \'primary\'.' },
        { name: 'lineColor', type: 'TIntent | string', optional: true, descriptionFallback: 'Colour of the cumulative percentage line. Default \'danger\'.' },
        { name: 'barGap', type: 'number', optional: true, descriptionFallback: 'Gap in SVG pixels between adjacent columns. Default 4.' },
        { name: 'showLine', type: 'boolean', optional: true, descriptionFallback: 'Whether to render the cumulative percentage line. Default true.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Whether to show a value label above each column. Default false.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Render X (category) and Y (value + percentage) axes. Default true.' },
        { name: 'showGrid', type: 'boolean', optional: true, descriptionFallback: 'Render horizontal grid lines aligned with Y-axis ticks. Default true.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis category tick labels.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to the left Y-axis (value) tick labels.' },
        { name: 'cumulativeFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to the right Y-axis (cumulative %) tick labels. Default formats as rounded integer percentage, e.g. "80%".' },
    ],
    usedBy: [
        { slug: 'chart-pareto', name: 'ChartPareto', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pareto.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pareto_props.example',
            titleFallback: 'Pareto chart for defect root-cause analysis',
            code: `<OrigamChartPareto
    :series="[{ name: 'Defects', data: defects }]"
    bar-color="primary"
    line-color="danger"
    :show-label="true"
    :cumulative-format="v => \`\${Math.round(v * 100)}%\`"
/>`,
            lang: 'vue',
        },
    ],
}
