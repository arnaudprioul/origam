import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_RANGE_SELECTOR_BUTTON_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-range-selector-button',
    name: 'IChartRangeSelectorButton',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_range_selector_button.description',
    descriptionFallback: 'A single button in the range-selector toolbar. Exactly one of count or fraction must be provided: count = number of categories from the right edge to show; fraction = fraction of the full category range to show (0..1).',
    definition: `export interface IChartRangeSelectorButton {
    label: string
    count?: number
    fraction?: number
}`,
    extends: [],
    props: [
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Short label rendered on the button. E.g. "1w", "1m", "all".' },
        { name: 'count', type: 'number', optional: true, descriptionFallback: 'Number of categories from the trailing edge of the data to include in the visible window. Ignored when fraction is set.' },
        { name: 'fraction', type: 'number', optional: true, descriptionFallback: 'Fraction of the total category count to show (0 exclusive, 1 inclusive). fraction: 1 is equivalent to "all". Ignored when count is set.' },
    ],
    usedBy: [
        { slug: 'i-chart-range-selector', name: 'IChartRangeSelector', kind: 'composable' },
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-range-selector.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_range_selector_button.example',
            titleFallback: 'Defining range selector buttons',
            code: `const buttons: IChartRangeSelectorButton[] = [
    { label: '1w',  count: 7 },
    { label: '1m',  count: 30 },
    { label: '3m',  count: 90 },
    { label: 'All', fraction: 1 },
]`,
            lang: 'typescript',
        },
    ],
}
