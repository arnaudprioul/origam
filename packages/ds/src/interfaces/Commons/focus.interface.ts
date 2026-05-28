export interface IFocusProps {
    focused?: boolean
}

/** Emit signature for components that propagate focus state changes. */
export interface IFocusEmits {
    (e: 'update:focused', event: any): void
}
