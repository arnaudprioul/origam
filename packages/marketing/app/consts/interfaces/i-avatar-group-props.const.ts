import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AVATAR_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-avatar-group-props',
    name: 'IAvatarGroupProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_avatar_group_props.description',
    descriptionFallback: 'Full props contract for <OrigamAvatarGroup> — stacked / inline row of avatars with overflow management, expand-on-hover/click, and the full design surface (color, border, elevation, spacing, density, size, rounded).',
    definition: `export interface IAvatarGroupProps extends ICommonsComponentProps, IDirectionProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IHoverProps, IActiveProps {
    items?: Array<IAvatarProps>
    max?: number
    expandOnHover?: boolean
    expandOnClick?: boolean
}`,
    extends: [
        'ICommonsComponentProps', 'IDirectionProps', 'IDensityProps', 'IRoundedProps',
        'ISizeProps', 'ITagProps', 'IColorProps', 'IBgColorProps',
        'IPaddingProps', 'IMarginProps', 'IBorderProps', 'IElevationProps',
        'IHoverProps', 'IActiveProps',
    ],
    props: [
        { name: 'items', type: 'Array<IAvatarProps>', optional: true, descriptionFallback: 'Array of avatar descriptor objects. Each item accepts the full IAvatarProps surface.' },
        { name: 'max', type: 'number', optional: true, descriptionFallback: 'Maximum number of avatars to display before showing a +N overflow indicator.' },
        { name: 'expandOnHover', type: 'boolean', optional: true, descriptionFallback: 'Spread the avatar stack when the group is hovered.' },
        { name: 'expandOnClick', type: 'boolean', optional: true, descriptionFallback: 'Spread the avatar stack when the group is clicked.' },
    ],
    usedBy: [
        { slug: 'avatar-group', name: 'AvatarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Avatar/avatar-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_avatar_group_props.example',
            titleFallback: 'Avatar group with max and expand-on-hover',
            code: `<OrigamAvatarGroup :items="team" :max="5" expand-on-hover size="md" />`,
            lang: 'vue',
        },
    ],
}
