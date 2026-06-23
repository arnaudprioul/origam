import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CARD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-card-props',
    name: 'ICardProps',
    category: 'Card',
    descriptionKey: 'interfaces.catalog.i_card_props.description',
    descriptionFallback: 'Full prop surface for OrigamCard — extends the entire cross-cutting DS commons (tag, color, bgColor, border, density, dimension, elevation, loader, location, position, rounded, margin, padding, link, ripple, adjacent, active) plus card-specific props (disabled, flat, hover, image, link, subtitle, text, title, type).',
    definition: `export interface ICardProps extends ICommonsComponentProps, ITagProps, IBorderProps, IColorProps, IBgColorProps, IDensityProps, IDimensionProps, IElevationProps, ILoaderProps, ILocationProps, IPositionProps, IRoundedProps, IMarginProps, IPaddingProps, ILinkProps, IRippleProps, IAdjacentProps, IActiveProps {
    disabled?: boolean
    flat?: boolean
    hover?: boolean
    image?: string
    link?: boolean
    subtitle?: string | number
    text?: string | number
    title?: string | number
    type?: TCardType
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IBorderProps', 'IColorProps', 'IBgColorProps', 'IDensityProps', 'IDimensionProps', 'IElevationProps', 'ILoaderProps', 'ILocationProps', 'IPositionProps', 'IRoundedProps', 'IMarginProps', 'IPaddingProps', 'ILinkProps', 'IRippleProps', 'IAdjacentProps', 'IActiveProps'],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Puts the card in a disabled state — mutes pointer events and reduces visual opacity.' },
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Removes the elevation shadow, rendering the card flush with its container.' },
        { name: 'hover', type: 'boolean', optional: true, descriptionFallback: 'Force-enables the hover visual state (shadow lift + cursor pointer) without waiting for pointer entry.' },
        { name: 'image', type: 'string', optional: true, descriptionFallback: 'URL of an image rendered as the card background.' },
        { name: 'link', type: 'boolean', optional: true, descriptionFallback: 'Renders the card as a navigable link surface (adds cursor pointer and focuses via href/to).' },
        { name: 'subtitle', type: 'string | number', optional: true, descriptionFallback: 'Secondary text line rendered below the title in the built-in header.' },
        { name: 'text', type: 'string | number', optional: true, descriptionFallback: 'Body text rendered inside the built-in card text area.' },
        { name: 'title', type: 'string | number', optional: true, descriptionFallback: 'Headline text rendered in the built-in card header.' },
        { name: 'type', type: 'TCardType', optional: true, descriptionFallback: 'Card type variant — controls layout and semantic role (e.g. outlined, tonal, elevated).' },
    ],
    usedBy: [
        { slug: 'card', name: 'OrigamCard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Card/card.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_card_props.example',
            titleFallback: 'Feature card with color, elevation and image',
            code: `<OrigamCard
    title="Workspace Pro"
    subtitle="Unlimited seats"
    text="Everything your team needs to ship faster."
    image="/img/workspace.webp"
    elevation="md"
    rounded="lg"
    color="primary"
    hover
/>`,
            lang: 'vue',
        },
    ],
}
