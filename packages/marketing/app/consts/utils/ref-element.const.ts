import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const REF_ELEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'ref-element',
    name: 'refElement',
    category: 'Commons',
    icon: 'mdi-code-tags',
    descriptionKey: 'utils.catalog.ref_element.description',
    descriptionFallback: 'Extract the underlying HTMLElement from a Vue component instance or a raw HTMLElement ref. Handles multi-root components by following the first element sibling of a text node.',
    signature: `function refElement(obj?: ComponentPublicInstance<any> | HTMLElement): HTMLElement | undefined`,
    params: [
        {
            name: 'obj',
            type: 'ComponentPublicInstance<any> | HTMLElement | undefined',
            required: false,
            descriptionKey: 'utils.detail.ref_element.param_obj',
            descriptionFallback: 'A Vue component instance (has $el), a raw HTMLElement, or undefined. Returns undefined when the argument is absent or the element cannot be resolved.',
        },
    ],
    returns: {
        type: 'HTMLElement | undefined',
        descriptionKey: 'utils.detail.ref_element.returns',
        descriptionFallback: 'The resolved HTMLElement, or undefined when the argument is undefined or resolves to a non-element node.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ref_element.example_basic',
            titleFallback: 'Resolve an element from a component ref',
            code: `import { refElement } from 'origam'
import { ref } from 'vue'

const btnRef = ref<InstanceType<typeof OrigamBtn>>()

// Inside onMounted:
const el = refElement(btnRef.value)
// → the root <button> HTMLElement`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-unref', 'get-scroll-parent', 'attached-root'],
}
