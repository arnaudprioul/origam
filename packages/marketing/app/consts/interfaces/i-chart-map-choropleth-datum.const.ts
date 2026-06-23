import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_CHOROPLETH_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-choropleth-datum',
    name: 'IChartMapChoroplethDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_choropleth_datum.description',
    descriptionFallback: 'A single choropleth data point keyed by ISO-3166-1 alpha-2 country code. The numeric value drives the colour interpolation between colorRange endpoints.',
    definition: `export interface IChartMapChoroplethDatum {
    code: string
    value: number
    name?: string
}`,
    extends: [],
    props: [
        { name: 'code', type: 'string', optional: false, descriptionFallback: 'ISO-3166-1 alpha-2 country code (e.g. \'FR\', \'US\').' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Numeric value used to drive the colour interpolation between colorRange endpoints.' },
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'Human-readable label. Defaults to code when omitted.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_choropleth_datum.example',
            titleFallback: 'Choropleth data for European countries',
            code: `const data: IChartMapChoroplethDatum[] = [
    { code: 'FR', value: 67, name: 'France' },
    { code: 'DE', value: 83, name: 'Germany' },
    { code: 'ES', value: 47 },
]`,
            lang: 'typescript',
        },
    ],
}
