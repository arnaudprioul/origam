import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const STEPPER_ITEM_STATUS_TYPE_DOC: ITypeDoc = {
    slug: 'stepper-item-status',
    name: 'TStepperItemStatus',
    kind: 'type',
    category: 'Navigation',
    descriptionKey: 'types.catalog.stepper_item_status.description',
    descriptionFallback: 'Lifecycle status of a single step inside OrigamStepper — drives the step icon, colour and interactive affordances.',
    definition: `export type TStepperItemStatus = 'pending' | 'active' | 'done' | 'error'`,
    values: [
        {
            value: 'pending',
            descriptionKey: 'types.detail.stepper_item_status.pending',
            descriptionFallback: 'Step has not been visited yet. Renders with a neutral style and is not interactive unless the stepper is non-linear.',
        },
        {
            value: 'active',
            descriptionKey: 'types.detail.stepper_item_status.active',
            descriptionFallback: 'Currently focused step. The header is highlighted and the step content panel is visible.',
        },
        {
            value: 'done',
            descriptionKey: 'types.detail.stepper_item_status.done',
            descriptionFallback: 'Step has been completed. A checkmark icon replaces the step number and the step is navigable to in non-linear mode.',
        },
        {
            value: 'error',
            descriptionKey: 'types.detail.stepper_item_status.error',
            descriptionFallback: 'Step completed with a validation error. Renders with the danger intent colour and a warning icon.',
        },
    ],
    usedBy: [
        { slug: 'stepper-item', name: 'StepperItem', propName: 'status' },
    ],
    sourceFile: 'packages/ds/src/types/Stepper/stepper.type.ts',
    examples: [
        {
            titleKey: 'types.detail.stepper_item_status.example',
            titleFallback: 'Stepper with mixed statuses',
            code: `<origam-stepper>
  <origam-stepper-item title="Account" status="done" />
  <origam-stepper-item title="Profile" status="active" />
  <origam-stepper-item title="Review" status="pending" />
  <origam-stepper-item title="Payment" status="error" />
</origam-stepper>`,
            lang: 'html',
        },
    ],
}
