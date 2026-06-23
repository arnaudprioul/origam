import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_TARGET_UTIL_DOC: IUtilDoc = {
    slug: 'get-target',
    name: 'getTarget',
    category: 'Commons',
    icon: 'mdi-crosshairs-gps',
    descriptionKey: 'utils.catalog.get_target.description',
    descriptionFallback: 'Resolves a CSS selector string or a Vue component instance / HTMLElement reference to the underlying HTMLElement. Returns null when no match is found in the document.',
    signature: `function getTarget(
  el: ComponentPublicInstance | HTMLElement | string | undefined
): HTMLElement | null`,
    params: [
        {
            name: 'el',
            type: 'ComponentPublicInstance | HTMLElement | string | undefined',
            required: true,
            descriptionKey: 'utils.detail.get_target.param_el',
            descriptionFallback: 'A CSS selector string, a Vue component instance, or an HTMLElement. When a string is provided, document.querySelector is used to locate the element.',
        },
    ],
    returns: {
        type: 'HTMLElement | null',
        descriptionKey: 'utils.detail.get_target.returns',
        descriptionFallback: 'The resolved HTMLElement, or null when the selector yields no result or the input is undefined.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_target.example_basic',
            titleFallback: 'Resolve by selector and by ref',
            code: `import { getTarget } from 'origam'

// CSS selector
getTarget('#my-section')  // → HTMLElement | null

// Vue component instance
const el = getTarget(myComponentRef.value)  // → HTMLElement | null`,
            lang: 'typescript',
        },
    ],
    related: ['get-target-activator', 'get-target-box'],
}
