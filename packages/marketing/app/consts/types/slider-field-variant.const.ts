import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SLIDER_FIELD_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'slider-field-variant',
    name: 'TSliderFieldVariant',
    kind: 'type',
    category: 'Form & Input',
    descriptionKey: 'types.catalog.slider_field_variant.description',
    descriptionFallback: 'Visual and behavioural variant of OrigamSliderField — full form-field chrome, bare video-scrubber, or waveform-backed audio scrubber.',
    definition: `export type TSliderFieldVariant = \`\${SLIDER_FIELD_VARIANT}\`

// Where SLIDER_FIELD_VARIANT is:
export enum SLIDER_FIELD_VARIANT {
    FIELD = 'field',
    TIMER = 'timer',
    AUDIO = 'audio'
}`,
    values: [
        { value: 'field', descriptionKey: 'types.detail.slider_field_variant.field', descriptionFallback: 'Default variant — full OrigamInput chrome with label, helper text, prepend/append slots and validation messages. Used in settings panels and form-grade sliders.' },
        { value: 'timer', descriptionKey: 'types.detail.slider_field_variant.timer', descriptionFallback: 'Bare scrubber without input chrome — 2 px hairline rail at rest, 4 px on hover/focus, thumb hidden until hover. Used by OrigamMediaController as a video timeline.' },
        { value: 'audio', descriptionKey: 'types.detail.slider_field_variant.audio', descriptionFallback: 'Same as timer plus a waveform background painted from the peaks prop. Used by OrigamAudio as its waveform scrubber.' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/SliderField/slider-field-variant.type.ts',
    examples: [
        {
            titleKey: 'types.detail.slider_field_variant.example_field',
            titleFallback: 'Form-grade slider with label and validation',
            code: `<origam-slider-field
  variant="field"
  label="Volume"
  :min="0"
  :max="100"
  v-model="volume"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.slider_field_variant.example_timer',
            titleFallback: 'Bare scrubber for a media controller',
            code: `<origam-slider-field
  variant="timer"
  :min="0"
  :max="duration"
  v-model="currentTime"
/>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.slider_field_variant.example_audio',
            titleFallback: 'Waveform scrubber with peaks data',
            code: `<origam-slider-field
  variant="audio"
  :peaks="waveformPeaks"
  :min="0"
  :max="duration"
  v-model="currentTime"
/>`,
            lang: 'html',
        },
    ],
}
