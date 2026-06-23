import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SWITCH_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-switch-props',
    name: 'ISwitchProps',
    category: 'Forms & Inputs',
    descriptionKey: 'interfaces.catalog.i_switch_props.description',
    descriptionFallback: 'Full prop surface for <OrigamSwitch> — extends selection-control, input, color, border, elevation, density, margin/padding, rounded and active/hover contracts, with three switch-specific facets: indeterminate, inset and flat.',
    definition: `export interface ISwitchProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IInputProps, ISelectionControlProps, ILoaderProps, IColorProps, IDensityProps, IElevationProps, IActiveProps, IHoverProps {
    indeterminate?: boolean
    inset?: boolean
    flat?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IInputProps',
        'ISelectionControlProps',
        'ILoaderProps',
        'IColorProps',
        'IDensityProps',
        'IElevationProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [
        { name: 'indeterminate', type: 'boolean', optional: true, descriptionFallback: 'Puts the switch in a three-state (indeterminate) mode — neither ON nor OFF.' },
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Enables the Material inset variant — taller, fully-rounded rail with inner thumb.' },
        { name: 'flat', type: 'boolean', optional: true, descriptionFallback: 'Removes elevation and border from the switch track surface.' },
    ],
    usedBy: [
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Switch/switch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_switch_props.example',
            titleFallback: 'Indeterminate three-state switch',
            code: `<OrigamSwitch
  v-model="value"
  :indeterminate="value === null"
  color="primary"
  inset
/>`,
            lang: 'html',
        },
    ],
}
