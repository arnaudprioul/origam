import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STEPPER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-stepper-props',
    name: 'IStepperProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_stepper_props.description',
    descriptionFallback: 'Full props contract for <OrigamStepper> — a multi-step flow with horizontal or vertical orientation, clickable navigation, connector lines, and the full design surface (color, size, elevation, spacing).',
    definition: `export interface IStepperProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IDensityProps, IDimensionProps, IElevationProps, IMarginProps, IPaddingProps, IRoundedProps, IBorderProps {
    items?: IStepperItem[]
    modelValue?: number
    orientation?: 'horizontal' | 'vertical'
    clickable?: boolean
    showConnectors?: boolean
}`,
    extends: [
        'ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'ISizeProps',
        'IDensityProps', 'IDimensionProps', 'IElevationProps', 'IMarginProps',
        'IPaddingProps', 'IRoundedProps', 'IBorderProps',
    ],
    props: [
        { name: 'items', type: 'IStepperItem[]', optional: true, descriptionFallback: 'Array of step descriptors. Alternatively use the default slot with OrigamStepperItem children.' },
        { name: 'modelValue', type: 'number', optional: true, descriptionFallback: 'Zero-based index of the currently active step (v-model).' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", optional: true, descriptionFallback: 'Layout direction of the stepper. Defaults to "horizontal".' },
        { name: 'clickable', type: 'boolean', optional: true, descriptionFallback: 'Allows clicking on any step header to navigate directly to it.' },
        { name: 'showConnectors', type: 'boolean', optional: true, descriptionFallback: 'Shows connector lines between step headers.' },
    ],
    usedBy: [
        { slug: 'stepper', name: 'Stepper', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Stepper/stepper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_stepper_props.example',
            titleFallback: 'Vertical clickable stepper',
            code: `<OrigamStepper
    v-model="step"
    :items="steps"
    orientation="vertical"
    clickable
    show-connectors
/>`,
            lang: 'vue',
        },
    ],
}
