import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PICTORIAL_COLUMN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pictorial-column',
    name: 'IChartPictorialColumn',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pictorial_column.description',
    descriptionFallback: 'One column descriptor produced by the pictorial geometry engine. Holds pre-computed positions for background and filled icon grids, enabling the <OrigamChartPictorial> template to render each isotype column.',
    definition: `export interface IChartPictorialColumn {
    seriesIndex: number
    dataIndex: number
    category: string
    value: number
    formatted: string
    totalSlots: number
    filledSlots: number
    color: string
    x: number
    y: number
    iconSize: number
    visible: boolean
}`,
    extends: [],
    props: [
        { name: 'seriesIndex', type: 'number', optional: false, descriptionFallback: 'Series index (0-based).' },
        { name: 'dataIndex', type: 'number', optional: false, descriptionFallback: 'Data index within the series.' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label (from categories[dataIndex] or fallback).' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value from series[seriesIndex].data[dataIndex].' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string.' },
        { name: 'totalSlots', type: 'number', optional: false, descriptionFallback: 'Total icon slots in this column (background capacity).' },
        { name: 'filledSlots', type: 'number', optional: false, descriptionFallback: 'Number of filled icon slots.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved fill CSS colour string.' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'X translation for the column group (SVG coordinate).' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'Y translation for the column group (SVG coordinate).' },
        { name: 'iconSize', type: 'number', optional: false, descriptionFallback: 'Computed icon size in SVG pixels.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this column is currently visible (legend toggle).' },
    ],
    usedBy: [
        { slug: 'chart-pictorial', name: 'ChartPictorial', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pictorial.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pictorial_column.example',
            titleFallback: 'Accessing column descriptors from the pictorial engine',
            code: `import { useChartPictorial } from 'origam'

const { columns } = useChartPictorial(props)
// columns.value is IChartPictorialColumn[]
columns.value.forEach(col => {
    console.log(col.category, col.filledSlots, '/', col.totalSlots)
})`,
            lang: 'typescript',
        },
    ],
}
