import type {
    IBorderProps,
    ICheckboxBtnProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFocusEmits,
    IInputProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISelectionControlEmits
} from '../../interfaces'
import type { TColor, TIcon } from '../../types'

export interface ICheckboxProps extends ICommonsComponentProps, IInputProps, ICheckboxBtnProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBorderProps, IElevationProps {

}

export interface ICheckboxEmits extends ICommonsComponentEmits, IFocusEmits, ISelectionControlEmits {

}

export interface ICheckboxSlots {
    default?: (data: { id: string, messagesId: string, isDisabled: boolean, isReadonly: boolean, isValid: boolean }) => any
    label?: () => any
    input?: (data: { props: any, icon: TIcon, textColorStyles: TColor, backgroundColorStyles: TColor, model: any }) => any
}
