import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_LIST_K_V_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-list-k-v-item',
    name: 'IDataListKVItem',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_list_k_v_item.description',
    descriptionFallback: 'Shape of a single key/value row when <OrigamDataList> runs in mode="kv". The key is the visible label in the <dt> cell; the value fills the <dd> cell as plain text, a VNode, or an IDataListKVItemValueComponent descriptor.',
    definition: `export interface IDataListKVItem {
    key: string
    value: string | number | VNode | IDataListKVItemValueComponent
    id?: string | number
}`,
    extends: [],
    props: [
        { name: 'key', type: 'string', optional: false, descriptionFallback: 'Visible label rendered in the <dt> cell. Also kebab-cased to build the row data-cy selector.' },
        { name: 'value', type: 'string | number | VNode | IDataListKVItemValueComponent', optional: false, descriptionFallback: 'Value rendered in the <dd> cell. Plain text or number is rendered as-is; VNode is rendered directly; IDataListKVItemValueComponent is resolved via <component :is>.' },
        { name: 'id', type: 'string | number', optional: true, descriptionFallback: 'Optional stable row id. Falls back to key when omitted — supply your own when keys may repeat across instances.' },
    ],
    usedBy: [
        { slug: 'data-list', name: 'DataList', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-list-kv-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_list_k_v_item.example',
            titleFallback: 'Key/value list with a chip as value',
            code: `<OrigamDataList mode="kv" :items="[
    { key: 'Status', value: { component: 'origam-chip', props: { color: 'success' }, children: 'Active' } },
    { key: 'Plan', value: 'Pro' }
]" />`,
            lang: 'vue',
        },
    ],
}
