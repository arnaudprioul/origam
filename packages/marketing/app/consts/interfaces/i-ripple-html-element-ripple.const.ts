import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_HTML_ELEMENT_RIPPLE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-html-element-ripple',
    name: 'IRippleHtmlElementRipple',
    category: 'Behaviour',
    descriptionKey: 'interfaces.catalog.i_ripple_html_element_ripple.description',
    descriptionFallback: 'Internal state bag stored on a DOM element\'s _ripple property by the v-ripple directive. Tracks whether the ripple is enabled, centered, circular, and manages the show-timer commit callback.',
    definition: `export interface IRippleHtmlElementRipple {
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
        { name: 'enabled', type: 'boolean', optional: true, descriptionFallback: 'Whether the ripple effect is active on this element.' },
        { name: 'centered', type: 'boolean', optional: true, descriptionFallback: 'When true, the ripple always starts from the centre of the element rather than from the pointer position.' },
        { name: 'circle', type: 'boolean', optional: true, descriptionFallback: 'When true, the ripple is forced to a perfect circle (useful for icon buttons).' },
        { name: 'class', type: 'string', optional: true, descriptionFallback: 'Extra CSS class added to each ripple wave element.' },
        { name: 'touched', type: 'boolean', optional: true, descriptionFallback: 'Marks that the last interaction was a touch event.' },
        { name: 'isTouch', type: 'boolean', optional: true, descriptionFallback: 'Whether the current device has active touch support.' },
        { name: 'showTimer', type: 'number', optional: true, descriptionFallback: 'Timer ID used to delay the ripple show on touch to distinguish taps from scrolls.' },
        { name: 'showTimerCommit', type: 'null | (() => void)', optional: true, descriptionFallback: 'Callback queued by showTimer — invoked to actually paint the ripple, or cleared on cancel.' },
    ],
    usedBy: [
        { slug: 'use-ripple', name: 'useRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_html_element_ripple.example',
            titleFallback: 'Accessing the internal ripple state on an element',
            code: `import type { IRippleHtmlElement } from 'origam'

function isRippleEnabled(el: IRippleHtmlElement): boolean {
    return el._ripple?.enabled === true
}`,
            lang: 'typescript',
        },
    ],
}
