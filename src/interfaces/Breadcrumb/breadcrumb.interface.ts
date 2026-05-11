import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TBreadcrumbItem, TIcon } from '../../types'

export interface IBreadcrumbProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps {
    activeClass?: string
    disabled?: boolean
    divider?: string | TIcon
    items?: Array<TBreadcrumbItem>
}
