import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TOOLTIP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-tooltip-props',
    name: 'IChartTooltipProps',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_tooltip_props.description',
    descriptionFallback: 'Props for OrigamChartTooltip — the floating card that follows the cursor and shows the current data point. Extracted from the legacy OrigamChart so every chart family can share the same rendering and slot API. Position is driven by x/y pixel coordinates; no Popper.js dependency.',
    definition: `export interface IChartTooltipProps {
    point: IChartPoint | null
    series: IChartSeries | null
    category: string | number
    x: number
    y: number
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: [],
    props: [
        {
            name: 'point',
            type: 'IChartPoint | null',
            optional: false,
            descriptionFallback: 'Hovered point payload (denormalised). When null the tooltip is hidden entirely.',
        },
        {
            name: 'series',
            type: 'IChartSeries | null',
            optional: false,
            descriptionFallback: 'Hovered series reference. Companion to point. Hidden when null even if point is set.',
        },
        {
            name: 'category',
            type: 'string | number',
            optional: false,
            descriptionFallback: 'Friendly category for the X axis — string for categorical axes, number otherwise.',
        },
        {
            name: 'x',
            type: 'number',
            optional: false,
            descriptionFallback: 'Mouse X position relative to the chart body, in pixels.',
        },
        {
            name: 'y',
            type: 'number',
            optional: false,
            descriptionFallback: 'Mouse Y position relative to the chart body, in pixels.',
        },
        {
            name: 'xAxisFormat',
            type: '(value: string | number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to the X value shown in the tooltip body. Defaults to String(value).',
        },
        {
            name: 'yAxisFormat',
            type: '(value: number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to the Y value shown in the tooltip body. Defaults to String(value).',
        },
    ],
    usedBy: [
        { slug: 'chart-tooltip', name: 'ChartTooltip', kind: 'component' },
        { slug: 'chart', name: 'Chart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-tooltip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_tooltip_props.example',
            titleFallback: 'Standalone OrigamChartTooltip usage',
            code: `<OrigamChartTooltip
    :point="hoveredPoint"
    :series="hoveredSeries"
    :category="hoveredCategory"
    :x="mouseX"
    :y="mouseY"
    :y-axis-format="v => '$' + v"
/>`,
            lang: 'vue',
        },
    ],
}
