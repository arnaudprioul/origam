import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_MAP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-map-props',
    name: 'IChartMapProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_map_props.description',
    descriptionFallback: 'Props for <OrigamChartMap>. Supports two modes: choropleth (country shapes coloured by interpolated value) and flight-routes (curved arcs between pairs of country centroids). Extends IChartBaseProps.',
    definition: `export interface IChartMapProps extends IChartBaseProps {
    mode?: TChartMapMode
    colorRange?: [TIntent | string, TIntent | string]
    defaultCountryFill?: string
    borderColor?: string
    lineColor?: TIntent | string
    nodeRadius?: number
    routeCurvature?: number
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'mode', type: 'TChartMapMode', optional: true, descriptionFallback: 'Rendering mode. Default \'choropleth\'.' },
        { name: 'colorRange', type: '[TIntent | string, TIntent | string]', optional: true, descriptionFallback: 'Colour gradient endpoints for choropleth mode. First colour = min value; second colour = max value. Default [\'info\', \'danger\'].' },
        { name: 'defaultCountryFill', type: 'string', optional: true, descriptionFallback: 'Fill colour for countries that have no value in the dataset. Default \'rgba(0,0,0,0.08)\'.' },
        { name: 'borderColor', type: 'string', optional: true, descriptionFallback: 'Stroke colour applied to all country path outlines. Default \'rgba(0,0,0,0.2)\'.' },
        { name: 'lineColor', type: 'TIntent | string', optional: true, descriptionFallback: 'Default stroke colour for flight-route arcs. Overridden per route via IChartMapRouteDatum.color. Default \'primary\'.' },
        { name: 'nodeRadius', type: 'number', optional: true, descriptionFallback: 'Radius in SVG pixels of the endpoint circles on each route. Default 4.' },
        { name: 'routeCurvature', type: 'number', optional: true, descriptionFallback: 'Bezier control-point offset as a fraction of the chord length [0..1]. 0 = straight line; 0.3 = gentle arc (default).' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis value formatter used in tooltips and the choropleth legend.' },
    ],
    usedBy: [
        { slug: 'chart-map', name: 'ChartMap', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-map.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_map_props.example',
            titleFallback: 'World choropleth by population density',
            code: `<OrigamChartMap
    :series="[{ name: 'Population', data: densityData }]"
    mode="choropleth"
    :color-range="['info', 'danger']"
    :y-axis-format="v => v.toLocaleString()"
/>`,
            lang: 'vue',
        },
    ],
}
