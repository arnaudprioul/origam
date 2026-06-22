import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HEATMAP_CELL_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-heatmap-cell',
    name: 'IChartHeatmapCell',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_heatmap_cell.description',
    descriptionFallback: 'Pre-computed cell descriptor produced by the heatmap geometry engine. Contains every pre-computed value needed to render one <rect>, its label, and tooltip / accessibility content — the SFC renders without arithmetic.',
    definition: `export interface IChartHeatmapCell {
    index: number
    xCat: string
    yCat: string
    value: number
    color: string
    rx: number
    ry: number
    rw: number
    rh: number
    labelX: number
    labelY: number
    labelFits: boolean
    visible: boolean
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Original index of the datum in series[0].data.' },
        { name: 'xCat', type: 'string', optional: false, descriptionFallback: 'Column category string.' },
        { name: 'yCat', type: 'string', optional: false, descriptionFallback: 'Row category string.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string for the cell fill.' },
        { name: 'rx', type: 'number', optional: false, descriptionFallback: 'SVG x position (left edge of the rect).' },
        { name: 'ry', type: 'number', optional: false, descriptionFallback: 'SVG y position (top edge of the rect).' },
        { name: 'rw', type: 'number', optional: false, descriptionFallback: 'Cell width in SVG user units.' },
        { name: 'rh', type: 'number', optional: false, descriptionFallback: 'Cell height in SVG user units.' },
        { name: 'labelX', type: 'number', optional: false, descriptionFallback: 'Centre X for the value label text.' },
        { name: 'labelY', type: 'number', optional: false, descriptionFallback: 'Centre Y for the value label text.' },
        { name: 'labelFits', type: 'boolean', optional: false, descriptionFallback: 'true when the cell is tall / wide enough to show the label.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this cell is currently visible.' },
    ],
    usedBy: [
        { slug: 'chart-heatmap', name: 'OrigamChartHeatmap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-heatmap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_heatmap_cell.example',
            titleFallback: 'Reading cell geometry in a custom heatmap tooltip',
            code: `<OrigamChartHeatmap :series="series">
    <template #tooltip="{ point, xLabel, yLabel, value }">
        <p>{{ xLabel }} × {{ yLabel }}: {{ value }}</p>
    </template>
</OrigamChartHeatmap>`,
            lang: 'vue',
        },
    ],
}
