import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_HEADER_DEPTH_UTIL_DOC: IUtilDoc = {
    slug: 'get-header-depth',
    name: 'getHeaderDepth',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_header_depth.description',
    descriptionFallback: 'Recursively computes the maximum nesting depth of a DataTable header column tree. Used to calculate the rowspan for parent columns in multi-level header rows.',
    signature: `function getHeaderDepth(item: IInternalDataTableHeader, depth?: number): number`,
    params: [
        {
            name: 'item',
            type: 'IInternalDataTableHeader',
            required: true,
            descriptionKey: 'utils.detail.get_header_depth.param_item',
            descriptionFallback: 'The header item to measure. Recursively traverses its children array.',
        },
        {
            name: 'depth',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.get_header_depth.param_depth',
            descriptionFallback: 'The current recursion depth. Defaults to 0; increases by 1 at each level.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_header_depth.returns',
        descriptionFallback: 'The maximum depth of the subtree rooted at item (0 = leaf, 1 = one level of children, etc.).',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_header_depth.example_basic',
            titleFallback: 'Measure a two-level header tree',
            code: `import { getHeaderDepth } from 'origam'

const header = {
  key: 'group',
  children: [
    { key: 'a' },
    { key: 'b', children: [{ key: 'b1' }] },
  ],
}
getHeaderDepth(header)  // → 2`,
            lang: 'typescript',
        },
    ],
    related: ['get-data-table-headers-default-item'],
}
