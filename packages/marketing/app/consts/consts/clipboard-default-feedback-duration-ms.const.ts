import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CLIPBOARD_DEFAULT_FEEDBACK_DURATION_MS_CONST_DOC: IConstDoc = {
    slug: 'clipboard-default-feedback-duration-ms',
    name: 'CLIPBOARD_DEFAULT_FEEDBACK_DURATION_MS',
    category: 'Events & Interaction',
    descriptionKey: 'consts.catalog.clipboard_default_feedback_duration_ms.description',
    descriptionFallback: 'Default feedback window (ms) the "Copied!" pill stays visible after a successful useClipboard() write. Aligned on the Snackbar default so the visual rhythm stays consistent across the DS.',
    definition: `export const CLIPBOARD_DEFAULT_FEEDBACK_DURATION_MS = 2000`,
    value: '2000',
    usedBy: [
        { name: 'useClipboard' },
        { name: 'OrigamCode', slug: 'code' },
    ],
    sourceFile: 'packages/ds/src/consts/Clipboard/clipboard.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.clipboard_default_feedback_duration_ms.example',
            titleFallback: 'Using the default feedback duration with useClipboard',
            code: `import { useClipboard, CLIPBOARD_DEFAULT_FEEDBACK_DURATION_MS } from 'origam'

const { copy, copied } = useClipboard()
// 'copied' resets to false after CLIPBOARD_DEFAULT_FEEDBACK_DURATION_MS (2000ms)
await copy('text to copy')`,
            lang: 'typescript',
        },
    ],
}
