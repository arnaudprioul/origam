import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_IDS_UTIL_DOC: IUtilDoc = {
    slug: 'get-ids',
    name: 'getIds',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_ids.description',
    descriptionFallback: 'Converts an array of model values to an array of internal group item IDs, supporting both value-based lookup and index-based fallback. Used by the group selection logic (Tabs, BtnToggle, etc.).',
    signature: `function getIds(
  items: UnwrapRef<Array<IGroupItem>>,
  modelValue: Array<any>
): Array<number>`,
    params: [
        {
            name: 'items',
            type: 'UnwrapRef<Array<IGroupItem>>',
            required: true,
            descriptionKey: 'utils.detail.get_ids.param_items',
            descriptionFallback: 'The reactive list of registered group items, each carrying an id and a value.',
        },
        {
            name: 'modelValue',
            type: 'Array<any>',
            required: true,
            descriptionKey: 'utils.detail.get_ids.param_model_value',
            descriptionFallback: 'The array of selected values to resolve. Each entry is matched first by deep equality against item.value, then by array index as a fallback.',
        },
    ],
    returns: {
        type: 'Array<number>',
        descriptionKey: 'utils.detail.get_ids.returns',
        descriptionFallback: 'Array of internal numeric IDs corresponding to the matched items. Unresolved entries are silently skipped.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_ids.example_basic',
            titleFallback: 'Resolve model values to IDs',
            code: `import { getIds } from 'origam'

const items = [
  { id: 0, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' },
]
getIds(items, ['a', 'c'])  // → [0, 2]
getIds(items, [1])         // → [1] (index fallback)`,
            lang: 'typescript',
        },
    ],
    related: ['get-item-index'],
}
