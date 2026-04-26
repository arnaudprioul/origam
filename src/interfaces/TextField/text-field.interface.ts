import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldEmits,
    IFieldProps,
    IFieldSlots,
    IInputEmits,
    IInputProps,
    IInputSlots,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from '../../interfaces'

import type { TTextFieldType } from '../../types'

export interface ITextFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    role?: string
    type?: TTextFieldType
    modelModifiers?: string | boolean
}

/**
 * Aggregate emits for `<OrigamTextField>` — re-exports field/input lifecycle
 * events plus the click events on the control surface.
 */
export interface ITextFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'click:control', value: MouseEvent): void
    (e: 'mousedown:control', value: MouseEvent): void
}

/**
 * Slot signatures for `<OrigamTextField>`. Extends field and input slots with
 * the counter slot and the optional field override slot.
 */
export interface ITextFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}
