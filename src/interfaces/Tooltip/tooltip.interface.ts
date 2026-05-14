import type {
    IActivatorProps,
    IBgColorProps,
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    ILazyProps,
    ILocationStrategyProps,
    IOverlayProps,
    IScrimProps,
    IScrollStrategyProps,
    ITransitionComponentProps
} from '../../interfaces'

export interface ITooltipProps extends ICommonsComponentProps, IOverlayProps, IColorProps, IBgColorProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
    id?: string
    text?: string
}
