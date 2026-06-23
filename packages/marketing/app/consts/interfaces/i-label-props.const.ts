import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LABEL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-label-props',
    name: 'ILabelProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_label_props.description',
    descriptionFallback: 'Props for <OrigamLabel> — the accessible label component used by form fields. Supports floating labels, required indicators, custom tag, and the full color, border, rounded, spacing surface.',
    definition: `export interface ILabelProps extends ICommonsComponentProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, IColorProps, IBgColorProps, ITagProps {
    text?: string
    floating?: boolean
    required?: boolean
    name?: string
}`,
    extends: ['ICommonsComponentProps', 'IMarginProps', 'IPaddingProps', 'IBorderProps', 'IRoundedProps', 'IColorProps', 'IBgColorProps', 'ITagProps'],
    props: [
        {
            name: 'text',
            type: 'string',
            optional: true,
            descriptionFallback: 'Label text content. Overridden by the default slot.',
        },
        {
            name: 'floating',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Activates the floating label style, typically moving the label above the input on focus or when a value is present.',
        },
        {
            name: 'required',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Appends a required indicator (asterisk) and sets the aria-required attribute on the label.',
        },
        {
            name: 'name',
            type: 'string',
            optional: true,
            descriptionFallback: 'Associates the label with a form control by name (rendered as a for attribute).',
        },
    ],
    usedBy: [
        { slug: 'label', name: 'Label', kind: 'component' },
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'textarea', name: 'Textarea', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Label/label.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_label_props.example',
            titleFallback: 'Floating required label',
            code: `<OrigamLabel
    text="Email address"
    :floating="isFocused || hasValue"
    required
    name="email"
/>`,
            lang: 'vue',
        },
    ],
}
