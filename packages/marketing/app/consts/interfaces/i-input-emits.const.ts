import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INPUT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-input-emits',
    name: 'IInputEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_input_emits.description',
    descriptionFallback: 'Aggregate emit contract for OrigamInput — combines the commons v-model echo, outer prepend/append click events (IAdjacentEmits), and focus state events (IFocusEmits).',
    definition: `export interface IInputEmits extends ICommonsComponentEmits, IAdjacentEmits, IFocusEmits {
}`,
    extends: ['ICommonsComponentEmits', 'IAdjacentEmits', 'IFocusEmits'],
    props: [],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Input/input.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_input_emits.example',
            titleFallback: 'Typing the emits for a custom field built on OrigamInput',
            code: `import type { IInputEmits } from 'origam'

const emit = defineEmits<IInputEmits>()`,
            lang: 'typescript',
        },
    ],
}
