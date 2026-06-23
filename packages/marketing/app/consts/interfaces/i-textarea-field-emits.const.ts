import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXTAREA_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-textarea-field-emits',
    name: 'ITextareaFieldEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_textarea_field_emits.description',
    descriptionFallback: 'Emit contract for <OrigamTextareaField> — aggregates field and input lifecycle events plus height update (auto-grow), control click/mousedown, and rich-text format command events.',
    definition: `export interface ITextareaFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'update:height', height: number): void
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
    (e: 'format', command: TTextareaToolbarCommand, value?: string): void
}`,
    extends: ['IFieldEmits', 'IInputEmits'],
    props: [
        { name: 'update:height', type: '(e: \'update:height\', height: number) => void', optional: false, descriptionFallback: 'Emitted when the textarea height changes in auto-grow mode.' },
        { name: 'click:control', type: '(e: \'click:control\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the control surface is clicked.' },
        { name: 'mousedown:control', type: '(e: \'mousedown:control\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted on mousedown on the control surface.' },
        { name: 'format', type: '(e: \'format\', command: TTextareaToolbarCommand, value?: string) => void', optional: false, descriptionFallback: 'Emitted when a rich-text toolbar command is applied (click or keyboard shortcut). Carries the URL for link insertion.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextareaField/textarea-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_textarea_field_emits.example',
            titleFallback: 'Listening to auto-grow height changes',
            code: `<OrigamTextareaField
  v-model="content"
  auto-grow
  @update:height="h => console.log('height:', h)"
  @format="(cmd, val) => console.log(cmd, val)"
/>`,
            lang: 'html',
        },
    ],
}
