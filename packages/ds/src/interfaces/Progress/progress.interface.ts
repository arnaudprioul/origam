import type {
    IColorProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    IProgressCircularProps,
    IProgressLinearProps,
    ITagProps
} from '../../interfaces'

import type { TProgressType } from '../../types'

export interface IProgressProps extends IProgressLinearProps, IProgressCircularProps {
    type?: TProgressType
}

export interface IProgressTypeProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps {
    indeterminate?: boolean
    modelValue?: string | number
    thickness?: string | number
    active?: boolean
    absolute?: boolean
    max?: number | string
    striped?: boolean
}
