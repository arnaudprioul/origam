import type {
    IActiveProps,
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'


export interface IToolbarProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IDensityProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IPositionProps, IDimensionProps, IActiveProps, IHoverProps {
    collapse?: boolean
    flat?: boolean
    floating?: boolean
    title?: string
    modelValue?: boolean
}
