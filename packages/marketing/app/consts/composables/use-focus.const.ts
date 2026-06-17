import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_FOCUS_DOC: IComposableDoc = {
    slug: 'use-focus',
    name: 'useFocus',
    domain: 'Commons',
    icon: 'mdi-target',
    descriptionKey: '',
    descriptionFallback: 'Tracks the focus state of a form control and emits the v-model:focused update. Returns focus/blur event handlers and a component-scoped CSS class that is active while the element is focused.',
    signature: `function useFocus(
  props: IFocusProps,
  name?: string
): {
  isFocused: WritableComputedRef<boolean>
  focusClasses: ComputedRef<Record<string, boolean>>
  onFocus: () => void
  onBlur: () => void
}`,
    params: [
        {
            name: 'props',
            type: 'IFocusProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props containing the optional `focused` boolean. Drives the two-way binding via useVModel.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Component name used to generate the scoped focus class (e.g. "origam-text-field--focused"). Defaults to the current Vue instance name.',
        },
    ],
    returns: [
        {
            name: 'isFocused',
            type: 'WritableComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reactive two-way ref for the focused state. Writing true/false programmatically also fires the update:focused emit.',
        },
        {
            name: 'focusClasses',
            type: 'ComputedRef<Record<string, boolean>>',
            descriptionKey: '',
            descriptionFallback: 'Class map containing `{name}--focused: isFocused.value`. Bind on the component root to reflect focus state via CSS.',
        },
        {
            name: 'onFocus',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Handler to attach to the native focus event. Sets isFocused to true.',
        },
        {
            name: 'onBlur',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Handler to attach to the native blur event. Sets isFocused to false.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Input field with focus styling',
            code: `<script setup lang="ts">
import { useFocus } from 'origam'

const props = defineProps<{ focused?: boolean }>()
const emit = defineEmits<{ (e: 'update:focused', value: boolean): void }>()

const { isFocused, focusClasses, onFocus, onBlur } = useFocus(props)
</script>

<template>
  <div :class="['my-field', focusClasses]">
    <input @focus="onFocus" @blur="onBlur" />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Programmatic focus via v-model:focused',
            code: `<template>
  <origam-text-field
    v-model:focused="isActive"
    label="Email"
    type="email"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isActive = ref(false)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-hover', 'use-active', 'use-v-model'],
    consumedInterfaces: ['IFocusProps', 'IFocusEmits'],
}
