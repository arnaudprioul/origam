import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STEPPER_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-stepper-item-props',
    name: 'IStepperItemProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_stepper_item_props.description',
    descriptionFallback: 'Props contract for <OrigamStepperItem> — an individual step inside OrigamStepper. Receives its index from the parent and exposes individual overrides for title, subtitle, icon, status, and clickability.',
    definition: `export interface IStepperItemProps extends ICommonsComponentProps {
    index?: number
    title?: string
    subtitle?: string
    icon?: TIcon
    status?: TStepperItemStatus
    clickable?: boolean
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'index', type: 'number', optional: true, descriptionFallback: 'Zero-based position of this step within the stepper. Usually injected by the parent OrigamStepper.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Primary label for this step.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Secondary label displayed below the title.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon overriding the default step number indicator.' },
        { name: 'status', type: 'TStepperItemStatus', optional: true, descriptionFallback: 'Drives the visual state of the step independently of modelValue (e.g. complete, error).' },
        { name: 'clickable', type: 'boolean', optional: true, descriptionFallback: 'When true, clicking the step header navigates to it. Overrides the stepper-level clickable setting.' },
    ],
    usedBy: [
        { slug: 'stepper', name: 'Stepper', kind: 'component' },
        { slug: 'stepper-item', name: 'StepperItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Stepper/stepper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_stepper_item_props.example',
            titleFallback: 'StepperItem with error status',
            code: `<OrigamStepperItem
    :index="1"
    title="Profile"
    status="error"
    clickable
/>`,
            lang: 'vue',
        },
    ],
}
