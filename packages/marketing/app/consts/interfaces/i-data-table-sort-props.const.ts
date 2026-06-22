import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SORT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-sort-props',
    name: 'IDataTableSortProps',
    category: 'Data Table',
    descriptionKey: 'interfaces.catalog.i_data_table_sort_props.description',
    descriptionFallback: 'Props controlling the sort state of a data table — active sort keys, a custom comparator, multi-column sort, and the mustSort constraint.',
    definition: `export interface IDataTableSortProps {
    sortBy?: Array<IDataTableSortItem>
    customKeySort?: TDataTableCompareFunction
    multiSort?: boolean
    mustSort?: boolean
}`,
    extends: [],
    props: [
        { name: 'sortBy', type: 'Array<IDataTableSortItem>', optional: true, descriptionFallback: 'Array of sort descriptors (key + optional direction) currently active on the table.' },
        { name: 'customKeySort', type: 'TDataTableCompareFunction', optional: true, descriptionFallback: 'Custom comparator function called instead of the default string/number sort when sorting by a given column key.' },
        { name: 'multiSort', type: 'boolean', optional: true, descriptionFallback: 'Allow the user to sort by multiple columns simultaneously.' },
        { name: 'mustSort', type: 'boolean', optional: true, descriptionFallback: 'Prevent the sort from being cleared — once a column is sorted it cycles between asc and desc only.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'OrigamDataTable', kind: 'component' },
        { slug: 'use-data-table-sort', name: 'useDataTableSort', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/sort.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_sort_props.example',
            titleFallback: 'Binding sort props on a data table',
            code: `import type { IDataTableSortProps } from 'origam'

const sortProps: IDataTableSortProps = {
    sortBy: [{ key: 'name', order: 'asc' }],
    multiSort: true,
    mustSort: false,
}`,
            lang: 'typescript',
        },
    ],
}
