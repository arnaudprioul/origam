import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-header-props',
    name: 'IDataTableHeaderProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_header_props.description',
    descriptionFallback: 'Top-level header configuration props accepted by <OrigamDataTable> — the array of column header definitions and the initial items array used to infer column keys.',
    definition: `export interface IDataTableHeaderProps {
    headers?: Array<IDataTableHeader>
    items?: Array<IDataTableItem>
}`,
    extends: [],
    props: [
        { name: 'headers', type: 'Array<IDataTableHeader>', optional: true, descriptionFallback: 'Column header definitions. Each entry configures key, title, alignment, sorting, filtering and more.' },
        { name: 'items', type: 'Array<IDataTableItem>', optional: true, descriptionFallback: 'Data rows. Passed here so the header can infer column keys when no explicit headers are provided.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_header_props.example',
            titleFallback: 'Defining headers on OrigamDataTable',
            code: `<OrigamDataTable
    :headers="[{ key: 'name', title: 'Name' }, { key: 'age', title: 'Age' }]"
    :items="users"
/>`,
            lang: 'vue',
        },
    ],
}
