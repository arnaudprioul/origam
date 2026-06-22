import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_CHART_GAUGE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-chart-gauge-options',
    name: 'IUseChartGaugeOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_chart_gauge_options.description',
    descriptionFallback: 'Strict options consumed by useChartGauge. All getters are thunks so the composable can be reactively driven by props, a store, or computed sources without re-instantiation.',
    definition: `export interface IUseChartGaugeOptions {
    value: () => number
    min: () => number
    max: () => number
    width: () => number
    height: () => number
    padding: () => { top: number, right: number, bottom: number, left: number }
    thickness?: () => number
    startAngle?: () => number
    endAngle?: () => number
}`,
    extends: [],
    props: [
        { name: 'value', type: '() => number', optional: false, descriptionFallback: 'Getter returning the current gauge value (un-clamped). The composable clamps to [min..max] internally.' },
        { name: 'min', type: '() => number', optional: false, descriptionFallback: 'Getter returning the lower bound of the gauge range.' },
        { name: 'max', type: '() => number', optional: false, descriptionFallback: 'Getter returning the upper bound of the gauge range.' },
        { name: 'width', type: '() => number', optional: false, descriptionFallback: 'Getter returning the SVG viewBox width in pixels.' },
        { name: 'height', type: '() => number', optional: false, descriptionFallback: 'Getter returning the SVG viewBox height in pixels.' },
        { name: 'padding', type: '() => { top: number, right: number, bottom: number, left: number }', optional: false, descriptionFallback: 'Getter returning the SVG inner padding that frees room for endpoint labels.' },
        { name: 'thickness', type: '() => number', optional: true, descriptionFallback: 'Optional getter overriding the arc stroke thickness in SVG pixels.' },
        { name: 'startAngle', type: '() => number', optional: true, descriptionFallback: 'Optional getter overriding the arc start angle in radians. Default is -3pi/4.' },
        { name: 'endAngle', type: '() => number', optional: true, descriptionFallback: 'Optional getter overriding the arc end angle in radians. Default is +3pi/4.' },
    ],
    usedBy: [
        { slug: 'use-chart-gauge', name: 'useChartGauge', kind: 'composable' },
        { slug: 'chart-gauge', name: 'ChartGauge', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-gauge.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_chart_gauge_options.example',
            titleFallback: 'Driving useChartGauge from component props',
            code: `import { useChartGauge } from 'origam'
import type { IUseChartGaugeOptions } from 'origam'

const opts: IUseChartGaugeOptions = {
    value: () => props.value,
    min: () => props.gaugeMin ?? 0,
    max: () => props.gaugeMax ?? 100,
    width: () => svgWidth.value,
    height: () => svgHeight.value,
    padding: () => ({ top: 20, right: 20, bottom: 30, left: 20 }),
}

const { trackPath, valuePath, ratio } = useChartGauge(opts)`,
            lang: 'typescript',
        },
    ],
}
