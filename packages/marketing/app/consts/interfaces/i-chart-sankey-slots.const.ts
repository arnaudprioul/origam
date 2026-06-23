import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SANKEY_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sankey-slots',
    name: 'IChartSankeySlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_sankey_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartSankey>. Extends IChartBaseSlots with a node-label slot that replaces the label rendered beside each node, receiving the node name, value, formatted value, resolved colour and column index.',
    definition: `export interface IChartSankeySlots extends IChartBaseSlots {
    'node-label'?: (bindings: {
        name: string
        value: number
        formatted: string
        color: string
        column: number
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: "'node-label'",
            type: "(bindings: { name: string; value: number; formatted: string; color: string; column: number }) => any",
            optional: true,
            descriptionFallback: 'Replace the label rendered beside each node. Receives the node name, raw value, formatted value, resolved colour and column index.',
        },
    ],
    usedBy: [
        { slug: 'chart-sankey', name: 'OrigamChartSankey', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sankey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sankey_slots.example',
            titleFallback: 'Custom node label on a Sankey diagram',
            code: `<OrigamChartSankey :series="series">
    <template #node-label="{ name, formatted, column }">
        <tspan font-weight="bold">{{ name }}</tspan>
        <tspan> ({{ formatted }})</tspan>
    </template>
</OrigamChartSankey>`,
            lang: 'vue',
        },
    ],
}
