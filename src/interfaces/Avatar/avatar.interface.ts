import type {
    IActiveProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISizeProps,
    ISrcObject,
    IStatusProps,
    ITagProps
} from '../../interfaces'

export interface IAvatarProps extends ICommonsComponentProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IStatusProps, IElevationProps, IHoverProps, IActiveProps {
    start?: boolean,
    end?: boolean,
    image?: string | ISrcObject,
    text?: string
}
