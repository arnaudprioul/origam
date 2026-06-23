import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SKELETON_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-skeleton-props',
    name: 'ISkeletonProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_skeleton_props.description',
    descriptionFallback: 'Props contract for <OrigamSkeleton> — a loading-state placeholder with configurable shape (variant, width, height, rounded), color, and animation (pulse).',
    definition: `export interface ISkeletonProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IRoundedProps {
    variant?: TSkeletonVariant
    width?: string | number
    height?: string | number
    loading?: boolean
    pulse?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'ISizeProps', 'IRoundedProps'],
    props: [
        { name: 'variant', type: 'TSkeletonVariant', optional: true, descriptionFallback: 'Shape preset for the skeleton placeholder (e.g. text, avatar, card, button).' },
        { name: 'width', type: 'string | number', optional: true, descriptionFallback: 'Explicit width of the skeleton block. Accepts px numbers or any CSS length string.' },
        { name: 'height', type: 'string | number', optional: true, descriptionFallback: 'Explicit height of the skeleton block. Accepts px numbers or any CSS length string.' },
        { name: 'loading', type: 'boolean', optional: true, descriptionFallback: 'When false the default slot is revealed instead of the skeleton. Drives a loading-gate pattern.' },
        { name: 'pulse', type: 'boolean', optional: true, descriptionFallback: 'Enables the pulsing animation on the skeleton surface.' },
    ],
    usedBy: [
        { slug: 'skeleton', name: 'Skeleton', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Skeleton/skeleton.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_skeleton_props.example',
            titleFallback: 'Avatar skeleton with pulse',
            code: `<OrigamSkeleton
    variant="avatar"
    width="48"
    height="48"
    rounded="full"
    pulse
    :loading="isFetching"
>
    <UserAvatar :user="user" />
</OrigamSkeleton>`,
            lang: 'vue',
        },
    ],
}
