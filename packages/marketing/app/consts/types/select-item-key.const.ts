import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SELECT_ITEM_KEY_TYPE_DOC: ITypeDoc = {
    slug: 'select-item-key',
    name: 'TSelectItemKey',
    kind: 'type',
    category: 'Data & Selection',
    descriptionKey: 'types.catalog.select_item_key.description',
    descriptionFallback: 'Flexible item-key resolver for list/select components — boolean, string, array path or function.',
    definition: `export type TSelectItemKey<T = Record<string, any>> =
    | boolean | null | undefined  // Ignored
    | string                       // Lookup by key, supports dot notation
    | Readonly<Array<(string | number)>> // Nested lookup, each item is a key
    | ((item: T, fallback?: any) => any)`,
    values: [],
    usedBy: [
        { slug: 'select', name: 'Select', propName: 'itemTitle' },
        { slug: 'select', name: 'Select', propName: 'itemValue' },
        { slug: 'treeview', name: 'Treeview', propName: 'itemTitle' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/commons.type.ts',
    examples: [
        {
            titleKey: 'types.detail.select_item_key.example_string',
            titleFallback: 'String key (dot notation)',
            code: `<origam-select
  :items="users"
  item-title="profile.name"
  item-value="id"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.select_item_key.example_function',
            titleFallback: 'Function resolver',
            code: `<origam-select
  :items="items"
  :item-title="item => item.label.toUpperCase()"
/>`,
            lang: 'html',
        },
    ],
}
