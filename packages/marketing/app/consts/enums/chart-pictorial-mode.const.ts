import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_PICTORIAL_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'chart-pictorial-mode',
    name: 'CHART_PICTORIAL_MODE',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_pictorial_mode.description',
    descriptionFallback: 'Symbol rendering mode for the pictorial chart — stack (repeat symbols) or fill (clip a single symbol).',
    definition: `export enum CHART_PICTORIAL_MODE {
    STACK = 'stack',
    FILL  = 'fill',
}`,
    values: [
        {
            value: 'CHART_PICTORIAL_MODE.STACK',
            descriptionKey: 'enums.detail.chart_pictorial_mode.stack',
            descriptionFallback: 'Multiple symbol instances are stacked to represent the value.',
        },
        {
            value: 'CHART_PICTORIAL_MODE.FILL',
            descriptionKey: 'enums.detail.chart_pictorial_mode.fill',
            descriptionFallback: 'A single symbol instance is clipped proportionally to the value.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-pictorial-mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_pictorial_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_PICTORIAL_MODE } from 'origam'

const mode = CHART_PICTORIAL_MODE.FILL`,
            lang: 'typescript',
        },
    ],
}
