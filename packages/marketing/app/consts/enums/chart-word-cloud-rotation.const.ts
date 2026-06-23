import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_WORD_CLOUD_ROTATION_ENUM_DOC: IEnumDoc = {
    slug: 'chart-word-cloud-rotation',
    name: 'CHART_WORD_CLOUD_ROTATION',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_word_cloud_rotation.description',
    descriptionFallback: 'Word rotation strategy for the word cloud chart — none (horizontal only), random (any angle), or orthogonal (0° and 90° only).',
    definition: `export enum CHART_WORD_CLOUD_ROTATION {
    NONE        = 'none',
    RANDOM      = 'random',
    ORTHOGONAL  = 'orthogonal',
}`,
    values: [
        {
            value: 'CHART_WORD_CLOUD_ROTATION.NONE',
            descriptionKey: 'enums.detail.chart_word_cloud_rotation.none',
            descriptionFallback: 'All words are rendered horizontally (0°).',
        },
        {
            value: 'CHART_WORD_CLOUD_ROTATION.RANDOM',
            descriptionKey: 'enums.detail.chart_word_cloud_rotation.random',
            descriptionFallback: 'Words are rotated at random angles.',
        },
        {
            value: 'CHART_WORD_CLOUD_ROTATION.ORTHOGONAL',
            descriptionKey: 'enums.detail.chart_word_cloud_rotation.orthogonal',
            descriptionFallback: 'Words are rendered at either 0° or 90°.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-word-cloud-rotation.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_word_cloud_rotation.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_WORD_CLOUD_ROTATION } from 'origam'

const rotation = CHART_WORD_CLOUD_ROTATION.ORTHOGONAL`,
            lang: 'typescript',
        },
    ],
}
