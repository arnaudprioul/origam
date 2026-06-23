import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AVATAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-avatar-props',
    name: 'IAvatarProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_avatar_props.description',
    descriptionFallback: 'Full props contract for <OrigamAvatar> — renders an image, icon or text inside a circular (or rounded) container. Exposes the full design surface (color, border, elevation, spacing, density, size, rounded) plus interactive hover and active state props.',
    definition: `export interface IAvatarProps extends ICommonsComponentProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IHoverProps, IActiveProps {
    icon?: TIcon
    image?: string | ISrcObject
    text?: string
}`,
    extends: [
        'ICommonsComponentProps', 'IDensityProps', 'IRoundedProps', 'ISizeProps',
        'ITagProps', 'IColorProps', 'IBgColorProps', 'IPaddingProps',
        'IMarginProps', 'IBorderProps', 'IElevationProps', 'IHoverProps', 'IActiveProps',
    ],
    props: [
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Renders an icon centered inside the avatar. Mutually exclusive with image and text: image wins, then icon, then text.' },
        { name: 'image', type: 'string | ISrcObject', optional: true, descriptionFallback: 'Avatar image — a URL string or an ISrcObject for srcset / lazy-src support. Takes precedence over icon and text.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Initials or short text rendered inside the avatar when no image or icon is provided.' },
    ],
    usedBy: [
        { slug: 'avatar', name: 'Avatar', kind: 'component' },
        { slug: 'avatar-group', name: 'AvatarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Avatar/avatar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_avatar_props.example',
            titleFallback: 'Avatar with image and border',
            code: `<OrigamAvatar
    image="/users/alice.jpg"
    size="lg"
    :rounded="true"
    border
    border-color="primary"
/>`,
            lang: 'vue',
        },
    ],
}
