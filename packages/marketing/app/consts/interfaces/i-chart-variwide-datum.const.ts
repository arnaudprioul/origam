import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_VARIWIDE_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-variwide-datum',
    name: 'IChartVariwideDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_variwide_datum.description',
    descriptionFallback: 'A single datum in the variwide series. Encodes two dimensions simultaneously: value → bar height (primary metric, maps to Y axis) and width → bar width (secondary metric, proportional share of plot width).',
    definition: `export interface IChartVariwideDatum {
    category: string
    value: number
    width: number
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label shown on the X axis tick and in the tooltip.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Primary value — drives the bar height via the Y scale (e.g. GDP in trillions, revenue in M€).' },
        { name: 'width', type: 'number', optional: false, descriptionFallback: 'Secondary value — drives the bar width proportionally (barPixels = plotWidth * width / Σwidths). e.g. population in M, market share %.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Optional per-datum colour override. Accepts a TIntent token or any raw CSS colour string. When omitted the chart cycles through colorScheme.' },
    ],
    usedBy: [
        { slug: 'chart-variwide', name: 'OrigamChartVariwide', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-variwide.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_variwide_datum.example',
            titleFallback: 'GDP × population variwide series',
            code: `import type { IChartVariwideDatum } from 'origam'

const data: IChartVariwideDatum[] = [
    { category: 'USA',   value: 25.46, width: 335 },
    { category: 'China', value: 17.96, width: 1412 },
    { category: 'EU',    value: 16.64, width: 448, color: 'primary' },
]`,
            lang: 'typescript',
        },
    ],
}
