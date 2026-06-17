import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERSECT_HTML_ELEMENT_OBSERVE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-intersect-html-element-observe',
    name: 'IIntersectHtmlElementObserve',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_intersect_html_element_observe.description',
    descriptionFallback: 'Index signature map stored on an element by the v-intersect directive — each key is an observer id and the value holds the corresponding IntersectionObserver instance and its options.',
    definition: `export interface IIntersectHtmlElementObserve {
    [key: string]: any
}`,
    extends: [],
    props: [
        { name: '[key: string]', type: 'any', optional: false, descriptionFallback: 'An open-ended index signature. Each entry is keyed by an observer id string and holds an object with at minimum an observer (IntersectionObserver) and options (IntersectionObserverInit).' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/intersect.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_intersect_html_element_observe.example',
            titleFallback: 'Iterating the observe map to disconnect all observers',
            code: `import type { IIntersectHtmlElementObserve } from 'origam'

function disconnectAll(obs: IIntersectHtmlElementObserve) {
    Object.values(obs).forEach((entry) => {
        (entry as { observer: IntersectionObserver }).observer?.disconnect()
    })
}`,
            lang: 'typescript',
        },
    ],
}
