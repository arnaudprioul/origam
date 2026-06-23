import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TREEMAP_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-treemap-slots',
    name: 'IChartTreemapSlots',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_treemap_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamChartTreemap. Extends IChartBaseSlots with a tile-label slot that replaces the inline name + value text inside each tile, receiving the full tile descriptor for complete customisation.',
    definition: `export interface IChartTreemapSlots extends IChartBaseSlots {
    'tile-label'?: (bindings: {
        name: string
        value: number
        formatted: string
        color: string
        index: number
        visible: boolean
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tile-label',
            type: '(bindings: { name: string, value: number, formatted: string, color: string, index: number, visible: boolean }) => any',
            optional: true,
            descriptionFallback: 'Replace the label rendered inside each tile. Receives the tile name, raw value, pre-formatted value string, resolved CSS colour, index and current visibility.',
        },
    ],
    usedBy: [
        { slug: 'chart-treemap', name: 'ChartTreemap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-treemap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_treemap_slots.example',
            titleFallback: 'Custom tile label with percentage share',
            code: `<OrigamChartTreemap :series="series" :total="total">
    <template #tile-label="{ name, formatted, value }">
        <tspan class="tile-name">{{ name }}</tspan>
        <tspan class="tile-value">{{ formatted }}</tspan>
    </template>
</OrigamChartTreemap>`,
            lang: 'vue',
        },
    ],
}
