import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-emits',
    name: 'IDataTableEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_data_table_emits.description',
    descriptionFallback: 'Emits contract for <OrigamDataTable> — pagination, sorting, grouping, expansion, selection and the v-model:options aggregate event.',
    definition: `export interface IDataTableEmits extends ICommonsComponentEmits {
    (e: 'update:page', value: number): void
    (e: 'update:itemsPerPage', value: number): void
    (e: 'update:sortBy', value: UnwrapRef<IDataTableProvideSort['sortBy']>): void
    (e: 'update:options', value: Record<string, unknown>): void
    (e: 'update:groupBy', value: UnwrapRef<IDataTableProvideGroup['groupBy']>): void
    (e: 'update:expanded', value: ReadonlySet<unknown>): void
    (e: 'update:currentItems', value: Array<IDataTableItem>): void
}`,
    extends: ['ICommonsComponentEmits'],
    props: [
        { name: 'update:page', type: '(value: number) => void', optional: false, descriptionFallback: 'Emitted when the active page changes.' },
        { name: 'update:itemsPerPage', type: '(value: number) => void', optional: false, descriptionFallback: 'Emitted when the items-per-page setting changes.' },
        { name: 'update:sortBy', type: "(value: UnwrapRef<IDataTableProvideSort['sortBy']>) => void", optional: false, descriptionFallback: 'Emitted when the sort columns/directions change.' },
        { name: 'update:options', type: '(value: Record<string, unknown>) => void', optional: false, descriptionFallback: 'Aggregate event emitting the full options object (page, itemsPerPage, sortBy, groupBy, expanded).' },
        { name: 'update:groupBy', type: "(value: UnwrapRef<IDataTableProvideGroup['groupBy']>) => void", optional: false, descriptionFallback: 'Emitted when the group-by columns change.' },
        { name: 'update:expanded', type: '(value: ReadonlySet<unknown>) => void', optional: false, descriptionFallback: 'Emitted when the set of expanded row keys changes.' },
        { name: 'update:currentItems', type: '(value: Array<IDataTableItem>) => void', optional: false, descriptionFallback: 'Emitted with the current visible items after pagination / filtering / sorting.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/data-table.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_emits.example',
            titleFallback: 'Listening to pagination and sort events',
            code: `<OrigamDataTable
    v-model:page="page"
    v-model:sortBy="sortBy"
    @update:options="handleOptions"
/>`,
            lang: 'vue',
        },
    ],
}
