import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLIPBOARD_SCOPED_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-clipboard-scoped-slot-bindings',
    name: 'IClipboardScopedSlotBindings',
    category: 'Action & Command',
    descriptionKey: 'interfaces.catalog.i_clipboard_scoped_slot_bindings.description',
    descriptionFallback: 'Bindings exposed via the #default scoped slot of <OrigamClipboard>. Consumers use these to wire any custom trigger (button, icon, span, widget) to the copy pipeline without re-implementing the timing/feedback logic.',
    definition: `export interface IClipboardScopedSlotBindings {
    copy: () => Promise<boolean>
    copied: boolean
    error: Error | null
}`,
    extends: [],
    props: [
        { name: 'copy', type: '() => Promise<boolean>', optional: false, descriptionFallback: 'Triggers the copy pipeline. Promise resolves true on success, false on failure.' },
        { name: 'copied', type: 'boolean', optional: false, descriptionFallback: 'True for feedbackDuration ms after a successful copy. Automatically resets to false.' },
        { name: 'error', type: 'Error | null', optional: false, descriptionFallback: 'Set to the thrown Error when the last copy attempt failed; null otherwise.' },
    ],
    usedBy: [
        { slug: 'clipboard', name: 'OrigamClipboard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Clipboard/clipboard.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_clipboard_scoped_slot_bindings.example',
            titleFallback: 'Custom trigger using scoped slot bindings',
            code: `<OrigamClipboard :value="code">
    <template #default="{ copy, copied, error }">
        <button @click="copy" :disabled="copied">
            {{ copied ? 'Copied!' : 'Copy code' }}
        </button>
        <span v-if="error" class="error">{{ error.message }}</span>
    </template>
</OrigamClipboard>`,
            lang: 'vue',
        },
    ],
}
