import type {
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IFieldEmits,
    IFieldProps,
    IFieldSlots,
    IFocusProps,
    IInputEmits,
    IInputProps,
    IInputSlots,
    IRoundedProps,
    IVariantProps
} from "../../interfaces"

import type { TOtpInputFieldType } from "../../types"

export interface IOtpInputFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IDimensionProps, IFieldProps, IInputProps, IRoundedProps, IElevationProps, IVariantProps, IFocusProps {
    autofocus?: boolean
    divider?: string
    focusAll?: boolean
    length?: number | string
    modelValue?: number | string | null
    placeholder?: string
    persistentPlaceholder?: boolean
    role?: string
    type?: TOtpInputFieldType
}

export interface IOtpInputFieldEmits extends IFieldEmits, IInputEmits {
    (e: 'finish', value: string): void
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
    (e: 'click:clear', event: MouseEvent): void
}

export interface IOtpInputFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    field?: (data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean, isReadonly: boolean }) => any
}
