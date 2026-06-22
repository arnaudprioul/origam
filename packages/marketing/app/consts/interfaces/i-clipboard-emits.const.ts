import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLIPBOARD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-clipboard-emits',
    name: 'IClipboardEmits',
    category: 'Action & Command',
    descriptionKey: 'interfaces.catalog.i_clipboard_emits.description',
    descriptionFallback: 'Emits for <OrigamClipboard>. Two events: copy (success, carries the payload string) and error (failure, carries the thrown Error when the clipboard API is denied or unavailable).',
    definition: `export interface IClipboardEmits {
    (e: 'copy', value: string): void
    (e: 'error', err: Error): void
}`,
    extends: [],
    props: [
        { name: 'copy', type: '(value: string) => void', optional: false, descriptionFallback: 'Fired after a successful write. Carries the payload string that was written.' },
        { name: 'error', type: '(err: Error) => void', optional: false, descriptionFallback: 'Fired after a failed write (clipboard API denied, no permission, HTTPS required, …).' },
    ],
    usedBy: [
        { slug: 'clipboard', name: 'OrigamClipboard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Clipboard/clipboard.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_clipboard_emits.example',
            titleFallback: 'Reacting to copy success and failure',
            code: `<OrigamClipboard
    :value="secret"
    @copy="v => toast.success('Copied: ' + v)"
    @error="e => toast.error('Copy failed: ' + e.message)"
/>`,
            lang: 'vue',
        },
    ],
}
