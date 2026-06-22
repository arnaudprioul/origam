import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-field-emits',
    name: 'INumberFieldEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_number_field_emits.description',
    descriptionFallback: 'Emits fired by <OrigamNumberField> — extends IFieldEmits + IInputEmits and adds control interaction events (click, mousedown, clear) and dedicated increment/decrement value notifications.',
    definition: `export interface INumberFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
    (e: 'click:clear', event: MouseEvent): void
    (e: 'increment', value: number | null): void
    (e: 'decrement', value: number | null): void
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [
        { name: 'click:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the user clicks an increment or decrement control button.' },
        { name: 'mousedown:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired on mousedown on an increment or decrement control button. Useful to start hold-repeat behaviour.' },
        { name: 'click:clear', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the clear button is clicked, before the value is cleared.' },
        { name: 'increment', type: '(value: number | null) => void', optional: false, descriptionFallback: 'Fired after the value has been incremented. Payload is the new numeric value (or null if the field was cleared).' },
        { name: 'decrement', type: '(value: number | null) => void', optional: false, descriptionFallback: 'Fired after the value has been decremented. Payload is the new numeric value (or null if the field was cleared).' },
    ],
    usedBy: [
        { slug: 'number-field', name: 'NumberField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/NumberField/number-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_number_field_emits.example',
            titleFallback: 'Listening to increment and decrement events',
            code: `<OrigamNumberField
    v-model="quantity"
    :min="1"
    :max="99"
    @increment="onIncrement"
    @decrement="onDecrement"
    @click:clear="onClear"
/>`,
            lang: 'vue',
        },
    ],
}
