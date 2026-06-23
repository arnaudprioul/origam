import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_BULLET_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-bullet-datum',
    name: 'IChartBulletDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_bullet_datum.description',
    descriptionFallback: 'Bullet data payload for a single series entry in a bullet chart. Combines the actual value, the target / goal value, and the qualitative range bands that form the background.',
    definition: `export interface IChartBulletDatum {
    value: number
    target: number
    ranges: Array<IChartBulletRange>
}`,
    extends: [],
    props: [
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Actual (measured) value. Drives the solid foreground bar.' },
        { name: 'target', type: 'number', optional: false, descriptionFallback: 'Target / goal value. Rendered as a thin cross-tick.' },
        { name: 'ranges', type: 'Array<IChartBulletRange>', optional: false, descriptionFallback: 'Qualitative range bands rendered behind the bars. At least one band is required; three is the Stephen Few recommendation (poor / acceptable / good).' },
    ],
    usedBy: [
        { slug: 'chart-bullet', name: 'OrigamChartBullet', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-bullet.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_bullet_datum.example',
            titleFallback: 'Providing bullet data with three qualitative ranges',
            code: `import type { IChartBulletDatum } from 'origam'

const datum: IChartBulletDatum = {
    value: 72,
    target: 80,
    ranges: [
        { to: 50, color: 'danger' },
        { to: 70, color: 'warning' },
        { to: 100, color: 'success' },
    ],
}`,
            lang: 'typescript',
        },
    ],
}
