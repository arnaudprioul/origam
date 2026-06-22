import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_GROUP_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-group',
    name: 'IDataTableGroup',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_table_group.description',
    descriptionFallback: 'Internal representation of a group node in a grouped <OrigamDataTable>. Carries the group key, value, nesting depth, and the flattened list of child items or nested sub-groups.',
    definition: `export interface IDataTableGroup<T = any> {
    type: 'group'
    depth: number
    id: string
    key: string
    value: any
    items: Array<(T | IDataTableGroup<T>)>
}`,
    extends: [],
    props: [
        { name: 'type', type: "'group'", optional: false, descriptionFallback: 'Discriminant literal — always "group". Used to distinguish group nodes from item nodes at runtime.' },
        { name: 'depth', type: 'number', optional: false, descriptionFallback: 'Nesting depth of this group (0 = top-level, 1 = nested, …).' },
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Stable unique id for this group node, used as the key in the opened set.' },
        { name: 'key', type: 'string', optional: false, descriptionFallback: 'Column key this group was built from (matches the groupBy sortItem key).' },
        { name: 'value', type: 'any', optional: false, descriptionFallback: 'The shared value of this group (e.g. the department name when grouping by department).' },
        { name: 'items', type: 'Array<(T | IDataTableGroup<T>)>', optional: false, descriptionFallback: 'Children of this group — either data items or nested IDataTableGroup nodes when groupBy has multiple levels.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_group.example',
            titleFallback: 'Grouping rows by department',
            code: `<OrigamDataTable
    :groupBy="[{ key: 'department' }]"
    :items="employees"
/>`,
            lang: 'vue',
        },
    ],
}
