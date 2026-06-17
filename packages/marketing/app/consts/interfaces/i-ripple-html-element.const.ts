import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_HTML_ELEMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-html-element',
    name: 'IRippleHtmlElement',
    category: 'Directives',
    descriptionKey: 'interfaces.catalog.i_ripple_html_element.description',
    descriptionFallback: 'Augmented HTMLElement that carries the `_ripple` private state bag written by `v-ripple`. All fields are optional so the interface can be safely cast from any HTMLElement and read without null-guard noise.',
    definition: `export interface IRippleHtmlElement extends HTMLElement {
    _ripple?: IRippleHtmlElementRipple
}

export interface IRippleHtmlElementRipple {
    enabled?: boolean
    centered?: boolean
    circle?: boolean
    class?: string
    touched?: boolean
    isTouch?: boolean
    showTimer?: number
    showTimerCommit?: null | (() => void)
}`,
    extends: [],
    props: [
        { name: '_ripple', type: 'IRippleHtmlElementRipple', optional: true, descriptionFallback: 'Private state bag attached to the host element by the v-ripple directive. Holds configuration (enabled, centered, circle, class) and animation bookkeeping (touched, isTouch, showTimer, showTimerCommit).' },
    ],
    usedBy: [
        { slug: 'v-ripple', name: 'vRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_html_element.example',
            titleFallback: 'Checking ripple state on an element',
            code: `import type { IRippleHtmlElement } from 'origam'

function isRippleEnabled(el: IRippleHtmlElement): boolean {
    return el._ripple?.enabled !== false
}`,
            lang: 'typescript',
        },
    ],
}
