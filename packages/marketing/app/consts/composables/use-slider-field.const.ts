import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SLIDER_FIELD_DOC: IComposableDoc = {
    slug: 'use-slider-field',
    name: 'useSteps',
    domain: 'SliderField',
    icon: 'mdi-tune-variant',
    descriptionKey: '',
    descriptionFallback: 'Pure-function stepping math for OrigamSliderField. Computes reactive min / max / step / decimals values from the component props and exposes a roundValue helper that snaps any raw number to the nearest valid step (clamped to [min, max]). After the migration to a native <input type="range">, this is the only remaining logic layer for the slider — the browser now owns drag tracking.',
    signature: `function useSteps(
  props: ISliderFieldProps
): {
  min: ComputedRef<number>
  max: ComputedRef<number>
  step: ComputedRef<number>
  decimals: ComputedRef<number>
  roundValue: (value: string | number) => number
}`,
    params: [
        {
            name: 'props',
            type: 'ISliderFieldProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props. Reads min (default 0), max (default 100), and step (default 0 = no stepping). All three accept string or number — they are parsed with parseFloat internally.',
        },
    ],
    returns: [
        {
            name: 'min',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Parsed minimum value. Defaults to 0 when props.min is undefined or null.',
        },
        {
            name: 'max',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Parsed maximum value. Defaults to 100 when props.max is undefined or null.',
        },
        {
            name: 'step',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Parsed step value. 0 means no stepping (any value between min and max is valid). Positive values define the snap grid.',
        },
        {
            name: 'decimals',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Number of decimal places to preserve in roundValue output. Derived from max(getDecimals(step), getDecimals(min)) to match the precision implied by the step grid.',
        },
        {
            name: 'roundValue',
            type: '(value: string | number) => number',
            descriptionKey: '',
            descriptionFallback: 'Snap a raw value to the nearest valid step, clamped to [min, max]. Handles the min-offset edge case so that a step=5 min=3 grid snaps to 3, 8, 13, … rather than 0, 5, 10, ….',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Snap a user-typed value to the step grid',
            code: `<script setup lang="ts">
import { useSteps } from 'origam'

const props = defineProps<{
  min?: number | string
  max?: number | string
  step?: number | string
}>()

const { min, max, decimals, roundValue } = useSteps(props)

function onInputChange(raw: string) {
  const snapped = roundValue(raw)
  console.log(\`Snapped \${raw} → \${snapped} (decimals: \${decimals.value})\`)
}
</script>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['ISliderFieldProps'],
    noteFallback: 'useSteps is intentionally a pure-function layer with no side effects. It does not manage drag state — drag is handled natively by the <input type="range"> element in OrigamSliderField. The older useSlider JS drag pipeline was removed during the native-input migration.',
}
