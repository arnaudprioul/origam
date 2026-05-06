import type { IColorProps, ICommonsComponentProps, IDensityProps, ISizeProps } from '../../interfaces'
import type { TIcon, TIntent } from '../../types'

export interface ITimelineEntry {
    title: string
    subtitle?: string
    description?: string
    icon?: TIcon
    intent?: TIntent
}

export interface ITimelineProps extends ICommonsComponentProps, IColorProps, ISizeProps, IDensityProps {
    items?: ITimelineEntry[]
    side?: 'start' | 'end' | 'alternating'
    truncateLine?: boolean
}

export interface ITimelineItemProps extends ICommonsComponentProps, IColorProps {
    title?: string
    subtitle?: string
    icon?: TIcon
    intent?: TIntent
    isLast?: boolean
    truncateLine?: boolean
    side?: 'start' | 'end' | 'alternating'
    index?: number
}
