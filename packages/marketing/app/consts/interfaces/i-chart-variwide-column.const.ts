import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_VARIWIDE_COLUMN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-variwide-column',
    name: 'IChartVariwideColumn',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_variwide_column.description',
    descriptionFallback: 'Pre-computed column descriptor produced by the variwide geometry engine. Consumed by the template to render a single <rect> with variable width encoding a secondary metric.',
    definition: `export interface IChartVariwideColumn {
    index: number
    category: string
    value: number
    widthValue: number
    formattedValue: string
    formattedWidth: string
    color: string
    x: number
    y: number
    w: number
    h: number
    cx: number
}`,
    extends: [],
    props: [
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index in the original data array.' },
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label from the datum.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw primary value.' },
        { name: 'widthValue', type: 'number', optional: false, descriptionFallback: 'Raw secondary (width) value.' },
        { name: 'formattedValue', type: 'string', optional: false, descriptionFallback: 'Pre-formatted value string (primary).' },
        { name: 'formattedWidth', type: 'string', optional: false, descriptionFallback: 'Pre-formatted width string (secondary).' },
        { name: 'color', type: 'string', optional: false, descriptionFallback: 'Resolved CSS colour string (for fill).' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'SVG X of the left edge of the bar.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'SVG Y of the top edge of the bar.' },
        { name: 'w', type: 'number', optional: false, descriptionFallback: 'Bar width in SVG pixels.' },
        { name: 'h', type: 'number', optional: false, descriptionFallback: 'Bar height in SVG pixels.' },
        { name: 'cx', type: 'number', optional: false, descriptionFallback: 'X center — used for the X-axis tick label.' },
    ],
    usedBy: [
        { slug: 'chart-variwide', name: 'OrigamChartVariwide', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-variwide.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_variwide_column.example',
            titleFallback: 'Accessing column geometry in a custom tooltip slot',
            code: `<OrigamChartVariwide :series="series">
    <template #tooltip="{ category, value, widthValue, formattedValue, formattedWidth }">
        <div>{{ category }}</div>
        <div>Primary: {{ formattedValue }}</div>
        <div>Secondary: {{ formattedWidth }}</div>
    </template>
</OrigamChartVariwide>`,
            lang: 'vue',
        },
    ],
}
