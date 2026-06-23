import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BULLET_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-bullet-props',
    name: 'IChartBulletProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_bullet_props.description',
    descriptionFallback: 'Props for <OrigamChartBullet> — the bullet / KPI chart family. Each series entry renders one bullet combining range bands, an actual-value bar, and a target marker tick (Stephen Few design).',
    definition: `export interface IChartBulletProps extends IChartBaseProps {
    categories?: Array<string>
    barColor?: TIntent | string
    targetColor?: TIntent | string
    rangeColors?: Array<TIntent | string>
    orientation?: TChartBulletOrientation
    barThickness?: number
    showAxis?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'categories', type: 'Array<string>', optional: true, descriptionFallback: 'Category labels — one per series entry. Rendered beside each bullet. Falls back to series[i].name when omitted.' },
        { name: 'barColor', type: "TIntent | string", optional: true, default: "'primary'", descriptionFallback: "Fill colour for the actual-value bar. Accepts a TIntent token or a raw CSS colour. Default 'primary'." },
        { name: 'targetColor', type: 'TIntent | string', optional: true, default: "'danger'", descriptionFallback: "Stroke colour for the target marker tick. Default 'danger'." },
        { name: 'rangeColors', type: 'Array<TIntent | string>', optional: true, default: "['danger', 'warning', 'success']", descriptionFallback: 'Fallback palette used when range.color is omitted. Cycled in array order across bands.' },
        { name: 'orientation', type: 'TChartBulletOrientation', optional: true, default: "'horizontal'", descriptionFallback: "Layout direction. 'horizontal' renders bullets as rows; 'vertical' renders bullets as columns. Default 'horizontal'." },
        { name: 'barThickness', type: 'number', optional: true, default: '0.45', descriptionFallback: 'Thickness of the actual-value bar as a fraction of the slot height (horizontal) or slot width (vertical). Range [0, 1].' },
        { name: 'showAxis', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Show the quantitative axis. Default true.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'X-axis tick formatter applied to axis tick labels.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis tick formatter applied to axis tick labels (vertical orientation).' },
    ],
    usedBy: [
        { slug: 'chart-bullet', name: 'OrigamChartBullet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-bullet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_bullet_props.example',
            titleFallback: 'Horizontal bullet chart with three KPI bullets',
            code: `<OrigamChartBullet
    :series="kpiSeries"
    :categories="['Revenue', 'Margin', 'NPS']"
    bar-color="primary"
    target-color="danger"
    orientation="horizontal"
/>`,
            lang: 'vue',
        },
    ],
}
