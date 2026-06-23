import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_RADAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-radar-props',
    name: 'IChartRadarProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_radar_props.description',
    descriptionFallback: 'Props for <OrigamChartRadar> — the radar / spider chart. Tightly-typed wrapper around <OrigamChart type="radar"> with only the options relevant to radar charts. No type prop is exposed — the family is fixed to the radar geometry. Extends IChartBaseProps.',
    definition: `export interface IChartRadarProps extends IChartBaseProps {
}`,
    extends: ['IChartBaseProps'],
    props: [],
    usedBy: [
        { slug: 'chart-radar', name: 'OrigamChartRadar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-radar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_radar_props.example',
            titleFallback: 'Spider chart comparing two profiles',
            code: `<OrigamChartRadar
    :series="[
        { name: 'Alice', data: [80, 65, 90, 75, 55] },
        { name: 'Bob',   data: [60, 80, 70, 90, 80] }
    ]"
    :categories="['Speed', 'Power', 'Agility', 'Stamina', 'Technique']"
    showLegend
/>`,
            lang: 'vue',
        },
    ],
}
