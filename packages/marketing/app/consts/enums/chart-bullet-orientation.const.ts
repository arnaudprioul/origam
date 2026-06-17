import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_BULLET_ORIENTATION_ENUM_DOC: IEnumDoc = {
    slug: 'chart-bullet-orientation',
    name: 'CHART_BULLET_ORIENTATION',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_bullet_orientation.description',
    descriptionFallback: 'Orientation of a bullet chart — horizontal (progress bar style) or vertical (column style).',
    definition: `export enum CHART_BULLET_ORIENTATION {
    HORIZONTAL = 'horizontal',
    VERTICAL   = 'vertical',
}`,
    values: [
        {
            value: 'CHART_BULLET_ORIENTATION.HORIZONTAL',
            descriptionKey: 'enums.detail.chart_bullet_orientation.horizontal',
            descriptionFallback: 'Bullet bar runs left to right.',
        },
        {
            value: 'CHART_BULLET_ORIENTATION.VERTICAL',
            descriptionKey: 'enums.detail.chart_bullet_orientation.vertical',
            descriptionFallback: 'Bullet bar runs bottom to top.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-bullet-orientation.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_bullet_orientation.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_BULLET_ORIENTATION } from 'origam'

const orientation = CHART_BULLET_ORIENTATION.HORIZONTAL`,
            lang: 'typescript',
        },
    ],
}
