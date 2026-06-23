import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_LIST_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-list-props',
    name: 'IDataListProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_list_props.description',
    descriptionFallback: 'Full props contract for <OrigamDataList> — a versatile list component that supports two layout modes: "avatar" (classic dl stack) and "kv" (PDF-aligned key/value table), with the full design surface.',
    definition: `export interface IDataListProps extends ICommonsComponentProps, IAdjacentProps, IColorProps, IBgColorProps, IMarginProps, IPaddingProps, IDensityProps, IBorderProps, IRoundedProps, IElevationProps {
    mode?: TDataListMode
    items?:
        | Array<IDataItem>
        | { [key: string]: IDataItem }
        | Array<IDataListKVItem>
        | { [key: string]: IDataListKVItem }
}`,
    extends: [
        'ICommonsComponentProps', 'IAdjacentProps', 'IColorProps', 'IBgColorProps',
        'IMarginProps', 'IPaddingProps', 'IDensityProps', 'IBorderProps',
        'IRoundedProps', 'IElevationProps',
    ],
    props: [
        { name: 'mode', type: "TDataListMode", optional: true, descriptionFallback: 'Layout selector: "avatar" (default, dl layout with title+text rows) or "kv" (PDF-aligned key/value table).' },
        { name: 'items', type: 'Array<IDataItem> | { [key: string]: IDataItem } | Array<IDataListKVItem> | { [key: string]: IDataListKVItem }', optional: true, descriptionFallback: 'Source list. Shape depends on mode: IDataItem for "avatar", IDataListKVItem for "kv".' },
    ],
    usedBy: [
        { slug: 'data-list', name: 'DataList', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-list.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_list_props.example',
            titleFallback: 'DataList in kv mode',
            code: `<OrigamDataList
    mode="kv"
    :items="[{ key: 'Name', value: 'Alice' }, { key: 'Plan', value: 'Pro' }]"
    rounded="md"
    border
/>`,
            lang: 'vue',
        },
    ],
}
