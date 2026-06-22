import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PLOT_LINE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-plot-line',
    name: 'IChartPlotLine',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_plot_line.description',
    descriptionFallback: 'A single threshold line drawn at a fixed axis value, either horizontally (Y-axis) or vertically (X-axis). Applicable to cartesian-family charts only — not for polar, radar or gauge.',
    definition: `export interface IChartPlotLine {
    axis?: 'x' | 'y'
    value: number | string
    color?: TIntent | string
    width?: number
    dash?: 'solid' | 'dashed' | 'dotted'
    label?: string
    labelAlign?: 'left' | 'right'
    layer?: 'below' | 'above'
}`,
    extends: [],
    props: [
        { name: 'axis', type: "'x' | 'y'", optional: true, descriptionFallback: 'Axis the line is perpendicular to. "y" draws a horizontal line at a Y value; "x" draws a vertical line at an X value. Default "y".' },
        { name: 'value', type: 'number | string', optional: false, descriptionFallback: 'Position on the axis in axis units. String when axis="x" and categories are strings.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Stroke colour. Accepts a TIntent token name or any CSS colour string. Default resolves to the danger intent bg token.' },
        { name: 'width', type: 'number', optional: true, descriptionFallback: 'Stroke width in SVG user units. Default 1.5.' },
        { name: 'dash', type: "'solid' | 'dashed' | 'dotted'", optional: true, descriptionFallback: 'Dash pattern of the line. Default "dashed".' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Optional label placed at the end of the line.' },
        { name: 'labelAlign', type: "'left' | 'right'", optional: true, descriptionFallback: 'Horizontal alignment of the label for Y-axis lines. "right" (default) places the label at the right edge; "left" at the left edge.' },
        { name: 'layer', type: "'below' | 'above'", optional: true, descriptionFallback: 'Z-order relative to chart data. "below" — drawn behind series; "above" (default) — drawn on top of data so the line remains visible.' },
    ],
    usedBy: [
        { slug: 'chart', name: 'OrigamChart', kind: 'component' },
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-plot-line.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_plot_line.example',
            titleFallback: 'Drawing a danger threshold line',
            code: `<OrigamChart
    type="bar"
    :series="series"
    :plotLines="[
        { axis: 'y', value: 100, color: 'danger', width: 2, dash: 'dashed', label: 'Limit' }
    ]"
/>`,
            lang: 'vue',
        },
    ],
}
