import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_STREAMGRAPH_OFFSET_ENUM_DOC: IEnumDoc = {
    slug: 'chart-streamgraph-offset',
    name: 'CHART_STREAMGRAPH_OFFSET',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_streamgraph_offset.description',
    descriptionFallback: 'Baseline offset strategy for the streamgraph chart — wiggle, silhouette, expand, or zero.',
    definition: `export enum CHART_STREAMGRAPH_OFFSET {
    WIGGLE    = 'wiggle',
    SILHOUETTE = 'silhouette',
    EXPAND    = 'expand',
    ZERO      = 'zero',
}`,
    values: [
        {
            value: 'CHART_STREAMGRAPH_OFFSET.WIGGLE',
            descriptionKey: 'enums.detail.chart_streamgraph_offset.wiggle',
            descriptionFallback: 'Minimises the sum of squared slopes; produces the classic stream shape.',
        },
        {
            value: 'CHART_STREAMGRAPH_OFFSET.SILHOUETTE',
            descriptionKey: 'enums.detail.chart_streamgraph_offset.silhouette',
            descriptionFallback: 'Centers the stream around zero, giving a symmetric silhouette.',
        },
        {
            value: 'CHART_STREAMGRAPH_OFFSET.EXPAND',
            descriptionKey: 'enums.detail.chart_streamgraph_offset.expand',
            descriptionFallback: 'Normalises values so the total at each point fills the full height (0–1).',
        },
        {
            value: 'CHART_STREAMGRAPH_OFFSET.ZERO',
            descriptionKey: 'enums.detail.chart_streamgraph_offset.zero',
            descriptionFallback: 'All streams are stacked from a fixed zero baseline.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-streamgraph-offset.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_streamgraph_offset.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_STREAMGRAPH_OFFSET } from 'origam'

const offset = CHART_STREAMGRAPH_OFFSET.WIGGLE`,
            lang: 'typescript',
        },
    ],
}
