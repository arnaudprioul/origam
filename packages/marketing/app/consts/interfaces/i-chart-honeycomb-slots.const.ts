import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HONEYCOMB_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-honeycomb-slots',
    name: 'IChartHoneycombSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_honeycomb_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartHoneycomb>. Extends IChartBaseSlots with a tile-label slot that replaces the centred label inside each hexagonal tile.',
    definition: `export interface IChartHoneycombSlots extends IChartBaseSlots {
    'tile-label'?: (bindings: {
        name: string
        value: number | undefined
        color: string
        x: number
        y: number
        index: number
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        { name: 'tile-label', type: '(bindings: { name: string, value: number | undefined, color: string, x: number, y: number, index: number }) => any', optional: true, descriptionFallback: 'Replace the label rendered inside each tile. Receives the tile\'s name, value, resolved color, and grid position.' },
    ],
    usedBy: [
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-honeycomb.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_honeycomb_slots.example',
            titleFallback: 'Custom tile label with icon',
            code: `<OrigamChartHoneycomb :series="series">
    <template #tile-label="{ name, value, color }">
        <text :fill="color" text-anchor="middle">{{ name }}: {{ value }}</text>
    </template>
</OrigamChartHoneycomb>`,
            lang: 'vue',
        },
    ],
}
