import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROVIDE_SELECTION_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-provide-selection',
    name: 'IDataTableProvideSelection',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_provide_selection.description',
    descriptionFallback: 'Internal provide/inject contract for row-selection state in <OrigamDataTable> — exposes selection helpers and computed flags consumed by checkboxes, header select-all and slot children.',
    definition: `export interface IDataTableProvideSelection {
    toggleSelect: (item: IDataTableSelectableItem) => void
    select: (items: Array<IDataTableSelectableItem>, value: boolean) => void
    selectAll: (value: boolean) => void
    isSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
    isSomeSelected: (items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean
    someSelected: ComputedRef<boolean>
    allSelected: ComputedRef<boolean>
    showSelectAll: ComputedRef<boolean>
}`,
    extends: [],
    props: [
        { name: 'toggleSelect', type: '(item: IDataTableSelectableItem) => void', optional: false, descriptionFallback: 'Toggles the selection state of a single item.' },
        { name: 'select', type: '(items: Array<IDataTableSelectableItem>, value: boolean) => void', optional: false, descriptionFallback: 'Sets the selection state of an array of items to value.' },
        { name: 'selectAll', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Selects or deselects all selectable items on the current page (or all items, depending on selectStrategy).' },
        { name: 'isSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Returns true when every passed item is currently selected.' },
        { name: 'isSomeSelected', type: '(items: IDataTableSelectableItem | Array<IDataTableSelectableItem>) => boolean', optional: false, descriptionFallback: 'Returns true when at least one of the passed items is selected.' },
        { name: 'someSelected', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Reactive flag — true when at least one row is selected (drives the indeterminate state of the header checkbox).' },
        { name: 'allSelected', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Reactive flag — true when all selectable rows are selected.' },
        { name: 'showSelectAll', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Reactive flag — controls whether the select-all checkbox is rendered in the header.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_provide_selection.example',
            titleFallback: 'Injecting selection helpers in a child component',
            code: `import { inject } from 'vue'
import { DATA_TABLE_SELECTION_KEY } from 'origam'

const { isSelected, toggleSelect, allSelected } = inject(DATA_TABLE_SELECTION_KEY)!`,
            lang: 'typescript',
        },
    ],
}
