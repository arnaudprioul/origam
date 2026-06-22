import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-field-props',
    name: 'IFieldProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_field_props.description',
    descriptionFallback: 'Full prop surface for OrigamField — controls label, prefix/suffix, error state, disabled/dirty/required flags, and inherits color, density, variant, rounded, elevation, size, loader, focus and adjacent-inner surfaces.',
    definition: `export interface IFieldProps extends ICommonsComponentProps, ILoaderProps, IColorProps, IBgColorProps, IAdjacentInnerProps, IFocusProps, IDensityProps, ILabelProps, IActiveProps, IVariantProps, IRoundedProps, IElevationProps, ISizeProps {
    centerAffix?: boolean
    dirty?: boolean
    disabled?: boolean
    error?: string | boolean
    flat?: boolean
    inline?: boolean
    label?: string
    prefix?: string
    suffix?: string
    persistentClear?: boolean
    reverse?: boolean
    singleLine?: boolean
    required?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ILoaderProps',
        'IColorProps',
        'IBgColorProps',
        'IAdjacentInnerProps',
        'IFocusProps',
        'IDensityProps',
        'ILabelProps',
        'IActiveProps',
        'IVariantProps',
        'IRoundedProps',
        'IElevationProps',
        'ISizeProps',
    ],
    props: [
        { name: 'centerAffix', type: 'boolean', optional: true, descriptionFallback: 'Vertically center the prepend/append icons relative to the field height.' },
        { name: 'dirty', type: 'boolean', optional: true, descriptionFallback: 'Mark the field as dirty (user has interacted with it).' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disable the field, preventing user interaction.' },
        { name: 'error', type: 'string | boolean', optional: true, descriptionFallback: 'Error state: boolean paints the --error modifier; a string also becomes the inline error message.' },
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Remove the default shadow/elevation from the field.' },
        { name: 'inline', type: 'boolean', optional: true, descriptionFallback: 'Render the field inline instead of as a block.' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Floating label text.' },
        { name: 'prefix', type: 'string', optional: true, descriptionFallback: 'Static text prepended inside the field.' },
        { name: 'suffix', type: 'string', optional: true, descriptionFallback: 'Static text appended inside the field.' },
        { name: 'persistentClear', type: 'boolean', optional: true, descriptionFallback: 'Always show the clear button, even when the field is empty.' },
        { name: 'reverse', type: 'boolean', optional: true, descriptionFallback: 'Reverse the layout direction of the field.' },
        { name: 'singleLine', type: 'boolean', optional: true, descriptionFallback: 'Hide the label when the field is focused or filled.' },
        { name: 'required', type: 'boolean', optional: true, descriptionFallback: 'Mark the field as required, adding aria-required and a visual indicator.' },
    ],
    usedBy: [
        { slug: 'field', name: 'Field', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Field/field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_field_props.example',
            titleFallback: 'Field with error state and label',
            code: `<OrigamField label="Email" :error="hasError" required>
    <template #default="{ id, onFocus, onBlur }">
        <input :id="id" type="email" @focus="onFocus" @blur="onBlur" />
    </template>
</OrigamField>`,
            lang: 'vue',
        },
    ],
}
