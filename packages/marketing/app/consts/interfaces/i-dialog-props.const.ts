import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIALOG_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-dialog-props',
    name: 'IDialogProps',
    category: 'Overlay',
    descriptionKey: 'interfaces.catalog.i_dialog_props.description',
    descriptionFallback: 'Props for OrigamDialog — the full-featured modal dialog. Extends overlay, card and status interfaces and adds fullscreen, focus retention, scroll-lock and size controls.',
    definition: `export interface IDialogProps extends ICommonsComponentProps, IOverlayProps, ICardProps, IStatusProps {
    fullscreen?: boolean
    retainFocus?: boolean
    scrollable?: boolean
    size?: TSize
}`,
    extends: ['ICommonsComponentProps', 'IOverlayProps', 'ICardProps', 'IStatusProps'],
    props: [
        { name: 'fullscreen', type: 'boolean', optional: true, descriptionFallback: 'Expand the dialog to cover the entire viewport.' },
        { name: 'retainFocus', type: 'boolean', optional: true, descriptionFallback: 'When true, focus is trapped inside the dialog and cannot escape to the document while it is open.' },
        { name: 'scrollable', type: 'boolean', optional: true, descriptionFallback: 'Allow the dialog body to scroll independently of the viewport when the content overflows.' },
        { name: 'size', type: 'TSize', optional: true, descriptionFallback: 'Predefined width preset for the dialog surface (xs | sm | md | lg | xl).' },
    ],
    usedBy: [
        { slug: 'dialog', name: 'OrigamDialog', kind: 'component' },
        { slug: 'dialog-confirmation', name: 'OrigamDialogConfirmation', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Dialog/dialog.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_dialog_props.example',
            titleFallback: 'Scrollable medium-sized dialog',
            code: `<OrigamDialog v-model="open" size="md" :scrollable="true" :retain-focus="true">
    <template #title>My Dialog</template>
    <!-- long content -->
</OrigamDialog>`,
            lang: 'html',
        },
    ],
}
