import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_EXPAND_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-expand-props',
    name: 'IDataTableExpandProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_expand_props.description',
    descriptionFallback: 'Props controlling row expansion in <OrigamDataTable> — whether rows expand on click, whether the expand column is shown, and the list of currently expanded row keys.',
    definition: `export interface IDataTableExpandProps {
    expandOnClick?: boolean
    showExpand?: boolean
    expanded?: Array<string>
}`,
    extends: [],
    props: [
        { name: 'expandOnClick', type: 'boolean', optional: true, descriptionFallback: 'Expand a row by clicking anywhere on it, not just the expand icon.' },
        { name: 'showExpand', type: 'boolean', optional: true, descriptionFallback: 'Show the expand toggle column in the header and each data row.' },
        { name: 'expanded', type: 'Array<string>', optional: true, descriptionFallback: 'Array of row keys that are currently expanded. Use with v-model:expanded.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/expand.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_expand_props.example',
            titleFallback: 'Expandable rows with v-model',
            code: `<OrigamDataTable
    show-expand
    expand-on-click
    v-model:expanded="expanded"
/>`,
            lang: 'vue',
        },
    ],
}
