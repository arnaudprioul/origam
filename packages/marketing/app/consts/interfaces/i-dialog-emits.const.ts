import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DIALOG_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-dialog-emits',
    name: 'IDialogEmits',
    category: 'Overlay',
    descriptionKey: 'interfaces.catalog.i_dialog_emits.description',
    descriptionFallback: 'Emits contract for OrigamDialog — extends the standard component emits and outside-click bubbling, and adds the isRead lifecycle hook that fires the first time the dialog body becomes fully visible (consent / ToS pattern).',
    definition: `export interface IDialogEmits extends ICommonsComponentEmits, IClickOutsideEmits {
    (e: 'isRead', value: boolean): void
}`,
    extends: ['ICommonsComponentEmits', 'IClickOutsideEmits'],
    props: [
        { name: 'isRead', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Fired the first time the dialog body becomes visible — useful for "mark as read" patterns on consent dialogs. value is always true on the initial fire.' },
    ],
    usedBy: [
        { slug: 'dialog', name: 'OrigamDialog', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Dialog/dialog.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_dialog_emits.example',
            titleFallback: 'Tracking when a ToS dialog is read',
            code: `<OrigamDialog v-model="open" @is-read="markConsentSeen">
    <template #title>Terms of Service</template>
    <!-- full text -->
</OrigamDialog>`,
            lang: 'html',
        },
    ],
}
