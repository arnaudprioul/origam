import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POLAR_BAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-polar-bar-props',
    name: 'IChartPolarBarProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_polar_bar_props.description',
    descriptionFallback: 'Props for <OrigamChartPolarBar> — the polar bar (nightingale-rose) family. A single series of N data points is rendered as N wedge-shaped arcs arranged radially. Commonly used for cyclical data (hours per day, monthly activity). Extends IChartBaseProps.',
    definition: `export interface IChartPolarBarProps extends IChartBaseProps {
    innerRadius?: number
    startAngle?: number
    gap?: number
    maxValue?: number
    showLabel?: boolean
    showValue?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'innerRadius', type: 'number', optional: true, descriptionFallback: 'Fraction of the total radius reserved as a centre hole. 0 = no hole (wedges meet at centre). 1 = zero-thickness ring. Default 0.1.' },
        { name: 'startAngle', type: 'number', optional: true, descriptionFallback: 'Start angle in radians for the first wedge. 0 = 3 o\'clock; -Math.PI/2 = 12 o\'clock (conventional). Default 0.' },
        { name: 'gap', type: 'number', optional: true, descriptionFallback: 'Angular gap between consecutive wedges in radians. 0 = no gap (flush). Default 0.02.' },
        { name: 'maxValue', type: 'number', optional: true, descriptionFallback: 'Override the auto-computed maximum value used to scale wedge radii. When omitted, max(series[0].data) is used.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Render the category label outside the outer radius of each wedge. Default true.' },
        { name: 'showValue', type: 'boolean', optional: true, descriptionFallback: 'Render the numeric value label inside the wedge when there is sufficient angular room. Default false.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'Formatter applied to the tooltip X label (category name / index).' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter applied to the tooltip Y value and the in-wedge value label.' },
    ],
    usedBy: [
        { slug: 'chart-polar-bar', name: 'OrigamChartPolarBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-polar-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_polar_bar_props.example',
            titleFallback: 'Nightingale-rose chart for weekly activity',
            code: `<OrigamChartPolarBar
    :series="[{ name: 'Activity', data: [12, 8, 15, 6, 20, 18, 9] }]"
    :categories="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
    :innerRadius="0.15"
    :startAngle="-Math.PI / 2"
    showLabel
    showValue
/>`,
            lang: 'vue',
        },
    ],
}
