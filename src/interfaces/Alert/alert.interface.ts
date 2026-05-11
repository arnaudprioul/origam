import type {
    IAdjacentProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IHoverProps,
    ILocationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRoundedProps,
    IStatusProps,
    ITagProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IAlertProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IBorderProps, IDimensionProps, IPaddingProps, IMarginProps, IDensityProps, IElevationProps, ILocationProps, IPositionProps, IRoundedProps, IStatusProps, IHoverProps, IAdjacentProps {
    closable?: boolean
    closeIcon?: TIcon
    closeLabel?: string
    modelValue?: boolean
    prominent?: boolean
    title?: string
    text?: string
}
