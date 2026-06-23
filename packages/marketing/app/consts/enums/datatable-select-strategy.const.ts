import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const DATATABLE_SELECT_STRATEGY_ENUM_DOC: IEnumDoc = {
    slug: 'datatable-select-strategy',
    name: 'DATATABLE_SELECT_STRATEGY',
    category: 'DataTable',
    descriptionKey: 'enums.catalog.datatable_select_strategy.description',
    descriptionFallback: 'Defines how rows are selected in OrigamDataTable: single row, current page, or all rows across pages.',
    definition: `export enum DATATABLE_SELECT_STRATEGY {
    SINGLE = 'single',
    PAGE   = 'page',
    ALL    = 'all',
}`,
    values: [
        {
            value: 'DATATABLE_SELECT_STRATEGY.SINGLE',
            descriptionKey: 'enums.detail.datatable_select_strategy.single',
            descriptionFallback: 'Only one row can be selected at a time.',
        },
        {
            value: 'DATATABLE_SELECT_STRATEGY.PAGE',
            descriptionKey: 'enums.detail.datatable_select_strategy.page',
            descriptionFallback: 'The header checkbox toggles all rows on the current page.',
        },
        {
            value: 'DATATABLE_SELECT_STRATEGY.ALL',
            descriptionKey: 'enums.detail.datatable_select_strategy.all',
            descriptionFallback: 'The header checkbox toggles all rows across every page.',
        },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', propName: 'selectStrategy' },
    ],
    sourceFile: 'packages/ds/src/enums/DataTable/data-table.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.datatable_select_strategy.example',
            titleFallback: 'Enabling single-row selection',
            code: `<origam-data-table
    :select-strategy="DATATABLE_SELECT_STRATEGY.SINGLE"
    :items="rows"
/>`,
            lang: 'vue',
        },
    ],
}
