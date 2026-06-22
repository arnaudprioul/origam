import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_ROW_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-row-emits',
    name: 'IDataTableRowEmits',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_row_emits.description',
    descriptionFallback: 'Emits contract for <OrigamDataTableRow> — fires row-level expand and select events carrying the affected item and the new boolean state.',
    definition: `export interface IDataTableRowEmits {
    (e: 'expand', payload: { item: IDataTableItem, value: boolean }): void
    (e: 'select', payload: { item: IDataTableItem, value: boolean }): void
}`,
    extends: [],
    props: [
        { name: 'expand', type: '(e: "expand", payload: { item: IDataTableItem, value: boolean }) => void', optional: false, descriptionFallback: 'Fired when the row expand state changes — payload contains the affected item and the new expanded value.' },
        { name: 'select', type: '(e: "select", payload: { item: IDataTableItem, value: boolean }) => void', optional: false, descriptionFallback: 'Fired when the row selection state changes — payload contains the affected item and the new selected value.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/row.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_row_emits.example',
            titleFallback: 'Listening to row-level events',
            code: `<OrigamDataTable
    :items="rows"
    :headers="headers"
    @expand="({ item, value }) => console.log('expand', item, value)"
    @select="({ item, value }) => console.log('select', item, value)"
/>`,
            lang: 'vue',
        },
    ],
}
