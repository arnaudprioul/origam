import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_REMOVE_LISTENERS_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-remove-listeners',
    name: 'rippleRemoveListeners',
    category: 'Commons',
    icon: 'mdi-water-remove',
    descriptionKey: 'utils.catalog.ripple_remove_listeners.description',
    descriptionFallback: 'Remove all event listeners previously attached by the ripple directive from an element. Called on directive unmount or when the ripple is programmatically disabled.',
    signature: `function rippleRemoveListeners(el: IRippleHtmlElement): void`,
    params: [
        {
            name: 'el',
            type: 'IRippleHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.ripple_remove_listeners.param_el',
            descriptionFallback: 'The HTML element (extended with _ripple state) from which to remove the ripple event listeners. All pointer, keyboard, drag, and focus listeners are removed.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_remove_listeners.returns',
        descriptionFallback: 'No return value. All ripple listeners (mousedown, touchstart, touchend, touchmove, touchcancel, mouseup, mouseleave, keydown, keyup, dragstart, blur) are removed from the element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_remove_listeners.example_basic',
            titleFallback: 'Clean up ripple listeners on unmount',
            code: `import { rippleRemoveListeners } from 'origam'

// In a directive beforeUnmount hook:
rippleRemoveListeners(el as IRippleHtmlElement)`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-hide', 'ripple-cancel-show'],
}
