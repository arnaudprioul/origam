import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLIPBOARD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-clipboard-props',
    name: 'IClipboardProps',
    category: 'Action & Command',
    descriptionKey: 'interfaces.catalog.i_clipboard_props.description',
    descriptionFallback: 'Props for <OrigamClipboard> — a chrome-less copy-to-clipboard wrapper. Owns the copy pipeline (navigator.clipboard.writeText + execCommand fallback) and the auto-resetting copied flag. The built-in trigger is a single button; consumers can pass a #default scoped slot for full control.',
    definition: `export interface IClipboardProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IBorderProps, IRoundedProps, IMarginProps, IPaddingProps {
    value: string
    feedbackDuration?: number
    feedbackText?: string
    successText?: string
    disabled?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IColorProps',
        'IBgColorProps',
        'IBorderProps',
        'IRoundedProps',
        'IMarginProps',
        'IPaddingProps',
    ],
    props: [
        { name: 'value', type: 'string', optional: false, descriptionFallback: 'Text payload written to the clipboard on copy(). Re-read on each trigger so mutated values are always current.' },
        { name: 'feedbackDuration', type: 'number', optional: true, default: '2000', descriptionFallback: 'Duration (ms) the copied flag stays true after a successful write. Auto-resets — no manual clearing needed.' },
        { name: 'feedbackText', type: 'string', optional: true, default: "'Copied!'", descriptionFallback: "Label rendered inside the built-in feedback overlay and the auto-rendered button label when no slot is provided." },
        { name: 'successText', type: 'string', optional: true, descriptionFallback: 'Alias for feedbackText. Takes precedence when both are passed.' },
        { name: 'disabled', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Disables the copy action. The default trigger becomes non-interactive and copy() becomes a no-op.' },
    ],
    usedBy: [
        { slug: 'clipboard', name: 'OrigamClipboard', kind: 'component' },
        { slug: 'use-clipboard', name: 'useClipboard', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Clipboard/clipboard.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_clipboard_props.example',
            titleFallback: 'Basic copy button with custom feedback text',
            code: `<OrigamClipboard
    :value="codeToCopy"
    feedback-text="Copied to clipboard!"
    :feedback-duration="3000"
    color="primary"
/>`,
            lang: 'vue',
        },
    ],
}
