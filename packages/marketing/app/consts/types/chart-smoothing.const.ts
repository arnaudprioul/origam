import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CHART_SMOOTHING_TYPE_DOC: ITypeDoc = {
    slug: 'chart-smoothing',
    name: 'TChartSmoothing',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.chart_smoothing.description',
    descriptionFallback: 'Path interpolation strategy for line, area and spline charts — controls how segments are drawn between consecutive data points.',
    definition: `export type TChartSmoothing = 'none' | 'curve' | 'monotone'`,
    values: [
        {
            value: 'none',
            descriptionKey: 'types.detail.chart_smoothing.none',
            descriptionFallback: 'Straight line segments between data points. Accurate to the raw values; no overshoot at peaks.',
        },
        {
            value: 'curve',
            descriptionKey: 'types.detail.chart_smoothing.curve',
            descriptionFallback: 'Cubic Bezier interpolation using Catmull-Rom tangent estimation. Visually smoother but may slightly overshoot sharp peaks.',
        },
        {
            value: 'monotone',
            descriptionKey: 'types.detail.chart_smoothing.monotone',
            descriptionFallback: 'Monotone cubic interpolation (Fritsch-Carlson). Smooth like curve but guaranteed not to overshoot — the implicit default for type="spline".',
        },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', propName: 'smoothing' },
        { slug: 'chart-cartesian', name: 'ChartCartesian', propName: 'smoothing' },
        { slug: 'chart-streamgraph', name: 'ChartStreamgraph', propName: 'smoothing' },
    ],
    sourceFile: 'packages/ds/src/types/Chart/chart-smoothing.type.ts',
    examples: [
        {
            titleKey: 'types.detail.chart_smoothing.example',
            titleFallback: 'Line chart with monotone smoothing',
            code: `<origam-chart-cartesian
  type="line"
  smoothing="monotone"
  :series="[{ name: 'Sales', data: [30, 80, 45, 120, 60] }]"
  :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
/>`,
            lang: 'html',
        },
    ],
}
