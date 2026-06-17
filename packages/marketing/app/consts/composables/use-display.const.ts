import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DISPLAY_DOC: IComposableDoc = {
    slug: 'use-display',
    name: 'useDisplay',
    domain: 'Commons',
    icon: 'mdi-monitor-cellphone',
    descriptionKey: '',
    descriptionFallback: 'Reactive display breakpoint detection. Returns the current viewport breakpoints, platform info, and a component-scoped mobile class. Must be consumed inside an app that has called createDisplay() during plugin setup.',
    signature: `function useDisplay(
  props?: IDisplayProps,
  name?: string
): IDisplayInstance & {
  displayClasses: ComputedRef<Record<string, boolean>>
  mobile: ComputedRef<boolean>
}`,
    params: [
        {
            name: 'props',
            type: 'IDisplayProps',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional props object containing mobileBreakpoint. When provided, overrides the global mobileBreakpoint threshold for this component instance.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Component name used to generate the scoped mobile CSS class (e.g. "my-component--mobile"). Defaults to the current Vue instance name.',
        },
    ],
    returns: [
        {
            name: 'xs / sm / md / lg / xl / xxl',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Boolean refs indicating whether the current viewport matches each named breakpoint exactly.',
        },
        {
            name: 'smAndUp / mdAndUp / lgAndUp / xlAndUp',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the viewport is at or above the named breakpoint.',
        },
        {
            name: 'smAndDown / mdAndDown / lgAndDown / xlAndDown',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the viewport is at or below the named breakpoint.',
        },
        {
            name: 'mobile',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the viewport width is below the resolved mobileBreakpoint threshold (global or instance-level).',
        },
        {
            name: 'displayClasses',
            type: 'ComputedRef<Record<string, boolean>>',
            descriptionKey: '',
            descriptionFallback: 'Class map to bind on the component root. Adds `{name}--mobile` when mobile is true.',
        },
        {
            name: 'width / height',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Current viewport width and height in pixels, updated on window resize.',
        },
        {
            name: 'platform',
            type: 'Ref<IDisplayPlatform>',
            descriptionKey: '',
            descriptionFallback: 'Platform detection object with boolean flags for android, ios, chrome, firefox, win, mac, touch, ssr, etc.',
        },
        {
            name: 'thresholds',
            type: 'Ref<TDisplayThresholds>',
            descriptionKey: '',
            descriptionFallback: 'Resolved pixel thresholds for each breakpoint (sm, md, lg, xl, xxl).',
        },
        {
            name: 'name',
            type: 'Ref<TBreakpoint>',
            descriptionKey: '',
            descriptionFallback: 'The active breakpoint name as a string: "xs", "sm", "md", "lg", "xl" or "xxl".',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Conditional rendering by breakpoint',
            code: `<script setup lang="ts">
import { useDisplay } from 'origam'

const { mobile, mdAndUp } = useDisplay()
</script>

<template>
  <origam-btn v-if="mobile" icon="mdi-menu" />
  <origam-nav v-if="mdAndUp" />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom mobileBreakpoint per component',
            code: `<script setup lang="ts">
import { useDisplay } from 'origam'

const { mobile, displayClasses } = useDisplay(
  { mobileBreakpoint: 960 },
  'my-panel'
)
</script>

<template>
  <div :class="['my-panel', displayClasses]">
    {{ mobile ? 'Compact' : 'Expanded' }}
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-css-support', 'use-theme'],
    consumedInterfaces: ['IDisplayProps', 'IDisplayInstance', 'IDisplayOptions'],
}
