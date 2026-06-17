import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_FIXED_COLUMNS_UTIL_DOC: IUtilDoc = {
    slug: 'parse-fixed-columns',
    name: 'parseFixedColumns',
    category: 'DataTable',
    icon: 'mdi-table-column-plus-after',
    descriptionKey: 'utils.catalog.parse_fixed_columns.description',
    descriptionFallback: 'Walk a flat-or-nested `IInternalDataTableHeader` tree and apply sticky-column metadata in-place: mark the last fixed leaf as `lastFixed`, propagate `fixed` from parents to children, and emit a console error when multiple fixed columns lack a static width.',
    signature: `function parseFixedColumns(items: Array<IInternalDataTableHeader>): void`,
    params: [
        {
            name: 'items',
            type: 'Array<IInternalDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.parse_fixed_columns.param_items',
            descriptionFallback: 'Flat array of resolved data-table headers (may contain nested `children`). Mutated in-place to set `fixed`, `lastFixed`, and emit width warnings.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.parse_fixed_columns.returns',
        descriptionFallback: 'Returns nothing — the input array is mutated directly.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_fixed_columns.example_basic',
            titleFallback: 'Mark the last fixed column',
            code: `import { parseFixedColumns } from 'origam'

const headers = [
  { key: 'id',   fixed: true,  width: 80 },
  { key: 'name', fixed: true,  width: 200 },
  { key: 'age',  fixed: false },
]

parseFixedColumns(headers)
// headers[1].lastFixed === true`,
            lang: 'typescript',
        },
    ],
    related: ['parse-header-items', 'convert-to-internal-headers'],
}
