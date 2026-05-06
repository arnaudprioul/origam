import type {
    IAdjacentInnerProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldEmits,
    IFieldSlots,
    IInputEmits,
    IInputSlots,
    IMenuProps,
    IRoundedProps,
    ITextFieldProps
} from '../../interfaces'

import type { TIcon } from '../../types'

/**
 * Props for `<OrigamPasswordField>` — a TextField specialised for password
 * entry, with three add-ons over a plain TextField:
 *
 *   1. Show/hide toggle on the appendInner icon (`onIcon` / `offIcon`).
 *   2. Optional strength-requirements popup (`requirements` + a set of
 *      `need*` flags + `minLength`). When enabled, a menu opens on focus
 *      and shows a checkmark per met requirement.
 *   3. Each enabled requirement is auto-injected as a validation rule —
 *      consumers don't have to repeat the regex in their `rules` prop.
 *
 * Extends `ITextFieldProps` so anything you can pass to TextField
 * (counter, placeholder, persistentPlaceholder, etc.) flows through.
 */
export interface IPasswordFieldProps extends ICommonsComponentProps,
    IColorProps, IDensityProps, ITextFieldProps,
    IRoundedProps, IElevationProps, IAdjacentInnerProps {
    /** Icon shown when the password is HIDDEN (toggle reveals). */
    onIcon?: TIcon
    /** Icon shown when the password is VISIBLE (toggle hides). */
    offIcon?: TIcon
    /** Native maxlength attribute mirrored into the requirements popup. */
    maxlength?: number
    /**
     * Master switch for the strength-requirements popup. When false, the
     * field behaves exactly like a TextField with type="password".
     */
    requirements?: boolean
    /**
     * Keep the requirements popup open even when the field is not focused.
     * Useful for forms that want the requirements always visible.
     */
    persistentRequirements?: boolean
    /** Minimum password length (default 8) — drives the `minLength` rule. */
    minLength?: number
    /** Require at least one lowercase letter. */
    needTiny?: boolean
    /** Require at least one uppercase letter. */
    needUppercase?: boolean
    /** Require at least one digit. */
    needNumber?: boolean
    /** Require at least one non-alphanumeric character. */
    needSpecial?: boolean
    /** Forwarded to the internal `<OrigamMenu>` (location, delays, etc.). */
    menuProps?: IMenuProps
    /** Reserved — toggle the requirements menu programmatically. */
    menu?: boolean
}

export interface IPasswordFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
}

export interface IPasswordFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    /** Renders the strength-requirements popup body (overrides default tile grid). */
    info?: (data: { [key: string]: any }) => any
    /** Renders the counter inside the details slot. */
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    /** Renders the field control (replaces the default `<input>`). */
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}
