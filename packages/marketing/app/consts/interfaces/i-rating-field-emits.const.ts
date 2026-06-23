import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RATING_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-rating-field-emits',
    name: 'IRatingFieldEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_rating_field_emits.description',
    descriptionFallback: 'Emit signature for <OrigamRatingField>. Extends ICommonsComponentEmits to inherit the standard v-model and lifecycle emits; the rating value update is handled via the modelValue emit from the commons contract.',
    definition: `export interface IRatingFieldEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'rating-field', name: 'RatingField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/RatingField/rating-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_rating_field_emits.example',
            titleFallback: 'Listening to rating field events',
            code: `<OrigamRatingField
    v-model="score"
    :length="5"
/>`,
            lang: 'html',
        },
    ],
}
