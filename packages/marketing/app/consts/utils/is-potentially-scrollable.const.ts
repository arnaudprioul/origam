import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_POTENTIALLY_SCROLLABLE_UTIL_DOC: IUtilDoc = {
    slug: 'is-potentially-scrollable',
    name: 'isPotentiallyScrollable',
    category: 'Commons',
    icon: 'mdi-gesture-swipe-vertical',
    descriptionKey: 'utils.catalog.is_potentially_scrollable.description',
    descriptionFallback: 'Returns true when an element has overflow-y set to "scroll" or "auto" via computed styles, meaning it is a potential scroll container. Used by scroll strategy utilities to locate the relevant ancestor.',
    signature: `function isPotentiallyScrollable(el?: Element | null): boolean`,
    params: [
        {
            name: 'el',
            type: 'Element | null | undefined',
            required: false,
            descriptionKey: 'utils.detail.is_potentially_scrollable.param_el',
            descriptionFallback: 'The DOM element to inspect. Returns false immediately for null, undefined, or non-element nodes (nodeType !== ELEMENT_NODE).',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.is_potentially_scrollable.returns',
        descriptionFallback: 'true when the element has overflow-y: scroll or overflow-y: auto in its computed style; false for all other cases including missing or null elements.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_potentially_scrollable.example_basic',
            titleFallback: 'Detecting a scrollable container',
            code: `import { isPotentiallyScrollable } from 'origam'

const el = document.querySelector('.my-panel')
if (isPotentiallyScrollable(el)) {
    el.addEventListener('scroll', onScroll)
}

isPotentiallyScrollable(null)      // → false
isPotentiallyScrollable(undefined) // → false`,
            lang: 'typescript',
        },
    ],
    related: [],
    noteKey: 'utils.detail.is_potentially_scrollable.note',
    noteFallback: 'This function accesses window.getComputedStyle and only works in a browser context. It always returns false during SSR.',
}
