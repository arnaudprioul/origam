import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONFIRM_WRAPPER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-confirm-wrapper-props',
    name: 'IConfirmWrapperProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_confirm_wrapper_props.description',
    descriptionFallback: 'Full props contract for <OrigamConfirmWrapper> — a "type-it-twice" form helper that pairs a primary input with a confirmation input and lights up only when both values match. Inherits layout, color, density, rounded, elevation, variant and focus mixins.',
    definition: `export interface IConfirmWrapperProps extends ICommonsComponentProps,
    IAdjacentProps, IDirectionProps, IColorProps, IDensityProps,
    IRoundedProps, IElevationProps, IVariantProps, IFocusProps {
    modelValue?: any
    confirm?: any
    field?: string
    defaults?: Record<string, any>
    confirmLabel?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    error?: boolean
    errorMessages?: string | string[]
    hideDetails?: boolean | 'auto'
    messages?: string | string[]
    hint?: string
    persistentHint?: boolean
    centerAffix?: boolean
    label?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'IAdjacentProps',
        'IDirectionProps',
        'IColorProps',
        'IDensityProps',
        'IRoundedProps',
        'IElevationProps',
        'IVariantProps',
        'IFocusProps',
    ],
    props: [
        { name: 'modelValue', type: 'any', optional: true, descriptionFallback: 'Value bound via v-model — the primary input value.' },
        { name: 'confirm', type: 'any', optional: true, descriptionFallback: 'Value of the confirmation input. The wrapper is "confirmed" when modelValue === confirm.' },
        { name: 'field', type: 'string', optional: true, descriptionFallback: 'Field name forwarded to the internal inputs for form libraries (e.g. VeeValidate).' },
        { name: 'defaults', type: 'Record<string, any>', optional: true, descriptionFallback: 'Default prop values injected into the internal input slot components.' },
        { name: 'confirmLabel', type: 'string', optional: true, descriptionFallback: 'Label text rendered on the confirmation input.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables both inputs and prevents interaction.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes both inputs read-only.' },
        { name: 'required', type: 'boolean', optional: true, descriptionFallback: 'Marks both inputs as required (triggers native form validation).' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Forces the error state on the wrapper.' },
        { name: 'errorMessages', type: 'string | string[]', optional: true, descriptionFallback: 'One or more error messages displayed below the inputs.' },
        { name: 'hideDetails', type: "boolean | 'auto'", optional: true, descriptionFallback: 'Hides the details/messages row. Set to "auto" to hide it only when there are no messages.' },
        { name: 'messages', type: 'string | string[]', optional: true, descriptionFallback: 'Informational messages displayed in the details area.' },
        { name: 'hint', type: 'string', optional: true, descriptionFallback: 'Hint text shown below the inputs.' },
        { name: 'persistentHint', type: 'boolean', optional: true, descriptionFallback: 'Forces the hint to always be visible (not only on focus).' },
        { name: 'centerAffix', type: 'boolean', optional: true, descriptionFallback: 'Vertically centres the prepend/append affixes instead of aligning them to the top.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Label text for the primary input.' },
    ],
    usedBy: [
        { slug: 'confirm-wrapper', name: 'ConfirmWrapper', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ConfirmWrapper/confirm-wrapper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_confirm_wrapper_props.example',
            titleFallback: 'Password confirmation field',
            code: `<OrigamConfirmWrapper
    v-model="password"
    v-model:confirm="passwordConfirm"
    label="Password"
    confirm-label="Confirm password"
    :error="!!error"
    :error-messages="error"
/>`,
            lang: 'vue',
        },
    ],
}
