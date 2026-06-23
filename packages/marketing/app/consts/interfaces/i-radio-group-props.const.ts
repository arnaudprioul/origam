import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RADIO_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-radio-group-props',
    name: 'IRadioGroupProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_radio_group_props.description',
    descriptionFallback: 'Props contract for <OrigamRadioGroup> — wraps a set of radio inputs as a single controlled group. Inherits component, spacing, border, elevation and input contracts, plus optional partial radio and selection-control-group props.',
    definition: `export interface IRadioGroupProps extends ICommonsComponentProps, Partial<Omit<IRadioProps, 'trueValue' | 'falseValue'>>, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IInputProps, Partial<Omit<ISelectionControlGroupProps, 'multiple'>> {}`,
    extends: [
        'ICommonsComponentProps',
        'IRadioProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IInputProps',
        'ISelectionControlGroupProps',
    ],
    props: [],
    usedBy: [
        { slug: 'radio-group', name: 'RadioGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Radio/radio-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_radio_group_props.example',
            titleFallback: 'RadioGroup with inline layout and color',
            code: `<origam-radio-group v-model="plan" color="primary" :inline="true">
    <origam-radio value="free" label="Free" />
    <origam-radio value="pro" label="Pro" />
    <origam-radio value="enterprise" label="Enterprise" />
</origam-radio-group>`,
            lang: 'html',
        },
    ],
}
