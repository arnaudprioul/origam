import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADERS_CELL_MOBILE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-headers-cell-mobile-emits',
    name: 'IDataTableHeadersCellMobileEmits',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_headers_cell_mobile_emits.description',
    descriptionFallback: 'Emits contract for the mobile header cell of a data table — extends IAdjacentEmits with a clear-button click event.',
    definition: `export interface IDataTableHeadersCellMobileEmits extends IAdjacentEmits {
    (e: 'click:clear', event: MouseEvent): void
}`,
    extends: ['IAdjacentEmits'],
    props: [
        {
            name: 'click:clear',
            type: '(event: MouseEvent) => void',
            optional: false,
            descriptionFallback: 'Emitted when the user clicks the clear button inside the mobile header cell.',
        },
    ],
    usedBy: [
        { slug: 'data-table-headers-cell-mobile', name: 'OrigamDataTableHeadersCellMobile', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_headers_cell_mobile_emits.example',
            titleFallback: 'Listening to the clear event on a mobile header cell',
            code: `import type { IDataTableHeadersCellMobileEmits } from 'origam'

// In a parent component listening to the mobile header cell
// <OrigamDataTableHeadersCellMobile @click:clear="onClear" />
function onClear(event: MouseEvent) {
    console.log('Clear clicked', event)
}`,
            lang: 'typescript',
        },
    ],
}
