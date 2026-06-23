import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const COLOR_MODES_TYPE_DOC: ITypeDoc = {
    slug: 'color-modes',
    name: 'TChartHoneycombColorMode',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.color_modes.description',
    descriptionFallback: 'Colour encoding mode for the OrigamChartHoneycomb component — selects whether cells are painted by category or by a continuous heatmap scale.',
    definition: `export type TChartHoneycombColorMode = \`\${CHART_HONEYCOMB_COLOR_MODE}\`

// Where CHART_HONEYCOMB_COLOR_MODE is:
export enum CHART_HONEYCOMB_COLOR_MODE {
    CATEGORICAL = 'categorical',
    HEATMAP     = 'heatmap'
}`,
    values: [
        {
            value: 'categorical',
            descriptionKey: 'types.detail.color_modes.categorical',
            descriptionFallback: 'Each hexagonal cell is painted with the intent/series colour of its category. Default mode.',
        },
        {
            value: 'heatmap',
            descriptionKey: 'types.detail.color_modes.heatmap',
            descriptionFallback: 'Cells are colour-interpolated along a two-stop gradient driven by the numeric value — from cold (low) to hot (high).',
        },
    ],
    usedBy: [
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', propName: 'colorMode' },
    ],
    sourceFile: 'packages/ds/src/types/Chart/chart-honeycomb-color-mode.type.ts',
    examples: [
        {
            titleKey: 'types.detail.color_modes.example',
            titleFallback: 'Honeycomb chart in heatmap colour mode',
            code: `<origam-chart-honeycomb
  color-mode="heatmap"
  :heat-range="['#e0f3ff', '#0057b8']"
  :series="[{ name: 'Density', data: [12, 45, 78, 23, 91, 5] }]"
/>`,
            lang: 'html',
        },
    ],
}
