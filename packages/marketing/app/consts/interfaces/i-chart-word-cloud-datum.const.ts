import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_WORD_CLOUD_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-word-cloud-datum',
    name: 'IChartWordCloudDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_word_cloud_datum.description',
    descriptionFallback: 'A single processed word datum used by the word-cloud layout engine. Computed from IChartSeries.data entries after sorting and font-size mapping.',
    definition: `export interface IChartWordCloudDatum {
    text: string
    value: number
    color: string
}`,
    extends: [],
    props: [
        { name: 'text', type: 'string', optional: false, descriptionFallback: 'Display text of the word.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value driving the font size.' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS color string for the fill.' },
    ],
    usedBy: [
        { slug: 'chart-word-cloud', name: 'OrigamChartWordCloud', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-word-cloud.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_word_cloud_datum.example',
            titleFallback: 'Building word-cloud series data',
            code: `import type { IChartWordCloudDatum } from 'origam'

const words: IChartWordCloudDatum[] = [
    { text: 'Accessibility', value: 95, color: 'var(--origam-color-primary)' },
    { text: 'Performance',   value: 80, color: 'var(--origam-color-success)' },
    { text: 'TypeScript',    value: 72, color: 'var(--origam-color-info)' },
]`,
            lang: 'typescript',
        },
    ],
}
