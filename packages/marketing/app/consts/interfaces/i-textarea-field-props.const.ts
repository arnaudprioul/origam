import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXTAREA_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-textarea-field-props',
    name: 'ITextareaFieldProps',
    category: 'Forms & Inputs',
    descriptionKey: 'interfaces.catalog.i_textarea_field_props.description',
    descriptionFallback: 'Full prop surface for <OrigamTextareaField> — extends field, input, color, density, adjacent-inner, padding/margin, border, rounded and elevation contracts. Adds auto-grow, rows, counter, prefix/suffix, rich mode and toolbar configuration.',
    definition: `export interface ITextareaFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IAdjacentInnerProps {
    autoGrow?: boolean
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    persistentClear?: boolean
    prefix?: string
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    noResize?: boolean
    rows?: number | string
    maxRows?: number | string
    suffix?: string
    modelModifiers?: string | boolean
    mode?: TTextareaMode
    output?: TTextareaOutput
    toolbar?: ReadonlyArray<TTextareaToolbarCommand> | false
    toolbarPosition?: TTextareaToolbarPosition
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IDensityProps',
        'IFieldProps',
        'IInputProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IAdjacentInnerProps',
    ],
    props: [
        { name: 'autoGrow', type: 'boolean', optional: true, descriptionFallback: 'Automatically grows the textarea height to fit its content.' },
        { name: 'autofocus', type: 'boolean', optional: true, descriptionFallback: 'Focuses the textarea on mount.' },
        { name: 'counter', type: 'boolean | number | string', optional: true, descriptionFallback: 'Shows a character counter. Pass a number to set the max.' },
        { name: 'counterValue', type: 'number | ((e: any) => number)', optional: true, descriptionFallback: 'Custom function or fixed number for the counter value.' },
        { name: 'persistentClear', type: 'boolean', optional: true, descriptionFallback: 'Keeps the clear button visible even when the field is not focused.' },
        { name: 'prefix', type: 'string', optional: true, descriptionFallback: 'Text rendered before the textarea value (inside the control).' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder text shown when the field has no value.' },
        { name: 'persistentPlaceholder', type: 'boolean', optional: true, descriptionFallback: 'Keeps the placeholder visible even when a value is set.' },
        { name: 'persistentCounter', type: 'boolean', optional: true, descriptionFallback: 'Keeps the counter visible even when the field is not focused.' },
        { name: 'noResize', type: 'boolean', optional: true, descriptionFallback: 'Disables manual resize handle on the textarea.' },
        { name: 'rows', type: 'number | string', optional: true, descriptionFallback: 'Initial number of visible text rows.' },
        { name: 'maxRows', type: 'number | string', optional: true, descriptionFallback: 'Maximum number of rows when auto-grow is enabled.' },
        { name: 'suffix', type: 'string', optional: true, descriptionFallback: 'Text rendered after the textarea value (inside the control).' },
        { name: 'modelModifiers', type: 'string | boolean', optional: true, descriptionFallback: 'Vue model modifiers applied to the v-model binding.' },
        { name: 'mode', type: 'TTextareaMode', optional: true, descriptionFallback: "Render mode. 'plain' (default) uses a native <textarea>. 'rich' uses a contenteditable surface with toolbar." },
        { name: 'output', type: 'TTextareaOutput', optional: true, descriptionFallback: "When mode='rich', format of the emitted value. 'html' (default) or 'markdown'." },
        { name: 'toolbar', type: 'ReadonlyArray<TTextareaToolbarCommand> | false', optional: true, descriptionFallback: 'Ordered list of toolbar commands to show in rich mode. Pass false to hide the toolbar.' },
        { name: 'toolbarPosition', type: 'TTextareaToolbarPosition', optional: true, descriptionFallback: 'Position of the toolbar relative to the editing surface in rich mode.' },
    ],
    usedBy: [
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextareaField/textarea-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_textarea_field_props.example',
            titleFallback: 'Rich textarea with toolbar',
            code: `<OrigamTextareaField
  v-model="bio"
  mode="rich"
  output="markdown"
  :toolbar="['bold', 'italic', 'link']"
  toolbar-position="bottom"
  auto-grow
  :max-rows="10"
/>`,
            lang: 'html',
        },
    ],
}
