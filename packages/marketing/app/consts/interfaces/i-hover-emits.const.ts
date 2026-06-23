import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-emits',
    name: 'IHoverEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_hover_emits.description',
    descriptionFallback: 'Emit signature for components that propagate their hover state — emits update:hover with a boolean whenever the pointer enters or leaves.',
    definition: `export interface IHoverEmits {
    (e: 'update:hover', value: boolean): void
}`,
    extends: [],
    props: [
        { name: 'update:hover', type: '(e: \'update:hover\', value: boolean) => void', optional: false, descriptionFallback: 'Emitted with true on mouseenter and false on mouseleave, enabling v-model:hover two-way binding on the component.' },
    ],
    usedBy: [
        { slug: 'use-hover', name: 'useHover', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_emits.example',
            titleFallback: 'Implementing IHoverEmits on a component',
            code: `import type { IHoverEmits } from 'origam'

const emit = defineEmits<IHoverEmits>()

// Emitting on pointer enter
emit('update:hover', true)`,
            lang: 'typescript',
        },
    ],
}
