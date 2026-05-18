import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    IDirectionProps,
    IElevationProps,
    IRippleProps,
    IRoundedProps,
    ISizeProps
} from '../../interfaces'

import type { TAlways } from '../../types'

export interface ISliderFieldThumbProps extends ICommonsComponentProps, IColorProps, ISizeProps, IRippleProps, IElevationProps, IRoundedProps, IBorderProps, IDirectionProps {
    label?: TAlways
    min?: number
    max?: number
    focused?: boolean
    modelValue?: number
    position?: number
    readonly?: boolean
    disabled?: boolean
}

/** Emits fired by `<OrigamSliderFieldThumb>` — v-model on the thumb position. */
export interface ISliderFieldThumbEmits extends ICommonsComponentEmits {}
