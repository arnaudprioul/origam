import type {
    IAdjacentEmits,
    IAdjacentProps,
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IElevationProps,
    IGroupEmits,
    IGroupItemProps,
    IHoverProps,
    ILinkProps,
    ILoaderProps,
    ILocationProps,
    IMarginProps,
    IPaddingProps,
    IPositionProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps,
    IStatusProps,
    ITagProps,
    IVariantProps
} from '../../interfaces'

import type { TIcon } from '../../types'

export interface IBtnProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IBorderProps, IDensityProps, IDimensionProps, IElevationProps, IRoundedProps, ITagProps, ISizeProps, ILinkProps, IRippleProps, ILoaderProps, IPositionProps, ILocationProps, IGroupItemProps, IPaddingProps, IMarginProps, IAdjacentProps, IStatusProps, IHoverProps, IVariantProps {
    active?: boolean
    /** @deprecated Use `variant="flat"` instead. Kept for backward compat. */
    flat?: boolean,
    icon?: boolean | TIcon
    block?: boolean
    slim?: boolean
    stacked?: boolean
    text?: string
}

/** Emits fired by `<OrigamBtn>` — clicks on prepend/append slots and
 *  group-membership lifecycle. */
export interface IBtnEmits extends IAdjacentEmits, IGroupEmits {}
