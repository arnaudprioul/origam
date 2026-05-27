import type { DeepReadonly, Ref } from 'vue'

export interface IResizeState {
    resizeRef: Ref<HTMLElement | null | undefined>
    contentRect: DeepReadonly<Ref<DOMRectReadOnly | undefined>>
}
