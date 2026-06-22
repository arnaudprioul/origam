import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_COUNTRY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-country',
    name: 'IChartMapCountry',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_country.description',
    descriptionFallback: 'Internal country descriptor produced by the map geometry engine. Holds the pre-resolved fill colour, ARIA metadata, and SVG path string for rendering a country shape.',
    definition: `export interface IChartMapCountry {
    code: string
    d: string
    fill: string
    value: number | undefined
    name: string
    hasData: boolean
}`,
    extends: [],
    props: [
        { name: 'code', type: 'string', optional: false, descriptionFallback: 'ISO-3166-1 alpha-2 country code.' },
        { name: 'd', type: 'string', optional: false, descriptionFallback: 'SVG <path d="…"> string from WORLD_MAP_PATHS.' },
        { name: 'fill', type: 'string', optional: false, descriptionFallback: 'Resolved CSS fill colour string.' },
        { name: 'value', type: 'number | undefined', optional: false, descriptionFallback: 'Raw numeric value (undefined for countries not in the dataset).' },
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Display name (from datum or code fallback).' },
        { name: 'hasData', type: 'boolean', optional: false, descriptionFallback: 'Whether this country has data in the current series.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_country.example',
            titleFallback: 'Accessing country descriptors from the map engine',
            code: `import { useChartMap } from 'origam'

const { countries } = useChartMap(props)
// countries.value is IChartMapCountry[]
countries.value.forEach(c => {
    console.log(c.code, c.fill, c.hasData)
})`,
            lang: 'typescript',
        },
    ],
}
