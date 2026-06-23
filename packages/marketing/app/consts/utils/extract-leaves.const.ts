import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EXTRACT_LEAVES_UTIL_DOC: IUtilDoc = {
    slug: 'extract-leaves',
    name: 'extractLeaves',
    category: 'DataTable',
    icon: 'mdi-file-tree-outline',
    descriptionKey: 'utils.catalog.extract_leaves.description',
    descriptionFallback: 'Recursively collects all leaf (childless) headers from a nested DataTable header tree into a flat array. Used to derive the rendered column list from a grouped header definition.',
    signature: `function extractLeaves(
  item: IInternalDataTableHeader,
  columns?: Array<IInternalDataTableHeader>
): Array<IInternalDataTableHeader>`,
    params: [
        {
            name: 'item',
            type: 'IInternalDataTableHeader',
            required: true,
            descriptionKey: 'utils.detail.extract_leaves.param_item',
            descriptionFallback: 'The root header node to traverse. If it has no children it is collected as a leaf; otherwise its children are recursed.',
        },
        {
            name: 'columns',
            type: 'Array<IInternalDataTableHeader>',
            required: false,
            defaultValue: '[]',
            descriptionKey: 'utils.detail.extract_leaves.param_columns',
            descriptionFallback: 'Accumulator array. A new empty array is created when omitted.',
        },
    ],
    returns: {
        type: 'Array<IInternalDataTableHeader>',
        descriptionKey: 'utils.detail.extract_leaves.returns',
        descriptionFallback: 'A flat array of all leaf headers (those without children) in depth-first order.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.extract_leaves.example_basic',
            titleFallback: 'Flatten grouped headers to leaf columns',
            code: `import { extractLeaves } from 'origam'

const header = {
    title: 'Address',
    children: [
        { key: 'city', title: 'City' },
        { key: 'zip', title: 'ZIP' },
    ],
}

extractLeaves(header)
// → [{ key: 'city', title: 'City' }, { key: 'zip', title: 'ZIP' }]`,
            lang: 'typescript',
        },
    ],
    related: ['extract-keys', 'filter-items'],
}
