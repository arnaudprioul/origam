import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_STEPPER_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-stepper-key',
    name: 'ORIGAM_STEPPER_KEY',
    category: 'Navigation',
    descriptionKey: 'consts.catalog.origam_stepper_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamStepper (provider) and OrigamStep (consumer) to propagate step registration, active-step tracking, and navigation callbacks without prop drilling.',
    definition: `export const ORIGAM_STEPPER_KEY: InjectionKey<IStepperProvide> = Symbol.for('origam:stepper')`,
    value: "Symbol.for('origam:stepper')",
    usedBy: [
        { name: 'OrigamStepper', slug: 'origam-stepper' },
        { name: 'OrigamStep', slug: 'origam-step' },
    ],
    sourceFile: 'packages/ds/src/consts/Stepper/stepper.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_stepper_key.example',
            titleFallback: 'Reading the stepper context inside a custom step',
            code: `import { inject } from 'vue'
import { ORIGAM_STEPPER_KEY } from 'origam'

const stepper = inject(ORIGAM_STEPPER_KEY)`,
            lang: 'typescript',
        },
    ],
}
