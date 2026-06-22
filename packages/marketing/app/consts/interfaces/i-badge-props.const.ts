import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BADGE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-badge-props',
    name: 'IBadgeProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_badge_props.description',
    descriptionFallback: 'Full props contract for <OrigamBadge> — a floating status indicator anchored to a child element. Supports numeric content, dot mode, floating/inline placement, offset, v-model visibility, and the full color/border/rounded/elevation/transition design surface.',
    definition: `export interface IBadgeProps extends ICommonsComponentProps, ITagProps, IBorderProps, IColorProps, IBgColorProps, ILocationProps, IRoundedProps, ITransitionComponentProps, IStatusProps, IHoverProps, IElevationProps {
    content?: number | string
    dot?: boolean
    floating?: boolean
    inline?: boolean
    label?: string
    max?: number | string
    modelValue?: boolean
    offsetX?: number | string
    offsetY?: number | string
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IBorderProps', 'IColorProps',
        'IBgColorProps', 'ILocationProps', 'IRoundedProps', 'ITransitionComponentProps',
        'IStatusProps', 'IHoverProps', 'IElevationProps',
    ],
    props: [
        { name: 'content', type: 'number | string', optional: true, descriptionFallback: 'Text or number rendered inside the badge pill. When omitted the badge shows as an unlabelled dot.' },
        { name: 'dot', type: 'boolean', optional: true, descriptionFallback: 'Forces a minimal dot badge regardless of the content prop.' },
        { name: 'floating', type: 'boolean', optional: true, descriptionFallback: 'Positions the badge absolutely over the top-right corner of its parent (default floating behaviour).' },
        { name: 'inline', type: 'boolean', optional: true, descriptionFallback: 'Renders the badge inline with adjacent content instead of positioned absolutely.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Accessible aria-label for the badge (for screen readers when content is a number).' },
        { name: 'max', type: 'number | string', optional: true, descriptionFallback: 'Maximum numeric value to display. When content exceeds max, renders "{max}+" (e.g. "99+").' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'Controls the visibility of the badge via v-model.' },
        { name: 'offsetX', type: 'number | string', optional: true, descriptionFallback: 'Horizontal offset from the anchor edge in pixels or CSS length.' },
        { name: 'offsetY', type: 'number | string', optional: true, descriptionFallback: 'Vertical offset from the anchor edge in pixels or CSS length.' },
    ],
    usedBy: [
        { slug: 'badge', name: 'Badge', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Badge/badge.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_badge_props.example',
            titleFallback: 'Notification badge with max cap',
            code: `<OrigamBadge :content="unreadCount" :max="99" color="danger" floating>
    <OrigamBtn icon="mdi-bell" />
</OrigamBadge>`,
            lang: 'vue',
        },
    ],
}
