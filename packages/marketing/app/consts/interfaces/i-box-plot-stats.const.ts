import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BOX_PLOT_STATS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-box-plot-stats',
    name: 'IBoxPlotStats',
    category: 'Data & Models',
    descriptionKey: 'interfaces.catalog.i_box_plot_stats.description',
    descriptionFallback: 'Five-number summary and outlier list produced by the computeQuartiles utility — exported so consumers can type the return value without importing the utility directly.',
    definition: `export interface IBoxPlotStats {
    min: number
    q1: number
    median: number
    q3: number
    max: number
    iqr: number
    outliers: Array<number>
}`,
    extends: [],
    props: [
        { name: 'min', type: 'number', optional: false, descriptionFallback: 'Minimum non-outlier value (lower whisker tip).' },
        { name: 'q1', type: 'number', optional: false, descriptionFallback: 'First quartile (25th percentile).' },
        { name: 'median', type: 'number', optional: false, descriptionFallback: 'Median (50th percentile).' },
        { name: 'q3', type: 'number', optional: false, descriptionFallback: 'Third quartile (75th percentile).' },
        { name: 'max', type: 'number', optional: false, descriptionFallback: 'Maximum non-outlier value (upper whisker tip).' },
        { name: 'iqr', type: 'number', optional: false, descriptionFallback: 'Interquartile range — IQR = Q3 − Q1.' },
        { name: 'outliers', type: 'Array<number>', optional: false, descriptionFallback: 'Values outside the 1.5·IQR fences.' },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'ChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_box_plot_stats.example',
            titleFallback: 'Typing computeQuartiles return value',
            code: `import type { IBoxPlotStats } from 'origam'

const stats: IBoxPlotStats = computeQuartiles(samples)
console.log(stats.median, stats.iqr, stats.outliers)`,
            lang: 'typescript',
        },
    ],
}
