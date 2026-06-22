import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_GAUGE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-gauge-props',
    name: 'IChartGaugeProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_gauge_props.description',
    descriptionFallback: 'Props for <OrigamChartGauge> — solid gauge (radial progress indicator). Renders a 270-degree track with a filled arc indicating the current value, an optional centre label, and optional min / max endpoint labels. Only the first datum of the first series is consumed.',
    definition: `export interface IChartGaugeProps extends IChartBaseProps {
    gaugeMin?: number
    gaugeMax?: number
    gaugeUnit?: string
    gaugeThickness?: number
    gaugeStartAngle?: number
    gaugeEndAngle?: number
    gaugeShowEndpoints?: boolean
    gaugeShowValue?: boolean
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'gaugeMin', type: 'number', optional: true, default: '0', descriptionFallback: 'Lower bound of the gauge range. Default 0.' },
        { name: 'gaugeMax', type: 'number', optional: true, default: '100', descriptionFallback: 'Upper bound of the gauge range. Default 100.' },
        { name: 'gaugeUnit', type: 'string', optional: true, default: "''", descriptionFallback: "Optional unit appended to the centre label (e.g. '%', ' km/h'). Default ''." },
        { name: 'gaugeThickness', type: 'number', optional: true, default: '18', descriptionFallback: 'Arc thickness in SVG pixels. Default 18.' },
        { name: 'gaugeStartAngle', type: 'number', optional: true, descriptionFallback: 'Arc start angle in radians. Defaults to -3pi/4 (bottom-left of a 270deg arc).' },
        { name: 'gaugeEndAngle', type: 'number', optional: true, descriptionFallback: 'Arc end angle in radians. Defaults to +3pi/4 (bottom-right).' },
        { name: 'gaugeShowEndpoints', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Whether to render gaugeMin / gaugeMax labels at the arc endpoints. Default true.' },
        { name: 'gaugeShowValue', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Whether to render the centre value label. Default true.' },
    ],
    usedBy: [
        { slug: 'chart-gauge', name: 'OrigamChartGauge', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-gauge.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_gauge_props.example',
            titleFallback: 'Solid gauge showing a percentage KPI',
            code: `<OrigamChartGauge
    :series="[{ name: 'Completion', data: [72] }]"
    :gauge-min="0"
    :gauge-max="100"
    gauge-unit="%"
    :gauge-thickness="20"
    :gauge-show-endpoints="true"
/>`,
            lang: 'vue',
        },
    ],
}
