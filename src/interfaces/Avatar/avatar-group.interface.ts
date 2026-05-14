import type {
    IActiveProps,
    IAvatarProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDirectionProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISizeProps,
    ITagProps
} from "../../interfaces"

export interface IAvatarGroupProps extends ICommonsComponentProps, IDirectionProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IHoverProps, IActiveProps {
    items?: Array<IAvatarProps>
    max?: number
    expandOnHover?: boolean
    expandOnClick?: boolean
}
