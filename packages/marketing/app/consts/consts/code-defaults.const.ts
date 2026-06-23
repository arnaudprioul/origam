import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CODE_DEFAULTS_CONST_DOC: IConstDoc = {
    slug: 'code-defaults',
    name: 'CODE_DEFAULTS',
    category: 'Components',
    descriptionKey: 'consts.catalog.code_defaults.description',
    descriptionFallback: 'Default prop values used by OrigamCode. Centralised so stories, docs and tests all pull from the same constants and any future drift stays visible immediately.',
    definition: `export const CODE_DEFAULTS = Object.freeze({
    lang: CODE_LANG.PLAINTEXT,
    lineNumbers: false,
    copyable: true,
    wrap: false,
    format: false,
    copyFeedbackDurationMs: 2000
} as const)`,
    values: [
        { value: "lang: CODE_LANG.PLAINTEXT", descriptionKey: 'consts.detail.code_defaults.lang', descriptionFallback: 'Default syntax: plain text (no highlighting).' },
        { value: 'lineNumbers: false', descriptionKey: 'consts.detail.code_defaults.line_numbers', descriptionFallback: 'Line numbers hidden by default.' },
        { value: 'copyable: true', descriptionKey: 'consts.detail.code_defaults.copyable', descriptionFallback: 'Copy button shown by default.' },
        { value: 'wrap: false', descriptionKey: 'consts.detail.code_defaults.wrap', descriptionFallback: 'Long lines scroll horizontally by default.' },
        { value: 'format: false', descriptionKey: 'consts.detail.code_defaults.format', descriptionFallback: 'Auto-formatting disabled by default.' },
        { value: 'copyFeedbackDurationMs: 2000', descriptionKey: 'consts.detail.code_defaults.copy_feedback_duration_ms', descriptionFallback: '"Copied!" pill stays visible for 2 seconds.' },
    ],
    usedBy: [
        { name: 'OrigamCode', slug: 'code' },
        { name: 'useCode' },
    ],
    sourceFile: 'packages/ds/src/consts/Code/code.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.code_defaults.example',
            titleFallback: 'Overriding individual defaults',
            code: `import { OrigamCode, CODE_DEFAULTS } from 'origam'

// Spread defaults and override what you need
<OrigamCode v-bind="CODE_DEFAULTS" :lineNumbers="true" lang="vue" code={snippet} />`,
            lang: 'typescript',
        },
    ],
}
