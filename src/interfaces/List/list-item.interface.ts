import type {
    IActiveProps,
    IAdjacentProps,
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IHoverProps,
    ILinkProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TLines } from '../../types'

export interface IListItemProps extends IBorderProps, ICommonsComponentProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ILinkProps, IColorProps, IBgColorProps, IRippleProps, IPaddingProps, IMarginProps, IAdjacentProps, IActiveProps, IHoverProps {
    active?: boolean
    activeClass?: string
    disabled?: boolean
    lines?: TLines
    link?: boolean
    nav?: boolean
    slim?: boolean
    subtitle?: string | number
    title?: string | number
    value?: any
}
