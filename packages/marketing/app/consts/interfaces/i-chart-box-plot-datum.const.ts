import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BOX_PLOT_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-box-plot-datum',
    name: 'IChartBoxPlotDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_box_plot_datum.description',
    descriptionFallback: 'Pre-aggregated datum for OrigamChartBoxPlot — the consumer supplies all five-number-summary values (min, q1, median, q3, max) and optional outlier array directly. Use IChartBoxPlotRawDatum when raw samples should be aggregated by the component.',
    definition: `export interface IChartBoxPlotDatum {
    category: string
    min: number
    q1: number
    median: number
    q3: number
    max: number
    outliers?: Array<number>
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label shown on the X axis.' },
        { name: 'min', type: 'number', optional: false, descriptionFallback: 'Minimum (lower fence or true min when no outliers).' },
        { name: 'q1', type: 'number', optional: false, descriptionFallback: 'First quartile — Q1 (25th percentile).' },
        { name: 'median', type: 'number', optional: false, descriptionFallback: 'Median — Q2 (50th percentile).' },
        { name: 'q3', type: 'number', optional: false, descriptionFallback: 'Third quartile — Q3 (75th percentile).' },
        { name: 'max', type: 'number', optional: false, descriptionFallback: 'Maximum (upper fence or true max when no outliers).' },
        { name: 'outliers', type: 'Array<number>', optional: true, descriptionFallback: 'Values lying outside the 1.5·IQR whisker fences.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Override colour for this datum. Intent token or raw CSS colour. When absent the category index cycles through colorScheme.' },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_box_plot_datum.example',
            titleFallback: 'Pre-aggregated box plot data',
            code: `import type { IChartBoxPlotDatum } from 'origam'

const data: IChartBoxPlotDatum[] = [
    { category: 'Group A', min: 10, q1: 25, median: 40, q3: 60, max: 80, outliers: [5, 95] },
    { category: 'Group B', min: 20, q1: 35, median: 50, q3: 70, max: 90, color: 'success' },
]`,
            lang: 'typescript',
        },
    ],
}
