import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PARETO_BAR_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pareto-bar',
    name: 'IChartParetoBar',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pareto_bar.description',
    descriptionFallback: 'Pre-computed bar descriptor produced by the Pareto geometry engine. Contains all pre-computed values needed to render one <rect> column, its label, and the cumulative percentage dot.',
    definition: `export interface IChartParetoBar {
    index: number
    category: string
    value: number
    formattedValue: string
    share: number
    cumulative: number
    color: string
    x: number
    y: number
    w: number
    h: number
    cx: number
    dotY: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index in the sorted data array (0 = highest value).' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label from the datum.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value from the datum.' },
        { name: 'formattedValue', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string.' },
        { name: 'share', type: 'number', optional: false, descriptionFallback: 'Individual share of total (0–1).' },
        { name: 'cumulative', type: 'number', optional: false, descriptionFallback: 'Cumulative percentage up to and including this bar (0–1).' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string (for fill).' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'SVG X of the left edge of the bar.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'SVG Y of the top edge of the bar.' },
        { name: 'w', type: 'number', optional: false, descriptionFallback: 'Bar width in SVG pixels.' },
        { name: 'h', type: 'number', optional: false, descriptionFallback: 'Bar height in SVG pixels.' },
        { name: 'cx', type: 'number', optional: false, descriptionFallback: 'X center of the bar — used for the X-axis tick label and cumulative line dot.' },
        { name: 'dotY', type: 'number', optional: false, descriptionFallback: 'Y of the cumulative percentage dot on the right Y-axis scale.' },
    ],
    usedBy: [
        { slug: 'chart-pareto', name: 'ChartPareto', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pareto.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pareto_bar.example',
            titleFallback: 'Accessing bar descriptors from the Pareto engine',
            code: `import { useChartPareto } from 'origam'

const { bars } = useChartPareto(props)
// bars.value is IChartParetoBar[]
bars.value.forEach(bar => {
    console.log(bar.category, bar.share, bar.cumulative)
})`,
            lang: 'typescript',
        },
    ],
}
