import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_HONEYCOMB_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-honeycomb-props',
    name: 'IChartHoneycombProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_honeycomb_props.description',
    descriptionFallback: 'Props for <OrigamChartHoneycomb> — hexagonal tile-map where each tile is positioned by column (x) and row (y) index. Extends IChartBaseProps.',
    definition: `export interface IChartHoneycombProps extends IChartBaseProps {
    orientation?: TChartHoneycombOrientation
    colorMode?: TChartHoneycombColorMode
    heatmapColorRange?: [TIntent | string, TIntent | string]
    tileSize?: number
    tileGap?: number
    showLabel?: boolean
    xAxisFormat?: (value: number | string) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'orientation', type: 'TChartHoneycombOrientation', optional: true, descriptionFallback: 'Hex vertex orientation. \'pointy-top\' — vertex at the top (default). \'flat-top\' — flat edge at the top.' },
        { name: 'colorMode', type: 'TChartHoneycombColorMode', optional: true, descriptionFallback: 'Colour-mapping strategy. \'categorical\' — intent cycle; \'heatmap\' — gradient between heatmapColorRange endpoints.' },
        { name: 'heatmapColorRange', type: '[TIntent | string, TIntent | string]', optional: true, descriptionFallback: 'Two-stop colour range for colorMode=\'heatmap\'. First entry = min, second = max. Default [\'info\', \'danger\'].' },
        { name: 'tileSize', type: 'number', optional: true, descriptionFallback: 'Hex side-length in SVG user units. Default 30.' },
        { name: 'tileGap', type: 'number', optional: true, descriptionFallback: 'Gap between adjacent tiles in SVG user units. Default 2.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Render the tile\'s name (or value) as text centred in the tile. Default true.' },
        { name: 'xAxisFormat', type: '(value: number | string) => string', optional: true, descriptionFallback: 'X-axis / column formatter applied to the numeric x index in tooltip / axis text.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis / row formatter applied to the numeric y index.' },
    ],
    usedBy: [
        { slug: 'chart-honeycomb', name: 'ChartHoneycomb', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-honeycomb.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_honeycomb_props.example',
            titleFallback: 'Categorical tile-map with flat-top orientation',
            code: `<OrigamChartHoneycomb
    :series="[{ name: 'States', data: [...] }]"
    orientation="flat-top"
    color-mode="categorical"
    :tile-size="40"
/>`,
            lang: 'vue',
        },
    ],
}
