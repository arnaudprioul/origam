import type { IBgColorProps,
    IColorProps, ICommonsComponentProps, IRoundedProps, ISizeProps } from '../../interfaces'

export interface ISliderFieldTrackProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IRoundedProps {
    start?: number
    stop?: number
    disabled?: boolean
}
