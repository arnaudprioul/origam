import type {
    IBorderProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface ITableProps extends ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IHoverProps, IDimensionProps, IDensityProps, ITagProps {
    fixedHeader?: boolean
    fixedFooter?: boolean
    caption?: string
    captionVisible?: boolean
    ariaRowcount?: number
}
