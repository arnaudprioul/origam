import type {
    IActiveProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IHoverProps,
    IInputProps,
    ILoaderProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISelectionControlProps,
    ITagProps
} from '../../interfaces'

export interface ISwitchProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IInputProps, ISelectionControlProps, ILoaderProps, IColorProps, IDensityProps, IElevationProps, IActiveProps, IHoverProps {
    indeterminate?: boolean
    inset?: boolean
    flat?: boolean
}
