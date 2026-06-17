import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CHART_CARTESIAN_KIND_TYPE_DOC: ITypeDoc = {
    slug: 'chart-cartesian-kind',
    name: 'TChartCartesianKind',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.chart_cartesian_kind.description',
    descriptionFallback: 'Cartesian chart topology accepted by OrigamChartCartesian — a narrowed subset of TChartType covering only X/Y axis visualisations.',
    definition: `export type TChartCartesianKind =
    | 'line'
    | 'area'
    | 'bar'
    | 'column'
    | 'scatter'
    | 'spline'
    | 'stepped-line'`,
    values: [
        { value: 'line', descriptionKey: 'types.detail.chart_cartesian_kind.line', descriptionFallback: 'Connects data points with straight line segments using the linePath generator. Optional smoothing via the smoothing prop.' },
        { value: 'area', descriptionKey: 'types.detail.chart_cartesian_kind.area', descriptionFallback: 'Filled area beneath the line — areaPath (fill) combined with linePath (stroke) per series.' },
        { value: 'bar', descriptionKey: 'types.detail.chart_cartesian_kind.bar', descriptionFallback: 'Horizontal rectangles — one <rect> per data point along the Y axis.' },
        { value: 'column', descriptionKey: 'types.detail.chart_cartesian_kind.column', descriptionFallback: 'Vertical rectangles — one <rect> per data point along the X axis (classic bar chart orientation).' },
        { value: 'scatter', descriptionKey: 'types.detail.chart_cartesian_kind.scatter', descriptionFallback: 'Individual circles at data coordinates — no connecting path between points.' },
        { value: 'spline', descriptionKey: 'types.detail.chart_cartesian_kind.spline', descriptionFallback: 'Smooth curved line — linePath forced to monotone smoothing. Equivalent to line with smoothing="monotone".' },
        { value: 'stepped-line', descriptionKey: 'types.detail.chart_cartesian_kind.stepped_line', descriptionFallback: 'Staircase polyline with right-angle segments — useful for step-function data.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'ChartCartesian', propName: 'type' },
        { slug: 'chart', name: 'Chart', propName: 'type' },
    ],
    sourceFile: 'packages/ds/src/types/Chart/chart-cartesian-kind.type.ts',
    examples: [
        {
            titleKey: 'types.detail.chart_cartesian_kind.example',
            titleFallback: 'Cartesian chart with column topology',
            code: `<origam-chart-cartesian
  type="column"
  :series="[{ name: 'Revenue', data: [120, 200, 150, 80, 70] }]"
  :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
/>`,
            lang: 'html',
        },
    ],
}
