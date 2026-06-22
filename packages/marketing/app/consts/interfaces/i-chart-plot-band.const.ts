import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PLOT_BAND_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-plot-band',
    name: 'IChartPlotBand',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_plot_band.description',
    descriptionFallback: 'A coloured rectangular zone drawn behind (or above) chart data, spanning a numeric range along either the X or Y axis. Applicable to cartesian-family charts only — not for polar, radar or gauge.',
    definition: `export interface IChartPlotBand {
    axis?: 'x' | 'y'
    from: number | string
    to: number | string
    color?: TIntent | string
    opacity?: number
    label?: string
    labelColor?: TIntent | string
    layer?: 'below' | 'above'
}`,
    extends: [],
    props: [
        { name: 'axis', type: "'x' | 'y'", optional: true, descriptionFallback: 'Axis the band spans. "y" shades a horizontal stripe; "x" shades a vertical stripe. Default "y".' },
        { name: 'from', type: 'number | string', optional: false, descriptionFallback: 'Lower bound in axis units. String when axis="x" and categories are strings.' },
        { name: 'to', type: 'number | string', optional: false, descriptionFallback: 'Upper bound in axis units.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Fill colour. Accepts a TIntent token name or any CSS colour string. Default resolves to the warning intent bg token.' },
        { name: 'opacity', type: 'number', optional: true, descriptionFallback: 'Fill opacity in the 0..1 range. Default 0.15.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Optional label rendered centred inside the band.' },
        { name: 'labelColor', type: 'TIntent | string', optional: true, descriptionFallback: 'Label fill colour. Accepts a TIntent token or CSS colour. Default "currentColor".' },
        { name: 'layer', type: "'below' | 'above'", optional: true, descriptionFallback: 'Z-order relative to chart data. "below" (default) — drawn behind series; "above" — drawn on top of data.' },
    ],
    usedBy: [
        { slug: 'chart', name: 'OrigamChart', kind: 'component' },
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-plot-band.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_plot_band.example',
            titleFallback: 'Highlighting a warning zone with a plot band',
            code: `<OrigamChart
    type="line"
    :series="series"
    :plotBands="[
        { axis: 'y', from: 60, to: 80, color: 'warning', opacity: 0.2, label: 'Warning zone' }
    ]"
/>`,
            lang: 'vue',
        },
    ],
}
