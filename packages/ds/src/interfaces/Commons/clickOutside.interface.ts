import type { DirectiveBinding } from 'vue'

export interface IClickOutsideDirectiveBinding extends DirectiveBinding {
    value: ((e: MouseEvent) => void) | IClickOutsideBindingArgs
}

export interface IClickOutsideBindingArgs {
    handler: (e: MouseEvent) => void
    closeConditional?: (e: Event) => boolean
    include?: () => Array<HTMLElement>
}

/** `click:outside` emit — fires when a pointer down event lands outside
 *  the component's root (Dialog, Drawer, Sheet, …). */
export interface IClickOutsideEmits {
    (e: 'click:outside', event: MouseEvent): void
}
