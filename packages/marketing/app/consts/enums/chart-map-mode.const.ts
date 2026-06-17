import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_MAP_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'chart-map-mode',
    name: 'CHART_MAP_MODE',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_map_mode.description',
    descriptionFallback: 'Rendering mode for the map chart — choropleth (region fill by value) or flight routes (arc connections).',
    definition: `export enum CHART_MAP_MODE {
    CHOROPLETH    = 'choropleth',
    FLIGHT_ROUTES = 'flight-routes',
}`,
    values: [
        {
            value: 'CHART_MAP_MODE.CHOROPLETH',
            descriptionKey: 'enums.detail.chart_map_mode.choropleth',
            descriptionFallback: 'Geographic regions are colored based on a data value.',
        },
        {
            value: 'CHART_MAP_MODE.FLIGHT_ROUTES',
            descriptionKey: 'enums.detail.chart_map_mode.flight_routes',
            descriptionFallback: 'Arcs connect origin and destination points on the map.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-map-mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_map_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_MAP_MODE } from 'origam'

const mode = CHART_MAP_MODE.CHOROPLETH`,
            lang: 'typescript',
        },
    ],
}
