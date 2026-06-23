import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_SCROLL_PARENT_UTIL_DOC: IUtilDoc = {
    slug: 'get-scroll-parent',
    name: 'getScrollParent',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_scroll_parent.description',
    descriptionFallback: 'Walks the DOM ancestor chain of an element and returns the first parent that has a visible scrollbar (or any potential scroll container when includeHidden is true).',
    signature: `function getScrollParent(el?: HTMLElement, includeHidden?: boolean): HTMLElement`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_scroll_parent.param_el',
            descriptionFallback: 'The element to start from. When omitted, returns document.scrollingElement.',
        },
        {
            name: 'includeHidden',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            descriptionKey: 'utils.detail.get_scroll_parent.param_include_hidden',
            descriptionFallback: 'When true, elements with overflow: scroll or overflow: auto (even without visible scrollbar) are included. Defaults to false.',
        },
    ],
    returns: {
        type: 'HTMLElement',
        descriptionKey: 'utils.detail.get_scroll_parent.returns',
        descriptionFallback: 'The nearest scrollable ancestor, or document.scrollingElement as the document-level fallback.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_scroll_parent.example_basic',
            titleFallback: 'Find the scrollable container of a tooltip anchor',
            code: `import { getScrollParent } from 'origam'

const anchor = document.querySelector<HTMLElement>('#anchor')
const scroller = getScrollParent(anchor)

scroller.addEventListener('scroll', repositionTooltip)`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parents', 'get-scroll-position', 'get-scroll-size'],
}
