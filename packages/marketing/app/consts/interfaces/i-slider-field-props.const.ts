import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SLIDER_FIELD_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-slider-field-props',
    name: 'ISliderFieldProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_slider_field_props.description',
    descriptionFallback: 'Full props contract for <OrigamSliderField> — a range input with three visual variants (field, timer, audio), optional waveform peaks, range mode, tick marks, hover tooltip, and the full design surface.',
    definition: `export interface ISliderFieldProps extends ICommonsComponentProps, IDensityProps, IColorProps, IInputProps, IFocusProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IRippleProps, IDirectionProps {
    disabled?: boolean
    required?: boolean
    label?: string
    error?: boolean
    readonly?: boolean
    max?: number | string
    min?: number | string
    step?: number | string
    trackProps?: ISliderFieldTrackProps
    reverse?: boolean
    modelValue?: number | string | Array<number> | Array<string>
    range?: boolean
    showTicks?: TAlways
    ticks?: Array<number> | Record<string, string>
    tickSize?: TSize | number
    inset?: boolean
    variant?: TSliderFieldVariant
    buffered?: number
    showThumbOnHoverOnly?: boolean
    showHoverTooltip?: boolean
    formatHoverTooltip?: (value: number) => string
    peaks?: ReadonlyArray<number>
}`,
    extends: [
        'ICommonsComponentProps', 'IDensityProps', 'IColorProps', 'IInputProps',
        'IFocusProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps',
        'IRoundedProps', 'IElevationProps', 'IRippleProps', 'IDirectionProps',
    ],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables the slider — prevents interaction and applies a disabled visual state.' },
        { name: 'required', type: 'boolean', optional: true, descriptionFallback: 'Marks the field as required (validation semantic).' },
        { name: 'label', type: 'string', optional: true, descriptionFallback: 'Field label rendered by the wrapping OrigamInput chrome (variant="field" only).' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Forces the danger intent on both color channels — drives the error visual state.' },
        { name: 'readonly', type: 'boolean', optional: true, descriptionFallback: 'Makes the slider non-interactive while keeping it visually enabled.' },
        { name: 'max', type: 'number | string', optional: true, descriptionFallback: 'Maximum value of the range. Forwarded to the underlying <input type="range">.' },
        { name: 'min', type: 'number | string', optional: true, descriptionFallback: 'Minimum value of the range.' },
        { name: 'step', type: 'number | string', optional: true, descriptionFallback: 'Step increment for snapping.' },
        { name: 'trackProps', type: 'ISliderFieldTrackProps', optional: true, descriptionFallback: 'Visual props forwarded to the track sub-component (color, size, rounded, ticks).' },
        { name: 'reverse', type: 'boolean', optional: true, descriptionFallback: 'Reverses the start direction of the fill.' },
        { name: 'modelValue', type: 'number | string | Array<number> | Array<string>', optional: true, descriptionFallback: 'Bound value (v-model). Array for range mode.' },
        { name: 'range', type: 'boolean', optional: true, descriptionFallback: 'Enables two-thumb range mode — modelValue must be an array of two values.' },
        { name: 'showTicks', type: 'TAlways', optional: true, descriptionFallback: 'Controls tick mark visibility.' },
        { name: 'ticks', type: 'Array<number> | Record<string, string>', optional: true, descriptionFallback: 'Custom tick positions and optional labels.' },
        { name: 'tickSize', type: 'TSize | number', optional: true, descriptionFallback: 'Size of tick dot markers.' },
        { name: 'inset', type: 'boolean', optional: true, descriptionFallback: 'Compact inset style — the draggable thumb sits inside the track. Defaults to false.' },
        { name: 'variant', type: 'TSliderFieldVariant', optional: true, descriptionFallback: 'Visual variant: "field" (default, with input chrome), "timer" (bare rail, hidden thumb), "audio" (timer + waveform peaks).' },
        { name: 'buffered', type: 'number', optional: true, descriptionFallback: 'Secondary fill from min to buffered (e.g. loaded video buffer). Layered behind active fill at reduced opacity.' },
        { name: 'showThumbOnHoverOnly', type: 'boolean', optional: true, descriptionFallback: 'Hides the thumb at rest and reveals it on hover/focus/drag. Forced on for timer and audio variants.' },
        { name: 'showHoverTooltip', type: 'boolean', optional: true, descriptionFallback: 'Renders a floating tooltip above the rail showing the value under the cursor.' },
        { name: 'formatHoverTooltip', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter for the hover tooltip text. Receives the clamped cursor value.' },
        { name: 'peaks', type: 'ReadonlyArray<number>', optional: true, descriptionFallback: 'Waveform peaks in [0, 1]. Used with variant="audio" to paint vertical bars behind the track.' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SliderField/slider-field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_slider_field_props.example',
            titleFallback: 'Audio waveform scrubber',
            code: `<OrigamSliderField
    variant="audio"
    :peaks="waveformPeaks"
    :min="0"
    :max="duration"
    v-model="currentTime"
    :format-hover-tooltip="t => formatTime(t)"
/>`,
            lang: 'vue',
        },
    ],
}
