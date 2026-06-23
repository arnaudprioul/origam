import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RATING_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rating-field-props',
    name: 'IRatingFieldProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rating_field_props.description',
    descriptionFallback: 'Props for <OrigamRatingField>. Extends the input contract (IInputProps), ripple effect (IRippleProps), tag polymorphism (ITagProps), and label (ILabelProps) with rating-specific props such as icon customisation, half-increments, hover preview, and per-item aria labels.',
    definition: `export interface IRatingFieldProps extends IInputProps, IRippleProps, ITagProps, ILabelProps {
    name?: string
    itemAriaLabel?: string
    clearable?: boolean
    disabled?: boolean
    emptyIcon?: TIcon
    fullIcon?: TIcon
    halfIncrements?: boolean
    hover?: boolean
    length?: number | string
    readonly?: boolean
    modelValue?: number | string
    itemLabels?: Array<string>
    itemLabelPosition?: TBlock
}`,
    extends: ['IInputProps', 'IRippleProps', 'ITagProps', 'ILabelProps'],
    props: [
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'HTML name for the underlying radio inputs — important for form submission and label association.' },
        { name: 'itemAriaLabel', type: 'string', optional: true, descriptionFallback: 'Aria-label template applied to each star item. Supports interpolation tokens for value and length.' },
        { name: 'clearable', type: 'boolean', optional: true, descriptionFallback: 'Clicking the currently selected item clears the rating back to 0 / undefined.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all interactions and applies the disabled visual state.' },
        { name: 'emptyIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered for unselected positions. Defaults to the DS star-outline token.' },
        { name: 'fullIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered for selected positions. Defaults to the DS star token.' },
        { name: 'halfIncrements', type: 'boolean', optional: true, descriptionFallback: 'Allows 0.5 step selection — each star cell gets two invisible half-width inputs.' },
        { name: 'hover', type: 'boolean', optional: true, descriptionFallback: 'Shows a hover preview: hovering over an item temporarily lights all items up to that position.' },
        { name: 'length', type: 'number | string', optional: true, descriptionFallback: 'Total number of star items to render. Accepts a number or a string coerced to number. Default 5.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes the field non-interactive while keeping normal visual appearance.' },
        { name: 'modelValue', type: 'number | string', optional: true, descriptionFallback: 'The current rating value bound with v-model.' },
        { name: 'itemLabels', type: 'Array<string>', optional: true, descriptionFallback: 'Array of per-item labels shown above or below each star. Length should match the `length` prop.' },
        { name: 'itemLabelPosition', type: 'TBlock', optional: true, descriptionFallback: 'Vertical placement of the per-item labels relative to the star row.' },
    ],
    usedBy: [
        { slug: 'rating-field', name: 'RatingField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/RatingField/rating-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rating_field_props.example',
            titleFallback: 'Basic star rating with half-increments',
            code: `<OrigamRatingField
    v-model="score"
    :length="5"
    :half-increments="true"
    :hover="true"
    full-icon="mdi-star"
    empty-icon="mdi-star-outline"
/>`,
            lang: 'html',
        },
    ],
}
