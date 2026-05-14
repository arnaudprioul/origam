import type {
    IActiveProps,
    IAdjacentProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IHoverProps,
    ILinkProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IBreadcrumbItemProps extends ICommonsComponentProps, ITagProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, ILinkProps, IColorProps, IBgColorProps, IDensityProps, IAdjacentProps, IHoverProps, IActiveProps {
    title: string
    disabled?: boolean
}
