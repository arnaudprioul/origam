import type { DirectiveBinding } from 'vue'

export interface IRippleProps {
    ripple?: boolean | { class: string }
}

export interface IRippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
    value?: boolean | { class: string }
    modifiers: {
        center?: boolean
        circle?: boolean
        stop?: boolean
    }
}

export interface IRippleOptions {
    class?: string
    center?: boolean
    circle?: boolean
}

export interface IRippleHtmlElement extends HTMLElement {
    _ripple?: IRippleHtmlElementRipple
}

export interface IRippleHtmlElementRipple {
    enabled?: boolean
    centered?: boolean
    circle?: boolean
    class?: string
    touched?: boolean
    isTouch?: boolean
    showTimer?: number
    showTimerCommit?: null | (() => void)
}

export interface IRippleElement extends Element {
    dataset?: IRippleElementDataset
}

export interface IRippleElementDataset {
    isHiding?: string
    activated?: string
}
