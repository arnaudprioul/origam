import type {
    IAlignProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IJustifyProps,
    IMarginProps,
    IPaddingProps,
    ITagProps
} from '../../interfaces'

import type { TFlexDirection } from '../../types'

export interface IRowProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IColorProps, IDensityProps, IAlignProps, IJustifyProps {
    gutters?: string | number
    direction?: TFlexDirection
}
