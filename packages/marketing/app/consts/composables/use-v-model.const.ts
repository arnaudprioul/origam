import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_V_MODEL_DOC: IComposableDoc = {
    slug: 'use-v-model',
    name: 'useVModel',
    domain: 'Commons',
    icon: 'mdi-swap-horizontal',
    descriptionKey: '',
    descriptionFallback: 'Implements a controlled / uncontrolled prop contract for any component prop bound via v-model. When the parent provides both the prop and the matching onUpdate:prop listener the component operates in controlled mode; otherwise it manages its own internal ref. Supports kebab-case / camelCase prop alias pairs and optional in/out value transformers.',
    signature: `function useVModel<
  Props extends object & { [key in Prop as \`onUpdate:\${Prop}\`]?: TEventProp | undefined },
  Prop extends Extract<keyof Props, string>,
  Inner = Props[Prop]
>(
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
  transformIn?: (value?: Props[Prop]) => Inner,
  transformOut?: (value: Inner) => Props[Prop]
): Ref<TInnerVal<Inner>> & { readonly externalValue: Props[Prop] }`,
    params: [
        {
            name: 'props',
            type: 'Props',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The component props object returned by defineProps. The composable reads `props[prop]` and inspects `vm.vnode.props` to detect whether the listener is wired.',
        },
        {
            name: 'prop',
            type: 'Prop',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The prop key to observe, e.g. `"modelValue"` for a standard v-model binding.',
        },
        {
            name: 'defaultValue',
            type: 'Props[Prop]',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Value used to initialise the internal ref when the prop is undefined on first render.',
        },
        {
            name: 'transformIn',
            type: '(value?: Props[Prop]) => Inner',
            required: false,
            defaultValue: 'identity',
            descriptionKey: '',
            descriptionFallback: 'Optional transform applied to the external prop value before exposing it to the component. Useful for converting a string to a number, or normalising null / undefined.',
        },
        {
            name: 'transformOut',
            type: '(value: Inner) => Props[Prop]',
            required: false,
            defaultValue: 'identity',
            descriptionKey: '',
            descriptionFallback: 'Optional inverse transform applied before emitting `update:prop`. Pairs with transformIn to keep the internal representation separate from the public API value.',
        },
    ],
    returns: [
        {
            name: '(model)',
            type: 'Ref<TInnerVal<Inner>> & { readonly externalValue: Props[Prop] }',
            descriptionKey: '',
            descriptionFallback: 'A writable computed ref. Reading it returns the current value (controlled or internal). Writing it updates the internal ref and emits `update:prop`. The `externalValue` accessor returns the raw prop value without transformIn applied.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Boolean toggle with v-model',
            code: `<script setup lang="ts">
import { useVModel } from 'origam'

const props = defineProps<{
    modelValue?: boolean
}>()

const isOpen = useVModel(props, 'modelValue', false)
</script>

<template>
  <button @click="isOpen = !isOpen">
    {{ isOpen ? 'Close' : 'Open' }}
  </button>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'String prop with value transform',
            code: `<script setup lang="ts">
import { useVModel } from 'origam'

const props = defineProps<{
    modelValue?: string
}>()

// Store internally as uppercase, emit as-is
const model = useVModel(
    props,
    'modelValue',
    '',
    (v) => v?.toUpperCase() ?? '',
    (v) => v
)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-toggle-scope', 'use-validation'],
    consumedInterfaces: [],
    noteFallback: 'useVModel is the backbone of every form control in origam. It handles the subtle Vue 3 contract where a component is only "controlled" when BOTH the prop and the update listener are present on `vnode.props` — passing the prop alone without a handler keeps the component uncontrolled.',
}
