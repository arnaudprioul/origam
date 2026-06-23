import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CHART_RANGE_SELECTOR_DEFAULT_BUTTONS_CONST_DOC: IConstDoc = {
    slug: 'chart-range-selector-default-buttons',
    name: 'CHART_RANGE_SELECTOR_DEFAULT_BUTTONS',
    category: 'Components',
    descriptionKey: 'consts.catalog.chart_range_selector_default_buttons.description',
    descriptionFallback: 'Default buttons shown in the OrigamChart range-selector toolbar when rangeSelector.enabled is true without a custom buttons array. Covers common time-series windows (1w, 1m, 3m, 6m, 1y, all).',
    definition: `export const CHART_RANGE_SELECTOR_DEFAULT_BUTTONS = [
    { label: '1w', count: 7 },
    { label: '1m', count: 30 },
    { label: '3m', count: 90 },
    { label: '6m', count: 180 },
    { label: '1y', count: 365 },
    { label: 'all', fraction: 1 }
] as const`,
    values: [
        { value: "{ label: '1w', count: 7 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.week', descriptionFallback: 'Last 7 data points.' },
        { value: "{ label: '1m', count: 30 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.month', descriptionFallback: 'Last 30 data points.' },
        { value: "{ label: '3m', count: 90 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.quarter', descriptionFallback: 'Last 90 data points.' },
        { value: "{ label: '6m', count: 180 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.half_year', descriptionFallback: 'Last 180 data points.' },
        { value: "{ label: '1y', count: 365 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.year', descriptionFallback: 'Last 365 data points.' },
        { value: "{ label: 'all', fraction: 1 }", descriptionKey: 'consts.detail.chart_range_selector_default_buttons.all', descriptionFallback: 'Full dataset — fraction: 1 means 100% of available data.' },
    ],
    usedBy: [
        { name: 'OrigamChart', slug: 'chart' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/chart.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.chart_range_selector_default_buttons.example',
            titleFallback: 'Enabling the default range selector',
            code: `import { OrigamChart } from 'origam'

// Uses CHART_RANGE_SELECTOR_DEFAULT_BUTTONS automatically
<OrigamChart :rangeSelector="{ enabled: true }" :series="series" />`,
            lang: 'typescript',
        },
    ],
}
