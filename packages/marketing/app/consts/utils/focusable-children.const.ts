import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FOCUSABLE_CHILDREN_UTIL_DOC: IUtilDoc = {
    slug: 'focusable-children',
    name: 'focusableChildren',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.focusable_children.description',
    descriptionFallback: 'Return all focusable descendant elements inside a container. By default filters out elements with tabIndex="-1" so only tab-reachable elements are included.',
    signature: `function focusableChildren(el: Element, filterByTabIndex?: boolean): Array<HTMLElement>`,
    params: [
        {
            name: 'el',
            type: 'Element',
            required: true,
            descriptionKey: 'utils.detail.focusable_children.param_el',
            descriptionFallback: 'The container element to query.',
        },
        {
            name: 'filterByTabIndex',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            descriptionKey: 'utils.detail.focusable_children.param_filter_by_tab_index',
            descriptionFallback: 'When true (default) elements with tabindex="-1" are excluded. Pass false to include all focusable elements regardless of tab order.',
        },
    ],
    returns: {
        type: 'Array<HTMLElement>',
        descriptionKey: 'utils.detail.focusable_children.returns',
        descriptionFallback: 'Ordered array of focusable HTMLElements inside the container.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.focusable_children.example_basic',
            titleFallback: 'List all tab-reachable children',
            code: `import { focusableChildren } from 'origam'

const dialog = document.querySelector('#my-dialog')!
const tabbable = focusableChildren(dialog)
console.log(tabbable.length) // number of tab stops inside the dialog`,
            lang: 'typescript',
        },
    ],
    related: ['focus-child', 'focus-ripple-hide'],
}
