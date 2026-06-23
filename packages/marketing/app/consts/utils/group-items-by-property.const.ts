import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GROUP_ITEMS_BY_PROPERTY_UTIL_DOC: IUtilDoc = {
    slug: 'group-items-by-property',
    name: 'groupItemsByProperty',
    category: 'DataTable',
    icon: 'mdi-table-split-cell',
    descriptionKey: 'utils.catalog.group_items_by_property.description',
    descriptionFallback: 'Groups an array of IDataTableGroupableItem rows by a single property path, returning a Map whose keys are the distinct property values and whose values are sub-arrays of matching rows. Building block used by groupItems for each groupBy level.',
    signature: `function groupItemsByProperty<T extends IDataTableGroupableItem>(
  items: Array<T>,
  groupBy: string
): Map<any, Array<T>>`,
    params: [
        {
            name: 'items',
            type: 'Array<T>',
            required: true,
            descriptionKey: 'utils.detail.group_items_by_property.param_items',
            descriptionFallback: 'The flat list of rows to partition.',
        },
        {
            name: 'groupBy',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.group_items_by_property.param_group_by',
            descriptionFallback: 'A dot-notation property path applied to each row\'s raw object via getObjectValueByPath.',
        },
    ],
    returns: {
        type: 'Map<any, Array<T>>',
        descriptionKey: 'utils.detail.group_items_by_property.returns',
        descriptionFallback: 'A Map where each key is a distinct property value and the value is the array of rows that share it. Returns an empty array (not a Map) when items is empty.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.group_items_by_property.example_basic',
            titleFallback: 'Partition rows by a field',
            code: `import { groupItemsByProperty } from 'origam'

const rows = [
  { raw: { status: 'active' }, id: '1' },
  { raw: { status: 'idle'   }, id: '2' },
  { raw: { status: 'active' }, id: '3' },
]

const map = groupItemsByProperty(rows, 'status')
map.get('active')  // → [row1, row3]
map.get('idle')    // → [row2]`,
            lang: 'typescript',
        },
    ],
    related: ['group-items'],
}
