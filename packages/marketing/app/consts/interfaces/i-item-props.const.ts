import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-item-props',
    name: 'IItemProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_item_props.description',
    descriptionFallback: 'Data source props shared by list and select components. Defines how raw items array is normalised — which keys to use for title, value, children, and additional props.',
    definition: `export interface IItemProps {
    items?: Array<any>
    itemTitle?: TSelectItemKey
    itemValue?: TSelectItemKey
    itemChildren?: TSelectItemKey
    itemProps?: TSelectItemKey
    returnObject?: boolean
    valueComparator?: typeof deepEqual
}`,
    extends: [],
    props: [
        {
            name: 'items',
            type: 'Array<any>',
            optional: true,
            descriptionFallback: 'Array of raw items to display.',
        },
        {
            name: 'itemTitle',
            type: 'TSelectItemKey',
            optional: true,
            descriptionFallback: 'Key or function used to extract the display title from each item.',
        },
        {
            name: 'itemValue',
            type: 'TSelectItemKey',
            optional: true,
            descriptionFallback: 'Key or function used to extract the comparable value from each item.',
        },
        {
            name: 'itemChildren',
            type: 'TSelectItemKey',
            optional: true,
            descriptionFallback: 'Key or function used to extract nested children items.',
        },
        {
            name: 'itemProps',
            type: 'TSelectItemKey',
            optional: true,
            descriptionFallback: 'Key or function used to extract additional props forwarded to each list item component.',
        },
        {
            name: 'returnObject',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, the model value is the full raw item object instead of the extracted itemValue.',
        },
        {
            name: 'valueComparator',
            type: 'typeof deepEqual',
            optional: true,
            descriptionFallback: 'Custom equality function used for selection comparison. Defaults to deep equality.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
        { slug: 'combobox', name: 'Combobox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_item_props.example',
            titleFallback: 'Custom item key mappings',
            code: `<OrigamList
    :items="countries"
    item-title="label"
    item-value="code"
    :return-object="false"
/>`,
            lang: 'vue',
        },
    ],
}
