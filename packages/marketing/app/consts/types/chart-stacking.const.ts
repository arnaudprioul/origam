import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CHART_STACKING_TYPE_DOC: ITypeDoc = {
    slug: 'chart-stacking',
    name: 'TChartStacking',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.chart_stacking.description',
    descriptionFallback: 'Stacking strategy for bar, column and area charts — controls whether series are stacked by absolute values or normalised to 100 %.',
    definition: `export type TChartStacking = \`\${CHART_STACKING}\`

// Where CHART_STACKING is:
export enum CHART_STACKING {
    NORMAL  = 'normal',
    PERCENT = 'percent'
}`,
    values: [
        {
            value: 'normal',
            descriptionKey: 'types.detail.chart_stacking.normal',
            descriptionFallback: 'Series are stacked using their raw absolute values. The Y-axis spans 0 → max(stack total).',
        },
        {
            value: 'percent',
            descriptionKey: 'types.detail.chart_stacking.percent',
            descriptionFallback: 'Each stack is normalised to 100 %. The Y-axis is fixed at 0 → 100 and tick labels default to the "${v}%" format. The tooltip shows both the raw value and its share.',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', propName: 'stacking' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', propName: 'stacking' },
    ],
    sourceFile: 'packages/ds/src/types/Chart/chart-stacking.type.ts',
    examples: [
        {
            titleKey: 'types.detail.chart_stacking.example',
            titleFallback: 'Stacked column chart normalised to 100 %',
            code: `<origam-chart-cartesian
  type="column"
  stacking="percent"
  :series="[
    { name: 'Product A', data: [40, 60, 80] },
    { name: 'Product B', data: [60, 40, 20] },
  ]"
  :categories="['Q1', 'Q2', 'Q3']"
/>`,
            lang: 'html',
        },
    ],
}
