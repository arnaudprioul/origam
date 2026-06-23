import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_HEADERS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-headers-props',
    name: 'IDataTableHeadersProps',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_headers_props.description',
    descriptionFallback: 'Props contract for the DataTable headers row — extends ICommonsComponentProps, IColorProps, IDisplayProps, ILoaderProps, and IHeaderCellProps to control appearance, sorting icons, stickiness and loading state of the header area.',
    definition: `export interface IDataTableHeadersProps extends ICommonsComponentProps, IColorProps, IDisplayProps, ILoaderProps, IHeaderCellProps {

}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IDisplayProps', 'ILoaderProps', 'IHeaderCellProps'],
    props: [],
    usedBy: [
        { slug: 'data-table-headers', name: 'OrigamDataTableHeaders', kind: 'component' },
        { slug: 'data-table', name: 'OrigamDataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_headers_props.example',
            titleFallback: 'Passing header props to the DataTable',
            code: `import type { IDataTableHeadersProps } from 'origam'

const headerOptions: Partial<IDataTableHeadersProps> = {
    sticky: true,
    multiSort: false,
    color: 'primary',
}`,
            lang: 'typescript',
        },
    ],
}
