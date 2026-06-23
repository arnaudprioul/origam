import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_CLOSE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-close-emits',
    name: 'IClickCloseEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_click_close_emits.description',
    descriptionFallback: 'click:close emit contract — fires when the user dismisses a closeable surface such as an Alert or Snackbar.',
    definition: `export interface IClickCloseEmits {
    (e: 'click:close', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click:close', type: '(e: \'click:close\', event: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the close button or dismiss action is triggered, carrying the native MouseEvent.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'snackbar', name: 'Snackbar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_close_emits.example',
            titleFallback: 'Dismissable alert with click:close',
            code: `<OrigamAlert closable @click:close="dismissed = true">
    This alert can be dismissed.
</OrigamAlert>`,
            lang: 'vue',
        },
    ],
}
