import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_DIRECTIVE_BINDING_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-directive-binding',
    name: 'IRippleDirectiveBinding',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_ripple_directive_binding.description',
    descriptionFallback: 'Typed directive binding for `v-ripple` — extends Vue\'s DirectiveBinding with a narrowed `value` (boolean or `{ class }` object) and typed `modifiers` for center, circle and stop behaviours.',
    definition: `export interface IRippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: boolean | { class: string }
    modifiers: {
        center?: boolean
        circle?: boolean
        stop?: boolean
    }
}`,
    extends: [],
    props: [
        { name: 'value', type: 'boolean | { class: string }', optional: true, descriptionFallback: 'Binding value. `true` enables the ripple with defaults; `false` disables it; an object with a `class` string appends that class to every ripple element.' },
        { name: 'modifiers', type: '{ center?: boolean; circle?: boolean; stop?: boolean }', optional: false, descriptionFallback: 'Directive modifiers: `center` anchors the wave origin to the element centre; `circle` forces a perfectly circular wave; `stop` prevents event propagation when the ripple triggers.' },
    ],
    usedBy: [
        { slug: 'v-ripple', name: 'vRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_directive_binding.example',
            titleFallback: 'Accessing the typed binding in a directive hook',
            code: `import type { IRippleDirectiveBinding } from 'origam'

function mounted(el: HTMLElement, binding: IRippleDirectiveBinding) {
    const rippleEnabled = binding.value !== false
    const isCentered = binding.modifiers.center ?? false
}`,
            lang: 'typescript',
        },
    ],
}
