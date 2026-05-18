import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IInputProps,
    ILabelProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps,
    ITagProps
} from '../../interfaces'

import type { TBlock, TIcon } from '../../types'

export interface IRatingFieldProps extends ICommonsComponentProps, IRippleProps, IDensityProps, IPaddingProps, IBorderProps, IMarginProps, IRoundedProps, IElevationProps, IColorProps, ISizeProps, ITagProps, IInputProps, ILabelProps {
    name?: string
    itemAriaLabel?: string
    clearable?: boolean
    disabled?: boolean
    emptyIcon?: TIcon
    fullIcon?: TIcon
    halfIncrements?: boolean
    hover?: boolean
    length?: number | string
    readonly?: boolean
    modelValue?: number | string
    itemLabels?: Array<string>
    itemLabelPosition?: TBlock
}

/** Emits fired by `<OrigamRatingField>` — v-model on the rating value. */
export interface IRatingFieldEmits extends ICommonsComponentEmits {}
