import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-item-props',
    name: 'IListItemProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_item_props.description',
    descriptionFallback: 'Props for <OrigamListItem> — a single item row inside a list. Covers activation state, disabled state, link navigation, density, dimension, elevation, multiline lines, and the full adjacent (prepend/append) surface.',
    definition: `export interface IListItemProps extends IBorderProps, ICommonsComponentProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ILinkProps, IColorProps, IBgColorProps, IRippleProps, IPaddingProps, IMarginProps, IAdjacentProps, IActiveProps, IHoverProps {
    active?: boolean
    activeClass?: string
    disabled?: boolean
    lines?: TLines
    link?: boolean
    nav?: boolean
    slim?: boolean
    subtitle?: string | number
    title?: string | number
    value?: any
}`,
    extends: ['IBorderProps', 'ICommonsComponentProps', 'IDensityProps', 'IDimensionProps', 'IElevationProps', 'IRoundedProps', 'ITagProps', 'ILinkProps', 'IColorProps', 'IBgColorProps', 'IRippleProps', 'IPaddingProps', 'IMarginProps', 'IAdjacentProps', 'IActiveProps', 'IHoverProps'],
    props: [
        {
            name: 'active',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Forces the item into its active / selected visual state.',
        },
        {
            name: 'activeClass',
            type: 'string',
            optional: true,
            descriptionFallback: 'CSS class applied when the item is in its active state.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Makes the item non-interactive and visually muted.',
        },
        {
            name: 'lines',
            type: 'TLines',
            optional: true,
            descriptionFallback: 'Controls the number of title/subtitle lines before text truncation.',
        },
        {
            name: 'link',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Renders the item as an anchor if true, even when no href is provided.',
        },
        {
            name: 'nav',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Applies navigation-specific styling (compact density, rounded corners).',
        },
        {
            name: 'slim',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Reduces the item padding for denser navigation contexts.',
        },
        {
            name: 'subtitle',
            type: 'string | number',
            optional: true,
            descriptionFallback: 'Secondary text rendered below the title.',
        },
        {
            name: 'title',
            type: 'string | number',
            optional: true,
            descriptionFallback: 'Primary text label rendered in the item.',
        },
        {
            name: 'value',
            type: 'any',
            optional: true,
            descriptionFallback: 'Value registered with the parent ItemGroup for selection tracking.',
        },
    ],
    usedBy: [
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
        { slug: 'list', name: 'List', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_item_props.example',
            titleFallback: 'List item with icon prepend and subtitle',
            code: `<OrigamListItem
    title="Inbox"
    subtitle="3 unread messages"
    value="inbox"
    nav
>
    <template #prepend>
        <OrigamIcon icon="mdi-inbox" />
    </template>
</OrigamListItem>`,
            lang: 'vue',
        },
    ],
}
