import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_DATA_LIST_KV_ITEM_VALUE_COMPONENT_UTIL_DOC: IUtilDoc = {
    slug: 'is-data-list-kv-item-value-component',
    name: 'isDataListKVItemValueComponent',
    category: 'DataList',
    icon: 'mdi-table-key',
    descriptionKey: 'utils.catalog.is_data_list_kv_item_value_component.description',
    descriptionFallback: 'Type guard that narrows an IDataListKVItem value to the dynamic-component descriptor shape (IDataListKVItemValueComponent). Enables the template to call <component :is> without optional chaining.',
    signature: 'function isDataListKVItemValueComponent(v: IDataListKVItem[\'value\']): v is IDataListKVItemValueComponent',
    params: [
        {
            name: 'v',
            type: "IDataListKVItem['value']",
            required: true,
            descriptionKey: 'utils.detail.is_data_list_kv_item_value_component.param_v',
            descriptionFallback: 'The value field of a KV data list item. Can be a string, number, or an IDataListKVItemValueComponent descriptor object.',
        },
    ],
    returns: {
        type: 'v is IDataListKVItemValueComponent',
        descriptionKey: 'utils.detail.is_data_list_kv_item_value_component.returns',
        descriptionFallback: 'true when v is an object with a component property; false for primitive values.',
    },
    sourceFile: 'packages/ds/src/utils/DataList/data-list-kv-item-value-component.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_data_list_kv_item_value_component.example_basic',
            titleFallback: 'Narrow value to dynamic component in a template',
            code: `import { isDataListKVItemValueComponent } from 'origam'

if (isDataListKVItemValueComponent(item.value)) {
  // safe to use item.value.component, item.value.props, etc.
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-property-from-item'],
}
