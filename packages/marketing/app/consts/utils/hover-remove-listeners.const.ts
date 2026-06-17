import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HOVER_REMOVE_LISTENERS_UTIL_DOC: IUtilDoc = {
    slug: 'hover-remove-listeners',
    name: 'hoverRemoveListeners',
    category: 'Commons',
    icon: 'mdi-cursor-default-click-outline',
    descriptionKey: 'utils.catalog.hover_remove_listeners.description',
    descriptionFallback: 'Removes all hover event listeners (mouseenter, mouseleave, touchstart, touchend, touchcancel) from an IHoverHtmlElement. Should be called in the directive\'s beforeUnmount hook to prevent memory leaks.',
    signature: `function hoverRemoveListeners(el: IHoverHtmlElement): void`,
    params: [
        {
            name: 'el',
            type: 'IHoverHtmlElement',
            required: true,
            descriptionKey: 'utils.detail.hover_remove_listeners.param_el',
            descriptionFallback: 'The element from which to detach all hover listeners. Must extend IHoverHtmlElement (carries the _hover descriptor).',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.hover_remove_listeners.returns',
        descriptionFallback: 'Nothing. All hover event listeners are removed from the element.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hover_remove_listeners.example_basic',
            titleFallback: 'Teardown in a directive',
            code: `import { hoverRemoveListeners } from 'origam'

// Inside a directive's beforeUnmount hook
beforeUnmount(el) {
  hoverRemoveListeners(el)
  delete el._hover
}`,
            lang: 'typescript',
        },
    ],
    related: ['hover-show', 'hover-hide'],
}
