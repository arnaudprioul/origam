import type { TIcon } from '../../types'

export interface IAdjacentProps {
    appendAvatar?: string
    appendIcon?: TIcon
    prependAvatar?: string
    prependIcon?: TIcon
}

export interface IAdjacentInnerProps {
    appendInnerAvatar?: string
    appendInnerIcon?: TIcon
    prependInnerAvatar?: string
    prependInnerIcon?: TIcon
    clearIcon?: TIcon
    clearable?: boolean
}

/** Click events emitted when the user clicks the prepend/append slots. */
export interface IAdjacentEmits {
    (e: 'click:append', event: MouseEvent): void
    (e: 'click:prepend', event: MouseEvent): void
}

/** Slot signatures for adjacent prepend/append content. */
export interface IAdjacentSlots {
    prepend?: () => any
    append?: () => any
}
