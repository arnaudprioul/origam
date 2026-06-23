import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RATING_FIELD_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rating-field-item-emits',
    name: 'IRatingFieldItemEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rating_field_item_emits.description',
    descriptionFallback: 'Emit signature for <OrigamRatingFieldItem>. Extends IClickEmits with mouseenter/mouseleave so the parent RatingField can drive the half-rating hover preview from pointer movement over individual star items.',
    definition: `export interface IRatingFieldItemEmits extends IClickEmits {
    (e: 'mouseenter', event: MouseEvent): void
    (e: 'mouseleave', event: MouseEvent): void
}`,
    extends: ['IClickEmits'],
    props: [
        { name: 'mouseenter', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the pointer enters the item surface — used by the parent to preview the hovered rating value.' },
        { name: 'mouseleave', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the pointer leaves the item surface — used by the parent to clear the hover preview.' },
    ],
    usedBy: [
        { slug: 'rating-field-item', name: 'RatingFieldItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/RatingField/rating-field-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rating_field_item_emits.example',
            titleFallback: 'Handling hover events on a custom rating item',
            code: `<OrigamRatingFieldItem
    :value="3"
    @mouseenter="onHover"
    @mouseleave="onClearHover"
/>`,
            lang: 'html',
        },
    ],
}
