import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IExpansionPanelProps,
    IGroupProps,
    ILazyProps,
    ILoaderProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IExpansionPanelsProps extends IColorProps, IBgColorProps, ITagProps, ICommonsComponentProps, IGroupProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps, IElevationProps {
    flat?: boolean
    items?: Array<IExpansionPanelProps>
    accordion?: boolean
    popout?: boolean
    inset?: boolean
    expandIcon?: TIcon
    collapseIcon?: TIcon
    hideActions?: boolean
}
