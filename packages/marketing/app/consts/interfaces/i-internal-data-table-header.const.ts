import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERNAL_DATA_TABLE_HEADER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-internal-data-table-header',
    name: 'IInternalDataTableHeader',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_internal_data_table_header.description',
    descriptionFallback: 'Normalised header descriptor used internally by <OrigamDataTable> after the raw IDataTableHeader array has been processed. Extends IDataTableHeader (omitting key, value, children) with resolved types and layout hints.',
    definition: `export interface IInternalDataTableHeader extends Omit<IDataTableHeader, 'key' | 'value' | 'children'> {
    key: string | null
    value: TSelectItemKey | null
    sortable: boolean
    fixedOffset?: number
    lastFixed?: boolean
    nowrap?: boolean
    padding?: string | number
    colspan?: number
    rowspan?: number
    children?: Array<IInternalDataTableHeader>
}`,
    extends: ['IDataTableHeader'],
    props: [
        {
            name: 'key',
            type: 'string | null',
            optional: false,
            descriptionFallback: 'Resolved column key used for sorting and filtering. null for columns without a key.',
        },
        {
            name: 'value',
            type: 'TSelectItemKey | null',
            optional: false,
            descriptionFallback: 'Resolved value accessor for reading cell data from a row object. null when no value is defined.',
        },
        {
            name: 'sortable',
            type: 'boolean',
            optional: false,
            descriptionFallback: 'Whether the column is sortable. Derived from the raw header definition during normalisation.',
        },
        {
            name: 'fixedOffset',
            type: 'number',
            optional: true,
            descriptionFallback: 'Pixel offset applied to sticky fixed columns.',
        },
        {
            name: 'lastFixed',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Marks the last fixed column so a drop-shadow separator can be rendered.',
        },
        {
            name: 'nowrap',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Prevents text wrapping inside the header cell.',
        },
        {
            name: 'padding',
            type: 'string | number',
            optional: true,
            descriptionFallback: 'Override cell padding for this column.',
        },
        {
            name: 'colspan',
            type: 'number',
            optional: true,
            descriptionFallback: 'HTML colspan for merged header cells.',
        },
        {
            name: 'rowspan',
            type: 'number',
            optional: true,
            descriptionFallback: 'HTML rowspan for merged header cells.',
        },
        {
            name: 'children',
            type: 'Array<IInternalDataTableHeader>',
            optional: true,
            descriptionFallback: 'Nested sub-headers for grouped column structures.',
        },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_internal_data_table_header.example',
            titleFallback: 'Reading a resolved header in a custom header slot',
            code: `<OrigamDataTable :headers="headers" :items="rows">
    <template #header.name="{ column }">
        <!-- column is IInternalDataTableHeader -->
        <span :class="{ 'font-bold': column.sortable }">{{ column.title }}</span>
    </template>
</OrigamDataTable>`,
            lang: 'vue',
        },
    ],
}
