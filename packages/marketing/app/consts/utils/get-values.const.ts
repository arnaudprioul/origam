import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_VALUES_UTIL_DOC: IUtilDoc = {
    slug: 'get-values',
    name: 'getValues',
    category: 'Commons',
    icon: 'mdi-format-list-checks',
    descriptionKey: 'utils.catalog.get_values.description',
    descriptionFallback: 'Extracts the value (or index fallback) of each IGroupItem whose id appears in the provided ids array. Used internally by group-selection composables to translate selection identifiers back to model values.',
    signature: `function getValues(
  items: UnwrapRef<Array<IGroupItem>>,
  ids: Array<any>
): Array<unknown>`,
    params: [
        {
            name: 'items',
            type: 'UnwrapRef<Array<IGroupItem>>',
            required: true,
            descriptionKey: 'utils.detail.get_values.param_items',
            descriptionFallback: 'The flat list of group items to search. Each item must expose an id and an optional value field.',
        },
        {
            name: 'ids',
            type: 'Array<any>',
            required: true,
            descriptionKey: 'utils.detail.get_values.param_ids',
            descriptionFallback: 'The selection identifiers to look up. Order is preserved in the output.',
        },
    ],
    returns: {
        type: 'Array<unknown>',
        descriptionKey: 'utils.detail.get_values.returns',
        descriptionFallback: 'An array of resolved values (item.value when set, otherwise the item index). Items whose id is not found in the list are silently skipped.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_values.example_basic',
            titleFallback: 'Resolve ids to values',
            code: `import { getValues } from 'origam'

const items = [
  { id: 'a', value: 10 },
  { id: 'b', value: 20 },
  { id: 'c', value: 30 },
]
getValues(items, ['b', 'c'])  // → [20, 30]`,
            lang: 'typescript',
        },
    ],
    related: ['group-items', 'group-items-by-property'],
}
