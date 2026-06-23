import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BASE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-base-slots',
    name: 'IChartBaseSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_base_slots.description',
    descriptionFallback: 'Slot signatures shared across every per-type chart component. Covers tooltip body replacement, legend entry replacement, title block replacement and empty state.',
    definition: `export interface IChartBaseSlots {
    tooltip?: (bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any
    'legend-item'?: (bindings: { series: IChartSeries, index: number, visible: boolean }) => any
    title?: () => any
    empty?: () => any
}`,
    extends: [],
    props: [
        { name: 'tooltip', type: '(bindings: { point: IChartPoint, series: IChartSeries, category: string | number }) => any', optional: true, descriptionFallback: 'Replace the default tooltip body. Receives the hovered IChartPoint, its IChartSeries and the category label.' },
        { name: 'legend-item', type: '(bindings: { series: IChartSeries, index: number, visible: boolean }) => any', optional: true, descriptionFallback: 'Replace one legend entry. Receives the IChartSeries, its index and current visibility.' },
        { name: 'title', type: '() => any', optional: true, descriptionFallback: 'Replace the title block (title + subtitle) rendered above the plotting area.' },
        { name: 'empty', type: '() => any', optional: true, descriptionFallback: 'Rendered when series is empty or every series is hidden.' },
    ],
    usedBy: [
        { slug: 'chart-bar', name: 'OrigamChartBar', kind: 'component' },
        { slug: 'chart-line', name: 'OrigamChartLine', kind: 'component' },
        { slug: 'chart-pie', name: 'OrigamChartPie', kind: 'component' },
        { slug: 'chart-box-plot', name: 'OrigamChartBoxPlot', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-base.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_base_slots.example',
            titleFallback: 'Custom tooltip and empty-state via chart slots',
            code: `<OrigamChartBar :series="series">
    <template #tooltip="{ point, category }">
        <div class="my-tooltip">
            <strong>{{ category }}</strong>: {{ point.y }}
        </div>
    </template>
    <template #empty>
        <p>No data available for this period.</p>
    </template>
</OrigamChartBar>`,
            lang: 'vue',
        },
    ],
}
