import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_PYRAMID_KIND_ENUM_DOC: IEnumDoc = {
    slug: 'chart-pyramid-kind',
    name: 'CHART_PYRAMID_KIND',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_pyramid_kind.description',
    descriptionFallback: 'Shape variant for the pyramid/funnel chart — pyramid (widest at bottom, tip up) or funnel (widest at top, narrows down).',
    definition: `export enum CHART_PYRAMID_KIND {
    PYRAMID = 'pyramid',
    FUNNEL  = 'funnel',
}`,
    values: [
        {
            value: 'CHART_PYRAMID_KIND.PYRAMID',
            descriptionKey: 'enums.detail.chart_pyramid_kind.pyramid',
            descriptionFallback: 'Classic pyramid shape, widest segment at the base.',
        },
        {
            value: 'CHART_PYRAMID_KIND.FUNNEL',
            descriptionKey: 'enums.detail.chart_pyramid_kind.funnel',
            descriptionFallback: 'Funnel shape, widest segment at the top narrowing downward.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-pyramid-kind.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_pyramid_kind.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_PYRAMID_KIND } from 'origam'

const kind = CHART_PYRAMID_KIND.FUNNEL`,
            lang: 'typescript',
        },
    ],
}
