import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BULLET_BULLET_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-bullet-bullet',
    name: 'IChartBulletBullet',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_bullet_bullet.description',
    descriptionFallback: 'Pre-computed geometry descriptor for a single bullet in a bullet chart. Produced by the bullet layout engine inside OrigamChartBullet — contains resolved colours, slot coordinates, and the maximum axis value.',
    definition: `export interface IChartBulletBullet {
    index: number
    category: string
    datum: IChartBulletDatum
    visible: boolean
    barFill: string
    targetStroke: string
    rangeFills: Array<string>
    slotX: number
    slotY: number
    slotW: number
    slotH: number
    maxRange: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Position of this bullet in the original series array.' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label from categories[index] or series[index].name.' },
        { name: 'datum', type: 'IChartBulletDatum', optional: false, descriptionFallback: 'Raw datum ({value, target, ranges}).' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this bullet is currently visible (legend toggle).' },
        { name: 'barFill', type: 'string', optional: false, descriptionFallback: 'Resolved fill colour for the actual-value bar.' },
        { name: 'targetStroke', type: 'string', optional: false, descriptionFallback: 'Resolved stroke colour for the target tick.' },
        { name: 'rangeFills', type: 'Array<string>', optional: false, descriptionFallback: 'Resolved fills for each range band, parallel to datum.ranges.' },
        { name: 'slotX', type: 'number', optional: false, descriptionFallback: 'SVG x of the bullet slot origin (horizontal: left edge; vertical: top edge).' },
        { name: 'slotY', type: 'number', optional: false, descriptionFallback: 'SVG y of the bullet slot origin.' },
        { name: 'slotW', type: 'number', optional: false, descriptionFallback: 'Total slot width (horizontal: plot width; vertical: slot column width).' },
        { name: 'slotH', type: 'number', optional: false, descriptionFallback: 'Total slot height (horizontal: slot row height; vertical: plot height).' },
        { name: 'maxRange', type: 'number', optional: false, descriptionFallback: 'Maximum axis value = max(ranges[-1].to, target, value).' },
    ],
    usedBy: [
        { slug: 'chart-bullet', name: 'OrigamChartBullet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-bullet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_bullet_bullet.example',
            titleFallback: 'Reading the bullet descriptor in a custom tooltip slot',
            code: `<OrigamChartBullet :series="series">
    <template #tooltip="{ bullet, delta }">
        <p>{{ bullet.category }}: {{ bullet.datum.value }} / {{ bullet.datum.target }}</p>
        <p>Delta: {{ delta.toFixed(1) }}%</p>
    </template>
</OrigamChartBullet>`,
            lang: 'vue',
        },
    ],
}
