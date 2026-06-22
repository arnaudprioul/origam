import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_LIST_K_V_ITEM_VALUE_COMPONENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-list-k-v-item-value-component',
    name: 'IDataListKVItemValueComponent',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_list_k_v_item_value_component.description',
    descriptionFallback: 'Dynamic-component descriptor for a KV row value. Used when a consumer wants the value cell of <OrigamDataList mode="kv"> to render a registered Origam component (chip, avatar, link…) without writing a slot.',
    definition: `export interface IDataListKVItemValueComponent {
    component: string | object
    props?: Record<string, unknown>
    children?: string | number
}`,
    extends: [],
    props: [
        { name: 'component', type: 'string | object', optional: false, descriptionFallback: 'The Vue component itself (imported) or a registered global tag name (e.g. "origam-chip").' },
        { name: 'props', type: 'Record<string, unknown>', optional: true, descriptionFallback: 'Props forwarded as-is to the resolved component.' },
        { name: 'children', type: 'string | number', optional: true, descriptionFallback: 'Content rendered inside the component default slot — handy for components that take their text as a slot rather than a prop.' },
    ],
    usedBy: [
        { slug: 'data-list', name: 'DataList', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-list-kv-item-value-component.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_list_k_v_item_value_component.example',
            titleFallback: 'Rendering a chip in a KV value cell',
            code: `const item: IDataListKVItem = {
    key: 'Role',
    value: {
        component: 'origam-chip',
        props: { color: 'primary', size: 'sm' },
        children: 'Admin',
    },
}`,
            lang: 'typescript',
        },
    ],
}
