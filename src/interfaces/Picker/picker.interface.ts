import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerTitleProps,
    IRoundedProps,
    ISheetProps
} from "../../interfaces"

export interface IPickerProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISheetProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IPickerTitleProps {
    landscape?: boolean
    hideHeader?: boolean
}
