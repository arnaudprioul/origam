import type {
    IActiveEmits,
    IBorderProps,
    IBtnProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IGroupProps,
    IHoverEmits,
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

/** Emits fired by `<OrigamBottomNav>` — active item v-model + hover/active
 *  propagation. */
export interface IBottomNavEmits extends ICommonsComponentEmits, IActiveEmits, IHoverEmits {}
