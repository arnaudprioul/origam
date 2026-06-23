import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-group-props',
    name: 'ISelectionControlGroupProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_group_props.description',
    descriptionFallback: 'Props for <OrigamSelectionControlGroup>, the container that manages a group of checkboxes, radios, or switch controls. Extends commons, color, density, and ripple surfaces with group-specific props: input type, inline layout, icons, multiple selection, name grouping, readonly/disabled state, and a custom value comparator.',
    definition: `export interface ISelectionControlGroupProps extends ICommonsComponentProps, IColorProps, IDensityProps, IRippleProps {
    disabled?: boolean
    error?: boolean
    inline?: boolean
    falseIcon?: TIcon
    trueIcon?: TIcon
    multiple?: boolean
    name?: string
    readonly?: boolean
    modelValue?: any
    type?: string
    valueComparator?: (a: any, b: any) => boolean
    items?: Array<any> | Record<string, any>
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IDensityProps', 'IRippleProps'],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all controls in the group.' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Puts all controls in the error visual state.' },
        { name: 'inline', type: 'boolean', optional: true, descriptionFallback: 'Lays out controls horizontally instead of vertically.' },
        { name: 'falseIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon used for the unchecked/false state of each control.' },
        { name: 'trueIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon used for the checked/true state of each control.' },
        { name: 'multiple', type: 'boolean', optional: true, descriptionFallback: 'Allows multiple items to be selected simultaneously. modelValue becomes an array.' },
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'Shared HTML name attribute applied to all child inputs — groups them for native form submission.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes all controls non-interactive while keeping normal visual appearance.' },
        { name: 'modelValue', type: 'any', optional: true, descriptionFallback: 'The current value(s) bound with v-model. A single value for single-select, an array for multiple.' },
        { name: 'type', type: 'string', optional: true, descriptionFallback: 'HTML input type forwarded to each child control — "checkbox", "radio", or "switch".' },
        { name: 'valueComparator', type: '(a: any, b: any) => boolean', optional: true, descriptionFallback: 'Custom equality function used to match modelValue against item values. Defaults to strict equality.' },
        { name: 'items', type: 'Array<any> | Record<string, any>', optional: true, descriptionFallback: 'Data source for generating child controls. Accepts an array of values or a key/value record.' },
    ],
    usedBy: [
        { slug: 'selection-control-group', name: 'SelectionControlGroup', kind: 'component' },
        { slug: 'checkbox-group', name: 'CheckboxGroup', kind: 'component' },
        { slug: 'radio-group', name: 'RadioGroup', kind: 'component' },
        { slug: 'selection-control', name: 'SelectionControl', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_control_group_props.example',
            titleFallback: 'Generating a checkbox group from an items array',
            code: `<OrigamSelectionControlGroup
    v-model="selected"
    :items="['Vue', 'React', 'Angular']"
    type="checkbox"
    :inline="true"
/>`,
            lang: 'html',
        },
    ],
}
