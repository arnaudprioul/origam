import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SUNBURST_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sunburst-props',
    name: 'IChartSunburstProps',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sunburst_props.description',
    descriptionFallback: 'Props for OrigamChartSunburst — the hierarchical ring chart. Extends IChartBaseProps (omitting categories). Series data must be Array<IChartSunburstDatum> carrying a nested tree. Controls inner-radius hole size, ring padding, arc label rendering and value formatting.',
    definition: `export interface IChartSunburstProps extends Omit<IChartBaseProps, 'categories'> {
    innerRadius?: number
    ringPadding?: number
    showLabel?: boolean
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        {
            name: 'innerRadius',
            type: 'number',
            optional: true,
            default: '0.15',
            descriptionFallback: 'Proportion of the overall radius reserved for the centre hole. 0 = full pie (no hole). 0.4 = deep donut.',
        },
        {
            name: 'ringPadding',
            type: 'number',
            optional: true,
            default: '1',
            descriptionFallback: 'Radial gap between consecutive rings in SVG pixels.',
        },
        {
            name: 'showLabel',
            type: 'boolean',
            optional: true,
            default: 'true',
            descriptionFallback: 'When true, arc labels are rendered for nodes whose angular span is ≥ 0.1 rad.',
        },
        {
            name: 'yAxisFormat',
            type: '(value: number) => string',
            optional: true,
            descriptionFallback: 'Y-axis / tooltip value formatter. Receives the numeric value, returns a display string. Raw number used when omitted.',
        },
    ],
    usedBy: [
        { slug: 'chart-sunburst', name: 'ChartSunburst', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sunburst.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sunburst_props.example',
            titleFallback: 'Sunburst with a large centre hole and currency formatter',
            code: `<OrigamChartSunburst
    :series="series"
    :inner-radius="0.5"
    :ring-padding="2"
    :show-label="true"
    :y-axis-format="v => '$' + v.toLocaleString()"
/>`,
            lang: 'vue',
        },
    ],
}
