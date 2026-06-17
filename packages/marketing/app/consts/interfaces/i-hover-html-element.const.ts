import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_HTML_ELEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-html-element',
    name: 'IHoverHtmlElement',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hover_html_element.description',
    descriptionFallback: 'HTMLElement augmented with a private _hover property that stores the v-hover directive\'s runtime state on the DOM node.',
    definition: `export interface IHoverHtmlElement extends HTMLElement {
    _hover?: IHoverHtmlElementHover
}`,
    extends: ['HTMLElement'],
    props: [
        { name: '_hover', type: 'IHoverHtmlElementHover', optional: true, descriptionFallback: 'Internal runtime state attached by the v-hover directive on the DOM element — holds handlers, class and touch flags.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_html_element.example',
            titleFallback: 'Casting an element to IHoverHtmlElement in a directive hook',
            code: `import type { IHoverHtmlElement } from 'origam'

function cleanup(el: HTMLElement) {
    const hovered = el as IHoverHtmlElement
    delete hovered._hover
}`,
            lang: 'typescript',
        },
    ],
}
