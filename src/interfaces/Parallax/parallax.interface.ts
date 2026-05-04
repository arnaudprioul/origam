import type {
    IAudioProps,
    IBorderProps,
    IBox,
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TParallaxEvent, TPoint } from '../../types'

import type { Ref } from 'vue'

// `IColorProps` exposes `color` / `bgColor` hooks. The Parallax SCSS
// already reads `var(--origam-parallax---background-color)` and
// `--color` from the design tokens (added in 2931d43); declaring the
// props here lets the consumer override them per-instance via inline
// styles, matching every other coloured component.
export interface IParallaxProps extends ICommonsComponentProps, ITagProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IDimensionProps, IAudioProps {
    /**
     * @deprecated Use `duration` instead. `animationDuration` is kept as a
     * silent alias for backwards-compat and will be removed in v3.0.0.
     * When both are passed, `animationDuration` wins so existing consumers
     * relying on the old prop name keep their behaviour, but a one-shot
     * console warning is emitted at runtime to flag the migration.
     */
    animationDuration?: number
    easing?: string
    perspective?: number
    event?: TParallaxEvent
    active?: boolean
    duration?: number
}

export interface IParallaxProvide {
    audioData: Ref<any>
    eventData: Ref<TPoint>
    movement: Ref<{ x: number, y: number, target?: IBox | DOMRect }>
    isMoving: Ref<boolean>
    event: Ref<TParallaxEvent>
    duration: Ref<number>
    easing: Ref<string>
    shape: Ref<IBox | null>
}
