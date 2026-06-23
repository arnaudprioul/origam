import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXT_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-text-field-emits',
    name: 'ITextFieldEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_text_field_emits.description',
    descriptionFallback: 'Emit contract for <OrigamTextField> — aggregates field and input lifecycle events, control click/mousedown events, and mask-specific validity and completion signals.',
    definition: `export interface ITextFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', value: MouseEvent): void
    (e: 'mousedown:control', value: MouseEvent): void
    (e: 'valid', value: boolean): void
    (e: 'complete', value: { complete: boolean, unmasked: string }): void
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [
        { name: 'click:control', type: '(e: \'click:control\', value: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the control surface is clicked.' },
        { name: 'mousedown:control', type: '(e: \'mousedown:control\', value: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted on mousedown on the control surface.' },
        { name: 'valid', type: '(e: \'valid\', value: boolean) => void', optional: false, descriptionFallback: 'Emitted on every input/paste when a mask is active — carries current validity status.' },
        { name: 'complete', type: "(e: 'complete', value: { complete: boolean, unmasked: string }) => void", optional: false, descriptionFallback: 'Emitted when every mask slot is filled. Carries the unmasked value.' },
    ],
    usedBy: [
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextField/text-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_text_field_emits.example',
            titleFallback: 'Listening to mask completion',
            code: `<OrigamTextField
  v-model="phone"
  mask="phone:fr"
  @valid="isValid = $event"
  @complete="({ unmasked }) => console.log(unmasked)"
/>`,
            lang: 'html',
        },
    ],
}
