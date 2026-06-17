import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CHART_LEGEND_POSITION_TYPE_DOC: ITypeDoc = {
    slug: 'chart-legend-position',
    name: 'TChartLegendPosition',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.chart_legend_position.description',
    descriptionFallback: 'Anchor position of the legend block inside a chart — the plotting area shrinks or grows to accommodate the legend on the chosen side.',
    definition: `export type TChartLegendPosition = 'top' | 'bottom' | 'left' | 'right'`,
    values: [
        { value: 'top', descriptionKey: 'types.detail.chart_legend_position.top', descriptionFallback: 'Legend rendered above the plotting area, items arranged in a horizontal row.' },
        { value: 'bottom', descriptionKey: 'types.detail.chart_legend_position.bottom', descriptionFallback: 'Legend rendered below the plotting area (default for most chart families), items in a horizontal row.' },
        { value: 'left', descriptionKey: 'types.detail.chart_legend_position.left', descriptionFallback: 'Legend rendered to the left of the plotting area, items stacked in a vertical column.' },
        { value: 'right', descriptionKey: 'types.detail.chart_legend_position.right', descriptionFallback: 'Legend rendered to the right of the plotting area, items stacked in a vertical column.' },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', propName: 'legendPosition' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', propName: 'legendPosition' },
        { slug: 'chart-legend', name: 'ChartLegend', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/types/Chart/chart-legend-position.type.ts',
    examples: [
        {
            titleKey: 'types.detail.chart_legend_position.example',
            titleFallback: 'Chart with legend on the right side',
            code: `<origam-chart-cartesian
  type="line"
  legend-position="right"
  :series="series"
  :categories="categories"
/>`,
            lang: 'html',
        },
    ],
}
