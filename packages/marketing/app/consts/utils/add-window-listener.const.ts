import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ADD_WINDOW_LISTENER_UTIL_DOC: IUtilDoc = {
    slug: 'add-window-listener',
    name: 'addWindowListener',
    category: 'Commons',
    icon: 'mdi-ear-hearing',
    descriptionKey: 'utils.catalog.add_window_listener.description',
    descriptionFallback: 'Register an event listener on window and push its cleanup function into an array collected on unmount. Returns a standalone remove callback for manual teardown.',
    signature: `function addWindowListener(
  event: string,
  listener: EventListenerOrEventListenerObject,
  onUnmountedCleanupFns?: any[]
): () => void`,
    params: [
        {
            name: 'event',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.add_window_listener.param_event',
            descriptionFallback: 'The DOM event type to listen for, e.g. "resize" or "scroll".',
        },
        {
            name: 'listener',
            type: 'EventListenerOrEventListenerObject',
            required: true,
            descriptionKey: 'utils.detail.add_window_listener.param_listener',
            descriptionFallback: 'The event handler callback or object with a handleEvent method.',
        },
        {
            name: 'onUnmountedCleanupFns',
            type: 'any[]',
            required: false,
            defaultValue: '[]',
            descriptionKey: 'utils.detail.add_window_listener.param_cleanup_fns',
            descriptionFallback: 'Optional array that collects cleanup functions automatically called when the component unmounts.',
        },
    ],
    returns: {
        type: '() => void',
        descriptionKey: 'utils.detail.add_window_listener.returns',
        descriptionFallback: 'A function that removes the listener from window and splices its entry out of onUnmountedCleanupFns.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.add_window_listener.example_basic',
            titleFallback: 'Listen to resize with automatic cleanup',
            code: `import { addWindowListener } from 'origam'
import { onUnmounted } from 'vue'

const cleanupFns: Array<() => void> = []
const remove = addWindowListener('resize', () => console.log('resized'), cleanupFns)

// manual teardown
remove()

// or auto-teardown via onUnmounted
onUnmounted(() => cleanupFns.forEach(fn => fn()))`,
            lang: 'typescript',
        },
    ],
    related: ['bind-scroll'],
}
