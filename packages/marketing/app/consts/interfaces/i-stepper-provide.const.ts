import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STEPPER_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-stepper-provide',
    name: 'IStepperProvide',
    category: 'Provide / Inject',
    descriptionKey: 'interfaces.catalog.i_stepper_provide.description',
    descriptionFallback: 'Injection contract provided by <OrigamStepper> to its OrigamStepperItem children. Exposes the active step ref, orientation, clickability flag, and inherited color for child coordination.',
    definition: `export interface IStepperProvide {
    modelValue: Ref<number>
    orientation: ComputedRef<TStepperOrientation>
    clickable: ComputedRef<boolean>
    color: ComputedRef<string | undefined>
}`,
    extends: [],
    props: [
        { name: 'modelValue', type: 'Ref<number>', optional: false, descriptionFallback: 'Reactive ref holding the zero-based index of the currently active step.' },
        { name: 'orientation', type: 'ComputedRef<TStepperOrientation>', optional: false, descriptionFallback: 'Computed orientation of the stepper (horizontal or vertical). Used by children for layout.' },
        { name: 'clickable', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Computed flag indicating whether step headers are navigable by click.' },
        { name: 'color', type: "ComputedRef<string | undefined>", optional: false, descriptionFallback: 'Inherited color token propagated to step indicators.' },
    ],
    usedBy: [
        { slug: 'stepper', name: 'Stepper', kind: 'component' },
        { slug: 'stepper-item', name: 'StepperItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Stepper/stepper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_stepper_provide.example',
            titleFallback: 'Injecting the stepper context in a child',
            code: `import { inject } from 'vue'
import type { IStepperProvide } from 'origam'

const stepper = inject<IStepperProvide>('stepper')
const isActive = computed(() => stepper?.modelValue.value === props.index)`,
            lang: 'typescript',
        },
    ],
}
