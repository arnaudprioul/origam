import type { CSSProperties, Ref } from 'vue'

export interface ISticky {
    rootEl: Ref<HTMLElement | undefined>
    isSticky: Ref<boolean>
    layoutItemStyles: Ref<CSSProperties>
}
