import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HONEYCOMB_POINT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-honeycomb-point',
    name: 'IChartHoneycombPoint',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_honeycomb_point.description',
    descriptionFallback: 'Payload passed to IChartPoint for a hovered / clicked honeycomb tile. Exposes x = gridX, y = gridY plus the tile name and value for downstream consumers.',
    definition: `export interface IChartHoneycombPoint extends IChartPoint {
    tileName: string
    tileValue: number | undefined
}`,
    extends: ['IChartPoint'],
    props: [
        { name: 'tileName', type: 'string', optional: false, descriptionFallback: 'Raw name string from the data point corresponding to the hovered tile.' },
        { name: 'tileValue', type: 'number | undefined', optional: false, descriptionFallback: 'Raw value from the data point corresponding to the hovered tile; undefined when the datum carries no value.' },
    ],
    usedBy: [
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-honeycomb.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_honeycomb_point.example',
            titleFallback: 'Handling a point-click event on a honeycomb tile',
            code: `<OrigamChartHoneycomb
    :series="series"
    @point-click="(point: IChartHoneycombPoint) => console.log(point.tileName, point.tileValue)"
/>`,
            lang: 'vue',
        },
    ],
}
