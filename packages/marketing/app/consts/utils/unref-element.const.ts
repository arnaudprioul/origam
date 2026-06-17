import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const UNREF_ELEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'unref-element',
    name: 'unrefElement',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.unref_element.description',
    descriptionFallback: 'Unwrap a Vue template ref or getter to the underlying DOM element. Handles both component refs (reads .$el) and plain element refs.',
    signature: `function unrefElement(elRef: Ref): HTMLElement | null | undefined`,
    params: [
        {
            name: 'elRef',
            type: 'Ref | (() => unknown)',
            required: true,
            descriptionKey: 'utils.detail.unref_element.param_el_ref',
            descriptionFallback: 'A Vue ref that may point to a component instance (with .$el) or directly to an HTMLElement. Functions are called to resolve the value.',
        },
    ],
    returns: {
        type: 'HTMLElement | null | undefined',
        descriptionKey: 'utils.detail.unref_element.returns',
        descriptionFallback: 'The raw DOM node, or null/undefined when the ref has not yet been mounted.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/eventListener.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.unref_element.example_basic',
            titleFallback: 'Access the DOM node from a template ref',
            code: `import { ref, onMounted } from 'vue'
import { unrefElement } from 'origam'

const btnRef = ref(null)

onMounted(() => {
    const el = unrefElement(btnRef)
    // el → HTMLButtonElement
    el?.focus()
})`,
            lang: 'typescript',
        },
    ],
    related: ['unmount-intersect'],
}
