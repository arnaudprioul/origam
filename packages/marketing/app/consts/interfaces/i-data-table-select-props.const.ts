import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_SELECT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-select-props',
    name: 'IDataTableSelectProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_select_props.description',
    descriptionFallback: 'Props that enable and configure row selection in <OrigamDataTable> — controls the checkbox column visibility, the selection strategy, the v-model array and the equality comparator.',
    definition: `export interface IDataTableSelectProps {
    showSelect?: boolean
    selectStrategy?: TDataTableSelectStrategy
    modelValue?: Array<any>
    valueComparator?: (a: any, b: any) => boolean
}`,
    extends: [],
    props: [
        { name: 'showSelect', type: 'boolean', optional: true, descriptionFallback: 'Renders a checkbox column in the header and each row when true.' },
        { name: 'selectStrategy', type: 'TDataTableSelectStrategy', optional: true, descriptionFallback: 'Strategy object (or "single" | "page" | "all") controlling how select-all and individual selects interact.' },
        { name: 'modelValue', type: 'Array<any>', optional: true, descriptionFallback: 'Array of selected item keys (or full objects when returnObject is true). Bind with v-model.' },
        { name: 'valueComparator', type: '(a: any, b: any) => boolean', optional: true, descriptionFallback: 'Custom equality function used to determine if two item values are the same — defaults to strict equality.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_select_props.example',
            titleFallback: 'Multi-row selection with v-model',
            code: `<OrigamDataTable
    v-model="selected"
    :items="users"
    :headers="headers"
    show-select
    item-value="id"
/>`,
            lang: 'vue',
        },
    ],
}
