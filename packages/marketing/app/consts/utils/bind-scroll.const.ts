import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BIND_SCROLL_UTIL_DOC: IUtilDoc = {
    slug: 'bind-scroll',
    name: 'bindScroll',
    category: 'Commons',
    icon: 'mdi-gesture-swipe-vertical',
    descriptionKey: 'utils.catalog.bind_scroll.description',
    descriptionFallback: 'Attach a passive scroll listener to the document and all scroll parents of an element. Automatically removes all listeners on Vue scope disposal via onScopeDispose.',
    signature: 'function bindScroll(el: HTMLElement | undefined, onScroll: (e: Event) => void): void',
    params: [
        {
            name: 'el',
            type: 'HTMLElement | undefined',
            required: true,
            descriptionKey: 'utils.detail.bind_scroll.param_el',
            descriptionFallback: 'The reference element whose scroll parents are collected. Pass undefined to bind only the document.',
        },
        {
            name: 'onScroll',
            type: '(e: Event) => void',
            required: true,
            descriptionKey: 'utils.detail.bind_scroll.param_on_scroll',
            descriptionFallback: 'Callback invoked on every scroll event from any of the collected elements.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.bind_scroll.returns',
        descriptionFallback: 'No return value. Cleanup is automatic via onScopeDispose when called inside a Vue effect scope.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/scroll.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.bind_scroll.example_basic',
            titleFallback: 'Track scroll position in a composable',
            code: `import { bindScroll } from 'origam'
import { effectScope, ref } from 'vue'

const scrollY = ref(0)
const scope = effectScope()

scope.run(() => {
    bindScroll(document.querySelector('.panel') as HTMLElement, (e) => {
        scrollY.value = (e.target as HTMLElement).scrollTop
    })
})

// Cleanup is handled by scope.stop()
scope.stop()`,
            lang: 'typescript',
        },
    ],
    related: ['add-window-listener', 'block-scroll-strategy'],
}
