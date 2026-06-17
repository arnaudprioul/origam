import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_SELECTION_CONTROL_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-selection-control-group-key',
    name: 'ORIGAM_SELECTION_CONTROL_GROUP_KEY',
    category: 'Provide / Inject',
    descriptionKey: 'consts.catalog.origam_selection_control_group_key.description',
    descriptionFallback: 'Vue injection key (InjectionKey<ISelectionGroupContext>) used by OrigamSelectionControlGroup to share selection state (modelValue, multiple, disabled…) with every child OrigamSelectionControl.',
    definition: `export const ORIGAM_SELECTION_CONTROL_GROUP_KEY: InjectionKey<ISelectionGroupContext> = Symbol.for('origam:selection-control-group')`,
    value: `Symbol.for('origam:selection-control-group')`,
    usedBy: [
        { name: 'OrigamSelectionControlGroup', slug: 'selection-control' },
        { name: 'OrigamSelectionControl', slug: 'selection-control' },
    ],
    sourceFile: 'packages/ds/src/consts/SelectionControl/selection-control.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_selection_control_group_key.example',
            titleFallback: 'Injecting the selection-group context',
            code: `import { inject } from 'vue'
import { ORIGAM_SELECTION_CONTROL_GROUP_KEY } from 'origam'

const group = inject(ORIGAM_SELECTION_CONTROL_GROUP_KEY)
const isSelected = group?.isSelected(myValue)`,
            lang: 'typescript',
        },
    ],
}
