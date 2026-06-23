import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SLIDER_FIELD_TRACK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-slider-field-track-props',
    name: 'ISliderFieldTrackProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_slider_field_track_props.description',
    descriptionFallback: 'Props contract for the track sub-component of <OrigamSliderField> — rail fill range, tick configuration, orientation hints, and the visual surface (color, size, rounded).',
    definition: `export interface ISliderFieldTrackProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IRoundedProps {
    start?: number
    stop?: number
    disabled?: boolean
    error?: boolean
    min?: number
    max?: number
    isVertical?: boolean
    indexFromEnd?: boolean
    showTicks?: TAlways
    tickSize?: number | string
    ticks?: Array<TTick>
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'ISizeProps', 'IRoundedProps'],
    props: [
        { name: 'start', type: 'number', optional: true, descriptionFallback: 'Start position of the active fill as a fraction of the total range (0–1).' },
        { name: 'stop', type: 'number', optional: true, descriptionFallback: 'Stop position of the active fill as a fraction of the total range (0–1).' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Applies the disabled visual state to the track.' },
        { name: 'error', type: 'boolean', optional: true, descriptionFallback: 'Forces danger intent on both color channels — driven by the parent slider error flag.' },
        { name: 'min', type: 'number', optional: true, descriptionFallback: 'Boundaries for tick filtering (first tick suppression).' },
        { name: 'max', type: 'number', optional: true, descriptionFallback: 'Boundaries for tick filtering (last tick suppression).' },
        { name: 'isVertical', type: 'boolean', optional: true, descriptionFallback: 'Orientation hint passed by the parent — controls the logical CSS axis.' },
        { name: 'indexFromEnd', type: 'boolean', optional: true, descriptionFallback: 'Inverts the start direction when reverse is on or in vertical mode.' },
        { name: 'showTicks', type: 'TAlways', optional: true, descriptionFallback: 'Tick visibility. Same semantics as the parent slider showTicks.' },
        { name: 'tickSize', type: 'number | string', optional: true, descriptionFallback: 'Tick dot size — px or token unit.' },
        { name: 'ticks', type: 'Array<TTick>', optional: true, descriptionFallback: 'Pre-computed tick descriptors — the parent slider owns the math and passes them down.' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SliderField/slider-field-track.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_slider_field_track_props.example',
            titleFallback: 'Passing trackProps to OrigamSliderField',
            code: `<OrigamSliderField
    :track-props="{
        color: 'primary',
        bgColor: 'surface',
        size: 'sm',
        rounded: 'full',
    }"
/>`,
            lang: 'vue',
        },
    ],
}
