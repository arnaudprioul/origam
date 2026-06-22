import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HONEYCOMB_TILE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-honeycomb-tile',
    name: 'IChartHoneycombTile',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_honeycomb_tile.description',
    descriptionFallback: 'Internal tile descriptor produced by the honeycomb geometry engine. Contains every pre-computed value needed to render one <polygon>, its label, and tooltip / accessibility content.',
    definition: `export interface IChartHoneycombTile {
    index: number
    gridX: number
    gridY: number
    points: string
    color: string
    label: string
    name: string
    value: number | undefined
    cx: number
    cy: number
    visible: boolean
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Original index of the data point in series[0].data.' },
        { name: 'gridX', type: 'number', optional: false, descriptionFallback: 'Column index from data[i].x.' },
        { name: 'gridY', type: 'number', optional: false, descriptionFallback: 'Row index from data[i].y.' },
        { name: 'points', type: 'string', optional: false, descriptionFallback: 'SVG points attribute string for the <polygon>.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string.' },
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Tile label (name or formatted value).' },
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Raw name string from the data point.' },
        { name: 'value', type: 'number | undefined', optional: false, descriptionFallback: 'Raw value from the data point.' },
        { name: 'cx', type: 'number', optional: false, descriptionFallback: 'Centre X in SVG user units.' },
        { name: 'cy', type: 'number', optional: false, descriptionFallback: 'Centre Y in SVG user units.' },
        { name: 'visible', type: 'boolean', optional: false, descriptionFallback: 'Whether this tile is currently visible (legend toggle).' },
    ],
    usedBy: [
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-honeycomb.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_honeycomb_tile.example',
            titleFallback: 'Accessing tile descriptors from the composable',
            code: `import { useChartHoneycomb } from 'origam'

const { tiles } = useChartHoneycomb(props)
// tiles.value is IChartHoneycombTile[]`,
            lang: 'typescript',
        },
    ],
}
