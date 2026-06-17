import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_HONEYCOMB_COLOR_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'chart-honeycomb-color-mode',
    name: 'CHART_HONEYCOMB_COLOR_MODE',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_honeycomb_color_mode.description',
    descriptionFallback: 'Color encoding mode for the honeycomb chart — categorical (one color per series) or heatmap (gradient intensity).',
    definition: `export enum CHART_HONEYCOMB_COLOR_MODE {
    CATEGORICAL = 'categorical',
    HEATMAP     = 'heatmap',
}`,
    values: [
        {
            value: 'CHART_HONEYCOMB_COLOR_MODE.CATEGORICAL',
            descriptionKey: 'enums.detail.chart_honeycomb_color_mode.categorical',
            descriptionFallback: 'Each series gets a distinct categorical color.',
        },
        {
            value: 'CHART_HONEYCOMB_COLOR_MODE.HEATMAP',
            descriptionKey: 'enums.detail.chart_honeycomb_color_mode.heatmap',
            descriptionFallback: 'Cell color encodes a continuous intensity value via a gradient scale.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-honeycomb-color-mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_honeycomb_color_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_HONEYCOMB_COLOR_MODE } from 'origam'

const colorMode = CHART_HONEYCOMB_COLOR_MODE.HEATMAP`,
            lang: 'typescript',
        },
    ],
}
