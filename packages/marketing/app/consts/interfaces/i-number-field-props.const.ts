import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-field-props',
    name: 'INumberFieldProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_number_field_props.description',
    descriptionFallback: 'Props for <OrigamNumberField> — a numeric input with increment/decrement controls, precision formatting, min/max clamping, and hold-repeat support. Extends the full field and input surface plus variant styling.',
    definition: `export interface INumberFieldProps extends IFieldProps, IInputProps, IVariantProps {
    autofocus?: boolean
    placeholder?: string
    persistentPlaceholder?: boolean
    role?: string
    modelModifiers?: string | boolean
    inset?: boolean
    hideInput?: boolean
    modelValue?: number | null
    min?: number
    max?: number
    step?: number
    precision?: number
    incrementIcon?: TIcon
    decrementIcon?: TIcon
    holdDelay?: number
    holdRepeat?: number
    split?: boolean
    hideControls?: boolean
    compact?: boolean
}`,
    extends: ['IFieldProps', 'IInputProps', 'IVariantProps'],
    props: [
        { name: 'autofocus', type: 'boolean', optional: true, descriptionFallback: 'Automatically focus the input on mount.' },
        { name: 'placeholder', type: 'string', optional: true, descriptionFallback: 'Placeholder text shown when the input is empty.' },
        { name: 'persistentPlaceholder', type: 'boolean', optional: true, descriptionFallback: 'Keep the placeholder visible even when the field has a value.' },
        { name: 'role', type: 'string', optional: true, descriptionFallback: 'Custom ARIA role for the input element.' },
        { name: 'modelModifiers', type: 'string | boolean', optional: true, descriptionFallback: 'v-model modifiers passed through (e.g. lazy, number).' },
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Moves the increment/decrement controls inside the input field.' },
        { name: 'hideInput', type: 'boolean', optional: true, descriptionFallback: 'Hides the numeric input, leaving only the increment/decrement buttons visible (e.g. a stepper-only UI).' },
        { name: 'modelValue', type: 'number | null', optional: true, descriptionFallback: 'Bound numeric value. Supports v-model. null represents an empty/unset state.' },
        { name: 'min', type: 'number', optional: true, descriptionFallback: 'Minimum allowed value. Decrement is disabled when modelValue <= min.' },
        { name: 'max', type: 'number', optional: true, descriptionFallback: 'Maximum allowed value. Increment is disabled when modelValue >= max.' },
        { name: 'step', type: 'number', optional: true, descriptionFallback: 'Amount to increment or decrement on each control press.' },
        { name: 'precision', type: 'number', optional: true, descriptionFallback: 'Number of decimal places to display. Applied via toFixed() on the rendered value.' },
        { name: 'incrementIcon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon for the increment button.' },
        { name: 'decrementIcon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon for the decrement button.' },
        { name: 'holdDelay', type: 'number', optional: true, descriptionFallback: 'Milliseconds before hold-repeat kicks in when the control button is held down.' },
        { name: 'holdRepeat', type: 'number', optional: true, descriptionFallback: 'Milliseconds between repeated increment/decrement events while the button is held.' },
        { name: 'split', type: 'boolean', optional: true, descriptionFallback: 'Places the increment and decrement buttons on opposite sides of the input (left/right).' },
        { name: 'hideControls', type: 'boolean', optional: true, descriptionFallback: 'Hides the increment/decrement control buttons entirely, leaving a plain numeric input.' },
        { name: 'compact', type: 'boolean', optional: true, descriptionFallback: 'Reduces the field height for dense UIs.' },
    ],
    usedBy: [
        { slug: 'number-field', name: 'NumberField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/NumberField/number-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_number_field_props.example',
            titleFallback: 'Quantity stepper with min/max and hold-repeat',
            code: `<OrigamNumberField
    v-model="quantity"
    :min="1"
    :max="99"
    :step="1"
    label="Quantity"
    :hold-delay="500"
    :hold-repeat="100"
/>`,
            lang: 'vue',
        },
    ],
}
