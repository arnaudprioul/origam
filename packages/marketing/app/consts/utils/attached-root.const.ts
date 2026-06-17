import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ATTACHED_ROOT_UTIL_DOC: IUtilDoc = {
    slug: 'attached-root',
    name: 'attachedRoot',
    category: 'Commons',
    icon: 'mdi-family-tree',
    descriptionKey: 'utils.catalog.attached_root.description',
    descriptionFallback: 'Return the root node (HTMLDocument or ShadowRoot) of a DOM node if it is attached to the live document, or null if it is detached. Shadow DOM aware.',
    signature: 'function attachedRoot(node: Node): null | HTMLDocument | ShadowRoot',
    params: [
        {
            name: 'node',
            type: 'Node',
            required: true,
            descriptionKey: 'utils.detail.attached_root.param_node',
            descriptionFallback: 'The DOM node whose root to resolve. Works with element nodes, text nodes, and shadow-host descendants.',
        },
    ],
    returns: {
        type: 'null | HTMLDocument | ShadowRoot',
        descriptionKey: 'utils.detail.attached_root.returns',
        descriptionFallback: 'The composed root node when the element is attached to the document, or null when it is detached or outside the live tree.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/dom.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.attached_root.example_basic',
            titleFallback: 'Check if an element is in the document',
            code: `import { attachedRoot } from 'origam'

const el = document.querySelector('.my-widget')!
const root = attachedRoot(el)
// root instanceof HTMLDocument → element is attached
// root === null               → element is detached`,
            lang: 'typescript',
        },
    ],
    related: ['bind-props'],
}
