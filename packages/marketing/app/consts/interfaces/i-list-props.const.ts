import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-props',
    name: 'IListProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_props.description',
    descriptionFallback: 'Props for <OrigamList> — the primary list container. Accepts a data-driven items array or manual list item children. Supports expand/collapse icons, nested items via INestedProps, density, elevation, dimension, and the full color/spacing/border/rounded surface.',
    definition: `export interface IListProps extends ITagProps, ICommonsComponentProps, IElevationProps, IBorderProps, IDensityProps, IRoundedProps, IDimensionProps, INestedProps, IItemProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps {
    activeClass?: string
    disabled?: boolean
    expandIcon?: string
    collapseIcon?: string
    lines?: TLines
    slim?: boolean
    nav?: boolean
    itemType?: string
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IElevationProps', 'IBorderProps', 'IDensityProps', 'IRoundedProps', 'IDimensionProps', 'INestedProps', 'IItemProps', 'IColorProps', 'IBgColorProps', 'IPaddingProps', 'IMarginProps'],
    props: [
        {
            name: 'activeClass',
            type: 'string',
            optional: true,
            descriptionFallback: 'CSS class applied to the active list item.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Disables all interactions for the entire list.',
        },
        {
            name: 'expandIcon',
            type: 'string',
            optional: true,
            descriptionFallback: 'Icon shown on group activators when the group is collapsed.',
        },
        {
            name: 'collapseIcon',
            type: 'string',
            optional: true,
            descriptionFallback: 'Icon shown on group activators when the group is expanded.',
        },
        {
            name: 'lines',
            type: 'TLines',
            optional: true,
            descriptionFallback: 'Default line count for item text truncation — one, two, or three.',
        },
        {
            name: 'slim',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Reduces item padding for denser navigation contexts.',
        },
        {
            name: 'nav',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Applies navigation-specific styling (compact density, rounded corners on items).',
        },
        {
            name: 'itemType',
            type: 'string',
            optional: true,
            descriptionFallback: 'Key used to read the item type discriminator from each raw item object.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'navigation-drawer', name: 'NavigationDrawer', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_props.example',
            titleFallback: 'Navigation list with nested groups',
            code: `<OrigamList
    :items="navItems"
    nav
    lines="one"
    expand-icon="mdi-chevron-down"
    collapse-icon="mdi-chevron-up"
/>`,
            lang: 'vue',
        },
    ],
}
