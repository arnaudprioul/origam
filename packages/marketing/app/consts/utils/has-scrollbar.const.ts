import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HAS_SCROLLBAR_UTIL_DOC: IUtilDoc = {
    slug: 'has-scrollbar',
    name: 'hasScrollbar',
    category: 'Commons',
    icon: 'mdi-gesture-double-tap',
    descriptionKey: 'utils.catalog.has_scrollbar.description',
    descriptionFallback: 'Returns true when an element has a visible or auto vertical scrollbar. Checks the computed overflowY style and compares scrollHeight to clientHeight. Returns false for non-element nodes and null/undefined inputs.',
    signature: `function hasScrollbar(el?: Element | null): boolean`,
    params: [
        {
            name: 'el',
            type: 'Element | null | undefined',
            required: false,
            descriptionKey: 'utils.detail.has_scrollbar.param_el',
            descriptionFallback: 'The DOM element to inspect. Falsy values or non-ELEMENT_NODE nodes return false immediately.',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.has_scrollbar.returns',
        descriptionFallback: 'true when the element has overflow-y: scroll, or overflow-y: auto and scrollHeight > clientHeight.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.has_scrollbar.example_basic',
            titleFallback: 'Detect scroll container',
            code: `import { hasScrollbar } from 'origam'

const container = document.getElementById('list')
if (hasScrollbar(container)) {
  // apply sticky header behaviour
}`,
            lang: 'typescript',
        },
    ],
    related: ['handle-shadow', 'has'],
}
