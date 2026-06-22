import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SUNBURST_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sunburst-slots',
    name: 'IChartSunburstSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sunburst_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamChartSunburst. Extends IChartBaseSlots with a richer tooltip slot that also receives the hovered IChartSunburstNode and its full ancestor path string.',
    definition: `export interface IChartSunburstSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint | null
        series: IChartSeries | null
        category: string | number
        node: IChartSunburstNode | null
        path: string
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint | null, series: IChartSeries | null, category: string | number, node: IChartSunburstNode | null, path: string }) => any',
            optional: true,
            descriptionFallback: 'Replace the default tooltip body. Receives the hovered point, its series, the X category, the resolved IChartSunburstNode and the full ancestor path string.',
        },
    ],
    usedBy: [
        { slug: 'chart-sunburst', name: 'ChartSunburst', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sunburst.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sunburst_slots.example',
            titleFallback: 'Custom tooltip with full path display',
            code: `<OrigamChartSunburst :series="series">
    <template #tooltip="{ node, path }">
        <p>{{ path }}</p>
        <p><strong>{{ node?.value }}</strong></p>
    </template>
</OrigamChartSunburst>`,
            lang: 'vue',
        },
    ],
}
