import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_TREEMAP_TILE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-treemap-tile',
    name: 'IChartTreemapTile',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_treemap_tile.description',
    descriptionFallback: 'Internal tile descriptor produced by the treemap layout engine. All coordinates are in SVG-user-unit space (the fixed 600 × 400 viewport). Consumed by the template to render a single <rect> + optional inline label.',
    definition: `export interface IChartTreemapTile {
    index: number
    key: string
    name: string
    value: number
    formatted: string
    color: string
    x: number
    y: number
    width: number
    height: number
    visible: boolean
    labelFits: boolean
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index in the original sorted data array.' },
        { name: 'key', type: 'string', optional: false, descriptionFallback: 'Unique key derived from the datum name — used in v-for :key.' },
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Display label.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value.' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string (after applying yAxisFormat if present).' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string.' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'SVG x coordinate of the tile\'s top-left corner.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'SVG y coordinate of the tile\'s top-left corner.' },
        { name: 'width', type: 'number', optional: false, descriptionFallback: 'Tile width in SVG user units.' },
        { name: 'height', type: 'number', optional: false, descriptionFallback: 'Tile height in SVG user units.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether the tile is currently visible (legend toggle).' },
        { name: 'labelFits', type: 'boolean', optional: false, descriptionFallback: 'True when the tile is large enough to show the name + value label inline (min 60 × 24 SVG px).' },
    ],
    usedBy: [
        { slug: 'chart-treemap', name: 'OrigamChartTreemap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-treemap.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_treemap_tile.example',
            titleFallback: 'Accessing tile geometry in a custom tile-label slot',
            code: `<OrigamChartTreemap :series="series">
    <template #tile-label="{ name, value, formatted, color, index, visible }">
        <text :fill="color">{{ name }}: {{ formatted }}</text>
    </template>
</OrigamChartTreemap>`,
            lang: 'vue',
        },
    ],
}
