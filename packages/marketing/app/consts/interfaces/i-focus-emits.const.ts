import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FOCUS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-focus-emits',
    name: 'IFocusEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_focus_emits.description',
    descriptionFallback: 'Emit signature for components that propagate focus state changes. Declares the `update:focused` event required by v-model:focused.',
    definition: `export interface IFocusEmits {
    (e: 'update:focused', event: any): void
}`,
    extends: [],
    props: [
        {
            name: 'update:focused',
            type: '(event: any) => void',
            optional: false,
            descriptionFallback: 'Emitted whenever the internal focus state changes. The payload is the native FocusEvent (or null on blur). Consumed by v-model:focused.',
        },
    ],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/focus.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_focus_emits.example',
            titleFallback: 'Implementing IFocusEmits in a component',
            code: `import type { IFocusEmits } from 'origam'

const emit = defineEmits<IFocusEmits>()

function onFocus (event: FocusEvent) {
    emit('update:focused', event)
}`,
            lang: 'typescript',
        },
    ],
}
