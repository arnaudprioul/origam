import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-group-props',
    name: 'IListGroupProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_group_props.description',
    descriptionFallback: 'Props for <OrigamListGroup> — a collapsible group inside a list. Supports expand/collapse icons, title, value binding, fluid mode, and the full color, spacing, border, rounded, adjacent and hover surfaces.',
    definition: `export interface IListGroupProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IAdjacentProps, IActiveProps, IHoverProps {
    collapseIcon?: TIcon
    expandIcon?: TIcon
    fluid?: boolean
    title?: string
    value?: any
}`,
    extends: ['ITagProps', 'ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps', 'IRoundedProps', 'IAdjacentProps', 'IActiveProps', 'IHoverProps'],
    props: [
        {
            name: 'collapseIcon',
            type: 'TIcon',
            optional: true,
            descriptionFallback: 'Icon shown in the activator when the group is open (collapsed state arrow).',
        },
        {
            name: 'expandIcon',
            type: 'TIcon',
            optional: true,
            descriptionFallback: 'Icon shown in the activator when the group is closed (expand state arrow).',
        },
        {
            name: 'fluid',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Removes the indentation from nested items when true, making them flush with the group activator.',
        },
        {
            name: 'title',
            type: 'string',
            optional: true,
            descriptionFallback: 'Text title rendered inside the default activator.',
        },
        {
            name: 'value',
            type: 'any',
            optional: true,
            descriptionFallback: 'Value used as the group identifier for open-state tracking via v-model:opened on the parent list.',
        },
    ],
    usedBy: [
        { slug: 'list-group', name: 'ListGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_group_props.example',
            titleFallback: 'Nested list group with custom icons',
            code: `<OrigamListGroup
    value="settings"
    title="Settings"
    expand-icon="mdi-chevron-down"
    collapse-icon="mdi-chevron-up"
>
    <OrigamListItem title="Profile" />
    <OrigamListItem title="Security" />
</OrigamListGroup>`,
            lang: 'vue',
        },
    ],
}
