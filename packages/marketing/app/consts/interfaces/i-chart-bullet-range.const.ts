import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BULLET_RANGE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-bullet-range',
    name: 'IChartBulletRange',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_bullet_range.description',
    descriptionFallback: 'One qualitative range band in a bullet chart. Bands are rendered left-to-right (horizontal) or bottom-to-top (vertical) and stack to cover the domain [0, maxRange].',
    definition: `export interface IChartBulletRange {
    to: number
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'to', type: 'number', optional: false, descriptionFallback: 'Upper bound of this band (absolute value on the axis, not a width / height fraction). Bands are rendered in array order — each band covers [previous.to, this.to].' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: "Fill colour for this band. Accepts a TIntent token or a raw CSS colour string. When absent the component cycles through rangeColors." },
    ],
    usedBy: [
        { slug: 'chart-bullet', name: 'OrigamChartBullet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-bullet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_bullet_range.example',
            titleFallback: 'Defining three qualitative range bands for a bullet',
            code: `import type { IChartBulletRange } from 'origam'

const ranges: IChartBulletRange[] = [
    { to: 50 },            // poor — uses rangeColors[0]
    { to: 75, color: 'warning' },
    { to: 100, color: 'success' },
]`,
            lang: 'typescript',
        },
    ],
}
