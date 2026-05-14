import type {
    IBgColorProps,
    IColorProps,
    IIntersectionObserverInit,
    ILazyProps,
    IResponsiveProps,
    ITransitionComponentProps
} from '../../interfaces'

import type { TCrossOrigin, TReferrerPolicy } from '../../types'

export interface IImgProps extends IColorProps, IBgColorProps, IResponsiveProps, ITransitionComponentProps, ILazyProps {
    alt?: string
    cover?: boolean,
    draggable?: boolean
    gradient?: string
    lazySrc?: string
    options?: IIntersectionObserverInit
    sizes?: string
    src?: string | ISrcObject
    crossorigin?: TCrossOrigin
    referrerpolicy?: TReferrerPolicy
    srcset?: string
    position?: string
}

export interface ISrcObject {
    src?: string
    srcset?: string
    lazySrc?: string
    aspectRatio: number
    alt?: string
}

