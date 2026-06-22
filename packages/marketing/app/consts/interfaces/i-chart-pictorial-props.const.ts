import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PICTORIAL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pictorial-props',
    name: 'IChartPictorialProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pictorial_props.description',
    descriptionFallback: 'Props for <OrigamChartPictorial> — the pictorial / isotype family. Each data value is represented as a column of repeated SVG icons; filled icons count = Math.round(value / iconsPerUnit). Extends IChartBaseProps with icon appearance, direction, and rendering mode.',
    definition: `export interface IChartPictorialProps extends IChartBaseProps {
    icon?: string
    iconColor?: TIntent | string
    emptyIconColor?: string
    iconsPerUnit?: number
    direction?: TChartPictorialDirection
    mode?: TChartPictorialMode
    showLabel?: boolean
    showAxis?: boolean
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'icon', type: 'string', optional: true, descriptionFallback: 'SVG <path d="…"> string for the icon drawn in each slot. Must fit a viewBox="0 0 24 24" coordinate system. Default: person silhouette.' },
        { name: 'iconColor', type: 'TIntent | string', optional: true, descriptionFallback: 'Colour applied to all filled icons. Accepts a TIntent name or any raw CSS colour string. When omitted, colours cycle through colorScheme by series index.' },
        { name: 'emptyIconColor', type: 'string', optional: true, descriptionFallback: 'Colour painted on background icon slots that are not yet filled. Default "rgba(0,0,0,0.1)".' },
        { name: 'iconsPerUnit', type: 'number', optional: true, descriptionFallback: 'How many data units one icon represents. E.g. iconsPerUnit=10 → a value of 65 renders 7 filled icons (rounded). Default 1.' },
        { name: 'direction', type: 'TChartPictorialDirection', optional: true, descriptionFallback: 'Stacking direction — "vertical" stacks icons bottom-to-top, "horizontal" stacks them left-to-right. Default "vertical".' },
        { name: 'mode', type: 'TChartPictorialMode', optional: true, descriptionFallback: 'Rendering mode — "stack" = classic isotype rows of small icons (default); "fill" = one large icon per category clip-masked to the fill ratio.' },
        { name: 'showLabel', type: 'boolean', optional: true, descriptionFallback: 'Display the raw value label above (vertical) or to the right (horizontal) of each column. Default true.' },
        { name: 'showAxis', type: 'boolean', optional: true, descriptionFallback: 'Display the X-axis category labels. Default true.' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'X-axis / category label formatter. Identity by default.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis / value formatter. String(value) by default.' },
    ],
    usedBy: [
        { slug: 'chart-pictorial', name: 'OrigamChartPictorial', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pictorial.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pictorial_props.example',
            titleFallback: 'Isotype chart with custom icon and fill mode',
            code: `<OrigamChartPictorial
    :series="[{ name: 'Users', data: [3, 7, 5] }]"
    :categories="['Mon', 'Wed', 'Fri']"
    :iconsPerUnit="1"
    mode="fill"
    direction="vertical"
    iconColor="primary"
/>`,
            lang: 'vue',
        },
    ],
}
