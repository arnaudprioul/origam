import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_ROUTE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-route',
    name: 'IChartMapRoute',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_route.description',
    descriptionFallback: 'Internal route descriptor produced by the map geometry engine for flight-routes mode. Holds the pre-computed SVG Bezier path, stroke colour, endpoint circles, and country codes.',
    definition: `export interface IChartMapRoute {
    index: number
    d: string
    stroke: string
    strokeWidth: number
    fromPoint: [number, number]
    toPoint: [number, number]
    from: string
    to: string
    value: number | undefined
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Zero-based index in the series data array.' },
        { name: 'd', type: 'string', optional: false, descriptionFallback: 'SVG quadratic Bezier path string: M x1,y1 Q cx,cy x2,y2.' },
        { name: 'stroke', type: 'string', optional: false, descriptionFallback: 'Resolved CSS stroke colour.' },
        { name: 'strokeWidth', type: 'number', optional: false, descriptionFallback: 'Stroke width in SVG pixels.' },
        { name: 'fromPoint', type: '[number, number]', optional: false, descriptionFallback: 'Centroid [x, y] of the origin country.' },
        { name: 'toPoint', type: '[number, number]', optional: false, descriptionFallback: 'Centroid [x, y] of the destination country.' },
        { name: 'from', type: 'string', optional: false, descriptionFallback: 'Origin country ISO-3166-1 alpha-2 code.' },
        { name: 'to', type: 'string', optional: false, descriptionFallback: 'Destination country ISO-3166-1 alpha-2 code.' },
        { name: 'value', type: 'number | undefined', optional: false, descriptionFallback: 'Optional flow value driving stroke width.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_route.example',
            titleFallback: 'Accessing pre-computed route descriptors',
            code: `import { useChartMap } from 'origam'

const { routes } = useChartMap(props)
// routes.value is IChartMapRoute[]`,
            lang: 'typescript',
        },
    ],
}
