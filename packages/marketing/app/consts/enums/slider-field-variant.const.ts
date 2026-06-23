import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SLIDER_FIELD_VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'slider-field-variant',
    name: 'SLIDER_FIELD_VARIANT',
    category: 'Form & Input',
    descriptionKey: 'enums.catalog.slider_field_variant.description',
    descriptionFallback: 'TypeScript enum for SliderField visual variant — full form field, bare timer scrubber, or waveform audio scrubber.',
    definition: `export enum SLIDER_FIELD_VARIANT {
    FIELD = 'field',
    TIMER = 'timer',
    AUDIO = 'audio'
}`,
    values: [
        { value: 'SLIDER_FIELD_VARIANT.FIELD', descriptionKey: 'enums.detail.slider_field_variant.field', descriptionFallback: 'Full form-field chrome — label, messages, prepend/append icons. Default variant.' },
        { value: 'SLIDER_FIELD_VARIANT.TIMER', descriptionKey: 'enums.detail.slider_field_variant.timer', descriptionFallback: 'Bare scrubber — no input chrome; hairline rail (2 px at rest, 4 px on hover/focus), thumb hidden until hover. Used for video timelines.' },
        { value: 'SLIDER_FIELD_VARIANT.AUDIO', descriptionKey: 'enums.detail.slider_field_variant.audio', descriptionFallback: 'Like TIMER but adds a waveform background rendered from the peaks prop. Used for audio scrubbers.' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', propName: 'variant' },
        { slug: 'audio', name: 'Audio', propName: 'sliderVariant' },
    ],
    sourceFile: 'packages/ds/src/enums/SliderField/slider-field-variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.slider_field_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SLIDER_FIELD_VARIANT } from 'origam'

const variant: SLIDER_FIELD_VARIANT = SLIDER_FIELD_VARIANT.TIMER`,
            lang: 'typescript',
        },
    ],
}
