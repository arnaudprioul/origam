import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HEATMAP_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-heatmap-datum',
    name: 'IChartHeatmapDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_heatmap_datum.description',
    descriptionFallback: 'Single datum shape consumed from series[0].data in a heatmap chart. Each entry represents one cell in the grid, identified by its column key (x), row key (y), and a numeric value that drives the cell colour.',
    definition: `export interface IChartHeatmapDatum {
    x: number | string
    y: number | string
    value: number
}`,
    extends: [],
    props: [
        { name: 'x', type: 'number | string', optional: false, descriptionFallback: 'Column key — maps to an X-axis category.' },
        { name: 'y', type: 'number | string', optional: false, descriptionFallback: 'Row key — maps to a Y-axis category.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Numeric value driving the cell colour (interpolated between colorRange[0] and colorRange[1]).' },
    ],
    usedBy: [
        { slug: 'chart-heatmap', name: 'OrigamChartHeatmap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-heatmap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_heatmap_datum.example',
            titleFallback: 'Providing cell data for a weekday × hour heatmap',
            code: `import type { IChartHeatmapDatum } from 'origam'

const data: IChartHeatmapDatum[] = [
    { x: 'Mon', y: '08:00', value: 12 },
    { x: 'Mon', y: '09:00', value: 45 },
    { x: 'Tue', y: '08:00', value: 8 },
]

// Pass via series[0].data
const series = [{ name: 'Activity', data }]`,
            lang: 'typescript',
        },
    ],
}
