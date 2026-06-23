import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_GAUGE_GEOMETRY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-gauge-geometry',
    name: 'IChartGaugeGeometry',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_gauge_geometry.description',
    descriptionFallback: 'Output of useChartGauge — geometry descriptors for the arc track, the indicator arc, and the label anchor points. All fields are pre-formatted so the SFC renders without computing anything itself.',
    definition: `export interface IChartGaugeGeometry {
    trackPath: string
    valuePath: string
    valueAngle: number
    startAngle: number
    endAngle: number
    outerRadius: number
    innerRadius: number
    centerX: number
    centerY: number
    ratio: number
    clampedValue: number
}`,
    extends: [],
    props: [
        { name: 'trackPath', type: 'string', optional: false, descriptionFallback: "SVG d attribute for the full empty track arc." },
        { name: 'valuePath', type: 'string', optional: false, descriptionFallback: "SVG d attribute for the filled value arc (empty when value === min)." },
        { name: 'valueAngle', type: 'number', optional: false, descriptionFallback: 'Radian angle where the value arc ends. Useful for needles.' },
        { name: 'startAngle', type: 'number', optional: false, descriptionFallback: 'Radian angle where the gauge arc starts.' },
        { name: 'endAngle', type: 'number', optional: false, descriptionFallback: 'Radian angle where the gauge arc ends.' },
        { name: 'outerRadius', type: 'number', optional: false, descriptionFallback: 'Outer arc radius in SVG pixels.' },
        { name: 'innerRadius', type: 'number', optional: false, descriptionFallback: 'Inner arc radius in SVG pixels (outerRadius - thickness).' },
        { name: 'centerX', type: 'number', optional: false, descriptionFallback: 'SVG pixel coordinate of the arc centre (X).' },
        { name: 'centerY', type: 'number', optional: false, descriptionFallback: 'SVG pixel coordinate of the arc centre (Y).' },
        { name: 'ratio', type: 'number', optional: false, descriptionFallback: 'Normalised value in [0..1].' },
        { name: 'clampedValue', type: 'number', optional: false, descriptionFallback: 'Clamped value in [min..max].' },
    ],
    usedBy: [
        { slug: 'chart-gauge', name: 'OrigamChartGauge', kind: 'component' },
        { slug: 'use-chart-gauge', name: 'useChartGauge', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-gauge.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_gauge_geometry.example',
            titleFallback: 'Consuming geometry in a custom gauge slot',
            code: `// IChartGaugeGeometry is returned by useChartGauge — accessed via the gauge-value slot
<OrigamChartGauge :series="series" gauge-min="0" gauge-max="100">
    <template #gauge-value="{ value, ratio, formatted, unit }">
        <text :x="geometry.centerX" :y="geometry.centerY">
            {{ formatted }}{{ unit }}
        </text>
    </template>
</OrigamChartGauge>`,
            lang: 'vue',
        },
    ],
}
