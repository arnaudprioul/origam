import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_RANGE_SELECTOR_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-range-selector',
    name: 'IChartRangeSelector',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_range_selector.description',
    descriptionFallback: 'Configuration for the optional band-style range-selector toolbar rendered above <OrigamChartCartesian>. When enabled, displays a set of buttons that let the user select a visible time window over the full dataset.',
    definition: `export interface IChartRangeSelector {
    enabled?: boolean
    buttons?: Array<IChartRangeSelectorButton>
    selected?: number
}`,
    extends: [],
    props: [
        { name: 'enabled', type: 'boolean', optional: true, descriptionFallback: 'Show the range-selector toolbar. Default false.' },
        { name: 'buttons', type: 'Array<IChartRangeSelectorButton>', optional: true, descriptionFallback: 'Buttons to display. Defaults to a standard set when omitted: 1w / 1m / 3m / 6m / 1y / all.' },
        { name: 'selected', type: 'number', optional: true, descriptionFallback: 'Zero-based index of the initially selected button.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-range-selector.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_range_selector.example',
            titleFallback: 'Enabling the range selector with custom buttons',
            code: `<OrigamChartCartesian
    :series="series"
    :rangeSelector="{
        enabled: true,
        selected: 1,
        buttons: [
            { label: '7d', count: 7 },
            { label: '1m', count: 30 },
            { label: 'All', fraction: 1 }
        ]
    }"
/>`,
            lang: 'vue',
        },
    ],
}
