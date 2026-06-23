import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INPUT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-input-props',
    name: 'IInputProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_input_props.description',
    descriptionFallback: 'Props contract for OrigamInput — the foundational input wrapper. Aggregates density, spacing, rounding, color, border, elevation, dimension, direction, validation, adjacent-slot, and size surfaces.',
    definition: `export interface IInputProps extends ICommonsComponentProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBgColorProps, IBorderProps, IElevationProps, IDimensionProps, IDirectionProps, IValidationProps, IAdjacentProps, ISizeProps {
    centerAffix?: boolean
    hideDetails?: boolean | string
    hideSpinButtons?: boolean
    hint?: string
    persistentHint?: boolean
    messages?: Array<string> | string
}`,
    extends: [
        'ICommonsComponentProps',
        'IDensityProps',
        'IPaddingProps',
        'IMarginProps',
        'IRoundedProps',
        'IColorProps',
        'IBgColorProps',
        'IBorderProps',
        'IElevationProps',
        'IDimensionProps',
        'IDirectionProps',
        'IValidationProps',
        'IAdjacentProps',
        'ISizeProps',
    ],
    props: [
        { name: 'centerAffix', type: 'boolean', optional: true, descriptionFallback: 'Center the prepend/append affix icons vertically in the input.' },
        { name: 'hideDetails', type: 'boolean | string', optional: true, descriptionFallback: 'Hide hint and validation messages. Pass "auto" to hide only when no message is present.' },
        { name: 'hideSpinButtons', type: 'boolean', optional: true, descriptionFallback: 'Hide the native browser spin buttons on number inputs.' },
        { name: 'hint', type: 'string', optional: true, descriptionFallback: 'Helper text shown below the input.' },
        { name: 'persistentHint', type: 'boolean', optional: true, descriptionFallback: 'Always show the hint text, even when the input is not focused.' },
        { name: 'messages', type: 'Array<string> | string', optional: true, descriptionFallback: 'Validation or status messages to display below the input.' },
    ],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'textarea-field', name: 'TextareaField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Input/input.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_input_props.example',
            titleFallback: 'Input with hint and validation messages',
            code: `<OrigamInput
    hint="Must be at least 8 characters"
    persistent-hint
    :messages="errors"
    hide-details="auto"
/>`,
            lang: 'vue',
        },
    ],
}
