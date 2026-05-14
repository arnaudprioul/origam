import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IMarginProps,
    INestedProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TLines, TSelectItemKey } from '../../types'

import { deepEqual } from '../../utils'

export interface IListProps extends ITagProps, ICommonsComponentProps, IElevationProps, IBorderProps, IDensityProps, IRoundedProps, IDimensionProps, INestedProps, IItemProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps {
    activeClass?: string
    disabled?: boolean
    expandIcon?: string
    collapseIcon?: string
    lines?: TLines
    slim?: boolean
    nav?: boolean
    itemType?: string
}

export interface IItemProps {
    items?: Array<any>
    itemTitle?: TSelectItemKey
    itemValue?: TSelectItemKey
    itemChildren?: TSelectItemKey
    itemProps?: TSelectItemKey
    returnObject?: boolean
    valueComparator?: typeof deepEqual
}
