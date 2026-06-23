import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_STACKING_ENUM_DOC: IEnumDoc = {
    slug: 'chart-stacking',
    name: 'CHART_STACKING',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_stacking.description',
    descriptionFallback: 'Stacking strategy for bar, column, and area charts — normal (absolute values) or percent (normalized to 100%).',
    definition: `export enum CHART_STACKING {
    NORMAL  = 'normal',
    PERCENT = 'percent',
}`,
    values: [
        {
            value: 'CHART_STACKING.NORMAL',
            descriptionKey: 'enums.detail.chart_stacking.normal',
            descriptionFallback: 'Series are stacked using their raw absolute values; the Y-axis spans 0 to max(stack total).',
        },
        {
            value: 'CHART_STACKING.PERCENT',
            descriptionKey: 'enums.detail.chart_stacking.percent',
            descriptionFallback: 'Each stack is normalised to 100%. The Y-axis is fixed at 0–100 and the tooltip shows both the raw value and its share.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-stacking.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_stacking.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_STACKING } from 'origam'

const stacking = CHART_STACKING.PERCENT`,
            lang: 'typescript',
        },
    ],
}
