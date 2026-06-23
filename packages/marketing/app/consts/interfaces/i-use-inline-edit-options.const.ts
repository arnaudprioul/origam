import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_INLINE_EDIT_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-inline-edit-options',
    name: 'IUseInlineEditOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_inline_edit_options.description',
    descriptionFallback: 'Options accepted by useInlineEdit. Controls validation rules, trim behaviour, and lifecycle callbacks for the edit-in-place state machine.',
    definition: `export interface IUseInlineEditOptions {
    rules?: Array<TInlineEditRule>
    validate?: TInlineEditValidator
    trim?: boolean
    onConfirm?: (value: string) => void
    onCancel?: () => void
    onError?: (message: string) => void
}`,
    extends: [],
    props: [
        { name: 'rules', type: 'Array<TInlineEditRule>', optional: true, descriptionFallback: 'Array of validation rules — evaluated in order before validate. First failure blocks the commit and surfaces the error message.' },
        { name: 'validate', type: 'TInlineEditValidator', optional: true, descriptionFallback: 'Sync or async validator. Only runs if all rules pass.' },
        { name: 'trim', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Strip surrounding whitespace before running the validator and emitting the new value.' },
        { name: 'onConfirm', type: '(value: string) => void', optional: true, descriptionFallback: 'Called when the draft is committed. Use this when the composable is consumed outside the SFC emit pipeline.' },
        { name: 'onCancel', type: '() => void', optional: true, descriptionFallback: 'Called when the draft is discarded.' },
        { name: 'onError', type: '(message: string) => void', optional: true, descriptionFallback: 'Called when a validator returns an error message.' },
    ],
    usedBy: [
        { slug: 'use-inline-edit', name: 'useInlineEdit', kind: 'composable' },
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_inline_edit_options.example',
            titleFallback: 'Using useInlineEdit with validation',
            code: `const { draft, confirm, cancel, error } = useInlineEdit({
    rules: [(v) => v.length > 0 || 'Required'],
    trim: true,
    onConfirm: (value) => save(value),
})`,
            lang: 'typescript',
        },
    ],
}
