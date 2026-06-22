import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HEATMAP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-heatmap-props',
    name: 'IChartHeatmapProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_heatmap_props.description',
    descriptionFallback: 'Props for <OrigamChartHeatmap> — rectangular heatmap grid where each cell is coloured by its value relative to the dataset min/max. Extends IChartBaseProps.',
    definition: `export interface IChartHeatmapProps extends IChartBaseProps {
    xCategories?: Array<string>
    yCategories?: Array<string>
    colorRange?: [TIntent | string, TIntent | string]
    cellGap?: number
    showLabel?: boolean
    showAxis?: boolean
    showGradientLegend?: boolean
    legendPosition?: TChartLegendPosition
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'xCategories', type: 'Array<string>', optional: true, descriptionFallback: 'Explicit X-axis category ordering. When omitted, unique x values are sorted alphabetically / numerically.' },
        { name: 'yCategories', type: 'Array<string>', optional: true, descriptionFallback: 'Explicit Y-axis category ordering. When omitted, unique y values are sorted alphabetically / numerically.' },
        { name: 'colorRange', type: '[TIntent | string, TIntent | string]', optional: true, descriptionFallback: 'Two-stop colour range used to interpolate cell colour. First entry = min value colour, second = max value colour. Default [\'info\', \'danger\'].' },
        { name: 'cellGap', type: 'number', optional: true, descriptionFallback: 'Gap between cells in SVG user units. Default 2.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Render the numeric value centred inside each cell when the cell is wide/tall enough. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Render X and Y axis category labels along the grid edges. Default true.' },
        { name: 'showGradientLegend', type: 'boolean', optional: true, descriptionFallback: 'Gradient legend bar with min / max labels. Default true.' },
        { name: 'legendPosition', type: 'TChartLegendPosition', optional: true, descriptionFallback: 'Anchor of the gradient legend. Default \'bottom\'.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'X-axis category label formatter. Applied to each column label.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis / value formatter. Applied to row labels AND to the min/max labels on the gradient legend.' },
    ],
    usedBy: [
        { slug: 'chart-heatmap', name: 'ChartHeatmap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-heatmap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_heatmap_props.example',
            titleFallback: 'GitHub-style activity heatmap',
            code: `<OrigamChartHeatmap
    :series="[{ name: 'Commits', data: [...] }]"
    :color-range="['info', 'success']"
    :cell-gap="3"
    :show-gradient-legend="true"
/>`,
            lang: 'vue',
        },
    ],
}
