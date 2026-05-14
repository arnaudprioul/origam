import type {
    IAdjacentInnerProps,
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

export interface ITextareaFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IAdjacentInnerProps {
    autoGrow?: boolean
    autofocus?: boolean
    counter?: boolean | number | string
    counterValue?: number | ((e: any) => number)
    persistentClear?: boolean
    prefix?: string
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    noResize?: boolean
    rows?: number | string
    maxRows?: number | string
    suffix?: string
    modelModifiers?: string | boolean
}

/**
 * Aggregate emits for `<OrigamTextareaField>` — re-exports field/input events
 * plus the height update event (auto-grow) and control click events.
 */
export interface ITextareaFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'update:height', height: number): void
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
}

/**
 * Slot signatures for `<OrigamTextareaField>`. Extends field and input slots
 * with the counter slot and the optional field override slot.
 */
export interface ITextareaFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    counter?: (data: { counter: string, max?: string | number, value: string | number }) => any
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}
