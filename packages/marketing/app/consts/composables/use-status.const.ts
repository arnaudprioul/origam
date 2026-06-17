import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_STATUS_DOC: IComposableDoc = {
    slug: 'use-status',
    name: 'useStatus',
    domain: 'Commons',
    icon: 'mdi-alert-circle-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves semantic status props (success, info, warning, error) into icon slots, status classes, and a forced intent color. The status intent overrides any color / bgColor the consumer passed — a status colour is non-negotiable by design. Also manages icon routing across prepend / append / replace slots based on statusIconPosition.',
    signature: `function useStatus(
  props: IStatusProps & IAdjacentProps,
  name?: string
): {
  icon: ComputedRef<string | undefined>
  appendIcon: ComputedRef<string | undefined>
  prependIcon: ComputedRef<string | undefined>
  statusClasses: ComputedRef<string[]>
  statusIntent: ComputedRef<TColor | undefined>
}`,
    params: [
        {
            name: 'props',
            type: 'IStatusProps & IAdjacentProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props. Reads status (TStatus: success | info | warning | error), statusIconPosition (prepend | append | both | replace), prependIcon, appendIcon, and icon. When status is set and statusIconPosition is replace, the status icon overwrites props.icon; when prepend/append/both, it fills the matching slot only if no explicit icon prop was passed.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name used to build the BEM modifier class `{name}--{status}` (e.g. origam-alert--success). Defaults to the current Vue instance name.',
        },
    ],
    returns: [
        {
            name: 'icon',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Resolved center/replace icon. Returns the status icon when statusIconPosition="replace" and no explicit props.icon was provided, otherwise passes through props.icon.',
        },
        {
            name: 'prependIcon',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Resolved prepend-slot icon. Injects the status icon when statusIconPosition is prepend or both and props.prependIcon is unset.',
        },
        {
            name: 'appendIcon',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Resolved append-slot icon. Injects the status icon when statusIconPosition is append or both and props.appendIcon is unset.',
        },
        {
            name: 'statusClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Array containing `{name}--{status}` when a status is set, empty otherwise. Bind to the root element for SCSS state selectors.',
        },
        {
            name: 'statusIntent',
            type: 'ComputedRef<TColor | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The resolved TColor intent for the current status (success→success, info→info, warning→warning, error→danger). Undefined when no status is set. Consumed by useStateEffect to force the semantic surface color.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Alert with prepend status icon',
            code: `<script setup lang="ts">
import { useStatus } from 'origam'

const props = defineProps<{
  status?: 'success' | 'info' | 'warning' | 'error'
  prependIcon?: string
}>()

const { prependIcon, statusClasses, statusIntent } = useStatus(props)
</script>

<template>
  <div :class="['alert', statusClasses]">
    <origam-icon v-if="prependIcon" :icon="prependIcon" />
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Status icon in replace position',
            code: `<!-- Status icon replaces the component center icon -->
<origam-btn status="warning" status-icon-position="replace">
  Save
</origam-btn>`,
            lang: 'vue',
        },
    ],
    related: ['use-state-effect', 'use-icon'],
    consumedInterfaces: ['IStatusProps', 'IAdjacentProps'],
}
