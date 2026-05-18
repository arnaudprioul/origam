import type { IColorProps, ICommonsComponentEmits, ICommonsComponentProps, IDimensionProps, ITagProps, IWindowProps } from '../../interfaces'
import type { TIcon, TInline } from '../../types'

export interface ICarouselProps extends IWindowProps, IColorProps, ICommonsComponentProps, ITagProps, IDimensionProps {
    cycle?: boolean
    delimiterIcon?: TIcon
    hideDelimiters?: boolean
    hideDelimiterBackground?: boolean
    interval?: number | string
    progress?: boolean
    verticalDelimiters?: boolean | TInline
}

/** Emits fired by `<OrigamCarousel>` — v-model on the active slide index. */
export interface ICarouselEmits extends ICommonsComponentEmits {}
