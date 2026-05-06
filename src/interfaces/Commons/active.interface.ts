export interface IActiveProps {
    active?: boolean
    activeClass?: string
}

/** Emit signature for components that propagate their active state. */
export interface IActiveEmits {
    (e: 'update:active', event: any): void
}
