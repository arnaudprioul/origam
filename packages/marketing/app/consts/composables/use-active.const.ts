import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ACTIVE_DOC: IComposableDoc = {
    slug: 'use-active',
    name: 'useActive',
    domain: 'Commons',
    icon: 'mdi-cursor-default-click',
    descriptionKey: '',
    descriptionFallback: 'Tracks the active (pressed / selected) state of a host element with full v-model integration. Accepts boolean, forced-on (true) and IActiveState config objects with style overrides. The `prop` argument lets callers bind non-`active` keys (e.g. `modelValue`).',
    signature: `function useActive(
  props: IActiveProps & Record<string, any>,
  prop?: string,
  name?: string
): {
  isActive: ComputedRef<boolean>
  activeState: ComputedRef<IActiveState | undefined>
  activeClasses: ComputedRef<string[]>
  onActive: () => void
}`,
    params: [
        {
            name: 'props',
            type: 'IActiveProps & Record<string, any>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props. Reads `props[prop]` (default: `props.active`).',
        },
        {
            name: 'prop',
            type: 'string',
            required: false,
            defaultValue: "'active'",
            descriptionKey: '',
            descriptionFallback: 'The prop key to read for the active value. Use "modelValue" for components with a v-model binding.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--active` class.',
        },
    ],
    returns: [
        {
            name: 'isActive',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Derived active state. True when forced, when the boolean prop is true, or when the internal toggle is on.',
        },
        {
            name: 'activeState',
            type: 'ComputedRef<IActiveState | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The IActiveState config object when the consumer passed one, undefined otherwise. Consumed by useStateEffect.',
        },
        {
            name: 'activeClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Includes `{name}--active` when isActive is true, plus the optional `activeClass` prop value.',
        },
        {
            name: 'onActive',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Toggle function. Flips the v-model for boolean props, or the internal toggle for IActiveState config objects.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Toggle button with v-model',
            code: `<script setup lang="ts">
import { useActive } from 'origam'

const props = defineProps<{ modelValue?: boolean }>()
const emit = defineEmits(['update:modelValue'])

const { isActive, activeClasses, onActive } = useActive(props, 'modelValue')
</script>

<template>
  <button
    :class="['my-btn', activeClasses]"
    :aria-pressed="isActive"
    @click="onActive"
  >
    {{ isActive ? 'On' : 'Off' }}
  </button>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Forced active with style override',
            code: `<!-- Always active, success surface override -->
<origam-btn :active="{ enabled: true, bgColor: 'success' }">
  Always selected
</origam-btn>`,
            lang: 'vue',
        },
    ],
    related: ['use-hover', 'use-color-effect'],
    consumedInterfaces: ['IActiveProps', 'IActiveState'],
}
