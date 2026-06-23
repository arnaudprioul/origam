import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TRANSITION_DOC: IComposableDoc = {
    slug: 'use-transition',
    name: 'useTransition',
    domain: 'Transition',
    icon: 'mdi-transition',
    descriptionKey: '',
    descriptionFallback: 'Family of three composables (useTransition, useCssTransition, useWindowTransition) that resolve a transition name from ITransitionProps and wire optional lifecycle hooks. useCssTransition handles leaveAbsolute / hideOnLeave helpers. useWindowTransition coordinates height animations for window-based transitions in stepper or tab containers.',
    signature: `function useTransition(
  props: ITransitionProps
): {
  name: ComputedRef<string | undefined>
  isDisabled: ComputedRef<boolean | undefined>
}

function useCssTransition(
  props: ITransitionProps
): {
  tag: ShallowRef<Component>
  name: ComputedRef<string | undefined>
  isDisabled: ComputedRef<boolean | undefined>
  transitionProps: ComputedRef<Record<string, any>>
}

function useWindowTransition(
  props: ITransitionProps
): {
  tag: ShallowRef<Component>
  name: ComputedRef<string | undefined>
  isDisabled: ComputedRef<boolean | undefined>
  transitionProps: ComputedRef<Record<string, any>>
}`,
    params: [
        {
            name: 'props',
            type: 'ITransitionProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reads `name` (CSS transition class prefix), `disabled` (bypass the transition), `group` (use TransitionGroup), `mode` (in-out / out-in), `origin` (transform-origin set on beforeEnter), `leaveAbsolute` (position the leaving element absolutely), `hideOnLeave` (display:none on leave).',
        },
    ],
    returns: [
        {
            name: 'name',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The resolved transition name. Empty string when disabled (tells Vue not to apply CSS classes).',
        },
        {
            name: 'isDisabled',
            type: 'ComputedRef<boolean | undefined>',
            descriptionKey: '',
            descriptionFallback: 'True when `props.disabled` is set. When disabled, `css: false` is passed to the Transition component and lifecycle hooks handle the enter/leave styles.',
        },
        {
            name: 'tag',
            type: 'ShallowRef<Component>',
            descriptionKey: '',
            descriptionFallback: '`TransitionGroup` when `props.group` is true, `Transition` otherwise. Bind to `<component :is="tag">` in the consumer template.',
        },
        {
            name: 'transitionProps',
            type: 'ComputedRef<Record<string, any>>',
            descriptionKey: '',
            descriptionFallback: 'Computed props bag to spread on the Transition / TransitionGroup root. Includes `css`, `mode`, and lifecycle hooks (onBeforeEnter, onLeave, onAfterLeave) when needed.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Fade transition wrapper',
            code: `<script setup lang="ts">
import { useCssTransition } from 'origam'

const props = defineProps<{
    name?: string
    group?: boolean
    disabled?: boolean
}>()

const { tag, name, transitionProps } = useCssTransition(props)
</script>

<template>
  <component :is="tag" v-bind="transitionProps" :name="name">
    <slot />
  </component>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Using OrigamTransition (recommended)',
            code: `<template>
  <origam-transition name="slide-x-transition" group>
    <div v-for="item in items" :key="item.id">{{ item.label }}</div>
  </origam-transition>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-css-support'],
    consumedInterfaces: ['ITransitionProps'],
    noteFallback: 'useWindowTransition requires an ORIGAM_WINDOW_KEY injection — it is only usable inside OrigamWindow subtrees (e.g. OrigamStepper, OrigamTabs). For standalone transitions use useCssTransition or the OrigamTransition component.',
}
