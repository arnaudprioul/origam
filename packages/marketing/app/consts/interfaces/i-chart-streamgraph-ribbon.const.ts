import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_STREAMGRAPH_RIBBON_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-streamgraph-ribbon',
    name: 'IChartStreamgraphRibbon',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_streamgraph_ribbon.description',
    descriptionFallback: 'Pre-computed ribbon descriptor produced by the streamgraph geometry engine for a single series at a single render pass. Contains the resolved SVG path, colour and raw values for tooltip display.',
    definition: `export interface IChartStreamgraphRibbon {
    seriesIndex: number
    name: string
    color: string
    d: string
    visible: boolean
    values: Array<number>
}`,
    extends: [],
    props: [
        {
            name: 'seriesIndex',
            type: 'number',
            optional: false,
            descriptionFallback: 'Index of the series in the original series array.',
        },
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Display name from series[i].name.',
        },
        {
            name: 'color',
            type: 'string',
            optional: false,
            descriptionFallback: 'Resolved CSS colour string for this ribbon.',
        },
        {
            name: 'd',
            type: 'string',
            optional: false,
            descriptionFallback: 'SVG <path d="…"> — top path forward + bottom path reverse, forming a closed ribbon shape.',
        },
        {
            name: 'visible',
            type: 'boolean',
            optional: false,
            descriptionFallback: 'Whether this ribbon is currently toggled visible via the legend.',
        },
        {
            name: 'values',
            type: 'Array<number>',
            optional: false,
            descriptionFallback: 'Raw data values at each X position, used for tooltip breakdown display.',
        },
    ],
    usedBy: [
        { slug: 'chart-streamgraph', name: 'ChartStreamgraph', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-streamgraph.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_streamgraph_ribbon.example',
            titleFallback: 'Consuming IChartStreamgraphRibbon in a custom tooltip',
            code: `<OrigamChartStreamgraph :series="series">
    <template #tooltip="{ allPoints }">
        <ul>
            <li v-for="p in allPoints" :key="p.series.name">
                {{ p.series.name }}: {{ p.value }}
            </li>
        </ul>
    </template>
</OrigamChartStreamgraph>`,
            lang: 'vue',
        },
    ],
}
