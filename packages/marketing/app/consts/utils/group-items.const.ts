import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GROUP_ITEMS_UTIL_DOC: IUtilDoc = {
    slug: 'group-items',
    name: 'groupItems',
    category: 'DataTable',
    icon: 'mdi-group',
    descriptionKey: 'utils.catalog.group_items.description',
    descriptionFallback: 'Recursively groups an array of data table rows by one or more property keys. Each level produces an array of IDataTableGroup objects that carry depth, id, key, value, and the nested items. Used internally by OrigamDataTable grouping.',
    signature: `function groupItems<T extends IDataTableGroupableItem>(
  items: Array<T>,
  groupBy: Array<string>,
  depth?: number,
  prefix?: string
): Array<IDataTableGroup<T>>`,
    params: [
        {
            name: 'items',
            type: 'Array<T>',
            required: true,
            descriptionKey: 'utils.detail.group_items.param_items',
            descriptionFallback: 'The flat list of data table rows to group.',
        },
        {
            name: 'groupBy',
            type: 'Array<string>',
            required: true,
            descriptionKey: 'utils.detail.group_items.param_group_by',
            descriptionFallback: 'Ordered list of property paths to group by. The first element is the outermost grouping level.',
        },
        {
            name: 'depth',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: 'utils.detail.group_items.param_depth',
            descriptionFallback: 'Current recursion depth. Start at 0 (default) for the outermost call.',
        },
        {
            name: 'prefix',
            type: 'string',
            required: false,
            defaultValue: "'root'",
            descriptionKey: 'utils.detail.group_items.param_prefix',
            descriptionFallback: 'Prefix used to build stable unique group ids. Defaults to "root".',
        },
    ],
    returns: {
        type: 'Array<IDataTableGroup<T>>',
        descriptionKey: 'utils.detail.group_items.returns',
        descriptionFallback: 'A nested array of group descriptors. Returns an empty array when groupBy is empty.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.group_items.example_basic',
            titleFallback: 'Single-level grouping',
            code: `import { groupItems } from 'origam'

const rows = [
  { raw: { country: 'FR', name: 'Alice' }, id: '1' },
  { raw: { country: 'DE', name: 'Bob'   }, id: '2' },
  { raw: { country: 'FR', name: 'Carol' }, id: '3' },
]

groupItems(rows, ['country'])
// → [
//   { id: 'root_country_FR', key: 'country', value: 'FR', items: [Alice, Carol], depth: 0 },
//   { id: 'root_country_DE', key: 'country', value: 'DE', items: [Bob],          depth: 0 },
// ]`,
            lang: 'typescript',
        },
    ],
    related: ['group-items-by-property'],
}
