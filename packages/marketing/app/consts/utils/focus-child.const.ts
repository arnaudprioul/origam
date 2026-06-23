import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FOCUS_CHILD_UTIL_DOC: IUtilDoc = {
    slug: 'focus-child',
    name: 'focusChild',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.focus_child.description',
    descriptionFallback: 'Focus the first, last, next, or previous focusable descendant inside an element. When no location is given it focuses the first child unless focus already lives inside the element.',
    signature: `function focusChild(el: Element, location?: TFocusLocation): void`,
    params: [
        {
            name: 'el',
            type: 'Element',
            required: true,
            descriptionKey: 'utils.detail.focus_child.param_el',
            descriptionFallback: 'The container element to search for focusable descendants.',
        },
        {
            name: 'location',
            type: 'TFocusLocation',
            required: false,
            descriptionKey: 'utils.detail.focus_child.param_location',
            descriptionFallback: "Optional direction: 'first' | 'last' | 'next' | 'prev' | number (index). When omitted, focuses the first child unless focus already lives inside the element.",
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.focus_child.returns',
        descriptionFallback: 'No return value — the side effect is a focus move.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.focus_child.example_basic',
            titleFallback: 'Focus first focusable child on mount',
            code: `import { focusChild } from 'origam'
import { onMounted, ref } from 'vue'

const panel = ref<HTMLElement>()
onMounted(() => focusChild(panel.value!, 'first'))`,
            lang: 'typescript',
        },
    ],
    related: ['focusable-children', 'focus-ripple-hide'],
}
