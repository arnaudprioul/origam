import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RESIZE_STATE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-resize-state',
    name: 'IResizeState',
    category: 'Utilities & Internals',
    descriptionKey: 'interfaces.catalog.i_resize_state.description',
    descriptionFallback: 'Return shape of the `useResizeObserver` composable — a ref to the observed element and a deep-readonly ref to its most recent `DOMRectReadOnly` measurements.',
    definition: `export interface IResizeState {
    resizeRef: Ref<HTMLElement | null | undefined>
    contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}`,
    extends: [],
    props: [
        { name: 'resizeRef', type: 'Ref<HTMLElement | null | undefined>', optional: false, descriptionFallback: 'Attach this ref to the element you want to observe. The ResizeObserver starts watching as soon as the ref is populated and stops when it becomes null/undefined.' },
        { name: 'contentRect', type: 'DeepReadonly<Ref<DOMRectReadOnly | undefined>>', optional: false, descriptionFallback: 'Reactive snapshot of the last measured DOMRectReadOnly. Undefined before the first measurement or when the element is detached. Deep-readonly to prevent accidental mutation.' },
    ],
    usedBy: [
        { slug: 'use-resize-observer', name: 'useResizeObserver', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/resizeObserver.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_resize_state.example',
            titleFallback: 'Reading dimensions from useResizeObserver',
            code: `import { useResizeObserver } from 'origam'
import type { IResizeState } from 'origam'

const { resizeRef, contentRect }: IResizeState = useResizeObserver()

// Attach: <div :ref="resizeRef">
watchEffect(() => {
    console.log(contentRect.value?.width)
})`,
            lang: 'typescript',
        },
    ],
}
