import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PATH_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-path',
    name: 'IChartPath',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_path.description',
    descriptionFallback: 'Output of useChart() — one path descriptor per series (or per data point for bar/column/scatter/pie). The component renders each entry inside a <g> according to kind.',
    definition: `export interface IChartPath {
    seriesIndex: number
    kind: 'path' | 'rect' | 'circle' | 'polygon'
    d?: string
    rect?: { x: number, y: number, width: number, height: number }
    circle?: { cx: number, cy: number, r: number }
    color: string
    series: IChartSeries
    dataIndex?: number
    pathLength?: number
    variant?: 'fill' | 'stroke'
}`,
    extends: [],
    props: [
        { name: 'seriesIndex', type: 'number', optional: false, descriptionFallback: 'Zero-based index of the parent series.' },
        { name: 'kind', type: "'path' | 'rect' | 'circle' | 'polygon'", optional: false, descriptionFallback: 'SVG element kind to emit. path for line/area/pie/donut/radar, rect for bar/column, circle for scatter + line/area markers.' },
        { name: 'd', type: 'string', optional: true, descriptionFallback: 'Pre-computed d attribute for kind === \'path\' | \'polygon\'.' },
        { name: 'rect', type: '{ x: number, y: number, width: number, height: number }', optional: true, descriptionFallback: 'Geometry for kind === \'rect\'.' },
        { name: 'circle', type: '{ cx: number, cy: number, r: number }', optional: true, descriptionFallback: 'Geometry for kind === \'circle\'.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string.' },
        { name: 'series', type: 'IChartSeries', optional: false, descriptionFallback: 'Original series reference (for tooltip / legend).' },
        { name: 'dataIndex', type: 'number', optional: true, descriptionFallback: 'Optional data index when the path represents a single point.' },
        { name: 'pathLength', type: 'number', optional: true, descriptionFallback: 'Length of the path (used by stroke-dashoffset animation).' },
        { name: 'variant', type: "'fill' | 'stroke'", optional: true, descriptionFallback: 'Sub-kind for kind === \'path\'. Area charts emit two paths per series — the filled area (variant: \'fill\') and the overlaid stroke (variant: \'stroke\').' },
    ],
    usedBy: [
        { slug: 'chart', name: 'Chart', kind: 'component' },
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_path.example',
            titleFallback: 'Accessing path descriptors from the chart composable',
            code: `import { useChart } from 'origam'

const { paths } = useChart(options)
// paths.value is IChartPath[]
paths.value.forEach(p => {
    if (p.kind === 'rect') console.log(p.rect)
    if (p.kind === 'path') console.log(p.d)
})`,
            lang: 'typescript',
        },
    ],
}
