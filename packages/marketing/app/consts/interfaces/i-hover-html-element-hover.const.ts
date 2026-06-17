import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_HTML_ELEMENT_HOVER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-html-element-hover',
    name: 'IHoverHtmlElementHover',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hover_html_element_hover.description',
    descriptionFallback: 'Internal state object stored by the v-hover directive on the DOM element — holds the enabled flag, active class, touch detection and event handlers.',
    definition: `export interface IHoverHtmlElementHover {
    enabled?: boolean
    class?: string
    touched?: boolean
    isTouch?: boolean
    mouseenter?: (el: HTMLElement, e: Event) => void
    mouseleave?: (el: HTMLElement, e: Event) => void
}`,
    extends: [],
    props: [
        { name: 'enabled', type: 'boolean', optional: true, descriptionFallback: 'Whether the v-hover directive is currently active on this element.' },
        { name: 'class', type: 'string', optional: true, descriptionFallback: 'CSS class toggled by the directive while the element is hovered.' },
        { name: 'touched', type: 'boolean', optional: true, descriptionFallback: 'True if the last interaction originated from a touch event.' },
        { name: 'isTouch', type: 'boolean', optional: true, descriptionFallback: 'Whether the device is a touch-capable device.' },
        { name: 'mouseenter', type: '(el: HTMLElement, e: Event) => void', optional: true, descriptionFallback: 'Stored mouseenter handler for cleanup on directive unmount.' },
        { name: 'mouseleave', type: '(el: HTMLElement, e: Event) => void', optional: true, descriptionFallback: 'Stored mouseleave handler for cleanup on directive unmount.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_html_element_hover.example',
            titleFallback: 'Inspecting the internal hover state on a mounted element',
            code: `import type { IHoverHtmlElement } from 'origam'

const el = document.querySelector('.my-card') as IHoverHtmlElement
if (el._hover?.enabled) {
    console.log('hover active, class:', el._hover.class)
}`,
            lang: 'typescript',
        },
    ],
}
