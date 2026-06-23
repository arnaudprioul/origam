import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STEPPER_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-stepper-item',
    name: 'IStepperItem',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_stepper_item.description',
    descriptionFallback: 'Descriptor for a single step inside <OrigamStepper>. Used in the items prop array to define the title, optional subtitle, icon, and initial status of each step.',
    definition: `export interface IStepperItem {
    title: string
    subtitle?: string
    icon?: TIcon
    status?: TStepperItemStatus
}`,
    extends: [],
    props: [
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'Primary label displayed for this step.' },
        { name: 'subtitle', type: 'string', optional: true, descriptionFallback: 'Secondary label displayed below the title.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon overriding the default step number indicator.' },
        { name: 'status', type: 'TStepperItemStatus', optional: true, descriptionFallback: 'Initial status of the step (e.g. complete, error). Drives visual state independently of the modelValue.' },
    ],
    usedBy: [
        { slug: 'stepper', name: 'Stepper', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Stepper/stepper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_stepper_item.example',
            titleFallback: 'Stepper with items array',
            code: `import type { IStepperItem } from 'origam'

const steps: IStepperItem[] = [
    { title: 'Account', subtitle: 'Enter your credentials' },
    { title: 'Profile', subtitle: 'Tell us about you' },
    { title: 'Confirm', icon: mdiCheck },
]`,
            lang: 'typescript',
        },
    ],
}
