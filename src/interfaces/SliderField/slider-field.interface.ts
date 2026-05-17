import { useSteps } from '../../composables'

import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDirectionProps,
    IElevationProps,
    IFocusProps,
    IInputProps,
    IMarginProps,
    IPaddingProps,
    IRippleProps,
    IRoundedProps,
    ISliderFieldThumbProps,
    ISliderFieldTrackProps
} from '../../interfaces'

import type {
    TAlways,
    TColor,
    TDirectionBoth,
    TOrigamSliderFieldThumb,
    TOrigamSliderFieldTrack,
    TSize,
    TSliderData,
    TTick
} from '../../types'

import { Ref } from 'vue'

export interface ISliderFieldProps extends ICommonsComponentProps, IDensityProps, IColorProps, IInputProps, IFocusProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IRippleProps, IDirectionProps {
    disabled?: boolean
    required?: boolean
    label?: string
    error?: boolean
    readonly?: boolean
    max?: number | string
    min?: number | string
    step?: number | string
    thumbProps?: ISliderFieldThumbProps
    trackProps?: ISliderFieldTrackProps
    reverse?: boolean
    modelValue?: number | string | Array<number> | Array<string>
    range?: boolean

    // TODO - need rework to use tick interface
    showTicks?: TAlways
    ticks?: Array<number> | string
    tickSize?: TSize | number
    /**
     * Compact "inset" style — the draggable thumb sits **inside** the
     * track (smaller, no overflow). Mirrors `OrigamSwitch`'s `inset`
     * flag. Useful in tight contexts like a volume tooltip or a compact
     * form row.
     *
     * @default false
     */
    inset?: boolean
}

export interface ISliderFieldProvide {
    activeThumbRef: Ref<HTMLElement | undefined>
    decimals: Ref<number>
    disabled: Ref<boolean | null | undefined>
    readonly: Ref<boolean | null | undefined>
    error: Ref<boolean | null | undefined>
    elevation: Ref<string | number | undefined>
    rounded: Ref<string | number | boolean | null | undefined>
    border: Ref<string | number | boolean | TDirectionBoth | Array<TDirectionBoth> | null | undefined>
    ripple: Ref<boolean | { class: string } | undefined>
    color: Ref<TColor>
    hoverColor: Ref<TColor>
    activeColor: Ref<TColor>
    bgColor: Ref<TColor>
    hoverBgColor: Ref<TColor>
    activeBgColor: Ref<TColor>
    min: Ref<number>
    max: Ref<number>
    mousePressed: Ref<boolean>
    numTicks: Ref<number>
    onSliderMousedown: (e: MouseEvent) => void
    onSliderTouchstart: (e: TouchEvent) => void
    parseMouseMove: (e: MouseEvent | TouchEvent) => number
    position: (val: number) => number
    roundValue: (value: number) => number
    showTicks: Ref<TAlways | undefined>
    startOffset: Ref<number>
    step: Ref<number>
    ticks: Ref<number[] | string | undefined>
    tickSize: Ref<number>
    origamSliderFieldTrackRef: Ref<TOrigamSliderFieldTrack | null | undefined>
    origamSliderFieldThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    origamSliderFieldStartThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    origamSliderFieldStopThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    isVertical: Ref<boolean>
    parsedTicks: Ref<Array<TTick>>
    hasLabels: Ref<boolean>
    isReversed: Ref<boolean | undefined>
    indexFromEnd: Ref<boolean>
}

export interface ISliderField {
    origamSliderFieldTrackRef: Ref<TOrigamSliderFieldTrack | null | undefined>
    origamSliderFieldThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    origamSliderFieldStartThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    origamSliderFieldStopThumbRef: Ref<TOrigamSliderFieldThumb | null | undefined>
    props: ISliderFieldProps
    steps: ReturnType<typeof useSteps>
    onSliderEnd: (data: TSliderData) => void
    onSliderStart: (data: TSliderData) => void
    onSliderMove: (data: TSliderData) => void
    getActiveThumb: (e: MouseEvent | TouchEvent) => HTMLElement
}
