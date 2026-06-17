import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_DIRECTIVE_BINDING_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-directive-binding',
    name: 'IHoverDirectiveBinding',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hover_directive_binding.description',
    descriptionFallback: 'Typed directive binding for v-hover — extends Vue\'s DirectiveBinding with a typed value (boolean or config object) and the directive modifiers.',
    definition: `export interface IHoverDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: boolean | IHoverDirectiveConfig
    modifiers: {
        callback: () => void,
        stop?: boolean
    }
}`,
    extends: ['DirectiveBinding'],
    props: [
        { name: 'value', type: 'boolean | IHoverDirectiveConfig', optional: true, descriptionFallback: 'Directive binding value — a boolean to simply enable/disable, or an IHoverDirectiveConfig object for fine-grained class and handler control.' },
        { name: 'modifiers', type: '{ callback: () => void; stop?: boolean }', optional: false, descriptionFallback: 'Directive modifiers: callback is the function invoked on hover change; stop prevents event propagation when true.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_directive_binding.example',
            titleFallback: 'Using the typed binding in a custom directive implementation',
            code: `import type { IHoverDirectiveBinding } from 'origam'

const vHover = {
    mounted(el: HTMLElement, binding: IHoverDirectiveBinding) {
        // binding.value is boolean | IHoverDirectiveConfig
        const config = typeof binding.value === 'object' ? binding.value : {}
    }
}`,
            lang: 'typescript',
        },
    ],
}
