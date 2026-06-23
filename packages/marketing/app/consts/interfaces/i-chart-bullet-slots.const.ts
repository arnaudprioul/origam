import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BULLET_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-bullet-slots',
    name: 'IChartBulletSlots',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_bullet_slots.description',
    descriptionFallback: 'Slot signatures exposed by <OrigamChartBullet>. Extends IChartBaseSlots with an enriched tooltip slot that provides the full bullet geometry descriptor and a pre-computed delta percentage.',
    definition: `export interface IChartBulletSlots extends IChartBaseSlots {
    tooltip?: (bindings: {
        point: IChartPoint
        series: IChartSeries
        category: string | number
        bullet: IChartBulletBullet
        delta: number
    }) => any
}`,
    extends: ['IChartBaseSlots'],
    props: [
        {
            name: 'tooltip',
            type: '(bindings: { point: IChartPoint; series: IChartSeries; category: string | number; bullet: IChartBulletBullet; delta: number }) => any',
            optional: true,
            descriptionFallback: 'Override the default tooltip body. Receives the hovered bullet descriptor plus a pre-computed delta % (value / target * 100).',
        },
    ],
    usedBy: [
        { slug: 'chart-bullet', name: 'OrigamChartBullet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-bullet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_bullet_slots.example',
            titleFallback: 'Custom tooltip showing value vs target in a bullet chart',
            code: `<OrigamChartBullet :series="kpiSeries">
    <template #tooltip="{ bullet, delta }">
        <strong>{{ bullet.category }}</strong>
        <p>Value: {{ bullet.datum.value }} | Target: {{ bullet.datum.target }}</p>
        <p :class="delta >= 100 ? 'success' : 'danger'">{{ delta.toFixed(1) }}%</p>
    </template>
</OrigamChartBullet>`,
            lang: 'vue',
        },
    ],
}
