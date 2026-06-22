import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-group-props',
    name: 'IDataTableGroupProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_group_props.description',
    descriptionFallback: 'Props controlling row grouping in <OrigamDataTable> — accepts an array of sort-item descriptors that define which columns to group by.',
    definition: `export interface IDataTableGroupProps {
    groupBy?: Array<IDataTableSortItem>
}`,
    extends: [],
    props: [
        { name: 'groupBy', type: 'Array<IDataTableSortItem>', optional: true, descriptionFallback: 'Columns to group rows by. Each entry is an IDataTableSortItem with a key and optional order. Use v-model:groupBy for two-way binding.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_group_props.example',
            titleFallback: 'Group by a single column',
            code: `<OrigamDataTable
    :groupBy="[{ key: 'department', order: 'asc' }]"
    :items="employees"
/>`,
            lang: 'vue',
        },
    ],
}
