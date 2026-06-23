import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_MASK_DOC: IComposableDoc = {
    slug: 'use-mask',
    name: 'useMask',
    domain: 'Mask',
    icon: 'mdi-form-textbox',
    descriptionKey: '',
    descriptionFallback: 'Reactive input mask engine. Keeps a masked display string, an unmasked raw value, a validity flag, and a completion flag in sync with a source value and a polymorphic mask spec. Accepts both plain values and refs so it integrates directly with props.modelValue and props.mask.',
    signature: `function useMask(
  modelValue: MaybeRef<string | null | undefined>,
  mask: MaybeRef<TMask | undefined>
): {
  masked: Ref<string>
  unmasked: Ref<string>
  isValid: Ref<boolean>
  complete: Ref<boolean>
  setRaw: (raw: string) => string
  config: Ref<IResolvedMaskConfig | null>
}`,
    params: [
        {
            name: 'modelValue',
            type: 'MaybeRef<string | null | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The raw input value to format. Accepts a plain string or a reactive ref. When it changes the mask is reapplied.',
        },
        {
            name: 'mask',
            type: 'MaybeRef<TMask | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Mask spec — a pattern string (e.g. "##/##/####"), a named preset, or a custom config object. When it changes the current value is reformatted.',
        },
    ],
    returns: [
        {
            name: 'masked',
            type: 'Ref<string>',
            descriptionKey: '',
            descriptionFallback: 'The formatted display string (e.g. "12/31/2024"). Bind to the input value displayed to the user.',
        },
        {
            name: 'unmasked',
            type: 'Ref<string>',
            descriptionKey: '',
            descriptionFallback: 'The raw digits/characters with mask literals stripped (e.g. "12312024"). Use this as the actual model value.',
        },
        {
            name: 'isValid',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the unmasked value satisfies the mask pattern requirements (complete when required, passes regex validator when present).',
        },
        {
            name: 'complete',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when every placeholder slot in the mask pattern has been filled.',
        },
        {
            name: 'setRaw',
            type: '(raw: string) => string',
            descriptionKey: '',
            descriptionFallback: 'Imperatively re-format an external raw value (e.g. after a paste event or external data sync). Returns the new unmasked value.',
        },
        {
            name: 'config',
            type: 'Ref<IResolvedMaskConfig | null>',
            descriptionKey: '',
            descriptionFallback: 'The currently resolved mask configuration (pattern array, validator, required flag). Null when no mask is active.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Phone number mask',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMask } from 'origam'

const raw = ref('')
const { masked, unmasked, isValid, complete, setRaw } = useMask(raw, '(###) ###-####')
</script>

<template>
  <input
    :value="masked"
    placeholder="(555) 123-4567"
    @input="setRaw(($event.target as HTMLInputElement).value)"
  />
  <p v-if="!isValid && complete === false">Keep typing…</p>
  <p v-else-if="isValid">Valid: {{ unmasked }}</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Date mask with reactive model',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMask } from 'origam'

const model = ref<string | null>(null)
const { masked, unmasked, complete } = useMask(model, '##/##/####')
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-form', 'use-validation'],
    consumedInterfaces: ['IMaskOptions', 'IResolvedMaskConfig'],
}
