import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLIPBOARD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-clipboard-slots',
    name: 'IClipboardSlots',
    category: 'Action & Command',
    descriptionKey: 'interfaces.catalog.i_clipboard_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamClipboard>. The default slot receives copy/copied/error bindings for a fully custom trigger. The feedback slot replaces the success indicator shown after a successful copy.',
    definition: `export interface IClipboardSlots {
    default?: (bindings: IClipboardScopedSlotBindings) => any
    feedback?: (bindings: { copied: boolean }) => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '(bindings: IClipboardScopedSlotBindings) => any', optional: true, descriptionFallback: 'Custom trigger. Scoped — receives { copy, copied, error }. When omitted the component renders a default icon button with mdi:mdi-content-copy.' },
        { name: 'feedback', type: '(bindings: { copied: boolean }) => any', optional: true, descriptionFallback: 'Custom feedback marker rendered when copied is true. Scoped — receives the boolean for symmetry with the default slot.' },
    ],
    usedBy: [
        { slug: 'clipboard', name: 'OrigamClipboard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Clipboard/clipboard.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_clipboard_slots.example',
            titleFallback: 'Custom trigger and feedback slots',
            code: `<OrigamClipboard :value="url">
    <template #default="{ copy, copied }">
        <OrigamBtn @click="copy" :color="copied ? 'success' : 'primary'">
            {{ copied ? 'Copied!' : 'Share link' }}
        </OrigamBtn>
    </template>
    <template #feedback="{ copied }">
        <span v-show="copied" class="badge">✓ Link copied</span>
    </template>
</OrigamClipboard>`,
            lang: 'vue',
        },
    ],
}
