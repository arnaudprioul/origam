import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_TREEMAP_ALGORITHM_ENUM_DOC: IEnumDoc = {
    slug: 'chart-treemap-algorithm',
    name: 'CHART_TREEMAP_ALGORITHM',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_treemap_algorithm.description',
    descriptionFallback: 'Layout algorithm for the treemap chart — squarified (aspect-ratio optimized) or slice-dice (alternating horizontal/vertical splits).',
    definition: `export enum CHART_TREEMAP_ALGORITHM {
    SQUARIFIED = 'squarified',
    SLICE_DICE = 'slice-dice',
}`,
    values: [
        {
            value: 'CHART_TREEMAP_ALGORITHM.SQUARIFIED',
            descriptionKey: 'enums.detail.chart_treemap_algorithm.squarified',
            descriptionFallback: 'Recursively partitions space to produce rectangles with aspect ratios as close to 1 as possible.',
        },
        {
            value: 'CHART_TREEMAP_ALGORITHM.SLICE_DICE',
            descriptionKey: 'enums.detail.chart_treemap_algorithm.slice_dice',
            descriptionFallback: 'Alternates horizontal and vertical splits at each depth level.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-treemap-algorithm.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_treemap_algorithm.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_TREEMAP_ALGORITHM } from 'origam'

const algorithm = CHART_TREEMAP_ALGORITHM.SQUARIFIED`,
            lang: 'typescript',
        },
    ],
}
