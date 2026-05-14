import type {
    IActiveProps,
    IAdjacentProps,
    IBgColorProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IListGroupProps extends ITagProps, ICommonsComponentProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IAdjacentProps, IActiveProps, IHoverProps {
    collapseIcon?: TIcon
    expandIcon?: TIcon
    fluid?: boolean
    title?: string
    value?: any
}

export interface IListActivatorProps extends ICommonsComponentProps, ITagProps {

}
