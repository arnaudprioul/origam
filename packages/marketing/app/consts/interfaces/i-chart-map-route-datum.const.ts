import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_ROUTE_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-route-datum',
    name: 'IChartMapRouteDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_route_datum.description',
    descriptionFallback: 'A single flight-route datum connecting two country centroids. Used in series[0].data when mode=\'flight-routes\' on <OrigamChartMap>.',
    definition: `export interface IChartMapRouteDatum {
    from: string
    to: string
    value?: number
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'from', type: 'string', optional: false, descriptionFallback: 'ISO-3166-1 alpha-2 code for the route origin.' },
        { name: 'to', type: 'string', optional: false, descriptionFallback: 'ISO-3166-1 alpha-2 code for the route destination.' },
        { name: 'value', type: 'number', optional: true, descriptionFallback: 'Optional flow weight — drives the stroke width via Math.log(value + 1) * 1.5.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Overrides the global lineColor prop for this specific route.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_route_datum.example',
            titleFallback: 'Flight routes between major hubs',
            code: `const routes: IChartMapRouteDatum[] = [
    { from: 'FR', to: 'US', value: 120, color: 'primary' },
    { from: 'FR', to: 'JP', value: 80 },
    { from: 'DE', to: 'CN', value: 200, color: '#ff6600' },
]`,
            lang: 'typescript',
        },
    ],
}
