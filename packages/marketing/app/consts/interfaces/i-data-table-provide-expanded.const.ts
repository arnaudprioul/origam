import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_PROVIDE_EXPANDED_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-provide-expanded',
    name: 'IDataTableProvideExpanded',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_provide_expanded.description',
    descriptionFallback: 'Internal provide/inject contract for row expansion state in <OrigamDataTable> — exposes the expanded set and helpers for child components (expand row, virtual row, footer) to query and toggle expansion.',
    definition: `export interface IDataTableProvideExpanded {
    expand: (item: IDataTableItem, value: boolean) => void
    expanded: TVModel<IDataTableExpandProps, 'expanded', Set<string>>
    expandOnClick: Ref<boolean | undefined>
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
}`,
    extends: [],
    props: [
        { name: 'expand', type: '(item: IDataTableItem, value: boolean) => void', optional: false, descriptionFallback: 'Imperatively sets the expansion state of the given item to value.' },
        { name: 'expanded', type: 'TVModel<IDataTableExpandProps, "expanded", Set<string>>', optional: false, descriptionFallback: 'Reactive set of expanded item keys, kept in sync with the v-model:expanded prop.' },
        { name: 'expandOnClick', type: 'Ref<boolean | undefined>', optional: false, descriptionFallback: 'Reactive flag mirroring the expandOnClick prop — when true, clicking a row toggles its expansion.' },
        { name: 'isExpanded', type: '(item: IDataTableItem) => boolean', optional: false, descriptionFallback: 'Returns true when the given item is currently in the expanded set.' },
        { name: 'toggleExpand', type: '(item: IDataTableItem) => void', optional: false, descriptionFallback: 'Toggles the expansion state of the given item.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/expand.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_provide_expanded.example',
            titleFallback: 'Expand row programmatically via inject',
            code: `import { inject } from 'vue'
import { DATA_TABLE_EXPAND_KEY } from 'origam'

const { isExpanded, toggleExpand } = inject(DATA_TABLE_EXPAND_KEY)!`,
            lang: 'typescript',
        },
    ],
}
