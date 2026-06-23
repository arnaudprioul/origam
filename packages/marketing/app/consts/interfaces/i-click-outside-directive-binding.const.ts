import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_OUTSIDE_DIRECTIVE_BINDING_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-outside-directive-binding',
    name: 'IClickOutsideDirectiveBinding',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_click_outside_directive_binding.description',
    descriptionFallback: 'Typed DirectiveBinding for v-click-outside. The value accepts either a bare handler function or the full IClickOutsideBindingArgs object.',
    definition: `export interface IClickOutsideDirectiveBinding extends DirectiveBinding {
    value: ((e: MouseEvent) => void) | IClickOutsideBindingArgs
}`,
    extends: ['DirectiveBinding'],
    props: [
        { name: 'value', type: '((e: MouseEvent) => void) | IClickOutsideBindingArgs', optional: false, descriptionFallback: 'Handler shorthand or a full IClickOutsideBindingArgs object providing handler, closeConditional and include.' },
    ],
    usedBy: [
        { slug: 'click-outside', name: 'v-click-outside', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/clickOutside.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_outside_directive_binding.example',
            titleFallback: 'Typing the binding in a custom directive hook',
            code: `import type { IClickOutsideDirectiveBinding } from 'origam'

function mounted(el: HTMLElement, binding: IClickOutsideDirectiveBinding) {
    const { value } = binding
    if (typeof value === 'function') {
        el.addEventListener('click', value)
    }
}`,
            lang: 'typescript',
        },
    ],
}
