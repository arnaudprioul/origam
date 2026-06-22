import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXT_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-text-field-props',
    name: 'ITextFieldProps',
    category: 'Forms & Inputs',
    descriptionKey: 'interfaces.catalog.i_text_field_props.description',
    descriptionFallback: 'Full prop surface for <OrigamTextField> — extends field, input, color, density, padding/margin, border, rounded and elevation contracts, with autofocus, counter, placeholder, input type and mask support.',
    definition: `export interface ITextFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    role?: string
    type?: TTextFieldType
    modelModifiers?: string | boolean
    mask?: TMask
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
    ],
    props: [
        { name: 'autofocus', type: 'boolean', optional: true, descriptionFallback: 'Focuses the input on mount.' },
        { name: 'counter', type: 'boolean | number | string', optional: true, descriptionFallback: 'Shows a character counter. Pass a number to set the max displayed value.' },
        { name: 'counterValue', type: 'number | ((e: any) => number)', optional: true, descriptionFallback: 'Custom function or fixed number for calculating the counter value.' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder text shown inside the input when it has no value.' },
        { name: 'persistentPlaceholder', type: 'boolean', optional: true, descriptionFallback: 'Keeps the placeholder visible even when a value is set.' },
        { name: 'persistentCounter', type: 'boolean', optional: true, descriptionFallback: 'Keeps the counter visible even when the input is not focused.' },
        { name: 'role', type: 'string', optional: true, descriptionFallback: 'ARIA role override for the input element.' },
        { name: 'type', type: 'TTextFieldType', optional: true, descriptionFallback: "HTML input type. Defaults to 'text'." },
        { name: 'modelModifiers', type: 'string | boolean', optional: true, descriptionFallback: 'Vue model modifiers applied to the v-model binding.' },
        { name: 'mask', type: 'TMask', optional: true, descriptionFallback: "Input mask — built-in preset ('phone:fr'), raw pattern or options object. v-model receives the unmasked value." },
    ],
    usedBy: [
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextField/text-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_text_field_props.example',
            titleFallback: 'Phone input with mask and counter',
            code: `<OrigamTextField
  v-model="phone"
  label="Phone number"
  mask="phone:fr"
  counter="14"
  persistent-counter
  type="tel"
/>`,
            lang: 'html',
        },
    ],
}
