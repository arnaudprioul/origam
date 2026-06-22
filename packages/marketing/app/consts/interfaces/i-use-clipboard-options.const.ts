import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_CLIPBOARD_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-clipboard-options',
    name: 'IUseClipboardOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_clipboard_options.description',
    descriptionFallback: 'Options accepted by useClipboard. Controls the duration the `copied` flag stays true after a successful write.',
    definition: `export interface IUseClipboardOptions {
    feedbackDuration?: number
}`,
    extends: [],
    props: [
        { name: 'feedbackDuration', type: 'number', optional: true, default: '2000', descriptionFallback: 'Duration (ms) the returned `copied` ref stays true after a successful write before auto-resetting.' },
    ],
    usedBy: [
        { slug: 'use-clipboard', name: 'useClipboard', kind: 'composable' },
        { slug: 'clipboard', name: 'Clipboard', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Clipboard/clipboard.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_clipboard_options.example',
            titleFallback: 'Using useClipboard with custom feedback duration',
            code: `const { copy, copied } = useClipboard({ feedbackDuration: 3000 })`,
            lang: 'typescript',
        },
    ],
}
