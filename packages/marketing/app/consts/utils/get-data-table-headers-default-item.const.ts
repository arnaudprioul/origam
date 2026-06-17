import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DATA_TABLE_HEADERS_DEFAULT_ITEM_UTIL_DOC: IUtilDoc = {
    slug: 'get-data-table-headers-default-item',
    name: 'getDataTableHeadersDefaultItem',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_data_table_headers_default_item.description',
    descriptionFallback: 'Returns the built-in header descriptor preset for a DataTable special column key (data-table-group, data-table-expand, data-table-select). Returns undefined for regular user-defined columns.',
    signature: `function getDataTableHeadersDefaultItem(item: IDataTableHeader): IInternalDataTableHeader | undefined`,
    params: [
        {
            name: 'item',
            type: 'IDataTableHeader',
            required: true,
            descriptionKey: 'utils.detail.get_data_table_headers_default_item.param_item',
            descriptionFallback: 'The raw header descriptor supplied by the consumer. Its key property is checked against the three reserved column keys.',
        },
    ],
    returns: {
        type: 'IInternalDataTableHeader | undefined',
        descriptionKey: 'utils.detail.get_data_table_headers_default_item.returns',
        descriptionFallback: 'A preset IInternalDataTableHeader (DEFAULT_HEADER or DEFAULT_ACTION_HEADER) for reserved keys, or undefined for regular columns.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_data_table_headers_default_item.example_basic',
            titleFallback: 'Check a header against built-in presets',
            code: `import { getDataTableHeadersDefaultItem } from 'origam'

const preset = getDataTableHeadersDefaultItem({ key: 'data-table-expand' })
// preset → DEFAULT_ACTION_HEADER

const custom = getDataTableHeadersDefaultItem({ key: 'name', title: 'Name' })
// custom → undefined`,
            lang: 'typescript',
        },
    ],
    related: ['get-header-depth'],
}
