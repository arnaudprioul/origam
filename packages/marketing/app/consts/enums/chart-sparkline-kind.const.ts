import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_SPARKLINE_KIND_ENUM_DOC: IEnumDoc = {
    slug: 'chart-sparkline-kind',
    name: 'CHART_SPARKLINE_KIND',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_sparkline_kind.description',
    descriptionFallback: 'Chart type for inline sparkline widgets — line, area, column, or bar.',
    definition: `export enum CHART_SPARKLINE_KIND {
    LINE   = 'line',
    AREA   = 'area',
    COLUMN = 'column',
    BAR    = 'bar',
}`,
    values: [
        {
            value: 'CHART_SPARKLINE_KIND.LINE',
            descriptionKey: 'enums.detail.chart_sparkline_kind.line',
            descriptionFallback: 'Inline sparkline rendered as a line.',
        },
        {
            value: 'CHART_SPARKLINE_KIND.AREA',
            descriptionKey: 'enums.detail.chart_sparkline_kind.area',
            descriptionFallback: 'Inline sparkline rendered as a filled area.',
        },
        {
            value: 'CHART_SPARKLINE_KIND.COLUMN',
            descriptionKey: 'enums.detail.chart_sparkline_kind.column',
            descriptionFallback: 'Inline sparkline rendered as vertical columns.',
        },
        {
            value: 'CHART_SPARKLINE_KIND.BAR',
            descriptionKey: 'enums.detail.chart_sparkline_kind.bar',
            descriptionFallback: 'Inline sparkline rendered as horizontal bars.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-sparkline-kind.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_sparkline_kind.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_SPARKLINE_KIND } from 'origam'

const kind = CHART_SPARKLINE_KIND.AREA`,
            lang: 'typescript',
        },
    ],
}
