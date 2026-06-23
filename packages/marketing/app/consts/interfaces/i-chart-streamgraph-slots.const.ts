import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_STREAMGRAPH_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-streamgraph-slots',
    name: 'IChartStreamgraphSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_streamgraph_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamChartStreamgraph. Extends IChartBaseSlots with a custom tooltip slot that receives all visible series values at the hovered X position for multi-series breakdown rendering.',
    definition: `export interface IChartStreamgraphSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint | null
        series: IChartSeries | null
        category: string | number
        allPoints: Array<{ series: IChartSeries; value: number; color: string }>
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint | null, series: IChartSeries | null, category: string | number, allPoints: Array<{ series: IChartSeries; value: number; color: string }> }) => any',
            optional: true,
            descriptionFallback: 'Custom tooltip body. Receives every visible series value at the hovered X position so consumers can render a multi-series breakdown row.',
        },
    ],
    usedBy: [
        { slug: 'chart-streamgraph', name: 'ChartStreamgraph', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-streamgraph.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_streamgraph_slots.example',
            titleFallback: 'Multi-series tooltip for a streamgraph',
            code: `<OrigamChartStreamgraph :series="series">
    <template #tooltip="{ category, allPoints }">
        <p><strong>{{ category }}</strong></p>
        <div v-for="p in allPoints" :key="p.series.name">
            <span :style="{ color: p.color }">{{ p.series.name }}</span>: {{ p.value }}
        </div>
    </template>
</OrigamChartStreamgraph>`,
            lang: 'vue',
        },
    ],
}
