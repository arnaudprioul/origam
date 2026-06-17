import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_GO_TO_DOC: IComposableDoc = {
    slug: 'use-go-to',
    name: 'useGoTo',
    domain: 'Commons',
    icon: 'mdi-arrow-collapse-down',
    descriptionKey: '',
    descriptionFallback: 'Returns a scrollTo function that smoothly scrolls a container or the window to a target element, component instance, CSS selector, or numeric offset. Supports both vertical and horizontal scrolling, RTL awareness, and custom easing/duration options.',
    signature: `function useGoTo(options?: Partial<IGoToOptions>): {
  (
    target: ComponentPublicInstance | HTMLElement | string | number,
    options?: Partial<IGoToOptions>
  ): Promise<void>
  horizontal(
    target: ComponentPublicInstance | HTMLElement | string | number,
    options?: Partial<IGoToOptions>
  ): Promise<void>
}`,
    params: [
        {
            name: 'options',
            type: 'Partial<IGoToOptions>',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Default options applied to every go() call made through this instance. Can be overridden per-call.',
        },
        {
            name: 'options.duration',
            type: 'number',
            required: false,
            defaultValue: '300',
            descriptionKey: '',
            descriptionFallback: 'Scroll animation duration in milliseconds.',
        },
        {
            name: 'options.easing',
            type: 'TEasingFunction | string',
            required: false,
            defaultValue: "'easeInOutCubic'",
            descriptionKey: '',
            descriptionFallback: 'Easing function name or a custom function (t: number) => number controlling the animation curve.',
        },
        {
            name: 'options.offset',
            type: 'number',
            required: false,
            defaultValue: '0',
            descriptionKey: '',
            descriptionFallback: 'Pixel offset applied to the final scroll position (positive = scroll further, negative = stop earlier).',
        },
        {
            name: 'options.container',
            type: 'ComponentPublicInstance | HTMLElement | string',
            required: false,
            defaultValue: "'html'",
            descriptionKey: '',
            descriptionFallback: 'Scrollable container element or selector. Defaults to the document root.',
        },
    ],
    returns: [
        {
            name: 'go',
            type: '(target, options?) => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Scroll vertically to the target. Accepts a Vue component instance, an HTMLElement, a CSS selector string, or a numeric pixel offset.',
        },
        {
            name: 'go.horizontal',
            type: '(target, options?) => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Scroll horizontally to the target using the same resolution logic as go().',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Scroll to an anchor element',
            code: `<script setup lang="ts">
import { useGoTo } from 'origam'

const go = useGoTo()

function scrollToSection() {
  go('#features', { duration: 500, offset: -64 })
}
</script>

<template>
  <button @click="scrollToSection">Go to Features</button>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Scroll to top with custom easing',
            code: `<script setup lang="ts">
import { useGoTo } from 'origam'

const go = useGoTo({ easing: 'linear', duration: 200 })

function backToTop() {
  go(0)
}
</script>`,
            lang: 'ts',
        },
        {
            titleKey: '',
            titleFallback: 'Horizontal scroll inside a container',
            code: `<script setup lang="ts">
import { useGoTo } from 'origam'

const go = useGoTo({ container: '#carousel' })

function slideNext() {
  go.horizontal(320)
}
</script>`,
            lang: 'ts',
        },
    ],
    related: ['use-scroll', 'use-display'],
    consumedInterfaces: ['IGoToOptions', 'IGoToInstance'],
    noteFallback: 'useGoTo reads RTL direction from the global locale and the injected IGoToInstance. Per-call options are deep-merged with the instance defaults, so you can customise the duration globally and override it for specific calls.',
}
