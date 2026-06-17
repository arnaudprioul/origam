import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HANDLE_SHADOW_UTIL_DOC: IUtilDoc = {
    slug: 'handle-shadow',
    name: 'handleShadow',
    category: 'Commons',
    icon: 'mdi-layers',
    descriptionKey: 'utils.catalog.handle_shadow.description',
    descriptionFallback: 'Invokes a callback on the document root and additionally on the element\'s Shadow Root when the element is inside a Shadow DOM. Used by click-outside and similar directives to register / unregister listeners across the shadow boundary.',
    signature: `function handleShadow(
  el: HTMLElement,
  callback: (root: Document | ShadowRoot) => void
): void`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.handle_shadow.param_el',
            descriptionFallback: 'The element whose root is inspected. If it lives inside a ShadowRoot the callback is invoked twice: once for the global document and once for the shadow root.',
        },
        {
            name: 'callback',
            type: '(root: Document | ShadowRoot) => void',
            required: true,
            descriptionKey: 'utils.detail.handle_shadow.param_callback',
            descriptionFallback: 'The action to run on each applicable root. Typically adds or removes an event listener.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.handle_shadow.returns',
        descriptionFallback: 'Nothing. Purely side-effectful.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/clickOutside.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.handle_shadow.example_basic',
            titleFallback: 'Register a click-outside listener across the shadow boundary',
            code: `import { handleShadow } from 'origam'

handleShadow(el, (root) => {
  root.addEventListener('pointerdown', onPointerDown, true)
})`,
            lang: 'typescript',
        },
    ],
    related: ['has-scrollbar', 'has-event'],
}
