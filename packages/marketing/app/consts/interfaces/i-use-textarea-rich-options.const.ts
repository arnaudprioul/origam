import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_TEXTAREA_RICH_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-textarea-rich-options',
    name: 'IUseTextareaRichOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_textarea_rich_options.description',
    descriptionFallback: 'Returned shape of the useTextareaRich composable. Components consume the public surface (refs + handlers) to render the contenteditable editor and bind the toolbar.',
    definition: `export interface IUseTextareaRichOptions {
    readonly disabled: () => boolean
    readonly value: () => string
    readonly onUpdate: (raw: string) => void
    readonly onFormat: (command: TTextareaToolbarCommand, value?: string) => void
}`,
    extends: [],
    props: [
        { name: 'disabled', type: '() => boolean', optional: false, descriptionFallback: 'Whether the editor surface is currently editable. Bound to the contenteditable attribute downstream.' },
        { name: 'value', type: '() => string', optional: false, descriptionFallback: 'Initial / external HTML value (already sanitised by the host component when running in output="html" mode).' },
        { name: 'onUpdate', type: '(raw: string) => void', optional: false, descriptionFallback: 'Sanitised HTML emit handler. Fired whenever the editor mutates.' },
        { name: 'onFormat', type: '(command: TTextareaToolbarCommand, value?: string) => void', optional: false, descriptionFallback: 'Notified each time a toolbar command runs.' },
    ],
    usedBy: [
        { slug: 'use-textarea-rich', name: 'useTextareaRich', kind: 'composable' },
        { slug: 'textarea-rich', name: 'TextareaRich', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Textarea/textarea-rich.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_textarea_rich_options.example',
            titleFallback: 'Binding useTextareaRich to a contenteditable surface',
            code: `const options: IUseTextareaRichOptions = {
    disabled: () => props.disabled,
    value: () => props.modelValue,
    onUpdate: (raw) => emit('update:modelValue', raw),
    onFormat: (cmd, val) => emit('format', cmd, val),
}`,
            lang: 'typescript',
        },
    ],
}
