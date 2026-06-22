import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIALOG_CONFIRMATION_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-dialog-confirmation-emits',
    name: 'IDialogConfirmationEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_dialog_confirmation_emits.description',
    descriptionFallback: 'Emit contract for the confirmation dialog — fires validate when the user confirms and cancel when the user dismisses.',
    definition: `export interface IDialogConfirmationEmits {
    (e: 'validate', event: MouseEvent): void
    (e: 'cancel', event: MouseEvent): void
}`,
    extends: [],
    props: [
        {
            name: 'validate',
            type: "(e: 'validate', event: MouseEvent) => void",
            optional: false,
            descriptionFallback: 'Emitted when the user clicks the confirm / validate button.',
        },
        {
            name: 'cancel',
            type: "(e: 'cancel', event: MouseEvent) => void",
            optional: false,
            descriptionFallback: 'Emitted when the user clicks the cancel button.',
        },
    ],
    usedBy: [
        { slug: 'dialog-confirmation', name: 'DialogConfirmation', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Dialog/dialog-confirmation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_dialog_confirmation_emits.example',
            titleFallback: 'Listening to confirmation events',
            code: `<OrigamDialogConfirmation
    @validate="onConfirm"
    @cancel="onDismiss"
/>`,
            lang: 'vue',
        },
    ],
}
