import type {
    IBorderProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IGroupProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISlideGroupProps,
    ITagProps
} from '../../interfaces'

import type { TColor } from '../../types'

export interface IChipGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps, IColorProps, IBgColorProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, ISlideGroupProps {
    column?: boolean
    filter?: boolean
    valueComparator?: (a: any, b: any) => boolean
    /** @deprecated Use the `active` object prop instead. Kept for back-compat. */
    activeColor?: TColor
    /** @deprecated Use the `active` object prop instead. Kept for back-compat. */
    activeBgColor?: TColor
    /** @deprecated Use the `hover` object prop instead. Kept for back-compat. */
    hoverColor?: TColor
    /** @deprecated Use the `hover` object prop instead. Kept for back-compat. */
    hoverBgColor?: TColor
}

/** Emits fired by `<OrigamChipGroup>` — v-model on the active chip set. */
export interface IChipGroupEmits extends ICommonsComponentEmits {}
