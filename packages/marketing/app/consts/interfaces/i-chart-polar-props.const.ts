import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POLAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-polar-props',
    name: 'IChartPolarProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_polar_props.description',
    descriptionFallback: 'Props for <OrigamChartPolar> — handles pie and donut visualisations. No axes, no grid, no tick labels. Extends IChartBaseProps with polar-specific options including donut hole size, drilldown configuration, and axis formatters.',
    definition: `export interface IChartPolarProps extends IChartBaseProps {
    type?: TChartPolarKind
    donutHoleSize?: number
    showTooltip?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
    drilldown?: IChartDrilldownProps
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'type', type: 'TChartPolarKind', optional: true, descriptionFallback: 'Polar visualisation primitive. Default "pie".' },
        { name: 'donutHoleSize', type: 'number', optional: true, descriptionFallback: 'Inner-radius proportion for "donut". 0 collapses to a pie, 1 to a zero-thickness ring. Ignored when type="pie". Default 0.6.' },
        { name: 'showTooltip', type: 'boolean', optional: true, descriptionFallback: 'Toggle the hover tooltip. Default true.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to the tooltip X label. Pie tooltips show the category name + value.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to the tooltip Y value.' },
        { name: 'drilldown', type: 'IChartDrilldownProps', optional: true, descriptionFallback: 'Drilldown configuration. When provided, data points that carry an IChartDrilldownLink trigger a chart-level navigation. A breadcrumb <nav> appears above the chart when depth > 1.' },
    ],
    usedBy: [
        { slug: 'chart-polar', name: 'OrigamChartPolar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-polar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_polar_props.example',
            titleFallback: 'Donut chart with drilldown',
            code: `<OrigamChartPolar
    type="donut"
    :series="series"
    :donutHoleSize="0.5"
    :drilldown="{ datasets: drilldownData }"
    @drill="handleDrill"
/>`,
            lang: 'vue',
        },
    ],
}
