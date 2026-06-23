import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BOX_PLOT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-box-plot-props',
    name: 'IChartBoxPlotProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_box_plot_props.description',
    descriptionFallback: 'Props for OrigamChartBoxPlot — extends IChartBaseProps with box-plot-specific controls: category order, box width, whisker cap width, outlier visibility, axis/grid visibility, Y-axis range overrides and axis label formatters.',
    definition: `export interface IChartBoxPlotProps extends IChartBaseProps {
    categories?: Array<string>
    boxWidth?: number
    whiskerCapWidth?: number
    showOutliers?: boolean
    showAxis?: boolean
    showGrid?: boolean
    yMin?: number
    yMax?: number
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'categories', type: 'Array<string>', optional: true, descriptionFallback: 'Explicit category order. When absent the order is inferred from the first occurrence of each category in series[0].data.' },
        { name: 'boxWidth', type: 'number', optional: true, descriptionFallback: 'Box width as a fraction of the per-category slot width. Range [0, 1]. Default 0.6.' },
        { name: 'whiskerCapWidth', type: 'number', optional: true, descriptionFallback: 'Whisker cap width as a fraction of the per-category slot width. Range [0, 1]. Default 0.4.' },
        { name: 'showOutliers', type: 'boolean', optional: true, descriptionFallback: 'Render outlier dots beyond the whisker fences. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Render X and Y axes. Default true.' },
        { name: 'showGrid', type: 'boolean', optional: true, descriptionFallback: 'Render horizontal grid lines. Default true.' },
        { name: 'yMin', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y-axis minimum. When absent the component uses min(data) − 10% padding.' },
        { name: 'yMax', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y-axis maximum. When absent the component uses max(data) + 10% padding.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis category labels. Default: identity (category string returned as-is).' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis tick values. Default: String(value).' },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_box_plot_props.example',
            titleFallback: 'Box plot with custom box width and Y-axis formatter',
            code: `<OrigamChartBoxPlot
    :series="series"
    :categories="['Control', 'Treatment A', 'Treatment B']"
    :box-width="0.5"
    :whisker-cap-width="0.3"
    show-outliers
    :y-axis-format="(v) => v + ' ms'"
    aspect-ratio="4/3"
/>`,
            lang: 'vue',
        },
    ],
}
