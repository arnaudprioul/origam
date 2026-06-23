import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIALOG_CONFIRMATION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-dialog-confirmation-props',
    name: 'IDialogConfirmationProps',
    category: 'Overlay',
    descriptionKey: 'interfaces.catalog.i_dialog_confirmation_props.description',
    descriptionFallback: 'Props for OrigamDialogConfirmation — a pre-wired dialog that shows Confirm and (optionally) Cancel buttons. Extends IDialogProps with a single cancellable flag that shows or hides the Cancel action.',
    definition: `export interface IDialogConfirmationProps extends IDialogProps {
    cancellable?: boolean
}`,
    extends: ['IDialogProps'],
    props: [
        { name: 'cancellable', type: 'boolean', optional: true, descriptionFallback: 'When true (the default), a Cancel button is rendered alongside Confirm. Set to false to produce a non-dismissible acknowledgement dialog.' },
    ],
    usedBy: [
        { slug: 'dialog-confirmation', name: 'OrigamDialogConfirmation', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Dialog/dialog-confirmation.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_dialog_confirmation_props.example',
            titleFallback: 'Non-cancellable acknowledgement dialog',
            code: `<OrigamDialogConfirmation
    v-model="open"
    title="Terms updated"
    :cancellable="false"
    @validate="acceptTerms"
>
    Please review and accept the new terms of service.
</OrigamDialogConfirmation>`,
            lang: 'html',
        },
    ],
}
