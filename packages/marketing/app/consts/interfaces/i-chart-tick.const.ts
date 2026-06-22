import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TICK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-tick',
    name: 'IChartTick',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_tick.description',
    descriptionFallback: 'A single tick rendered along a chart axis. position is the SVG pixel coordinate, label the already-formatted string to display, and value the original data value before formatting.',
    definition: `export interface IChartTick {
    position: number
    label: string
    value: number | string
}`,
    extends: [],
    props: [
        {
            name: 'position',
            type: 'number',
            optional: false,
            descriptionFallback: 'SVG pixel coordinate where this tick is drawn on the axis.',
        },
        {
            name: 'label',
            type: 'string',
            optional: false,
            descriptionFallback: 'Already-formatted string rendered as the tick label.',
        },
        {
            name: 'value',
            type: 'number | string',
            optional: false,
            descriptionFallback: 'Original data value before formatting — numeric for Y axes, string for categorical X axes.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
        { slug: 'chart-axis', name: 'ChartAxis', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_tick.example',
            titleFallback: 'IChartTick array produced by useChart',
            code: `import type { IChartTick } from 'origam'

// Example Y-axis ticks produced by the chart engine:
const yTicks: IChartTick[] = [
    { position: 280, label: '0',   value: 0 },
    { position: 210, label: '250', value: 250 },
    { position: 140, label: '500', value: 500 },
]`,
            lang: 'typescript',
        },
    ],
}
