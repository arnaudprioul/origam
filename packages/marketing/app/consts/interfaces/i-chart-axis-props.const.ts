import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_AXIS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-axis-props',
    name: 'IChartAxisProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_axis_props.description',
    descriptionFallback: 'Props for OrigamChartAxis — the cartesian-only axes, grid and tick-labels block. Expects pre-computed tick arrays and plot corners from useChart and paints them. No data coupling.',
    definition: `export interface IChartAxisProps {
    plot: {
        x0: number
        y0: number
        x1: number
        y1: number
        cx: number
        cy: number
    }
    ticks: {
        x: Array<IChartTick>
        y: Array<IChartTick>
    }
    secondaryYTicks?: Array<IChartTick>
    showAxis?: boolean
    showGrid?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    secondaryYAxisFormat?: (value: number) => string
}`,
    extends: [],
    props: [
        { name: 'plot', type: '{ x0: number, y0: number, x1: number, y1: number, cx: number, cy: number }', optional: false, descriptionFallback: 'Pixel coordinates of the plotting area four corners. Comes verbatim from useChart().plot.value.' },
        { name: 'ticks', type: '{ x: Array<IChartTick>, y: Array<IChartTick> }', optional: false, descriptionFallback: 'Tick descriptors for X and Y primary left axis. Comes from useChart().ticks.value.' },
        { name: 'secondaryYTicks', type: 'Array<IChartTick>', optional: true, descriptionFallback: 'Tick descriptors for the secondary right Y axis. When provided a second vertical axis is rendered on the right edge of the plot area.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Render the four-corner axis frame and tick labels. When false the component renders nothing.' },
        { name: 'showGrid', type: 'boolean', optional: true, descriptionFallback: 'Render horizontal grid lines under the plot.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis tick labels. Defaults to String(value).' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis tick labels. Defaults to String(value).' },
        { name: 'secondaryYAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to the secondary right Y-axis tick labels. Falls back to yAxisFormat, then String(value).' },
    ],
    usedBy: [
        { slug: 'chart-axis', name: 'OrigamChartAxis', kind: 'component' },
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-axis.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_axis_props.example',
            titleFallback: 'OrigamChartAxis is used internally by cartesian chart families',
            code: `// OrigamChartAxis is an internal sub-component.
// Consumers interact with OrigamChartCartesian or OrigamChartBar
// and pass showAxis / showGrid / xAxisFormat / yAxisFormat on those.
<OrigamChartBar
    :series="series"
    :categories="categories"
    show-axis
    show-grid
    :y-axis-format="(v) => v + 'k'"
/>`,
            lang: 'vue',
        },
    ],
}
