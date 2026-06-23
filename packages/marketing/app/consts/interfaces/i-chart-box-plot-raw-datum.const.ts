import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BOX_PLOT_RAW_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-box-plot-raw-datum',
    name: 'IChartBoxPlotRawDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_box_plot_raw_datum.description',
    descriptionFallback: 'Raw-samples datum for OrigamChartBoxPlot — the component derives the five-number summary via Tukey\'s method (linear interpolation) and detects outliers at the 1.5·IQR fence automatically. Use IChartBoxPlotDatum when the aggregation has already been done.',
    definition: `export interface IChartBoxPlotRawDatum {
    category: string
    samples: Array<number>
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label shown on the X axis.' },
        { name: 'samples', type: 'Array<number>', optional: false, descriptionFallback: 'Array of individual observations. Must contain at least 4 values for meaningful quartile computation. Fewer values are handled gracefully: all map to the same min/q1/median/q3/max.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Override colour for this datum. Intent token or raw CSS colour. When absent the category index cycles through colorScheme.' },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_box_plot_raw_datum.example',
            titleFallback: 'Passing raw sample arrays — let the component compute quartiles',
            code: `import type { IChartBoxPlotRawDatum } from 'origam'

const data: IChartBoxPlotRawDatum[] = [
    {
        category: 'Server A',
        samples: [120, 135, 142, 150, 155, 160, 210, 300],
        color: 'primary',
    },
    {
        category: 'Server B',
        samples: [80, 90, 95, 100, 102, 108, 115],
    },
]`,
            lang: 'typescript',
        },
    ],
}
