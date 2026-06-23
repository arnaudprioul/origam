import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UNMOUNT_INTERSECT_UTIL_DOC: IUtilDoc = {
    slug: 'unmount-intersect',
    name: 'unmountIntersect',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.unmount_intersect.description',
    descriptionFallback: 'Tear down the IntersectionObserver attached by the v-intersect directive on an element for the current component instance. Called in the directive\'s unmounted hook.',
    signature: `function unmountIntersect(
  el: IIntersectHtmlElement,
  binding: IIntersectDirectiveBinding
): void`,
    params: [
        {
            name: 'el',
            type: 'IIntersectHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.unmount_intersect.param_el',
            descriptionFallback: 'The element that owns the _observe map populated by mountIntersect().',
        },
        {
            name: 'binding',
            type: 'IIntersectDirectiveBinding',
            required: true,
            descriptionKey: 'utils.detail.unmount_intersect.param_binding',
            descriptionFallback: 'The Vue directive binding object; its instance.$.uid is used as the map key to locate the correct observer entry.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.unmount_intersect.returns',
        descriptionFallback: 'No return value. The observer is stopped and the entry removed from the element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/intersect.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.unmount_intersect.example_basic',
            titleFallback: 'Directive teardown',
            code: `import { unmountIntersect } from 'origam'

// Inside a custom directive using v-intersect internals
const myDirective = {
    unmounted(el, binding) {
        unmountIntersect(el, binding)
    },
}`,
            lang: 'typescript',
        },
    ],
    related: ['unref-element'],
}
