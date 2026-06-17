import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_PICTORIAL_DIRECTION_ENUM_DOC: IEnumDoc = {
    slug: 'chart-pictorial-direction',
    name: 'CHART_PICTORIAL_DIRECTION',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_pictorial_direction.description',
    descriptionFallback: 'Fill direction for the pictorial bar chart — vertical (bottom to top) or horizontal (left to right).',
    definition: `export enum CHART_PICTORIAL_DIRECTION {
    VERTICAL   = 'vertical',
    HORIZONTAL = 'horizontal',
}`,
    values: [
        {
            value: 'CHART_PICTORIAL_DIRECTION.VERTICAL',
            descriptionKey: 'enums.detail.chart_pictorial_direction.vertical',
            descriptionFallback: 'Symbol fills from bottom to top.',
        },
        {
            value: 'CHART_PICTORIAL_DIRECTION.HORIZONTAL',
            descriptionKey: 'enums.detail.chart_pictorial_direction.horizontal',
            descriptionFallback: 'Symbol fills from left to right.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-pictorial-direction.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_pictorial_direction.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_PICTORIAL_DIRECTION } from 'origam'

const direction = CHART_PICTORIAL_DIRECTION.VERTICAL`,
            lang: 'typescript',
        },
    ],
}
