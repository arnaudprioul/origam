import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ALERT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-alert-emits',
    name: 'IAlertEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_alert_emits.description',
    descriptionFallback: 'Emits contract for <OrigamAlert> — extends the shared component emits with close-button and hover propagation.',
    definition: `export interface IAlertEmits extends ICommonsComponentEmits, IClickCloseEmits, IHoverEmits {}`,
    extends: ['ICommonsComponentEmits', 'IClickCloseEmits', 'IHoverEmits'],
    props: [
        { name: 'click:close', type: '(e: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the close button is clicked. Carries the native MouseEvent.' },
        { name: 'mouseenter', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer enters the alert surface.' },
        { name: 'mouseleave', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer leaves the alert surface.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Alert/alert.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_alert_emits.example',
            titleFallback: 'Listening to close on OrigamAlert',
            code: `<OrigamAlert closable @click:close="onClose">
    Something went wrong.
</OrigamAlert>`,
            lang: 'vue',
        },
    ],
}
