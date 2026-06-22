import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-props',
    name: 'IChartProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_props.description',
    descriptionFallback: 'Props accepted by <OrigamChart> — the universal chart component supporting eight visualisation primitives (line, area, bar, column, scatter, pie, donut, radar, gauge). The type prop selects the path generator inside useChart. Extends ICommonsComponentProps, IDimensionProps, IMarginProps, IPaddingProps, IRoundedProps, IElevationProps, IBgColorProps.',
    definition: `export interface IChartProps
    extends ICommonsComponentProps,
        IDimensionProps,
        IMarginProps,
        IPaddingProps,
        IRoundedProps,
        IElevationProps,
        IBgColorProps {
    type?: TChartType
    series: Array<IChartSeries>
    categories?: Array<string>
    title?: string
    subtitle?: string
    showLegend?: boolean
    legendPosition?: TChartLegendPosition
    showTooltip?: boolean
    showGrid?: boolean
    showAxis?: boolean
    animated?: boolean
    animationDuration?: number
    stacked?: boolean
    stacking?: TChartStacking
    donutHoleSize?: number
    colorScheme?: Array<TIntent | string>
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    aspectRatio?: string
    smoothing?: TChartSmoothing
    yMin?: number
    yMax?: number
    gaugeMin?: number
    gaugeMax?: number
    gaugeUnit?: string
    plotBands?: Array<IChartPlotBand>
    plotLines?: Array<IChartPlotLine>
    annotations?: Array<IChartAnnotation>
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps', 'IMarginProps', 'IPaddingProps', 'IRoundedProps', 'IElevationProps', 'IBgColorProps'],
    props: [
        { name: 'type', type: 'TChartType', optional: true, descriptionFallback: 'Visualisation primitive. Default "line".' },
        { name: 'series', type: 'Array<IChartSeries>', optional: false, descriptionFallback: 'Data series — one or more. Empty array renders the #empty slot.' },
        { name: 'categories', type: 'Array<string>', optional: true, descriptionFallback: 'X axis labels (for line/area/bar/column/radar). Length should match the longest series; missing entries fall back to the numeric index.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Optional title rendered above the plotting area.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Optional subtitle rendered below the title.' },
        { name: 'showLegend', type: 'boolean', optional: true, descriptionFallback: 'Toggle the legend block. Default true.' },
        { name: 'legendPosition', type: 'TChartLegendPosition', optional: true, descriptionFallback: 'Anchor of the legend block. Default "bottom".' },
        { name: 'showTooltip', type: 'boolean', optional: true, descriptionFallback: 'Toggle the hover tooltip. Default true.' },
        { name: 'showGrid', type: 'boolean', optional: true, descriptionFallback: 'Render grid lines behind the plot. Ignored for pie/donut/radar. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Render X / Y axes + tick labels. Ignored for pie/donut. Default true.' },
        { name: 'animated', type: 'boolean', optional: true, descriptionFallback: 'Animate paths / bars / slices on first paint and on data changes. Respects prefers-reduced-motion. Default true.' },
        { name: 'animationDuration', type: 'number', optional: true, descriptionFallback: 'Animation duration in ms. Default 600.' },
        { name: 'stacked', type: 'boolean', optional: true, descriptionFallback: 'Stack series on bar / column. Default false.' },
        { name: 'stacking', type: 'TChartStacking', optional: true, descriptionFallback: 'Stacking mode when stacked=true. "normal" = raw absolute values (default); "percent" = every stack normalised to 100%.' },
        { name: 'donutHoleSize', type: 'number', optional: true, descriptionFallback: 'Inner-radius proportion for donut. 0 collapses to a pie, 1 to a ring of zero thickness. Default 0.6 when type === "donut".' },
        { name: 'colorScheme', type: 'Array<TIntent | string>', optional: true, descriptionFallback: 'Palette used when a series does not pin its own color. Default cycles through the 8 origam intents.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis tick labels.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis tick labels.' },
        { name: 'aspectRatio', type: 'string', optional: true, descriptionFallback: 'CSS aspect-ratio shortcut ("16/9", "4/3", "1/1"…). When set, overrides height and lets the chart breathe with the container width.' },
        { name: 'smoothing', type: 'TChartSmoothing', optional: true, descriptionFallback: 'Smoothing strategy for line/area. Default "none" — straight segments. "curve" uses cubic Bezier with Catmull-Rom tangents.' },
        { name: 'yMin', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y min.' },
        { name: 'yMax', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y max.' },
        { name: 'gaugeMin', type: 'number', optional: true, descriptionFallback: 'Lower bound of the gauge range. Ignored unless type="gauge". Default 0.' },
        { name: 'gaugeMax', type: 'number', optional: true, descriptionFallback: 'Upper bound of the gauge range. Ignored unless type="gauge". Default 100.' },
        { name: 'gaugeUnit', type: 'string', optional: true, descriptionFallback: 'Optional unit appended to the gauge centre label (e.g. "%", " km/h"). Ignored unless type="gauge".' },
        { name: 'plotBands', type: 'Array<IChartPlotBand>', optional: true, descriptionFallback: 'Coloured rectangular zones drawn behind (or above) chart data. Forwarded to cartesian charts only.' },
        { name: 'plotLines', type: 'Array<IChartPlotLine>', optional: true, descriptionFallback: 'Threshold lines drawn at a fixed axis value. Forwarded to cartesian charts only.' },
        { name: 'annotations', type: 'Array<IChartAnnotation>', optional: true, descriptionFallback: 'Overlay annotations drawn on top of the series layer. Forwarded to cartesian charts only. Four kinds: "arrow", "label", "circle", "bracket".' },
    ],
    usedBy: [
        { slug: 'chart', name: 'OrigamChart', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_props.example',
            titleFallback: 'Universal chart with stacked bars and a plot line',
            code: `<OrigamChart
    type="bar"
    :series="[
        { name: 'Q1', data: [30, 50, 20] },
        { name: 'Q2', data: [40, 35, 45] }
    ]"
    :categories="['Jan', 'Feb', 'Mar']"
    stacked
    stacking="percent"
    :plotLines="[{ axis: 'y', value: 50, color: 'danger', label: 'Target' }]"
    aspectRatio="16/9"
/>`,
            lang: 'vue',
        },
    ],
}
