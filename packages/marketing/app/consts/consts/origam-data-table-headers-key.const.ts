import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_HEADERS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-headers-key',
    name: 'ORIGAM_DATA_TABLE_HEADERS_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_headers_key.description',
    descriptionFallback: 'Vue provide/inject symbol that shares the resolved header matrix (headers — 2D array for multi-row headers, columns — flat array for body cells) from OrigamDataTable to its header and body subcomponents.',
    definition: `export const ORIGAM_DATA_TABLE_HEADERS_KEY: InjectionKey<{
    headers: Ref<Array<Array<IInternalDataTableHeader>>>
    columns: Ref<Array<IInternalDataTableHeader>>
}> = Symbol.for('origam:data-table-headers')`,
    value: "Symbol.for('origam:data-table-headers')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableHeaders', slug: 'data-table' },
        { name: 'OrigamDataTableRow', slug: 'data-table-row' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/headers.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_headers_key.example',
            titleFallback: 'Reading the column list inside a custom cell slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_HEADERS_KEY } from 'origam'

const headersCtx = inject(ORIGAM_DATA_TABLE_HEADERS_KEY)
// headersCtx?.columns.value  → IInternalDataTableHeader[]`,
            lang: 'typescript',
        },
    ],
}
