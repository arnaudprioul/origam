import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_HEADER_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'parse-header-items',
    name: 'parseHeaderItems',
    category: 'DataTable',
    icon: 'mdi-table-headers-eye',
    descriptionKey: 'utils.catalog.parse_header_items.description',
    descriptionFallback: 'Flatten a tree of `IInternalDataTableHeader` nodes into a 2-D row matrix, computing `rowspan` and `colspan` values for each cell so they render correctly in a multi-level `<thead>`.',
    signature: `function parseHeaderItems(
  items: Array<IInternalDataTableHeader>,
  maxDepth: number
): Array<Array<IInternalDataTableHeader>>`,
    params: [
        {
            name: 'items',
            type: 'Array<IInternalDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.parse_header_items.param_items',
            descriptionFallback: 'Top-level headers, potentially containing nested `children` arrays that define sub-columns.',
        },
        {
            name: 'maxDepth',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.parse_header_items.param_max_depth',
            descriptionFallback: 'The total number of header rows in the table. Leaf headers without children receive a `rowspan` that fills the remaining depth.',
        },
    ],
    returns: {
        type: 'Array<Array<IInternalDataTableHeader>>',
        descriptionKey: 'utils.detail.parse_header_items.returns',
        descriptionFallback: 'A 2-D array where each inner array is one `<tr>` row of headers, enriched with computed `rowspan` and `colspan`.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_header_items.example_basic',
            titleFallback: 'Build multi-level header rows',
            code: `import { parseHeaderItems } from 'origam'

const headers = [
  { key: 'name', title: 'Name' },
  { key: 'scores', title: 'Scores', children: [
    { key: 'math', title: 'Math' },
    { key: 'science', title: 'Science' },
  ]},
]

const rows = parseHeaderItems(headers, 2)
// rows[0] → [Name(rowspan=2), Scores(colspan=2)]
// rows[1] → [Math, Science]`,
            lang: 'typescript',
        },
    ],
    related: ['parse-fixed-columns', 'convert-to-internal-headers', 'get-header-depth'],
}
