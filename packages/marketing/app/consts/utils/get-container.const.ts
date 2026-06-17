import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CONTAINER_UTIL_DOC: IUtilDoc = {
    slug: 'get-container',
    name: 'getContainer',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_container.description',
    descriptionFallback: 'Resolves the scroll container element from a CSS selector string, a Vue component instance, or an HTMLElement. Falls back to document.scrollingElement or document.body when the argument is omitted or resolves to null.',
    signature: `function getContainer(el?: ComponentPublicInstance | HTMLElement | string): HTMLElement`,
    params: [
        {
            name: 'el',
            type: 'ComponentPublicInstance | HTMLElement | string',
            required: false,
            descriptionKey: 'utils.detail.get_container.param_el',
            descriptionFallback: 'Target descriptor. A string is used as a CSS query selector; a Vue instance unwraps to its root element; an HTMLElement is used directly. Omit to get the document scroll root.',
        },
    ],
    returns: {
        type: 'HTMLElement',
        descriptionKey: 'utils.detail.get_container.returns',
        descriptionFallback: 'The resolved HTMLElement to use as a scroll container. Never null — falls back to document.scrollingElement or document.body.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_container.example_basic',
            titleFallback: 'Resolve a container from different input types',
            code: `import { getContainer } from 'origam'

// From a CSS selector
const container = getContainer('#main-scroll')

// From an HTMLElement
const container2 = getContainer(document.getElementById('sidebar'))

// Default → document scroll root
const container3 = getContainer()`,
            lang: 'typescript',
        },
    ],
    related: ['get-client-height', 'get-client-width'],
}
