import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CHILDREN_UTIL_DOC: IUtilDoc = {
    slug: 'get-children',
    name: 'getChildren',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_children.description',
    descriptionFallback: 'Returns the direct animatable children of a transition root element (card, sheet, or list). Used internally by overlay transition helpers.',
    signature: `function getChildren(el: Element): Element[] | undefined`,
    params: [
        {
            name: 'el',
            type: 'Element',
            required: true,
            descriptionKey: 'utils.detail.get_children.param_el',
            descriptionFallback: 'The root element to query. The function looks for a direct child matching .origam-card, .origam-sheet, or .origam-list and returns its children.',
        },
    ],
    returns: {
        type: 'Element[] | undefined',
        descriptionKey: 'utils.detail.get_children.returns',
        descriptionFallback: 'Array of children elements of the matched inner container, or undefined when no matching child is found.',
    },
    sourceFile: 'packages/ds/src/utils/Transition/transition.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_children.example_basic',
            titleFallback: 'Collecting animatable children',
            code: `import { getChildren } from 'origam'

const children = getChildren(overlayEl)
// children → [...] or undefined when no card/sheet/list inside`,
            lang: 'typescript',
        },
    ],
    related: ['get-dimensions'],
}
