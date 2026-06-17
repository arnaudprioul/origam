import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERSECT_DIRECTIVE_BINDING_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-intersect-directive-binding',
    name: 'IIntersectDirectiveBinding',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_intersect_directive_binding.description',
    descriptionFallback: 'Typed directive binding for v-intersect — extends Vue\'s DirectiveBinding with a typed value (handler or handler+options) and once/quiet modifiers.',
    definition: `export interface IIntersectDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: TObserveHandler | { handler: TObserveHandler, options?: IntersectionObserverInit }
    modifiers: {
        once?: boolean
        quiet?: boolean
    }
}`,
    extends: ['DirectiveBinding'],
    props: [
        { name: 'value', type: 'TObserveHandler | { handler: TObserveHandler; options?: IntersectionObserverInit }', optional: true, descriptionFallback: 'Directive binding value — a bare TObserveHandler callback, or an object pairing the handler with custom IntersectionObserverInit options (root, rootMargin, threshold).' },
        { name: 'modifiers', type: '{ once?: boolean; quiet?: boolean }', optional: false, descriptionFallback: 'once: the observer disconnects after the first intersection; quiet: suppresses the initial callback call on mount.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/intersect.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_intersect_directive_binding.example',
            titleFallback: 'Using the typed binding in the v-intersect directive hook',
            code: `import type { IIntersectDirectiveBinding } from 'origam'

const vIntersect = {
    mounted(el: HTMLElement, binding: IIntersectDirectiveBinding) {
        const handler = typeof binding.value === 'function'
            ? binding.value
            : binding.value?.handler
        const options = typeof binding.value === 'object'
            ? binding.value?.options
            : undefined
    }
}`,
            lang: 'typescript',
        },
    ],
}
