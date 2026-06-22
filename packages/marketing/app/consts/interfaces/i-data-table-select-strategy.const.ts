import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SELECT_STRATEGY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-select-strategy',
    name: 'IDataTableSelectStrategy',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_select_strategy.description',
    descriptionFallback: 'Strategy object that controls how rows are selected in a DataTable — defines whether a select-all checkbox is shown and implements the select / selectAll / allSelected algorithms.',
    definition: `export interface IDataTableSelectStrategy {
    showSelectAll: boolean
    allSelected: (data: {
        allItems: Array<IDataTableSelectableItem>
        currentPage: Array<IDataTableSelectableItem>
    }) => Array<IDataTableSelectableItem>
    select: (data: {
        items: Array<IDataTableSelectableItem>
        value: boolean
        selected: Set<unknown>
    }) => Set<unknown>
    selectAll: (data: {
        value: boolean
        allItems: Array<IDataTableSelectableItem>
        currentPage: Array<IDataTableSelectableItem>
        selected: Set<unknown>
    }) => Set<unknown>
}`,
    extends: [],
    props: [
        { name: 'showSelectAll', type: 'boolean', optional: false, descriptionFallback: 'Whether a select-all checkbox should be rendered in the header row.' },
        { name: 'allSelected', type: '(data: { allItems: Array<IDataTableSelectableItem>; currentPage: Array<IDataTableSelectableItem> }) => Array<IDataTableSelectableItem>', optional: false, descriptionFallback: 'Returns the subset of items that are considered fully selected under this strategy.' },
        { name: 'select', type: '(data: { items: Array<IDataTableSelectableItem>; value: boolean; selected: Set<unknown> }) => Set<unknown>', optional: false, descriptionFallback: 'Applies a selection toggle on a given set of items and returns the new selected set.' },
        { name: 'selectAll', type: '(data: { value: boolean; allItems: Array<IDataTableSelectableItem>; currentPage: Array<IDataTableSelectableItem>; selected: Set<unknown> }) => Set<unknown>', optional: false, descriptionFallback: 'Applies a select-all or deselect-all operation and returns the resulting selected set.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_select_strategy.example',
            titleFallback: 'Custom page-only select strategy',
            code: `import type { IDataTableSelectStrategy } from 'origam'

const pageStrategy: IDataTableSelectStrategy = {
    showSelectAll: true,
    allSelected: ({ currentPage }) => currentPage,
    select: ({ items, value, selected }) => {
        const next = new Set(selected)
        for (const item of items) value ? next.add(item.value) : next.delete(item.value)
        return next
    },
    selectAll: ({ value, currentPage, selected }) => {
        const next = new Set(selected)
        for (const item of currentPage) value ? next.add(item.value) : next.delete(item.value)
        return next
    },
}`,
            lang: 'typescript',
        },
    ],
}
