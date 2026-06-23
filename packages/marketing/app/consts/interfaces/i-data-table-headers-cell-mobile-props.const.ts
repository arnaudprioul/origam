import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADERS_CELL_MOBILE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-headers-cell-mobile-props',
    name: 'IDataTableHeadersCellMobileProps',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_headers_cell_mobile_props.description',
    descriptionFallback: 'Props for the mobile-only merged header cell of a data table, grouping all visible columns into a single collapsible cell with an optional colspan.',
    definition: `export interface IDataTableHeadersCellMobileProps extends ICommonsComponentProps, IHeaderCellProps, IColorProps {
    columns: Array<IInternalDataTableHeader>
    colspan?: number
}`,
    extends: ['ICommonsComponentProps', 'IHeaderCellProps', 'IColorProps'],
    props: [
        {
            name: 'columns',
            type: 'Array<IInternalDataTableHeader>',
            optional: false,
            descriptionFallback: 'List of resolved internal header descriptors to render inside the mobile cell.',
        },
        {
            name: 'colspan',
            type: 'number',
            optional: true,
            descriptionFallback: 'Number of columns this cell should span horizontally.',
        },
    ],
    usedBy: [
        { slug: 'data-table-headers-cell-mobile', name: 'OrigamDataTableHeadersCellMobile', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_headers_cell_mobile_props.example',
            titleFallback: 'Typing props for a custom mobile header cell wrapper',
            code: `import type { IDataTableHeadersCellMobileProps } from 'origam'

interface IMyMobileHeaderProps extends IDataTableHeadersCellMobileProps {
    label?: string
}`,
            lang: 'typescript',
        },
    ],
}
