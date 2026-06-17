import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_POLAR_KIND_ENUM_DOC: IEnumDoc = {
    slug: 'chart-polar-kind',
    name: 'CHART_POLAR_KIND',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_polar_kind.description',
    descriptionFallback: 'Chart type selector for the polar family — pie (full circle segments) or donut (ring with a hollow center).',
    definition: `export enum CHART_POLAR_KIND {
    PIE   = 'pie',
    DONUT = 'donut',
}`,
    values: [
        {
            value: 'CHART_POLAR_KIND.PIE',
            descriptionKey: 'enums.detail.chart_polar_kind.pie',
            descriptionFallback: 'Full pie chart — segments fill the entire circle.',
        },
        {
            value: 'CHART_POLAR_KIND.DONUT',
            descriptionKey: 'enums.detail.chart_polar_kind.donut',
            descriptionFallback: 'Donut chart — segments form a ring around a hollow center.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-polar-kind.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_polar_kind.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_POLAR_KIND } from 'origam'

const kind = CHART_POLAR_KIND.DONUT`,
            lang: 'typescript',
        },
    ],
}
