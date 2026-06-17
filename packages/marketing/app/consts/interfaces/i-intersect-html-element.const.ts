import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERSECT_HTML_ELEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-intersect-html-element',
    name: 'IIntersectHtmlElement',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_intersect_html_element.description',
    descriptionFallback: 'HTMLElement augmented with a private _observe property that the v-intersect directive uses to store its per-observer runtime state on the DOM node.',
    definition: `export interface IIntersectHtmlElement extends HTMLElement {
    _observe?: IIntersectHtmlElementObserve
}`,
    extends: ['HTMLElement'],
    props: [
        { name: '_observe', type: 'IIntersectHtmlElementObserve', optional: true, descriptionFallback: 'Internal map keyed by observer id, used by v-intersect to track and clean up each IntersectionObserver attached to the element.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/intersect.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_intersect_html_element.example',
            titleFallback: 'Casting an element to IIntersectHtmlElement for cleanup',
            code: `import type { IIntersectHtmlElement } from 'origam'

function teardown(el: HTMLElement) {
    const observed = el as IIntersectHtmlElement
    if (observed._observe) {
        Object.keys(observed._observe).forEach(key => {
            observed._observe![key]?.observer?.disconnect()
        })
        delete observed._observe
    }
}`,
            lang: 'typescript',
        },
    ],
}
