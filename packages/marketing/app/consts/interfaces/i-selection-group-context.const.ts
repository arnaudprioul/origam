import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_GROUP_CONTEXT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-group-context',
    name: 'ISelectionGroupContext',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_group_context.description',
    descriptionFallback: 'Provide/inject context passed from SelectionControlGroup to each child SelectionControl. Exposes the shared reactive modelValue, a forceUpdate trigger for when the parent needs to re-evaluate all children, and an onForceUpdate registration hook for children to subscribe.',
    definition: `export interface ISelectionGroupContext {
    modelValue: Ref<any>
    forceUpdate: () => void
    onForceUpdate: (fn: () => void) => void
}`,
    extends: [],
    props: [
        { name: 'modelValue', type: 'Ref<any>', optional: false, descriptionFallback: 'Shared reactive ref holding the current group selection. Children read and write through this ref; the group synchronises changes to the parent v-model.' },
        { name: 'forceUpdate', type: '() => void', optional: false, descriptionFallback: 'Called by the group when an external change requires all children to re-check their checked state (e.g. programmatic clear or reset).' },
        { name: 'onForceUpdate', type: '(fn: () => void) => void', optional: false, descriptionFallback: 'Registration function used by each child to subscribe a callback that runs when forceUpdate is called.' },
    ],
    usedBy: [
        { slug: 'selection-control-group', name: 'SelectionControlGroup', kind: 'component' },
        { slug: 'selection-control', name: 'SelectionControl', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_group_context.example',
            titleFallback: 'Injecting the group context in a custom selection control',
            code: `import { inject } from 'vue'
import type { ISelectionGroupContext } from 'origam'

const group = inject<ISelectionGroupContext>('selectionGroup')
group?.onForceUpdate(() => {
    // re-evaluate checked state
})`,
            lang: 'typescript',
        },
    ],
}
