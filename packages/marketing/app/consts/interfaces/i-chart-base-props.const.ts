import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BASE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-base-props',
    name: 'IChartBaseProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_base_props.description',
    descriptionFallback: 'Props shared across every origam chart type — extends ICommonsComponentProps, IDimensionProps, IMarginProps, IPaddingProps, IRoundedProps, IElevationProps and IBgColorProps. Covers series data, legend, tooltip, animation, color scheme and aspect ratio.',
    definition: `export interface IChartBaseProps
    extends ICommonsComponentProps,
        IDimensionProps,
        IMarginProps,
        IPaddingProps,
        IRoundedProps,
        IElevationProps,
        IBgColorProps {
    series: Array<IChartSeries>
    categories?: Array<string>
    title?: string
    subtitle?: string
    showLegend?: boolean
    legendPosition?: TChartLegendPosition
    showTooltip?: boolean
    animated?: boolean
    animationDuration?: number
    colorScheme?: Array<TIntent | string>
    aspectRatio?: string
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps', 'IMarginProps', 'IPaddingProps', 'IRoundedProps', 'IElevationProps', 'IBgColorProps'],
    props: [
        { name: 'series', type: 'Array<IChartSeries>', optional: false, descriptionFallback: 'Data series — one or more. An empty array renders the #empty slot.' },
        { name: 'categories', type: 'Array<string>', optional: true, descriptionFallback: 'X axis labels (for line/area/bar/column/radar). Length should match the longest series; missing entries fall back to the numeric index. Ignored for pie/donut/scatter.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Optional title rendered above the plotting area.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Optional subtitle rendered below the title.' },
        { name: 'showLegend', type: 'boolean', optional: true, descriptionFallback: 'Toggle the legend block. Default true.' },
        { name: 'legendPosition', type: 'TChartLegendPosition', optional: true, descriptionFallback: 'Anchor of the legend block. Default bottom.' },
        { name: 'showTooltip', type: 'boolean', optional: true, descriptionFallback: 'Toggle the hover tooltip. Default true.' },
        { name: 'animated', type: 'boolean', optional: true, descriptionFallback: 'Animate paths/bars/slices on first paint and on data changes. Respects prefers-reduced-motion. Default true.' },
        { name: 'animationDuration', type: 'number', optional: true, descriptionFallback: 'Animation duration in ms. Default 600.' },
        { name: 'colorScheme', type: 'Array<TIntent | string>', optional: true, descriptionFallback: 'Palette used when a series does not pin its own color. Accepts intent strings or raw CSS colours. Default cycles through the 8 origam intents.' },
        { name: 'aspectRatio', type: 'string', optional: true, descriptionFallback: "CSS aspect-ratio shortcut ('16/9', '4/3', '1/1'). When set, overrides height and lets the chart breathe with the container width." },
    ],
    usedBy: [
        { slug: 'chart-bar', name: 'OrigamChartBar', kind: 'component' },
        { slug: 'chart-line', name: 'OrigamChartLine', kind: 'component' },
        { slug: 'chart-pie', name: 'OrigamChartPie', kind: 'component' },
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-base.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_base_props.example',
            titleFallback: 'Bar chart using the shared base props',
            code: `<OrigamChartBar
    :series="[{ name: 'Revenue', data: [120, 200, 150, 80] }]"
    :categories="['Q1', 'Q2', 'Q3', 'Q4']"
    title="Quarterly Revenue"
    aspect-ratio="16/9"
    :animation-duration="400"
    :color-scheme="['primary', 'success']"
/>`,
            lang: 'vue',
        },
    ],
}
