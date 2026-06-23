import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_WORD_CLOUD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-word-cloud-props',
    name: 'IChartWordCloudProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_word_cloud_props.description',
    descriptionFallback: 'Props for <OrigamChartWordCloud>. Reads series[0]; each datum must be a { text, value, color? } object. Controls font sizes, rotation strategy, font family/weight, and optional value formatters.',
    definition: `export interface IChartWordCloudProps extends IChartBaseProps {
    minFontSize?: number
    maxFontSize?: number
    rotation?: TChartWordCloudRotation
    fontFamily?: string
    fontWeight?: number | string
    xAxisFormat?: (value: number | string) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'minFontSize', type: 'number', optional: true, default: '12', descriptionFallback: 'Minimum font size in px applied to the word with the lowest value.' },
        { name: 'maxFontSize', type: 'number', optional: true, default: '64', descriptionFallback: 'Maximum font size in px applied to the word with the highest value.' },
        { name: 'rotation', type: 'TChartWordCloudRotation', optional: true, default: "'none'", descriptionFallback: "Word rotation strategy: 'none' (all horizontal), 'random' (uniform random in [-30°, 30°]), or 'orthogonal' (0° or 90° alternating by index parity)." },
        { name: 'fontFamily', type: 'string', optional: true, default: "'inherit'", descriptionFallback: 'Font family applied to all words. Defaults to inherit so it picks up the host page typeface.' },
        { name: 'fontWeight', type: 'number | string', optional: true, default: '600', descriptionFallback: 'Font weight applied to all words.' },
        { name: 'xAxisFormat', type: '(value: number | string) => string', optional: true, descriptionFallback: 'X-axis / value formatter. Unused for word clouds; kept for API symmetry with other chart families.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis formatter applied to the value shown in the tooltip. When omitted the raw number is displayed.' },
    ],
    usedBy: [
        { slug: 'chart-word-cloud', name: 'OrigamChartWordCloud', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-word-cloud.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_word_cloud_props.example',
            titleFallback: 'Word cloud with orthogonal rotation and custom fonts',
            code: `<OrigamChartWordCloud
    :series="[{ name: 'Terms', data: words }]"
    :min-font-size="14"
    :max-font-size="72"
    rotation="orthogonal"
    font-family="'Inter', sans-serif"
    :font-weight="700"
    :y-axis-format="v => v + ' hits'"
/>`,
            lang: 'vue',
        },
    ],
}
