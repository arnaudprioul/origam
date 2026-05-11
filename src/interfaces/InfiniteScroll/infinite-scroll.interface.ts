import type { IBgColorProps,
    IColorProps, ICommonsComponentProps, IDimensionProps, IDirectionProps, ITagProps } from '../../interfaces'

import type { TInfiniteScrollMode, TInfiniteScrollSide } from '../../types'

export interface IInfiniteScrollProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IDimensionProps, ITagProps, IDirectionProps {
    side?: TInfiniteScrollSide
    mode?: TInfiniteScrollMode
    loadMoreText?: string
    emptyText?: string
    margin?: string
}

export interface IInfiniteScrollIntersectProps extends ICommonsComponentProps {
    side?: TInfiniteScrollSide
    rootRef: HTMLElement
    margin?: string
}
