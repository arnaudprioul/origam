import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_NEXT_ELEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'get-next-element',
    name: 'getNextElement',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_next_element.description',
    descriptionFallback: 'Finds the next or previous focusable HTML element in a flat list relative to the currently focused element, with an optional visibility/condition filter.',
    signature: `function getNextElement(elements: Array<HTMLElement>, location?: 'next' | 'prev', condition?: (el: HTMLElement) => boolean): HTMLElement | undefined`,
    params: [
        {
            name: 'elements',
            type: 'Array<HTMLElement>',
            required: true,
            descriptionKey: 'utils.detail.get_next_element.param_elements',
            descriptionFallback: 'The flat array of elements to traverse (e.g. all focusable children in a list).',
        },
        {
            name: 'location',
            type: "'next' | 'prev'",
            required: false,
            descriptionKey: 'utils.detail.get_next_element.param_location',
            descriptionFallback: "Direction of traversal. 'next' moves forward; 'prev' moves backward. Defaults to 'prev'.",
        },
        {
            name: 'condition',
            type: '(el: HTMLElement) => boolean',
            required: false,
            descriptionKey: 'utils.detail.get_next_element.param_condition',
            descriptionFallback: 'Optional guard predicate. An element that returns false is skipped. Elements with offsetParent === null (hidden) are always skipped.',
        },
    ],
    returns: {
        type: 'HTMLElement | undefined',
        descriptionKey: 'utils.detail.get_next_element.returns',
        descriptionFallback: 'The next matching element, or undefined when the boundary of the list is reached.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_next_element.example_basic',
            titleFallback: 'Keyboard navigation in a list',
            code: `import { getNextElement } from 'origam'

const items = Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'))

// Move to the next visible item on ArrowDown
const next = getNextElement(items, 'next')
next?.focus()`,
            lang: 'typescript',
        },
    ],
    related: ['get-nested-value', 'get-scroll-parent'],
}
