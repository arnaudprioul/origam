import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SPARKLINE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sparkline-props',
    name: 'IChartSparklineProps',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sparkline_props.description',
    descriptionFallback: 'Props for OrigamChartSparkline — the tiny inline-chart family. Sparklines are compact data visualisations for embedding in table cells, KPI cards and dashboards. They have no axes, no legend, no grid by default. Extends IChartBaseProps omitting series, showLegend, legendPosition and colorScheme.',
    definition: `export interface IChartSparklineProps extends Omit<IChartBaseProps, 'series' | 'showLegend' | 'legendPosition' | 'colorScheme'> {
    series: Array<IChartSeries>
    type?: TChartSparklineKind
    color?: TIntent | string
    lineWidth?: number
    showMarkers?: boolean
    showMin?: boolean
    showMax?: boolean
    showLast?: boolean
    markerSize?: number
    width?: number | string
    height?: number | string
}`,
    extends: ['IChartBaseProps'],
    props: [
        {
            name: 'series',
            type: 'Array<IChartSeries>',
            optional: false,
            descriptionFallback: 'Single data series. Data must be Array<number> — only one series is rendered.',
        },
        {
            name: 'type',
            type: 'TChartSparklineKind',
            optional: true,
            default: "'line'",
            descriptionFallback: "Rendering mode. 'line' — polyline connecting data points. 'area' — line with a translucent fill below. 'column' — vertical bars. 'bar' — horizontal bars.",
        },
        {
            name: 'color',
            type: 'TIntent | string',
            optional: true,
            default: "'primary'",
            descriptionFallback: 'Stroke / fill intent or raw CSS colour applied uniformly to the sparkline (no palette cycling).',
        },
        {
            name: 'lineWidth',
            type: 'number',
            optional: true,
            default: '1.5',
            descriptionFallback: 'Stroke width for line and area modes in SVG pixels.',
        },
        {
            name: 'showMarkers',
            type: 'boolean',
            optional: true,
            default: 'false',
            descriptionFallback: 'Render a filled circle marker at every data point. Only meaningful for line and area modes.',
        },
        {
            name: 'showMin',
            type: 'boolean',
            optional: true,
            default: 'false',
            descriptionFallback: 'Highlight the minimum value point in red.',
        },
        {
            name: 'showMax',
            type: 'boolean',
            optional: true,
            default: 'false',
            descriptionFallback: 'Highlight the maximum value point in green.',
        },
        {
            name: 'showLast',
            type: 'boolean',
            optional: true,
            default: 'true',
            descriptionFallback: 'Highlight the last data point in the primary colour.',
        },
        {
            name: 'markerSize',
            type: 'number',
            optional: true,
            default: '2.5',
            descriptionFallback: 'Radius of highlighted marker circles in SVG pixels.',
        },
        {
            name: 'width',
            type: 'number | string',
            optional: true,
            default: '120',
            descriptionFallback: 'CSS width of the sparkline container. Accepts a number (px) or a CSS string (100%, 8rem).',
        },
        {
            name: 'height',
            type: 'number | string',
            optional: true,
            default: '30',
            descriptionFallback: 'CSS height of the sparkline container. Accepts a number (px) or a CSS string (100%, 2rem).',
        },
    ],
    usedBy: [
        { slug: 'chart-sparkline', name: 'ChartSparkline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sparkline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sparkline_props.example',
            titleFallback: 'Embedding a sparkline in a KPI card',
            code: `<OrigamChartSparkline
    :series="[{ name: 'Sales', data: [10, 45, 30, 80, 65] }]"
    type="area"
    color="success"
    :show-max="true"
    :show-last="true"
    width="160"
    height="40"
/>`,
            lang: 'vue',
        },
    ],
}
