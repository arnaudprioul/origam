import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOUCH_DIRECTIVE_BINDING_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-touch-directive-binding',
    name: 'ITouchDirectiveBinding',
    category: 'Touch & Gesture',
    descriptionKey: 'interfaces.catalog.i_touch_directive_binding.description',
    descriptionFallback: 'Vue directive binding for v-touch — extends Vue\'s DirectiveBinding (minus the value slot) with the typed ITouchValue payload.',
    definition: `export interface ITouchDirectiveBinding extends Omit<DirectiveBinding, 'value'> {
    value?: ITouchValue
}`,
    extends: ['DirectiveBinding'],
    props: [
        { name: 'value', type: 'ITouchValue', optional: true, descriptionFallback: 'The structured touch handler object bound via v-touch, containing directional callbacks and options.' },
    ],
    usedBy: [
        { slug: 'touch', name: 'v-touch', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/touch.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_touch_directive_binding.example',
            titleFallback: 'Type-annotating a custom directive hook',
            code: `import type { ITouchDirectiveBinding } from 'origam'

function mounted(el: HTMLElement, binding: ITouchDirectiveBinding) {
    const { left, right } = binding.value ?? {}
    // register handlers…
}`,
            lang: 'typescript',
        },
    ],
}
