import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PYRAMID_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pyramid-slots',
    name: 'IChartPyramidSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pyramid_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartPyramid>. Extends IChartBaseSlots with a slice-label slot that replaces the label rendered on or beside each slice, receiving the category name, raw value, formatted value, resolved colour, index and visibility.',
    definition: `export interface IChartPyramidSlots extends IChartBaseSlots {
    'slice-label'?: (bindings: {
        category: string
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
            name: "'slice-label'",
            type: "(bindings: { category: string; value: number; formatted: string; color: string; index: number; visible: boolean }) => any",
            optional: true,
            descriptionFallback: 'Replace the label rendered on / beside each slice. Receives the category name, raw value, formatted value, the resolved slice colour, the slice index and its visibility state.',
        },
    ],
    usedBy: [
        { slug: 'chart-pyramid', name: 'OrigamChartPyramid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pyramid.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pyramid_slots.example',
            titleFallback: 'Custom slice label on a funnel chart',
            code: `<OrigamChartPyramid :series="series" :categories="cats">
    <template #slice-label="{ category, value, formatted }">
        <tspan font-weight="bold">{{ category }}</tspan>
        <tspan> ({{ formatted }})</tspan>
    </template>
</OrigamChartPyramid>`,
            lang: 'vue',
        },
    ],
}
