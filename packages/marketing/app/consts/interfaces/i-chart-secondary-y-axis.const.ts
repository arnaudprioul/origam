import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SECONDARY_Y_AXIS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-secondary-y-axis',
    name: 'IChartSecondaryYAxis',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_secondary_y_axis.description',
    descriptionFallback: 'Configuration object for the secondary (right-hand) Y axis on a cartesian chart. When passed to secondaryYAxis on OrigamChartCartesian, series with yAxis: 1 are projected against this scale. Omit to use the primary left axis only.',
    definition: `export interface IChartSecondaryYAxis {
    min?: number
    max?: number
    format?: (value: number) => string
    title?: string
}`,
    extends: [],
    props: [
        {
            name: 'min',
            type: 'number',
            optional: true,
            descriptionFallback: 'Force the minimum value of the secondary Y scale. Auto-computed from data when absent.',
        },
        {
            name: 'max',
            type: 'number',
            optional: true,
            descriptionFallback: 'Force the maximum value of the secondary Y scale. Auto-computed from data when absent.',
        },
        {
            name: 'format',
            type: '(value: number) => string',
            optional: true,
            descriptionFallback: 'Formatter applied to the right-axis tick labels.',
        },
        {
            name: 'title',
            type: 'string',
            optional: true,
            descriptionFallback: 'Optional axis title rendered alongside the right axis.',
        },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'ChartCartesian', kind: 'component' },
        { slug: 'chart', name: 'Chart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-axis.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_secondary_y_axis.example',
            titleFallback: 'Adding a secondary Y axis with a custom formatter',
            code: `<OrigamChartCartesian
    :series="series"
    :secondary-y-axis="{ min: 0, max: 100, format: v => v + '%', title: 'Growth' }"
/>`,
            lang: 'vue',
        },
    ],
}
