import type {
    IAdjacentInnerProps,
    IAdjacentProps,
    IBorderProps,
    IChipProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldProps,
    IInputProps,
    IMarginProps,
    IMenuProps,
    IPaddingProps,
    IRoundedProps,
    ITextFieldProps,
    ITransitionComponentProps
} from "../../interfaces"

export interface IDatePickerFieldProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, ITransitionComponentProps {
    menu?: boolean,
    menuProps?: IMenuProps,
    range?: boolean
    multiple?: boolean
    openOnClear?: boolean
    closeText?: string
    openText?: string
    closeOnSelect?: boolean
    chipProps?: IChipProps
    closableChips?: boolean
}
