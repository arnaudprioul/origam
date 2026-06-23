import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INDETERMINATE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-indeterminate-emits',
    name: 'IIndeterminateEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_indeterminate_emits.description',
    descriptionFallback: 'Emit signature for three-state controls — emits update:indeterminate with a boolean to enable v-model:indeterminate two-way binding on Switch, Checkbox and similar components.',
    definition: `export interface IIndeterminateEmits {
    (e: 'update:indeterminate', value: boolean): void
}`,
    extends: [],
    props: [
        { name: 'update:indeterminate', type: "(e: 'update:indeterminate', value: boolean) => void", optional: false, descriptionFallback: 'Emitted when the indeterminate state changes — true means the control is in an indeterminate state, false means it has resolved to checked or unchecked.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_indeterminate_emits.example',
            titleFallback: 'Implementing IIndeterminateEmits on a Checkbox component',
            code: `import type { IIndeterminateEmits } from 'origam'

const emit = defineEmits<IIndeterminateEmits>()

function onToggle(indeterminate: boolean) {
    emit('update:indeterminate', indeterminate)
}`,
            lang: 'typescript',
        },
    ],
}
