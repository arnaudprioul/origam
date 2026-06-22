import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BOX_PLOT_BOX_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-box-plot-box',
    name: 'IChartBoxPlotBox',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_box_plot_box.description',
    descriptionFallback: 'Internal box descriptor produced by the OrigamChartBoxPlot geometry engine for each category slot. All coordinates are in SVG-space pixels. Consumed directly by the SVG renderer and exposed through the #tooltip slot.',
    definition: `export interface IChartBoxPlotBox {
    index: number
    category: string
    stats: {
        min: number
        q1: number
        median: number
        q3: number
        max: number
    }
    rawStats: {
        min: number
        q1: number
        median: number
        q3: number
        max: number
    }
    iqr: number
    svgQ3: number
    svgQ1: number
    svgMedian: number
    svgMax: number
    svgMin: number
    boxHeight: number
    cx: number
    halfBoxW: number
    halfCapW: number
    color: string
    outliers: Array<{ svgY: number, value: number }>
    visible: boolean
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Category index (position in the data array).' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label.' },
        { name: 'stats', type: '{ min: number, q1: number, median: number, q3: number, max: number }', optional: false, descriptionFallback: 'Resolved five-number summary already coerced to SVG Y coords.' },
        { name: 'rawStats', type: '{ min: number, q1: number, median: number, q3: number, max: number }', optional: false, descriptionFallback: 'Raw numeric five-number summary in data-space values.' },
        { name: 'iqr', type: 'number', optional: false, descriptionFallback: 'IQR = Q3 − Q1 in data space.' },
        { name: 'svgQ3', type: 'number', optional: false, descriptionFallback: 'SVG Y coordinate for Q3 (top of box rect).' },
        { name: 'svgQ1', type: 'number', optional: false, descriptionFallback: 'SVG Y coordinate for Q1 (bottom of box rect).' },
        { name: 'svgMedian', type: 'number', optional: false, descriptionFallback: 'SVG Y coordinate for the median line.' },
        { name: 'svgMax', type: 'number', optional: false, descriptionFallback: 'SVG Y coordinate for the upper whisker tip.' },
        { name: 'svgMin', type: 'number', optional: false, descriptionFallback: 'SVG Y coordinate for the lower whisker tip.' },
        { name: 'boxHeight', type: 'number', optional: false, descriptionFallback: 'Pre-computed box rectangle height (|svgQ1 − svgQ3|) to avoid template-level Math.abs().' },
        { name: 'cx', type: 'number', optional: false, descriptionFallback: 'SVG X centre of the slot.' },
        { name: 'halfBoxW', type: 'number', optional: false, descriptionFallback: 'Half-width of the box rectangle.' },
        { name: 'halfCapW', type: 'number', optional: false, descriptionFallback: 'Half-width of the whisker cap segment.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string for this box.' },
        { name: 'outliers', type: 'Array<{ svgY: number, value: number }>', optional: false, descriptionFallback: 'SVG Y coordinates and raw values of each outlier dot.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this box is currently visible after legend toggle.' },
    ],
    usedBy: [
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-box-plot.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_box_plot_box.example',
            titleFallback: 'Accessing IChartBoxPlotBox in the #tooltip slot',
            code: `<OrigamChartBoxPlot :series="series">
    <template #tooltip="{ box }">
        <div>
            <p>Median: {{ box.rawStats.median }}</p>
            <p>IQR: {{ box.iqr }}</p>
            <p>Outliers: {{ box.outliers.length }}</p>
        </div>
    </template>
</OrigamChartBoxPlot>`,
            lang: 'vue',
        },
    ],
}
