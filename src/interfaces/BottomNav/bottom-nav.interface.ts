import type {
    IBorderProps,
    IBtnProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IGroupProps,
    IHoverProps,
    ILayoutItemProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps,
    ITransitionComponentProps
} from '../../interfaces'

import type { TMode } from '../../types'

export interface IBottomNavProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IPaddingProps, IBorderProps, IElevationProps, IMarginProps, IDimensionProps, IDensityProps, IRoundedProps, ILayoutItemProps, IGroupProps, IHoverProps, ITransitionComponentProps {
    grow?: boolean
    mode?: TMode
    items?: Array<IBtnProps>
}
