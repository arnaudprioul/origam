import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INLINE_EDIT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-inline-edit-props',
    name: 'IInlineEditProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_inline_edit_props.description',
    descriptionFallback: 'Props contract for OrigamInlineEdit — the edit-in-place component. Controls validation rules, auto-focus, select-on-focus, confirm/cancel triggers, multiline mode, and built-in action buttons.',
    definition: `export interface IInlineEditProps extends ICommonsComponentProps, ITagProps {
    modelValue: string | number
    placeholder?: string
    rules?: Array<TInlineEditRule>
    validate?: TInlineEditValidator
    autoFocus?: boolean
    selectOnFocus?: boolean
    confirmOnBlur?: boolean
    confirmOnEnter?: boolean
    cancelOnEscape?: boolean
    disabled?: boolean
    multiline?: boolean
    trim?: boolean
    inputType?: TInlineEditInputType
    loadingOnConfirm?: boolean
    showActions?: boolean
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'modelValue', type: 'string | number', optional: false, descriptionFallback: 'Current value (v-model target). Accepts string or number.' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder shown on the input and in the default display slot when the value is empty.' },
        { name: 'rules', type: 'Array<TInlineEditRule>', optional: true, descriptionFallback: 'Array of validation rules evaluated on confirm. First failure blocks the commit.' },
        { name: 'validate', type: 'TInlineEditValidator', optional: true, descriptionFallback: 'Sync or async validation callback. Runs after rules pass. Returns true or an error message.' },
        { name: 'autoFocus', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Auto-focus the input when entering edit mode.' },
        { name: 'selectOnFocus', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Select all text when the input gains focus on edit entry.' },
        { name: 'confirmOnBlur', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Confirm the draft when the input loses focus.' },
        { name: 'confirmOnEnter', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Confirm on Enter. Disable for multiline mode where Enter should insert a newline.' },
        { name: 'cancelOnEscape', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Cancel (revert) the draft on Escape.' },
        { name: 'disabled', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Disables the component. The display affordance becomes non-interactive.' },
        { name: 'multiline', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Render a <textarea> instead of <input> in edit mode.' },
        { name: 'trim', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Strip surrounding whitespace before emitting and validating.' },
        { name: 'inputType', type: 'TInlineEditInputType', optional: true, default: "'text'", descriptionFallback: 'Native HTML input type when not in multiline mode.' },
        { name: 'loadingOnConfirm', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Surface a loading affordance (CSS class hook) while an async validator is in flight.' },
        { name: 'showActions', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Render built-in Edit / Confirm / Cancel icon buttons next to the component.' },
    ],
    usedBy: [
        { slug: 'inline-edit', name: 'InlineEdit', kind: 'component' },
        { slug: 'use-inline-edit', name: 'useInlineEdit', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_inline_edit_props.example',
            titleFallback: 'Edit-in-place title with async validation',
            code: `<OrigamInlineEdit
    v-model="title"
    :validate="async v => v.length >= 3 || 'At least 3 characters'"
    show-actions
    loading-on-confirm
/>`,
            lang: 'vue',
        },
    ],
}
