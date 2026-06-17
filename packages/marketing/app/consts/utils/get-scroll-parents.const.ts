import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_SCROLL_PARENTS_UTIL_DOC: IUtilDoc = {
    slug: 'get-scroll-parents',
    name: 'getScrollParents',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_scroll_parents.description',
    descriptionFallback: 'Collects all scrollable ancestor elements of a given element up to an optional boundary, returning them as an array. Used by overlay scroll strategies to block or track all scroll containers at once.',
    signature: `function getScrollParents(el?: Element | null, stopAt?: Element | null): Array<HTMLElement>`,
    params: [
        {
            name: 'el',
            type: 'Element | null | undefined',
            required: false,
            descriptionKey: 'utils.detail.get_scroll_parents.param_el',
            descriptionFallback: 'The starting element. Returns an empty array when null or undefined.',
        },
        {
            name: 'stopAt',
            type: 'Element | null | undefined',
            required: false,
            descriptionKey: 'utils.detail.get_scroll_parents.param_stop_at',
            descriptionFallback: 'An optional boundary element. The walk stops when this element is reached (inclusive). When stopAt does not contain el, an empty array is returned immediately.',
        },
    ],
    returns: {
        type: 'Array<HTMLElement>',
        descriptionKey: 'utils.detail.get_scroll_parents.returns',
        descriptionFallback: 'An ordered array of scrollable ancestors, from closest to furthest.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_scroll_parents.example_basic',
            titleFallback: 'Block all scroll containers when a dialog opens',
            code: `import { getScrollParents } from 'origam'

const overlay = document.querySelector<HTMLElement>('#overlay')
const dialog  = document.querySelector<HTMLElement>('#dialog')
const scrollers = getScrollParents(dialog, overlay)

scrollers.forEach(el => el.classList.add('scroll-locked'))`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parent', 'get-scroll-position', 'get-overflow'],
}
