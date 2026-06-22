import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RADIO_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-radio-props',
    name: 'IRadioProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_radio_props.description',
    descriptionFallback: 'Full prop surface for <OrigamRadio>. Merges the input contract (IInputProps), radio-button specifics (IRadioBtnProps), density, spacing, rounding, color, border, elevation, and active/hover state into a single interface.',
    definition: `export interface IRadioProps extends ICommonsComponentProps, IInputProps, IRadioBtnProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBorderProps, IElevationProps, IActiveProps, IHoverProps {}`,
    extends: [
        'ICommonsComponentProps',
        'IInputProps',
        'IRadioBtnProps',
        'IDensityProps',
        'IPaddingProps',
        'IMarginProps',
        'IRoundedProps',
        'IColorProps',
        'IBorderProps',
        'IElevationProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [],
    usedBy: [
        { slug: 'radio', name: 'Radio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Radio/radio.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_radio_props.example',
            titleFallback: 'Extending IRadioProps on a custom radio component',
            code: `import type { IRadioProps } from 'origam'

interface IMyRadioProps extends IRadioProps {
    description?: string
}`,
            lang: 'typescript',
        },
    ],
}
