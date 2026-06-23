import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CARTESIAN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-cartesian-props',
    name: 'IChartCartesianProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_cartesian_props.description',
    descriptionFallback: 'Props for <OrigamChartCartesian> — the cartesian family component. Owns the X+Y plotting area and all cartesian topologies: line, area, bar, column, scatter, spline, stepped-line. Supports stacking, smoothing, drilldown, zoom, annotations, plot bands/lines, and a secondary Y axis.',
    definition: `export interface IChartCartesianProps extends IChartBaseProps {
    type?: TChartCartesianKind
    stacked?: boolean
    stacking?: TChartStacking
    smoothing?: TChartSmoothing
    yMin?: number
    yMax?: number
    showGrid?: boolean
    showAxis?: boolean
    showTooltip?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    secondaryYAxis?: IChartSecondaryYAxis
    plotBands?: Array<IChartPlotBand>
    plotLines?: Array<IChartPlotLine>
    drilldown?: IChartDrilldownProps
    zoomable?: boolean
    rangeSelector?: IChartRangeSelector
    annotations?: Array<IChartAnnotation>
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'type', type: 'TChartCartesianKind', optional: true, default: "'line'", descriptionFallback: "Cartesian visualisation primitive. Default 'line'." },
        { name: 'stacked', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Stack series on top of each other. Applies to bar, column, and area. Default false.' },
        { name: 'stacking', type: 'TChartStacking', optional: true, descriptionFallback: "Stacking mode when stacked=true. 'normal' = raw absolute values. 'percent' = every stack normalised to 100%." },
        { name: 'smoothing', type: 'TChartSmoothing', optional: true, descriptionFallback: "Smoothing strategy for line / area / spline. Default 'none' for line/area, 'monotone' for spline." },
        { name: 'yMin', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y min.' },
        { name: 'yMax', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed Y max.' },
        { name: 'showGrid', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render grid lines behind the plot. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Render X / Y axes + tick labels. Default true.' },
        { name: 'showTooltip', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Toggle the hover tooltip. Default true.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to X-axis tick labels.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to Y-axis tick labels.' },
        { name: 'secondaryYAxis', type: 'IChartSecondaryYAxis', optional: true, descriptionFallback: 'Configuration for the secondary (right-hand) Y axis. Series with yAxis: 1 are projected against this scale.' },
        { name: 'plotBands', type: 'Array<IChartPlotBand>', optional: true, descriptionFallback: 'Coloured rectangular zones drawn behind or above the chart data.' },
        { name: 'plotLines', type: 'Array<IChartPlotLine>', optional: true, descriptionFallback: 'Threshold lines drawn at a fixed axis value.' },
        { name: 'drilldown', type: 'IChartDrilldownProps', optional: true, descriptionFallback: 'Drilldown configuration. Data points carrying an IChartDrilldownLink trigger chart-level navigation on click.' },
        { name: 'zoomable', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Enable zoom / pan interactions: drag to zoom, shift+scroll, ctrl+drag. Default false.' },
        { name: 'rangeSelector', type: 'IChartRangeSelector', optional: true, descriptionFallback: 'Optional band-style range-selector toolbar with preset zoom buttons (1w, 1m, 3m, 6m, 1y, all).' },
        { name: 'annotations', type: 'Array<IChartAnnotation>', optional: true, descriptionFallback: "Overlay annotations drawn on top of the series layer. Four kinds: 'arrow', 'label', 'circle', 'bracket'." },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-cartesian.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_cartesian_props.example',
            titleFallback: 'Stacked column chart with zoom and a plot line',
            code: `<OrigamChartCartesian
    type="column"
    :series="series"
    :categories="months"
    :stacked="true"
    stacking="percent"
    :zoomable="true"
    :plot-lines="[{ value: 50, color: 'danger', label: 'Threshold' }]"
/>`,
            lang: 'vue',
        },
    ],
}
