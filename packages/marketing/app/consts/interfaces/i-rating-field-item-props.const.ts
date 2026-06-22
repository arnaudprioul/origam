import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RATING_FIELD_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rating-field-item-props',
    name: 'IRatingFieldItemProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rating_field_item_props.description',
    descriptionFallback: 'Props for a single star/icon cell inside <OrigamRatingField>. Declares the item-level state (value, filled, hovered, checked) alongside the full visual surface (color, size, density, rounded, border, elevation, padding, margin).',
    definition: `export interface IRatingFieldItemProps extends ICommonsComponentProps, ITagProps, IColorProps, IDensityProps, IRippleProps, ISizeProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IElevationProps {
    name?: string
    index?: number
    value: number
    label?: string
    showStar?: boolean
    isFilled?: boolean
    isHovered?: boolean
    isHovering?: boolean
    disabled?: boolean
    readonly?: boolean
    fullIcon?: TIcon
    emptyIcon?: TIcon
    halfIncrements?: boolean
    checked?: boolean
    length?: number
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IColorProps',
        'IDensityProps',
        'IRippleProps',
        'ISizeProps',
        'IBorderProps',
        'IPaddingProps',
        'IMarginProps',
        'IRoundedProps',
        'IElevationProps',
    ],
    props: [
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'HTML name attribute forwarded to the underlying radio input — groups items in the same rating field.' },
        { name: 'index', type: 'number', optional: true, descriptionFallback: 'Zero-based position of this item in the rating row — used by the parent for keyboard navigation.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Numeric rating value this item represents (1-based by convention). Required.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Accessible label for this star position — rendered as aria-label or a visually-hidden string.' },
        { name: 'showStar', type: 'boolean', optional: true, descriptionFallback: 'Whether to render the icon. When false the item occupies space but shows no icon (used for spacer items in half-increment mode).' },
        { name: 'isFilled', type: 'boolean', optional: true, descriptionFallback: 'True when the item value is at or below the current model value — paints the filled icon variant.' },
        { name: 'isHovered', type: 'boolean', optional: true, descriptionFallback: 'True when the pointer is hovering over this specific item, enabling per-item hover styling.' },
        { name: 'isHovering', type: 'boolean', optional: true, descriptionFallback: 'True when any item in the row is being hovered — used to dim non-hovered items.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Prevents interaction and applies the disabled visual state.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes the item non-interactive but keeps its normal visual appearance (no disabled dimming).' },
        { name: 'fullIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon displayed when the item is filled. Defaults to the parent RatingField fullIcon.' },
        { name: 'emptyIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon displayed when the item is empty. Defaults to the parent RatingField emptyIcon.' },
        { name: 'halfIncrements', type: 'boolean', optional: true, descriptionFallback: 'Enables half-step selection — two invisible inputs occupy each star cell.' },
        { name: 'checked', type: 'boolean', optional: true, descriptionFallback: 'Whether the underlying radio input is in the checked state.' },
        { name: 'length', type: 'number', optional: true, descriptionFallback: 'Total number of items in the row — forwarded for accessibility labels.' },
    ],
    usedBy: [
        { slug: 'rating-field', name: 'RatingField', kind: 'component' },
        { slug: 'rating-field-item', name: 'RatingFieldItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/RatingField/rating-field-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rating_field_item_props.example',
            titleFallback: 'Rendering a single rating item',
            code: `<OrigamRatingFieldItem
    :value="3"
    :is-filled="true"
    full-icon="mdi-star"
    empty-icon="mdi-star-outline"
/>`,
            lang: 'html',
        },
    ],
}
