import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-props',
    name: 'ISelectionControlProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_props.description',
    descriptionFallback: 'Props for <OrigamSelectionControl>, the base component shared by Checkbox, Switch, and Radio. Extends commons, a partial of the group props (excluding items), color, bgColor, active/hover state, and density, then adds individual control-level bindings: label, trueValue, falseValue, value, and required.',
    definition: `export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps, IBgColorProps, IActiveProps, IHoverProps, IDensityProps {
    label?: string
    trueValue?: any
    falseValue?: any
    value?: any
    required?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'Partial<Omit<ISelectionControlGroupProps, "items">>',
        'IColorProps',
        'IBgColorProps',
        'IActiveProps',
        'IHoverProps',
        'IDensityProps',
    ],
    props: [
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Text label rendered beside the control.' },
        { name: 'trueValue', type: 'any', optional: true, descriptionFallback: 'The value emitted when the control is checked/on. Defaults to true.' },
        { name: 'falseValue', type: 'any', optional: true, descriptionFallback: 'The value emitted when the control is unchecked/off. Defaults to false.' },
        { name: 'value', type: 'any', optional: true, descriptionFallback: 'The value contributed to a group modelValue when this control is checked (array mode).' },
        { name: 'required', type: 'boolean', optional: true, descriptionFallback: 'Marks the input as required for native form validation.' },
    ],
    usedBy: [
        { slug: 'selection-control', name: 'SelectionControl', kind: 'component' },
        { slug: 'checkbox', name: 'Checkbox', kind: 'component' },
        { slug: 'switch', name: 'Switch', kind: 'component' },
        { slug: 'radio', name: 'Radio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_control_props.example',
            titleFallback: 'A checkbox with custom true/false values',
            code: `<OrigamCheckbox
    v-model="permission"
    true-value="admin"
    false-value="user"
    label="Administrator access"
/>`,
            lang: 'html',
        },
    ],
}
