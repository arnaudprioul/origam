import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_WATERMARK_DOC: IComposableDoc = {
    slug: 'use-watermark',
    name: 'useWatermark',
    domain: 'Watermark',
    icon: 'mdi-watermark',
    descriptionKey: '',
    descriptionFallback: 'Headless watermark composable. Builds a repeating SVG tile from text or an image URL and exposes it as a CSS `background-image` data URL. Provides `install()` / `uninstall()` helpers for programmatic use. Optionally watches the DOM via MutationObserver to re-inject the layer if it is removed (anti-tamper mode). SSR-safe — no DOM access in the reactive core.',
    signature: `function useWatermark(
  options?: MaybeRefOrGetter<IUseWatermarkOptions>
): {
  patternUrl: ComputedRef<string>
  install: (target?: HTMLElement) => HTMLElement | null
  uninstall: () => void
}`,
    params: [
        {
            name: 'options',
            type: 'MaybeRefOrGetter<IUseWatermarkOptions>',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Options bag (static object, reactive ref, or getter function). Reads: `text`, `image` (URL), `opacity` (default 0.15), `angle` (degrees, default -30), `gap` (tile spacing in px, default 100), `fontSize` (px, default 16), `fontFamily`, `color`, `fontWeight`, `pointerEvents` ("none" | "auto"), `zIndex`, `antiTamper` (enable MutationObserver re-injection). Passing a ref makes patternUrl update reactively when options change.',
        },
    ],
    returns: [
        {
            name: 'patternUrl',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'CSS `url("data:image/svg+xml,…")` string. Bind to `background-image` on any container element, or pass to `install()`. Recomputes reactively when options change.',
        },
        {
            name: 'install',
            type: '(target?: HTMLElement) => HTMLElement | null',
            descriptionKey: '',
            descriptionFallback: 'Inject a full-cover `<div>` layer with `position: absolute; inset: 0` and the pattern as background-image into `target` (defaults to document.body). Sets `position: relative` on the target if it is `static`. Returns the created layer element, or null during SSR.',
        },
        {
            name: 'uninstall',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Remove the injected layer and disconnect the MutationObserver if active. Called automatically on scope dispose.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Text watermark on a document container',
            code: `<script setup lang="ts">
import { useWatermark } from 'origam'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

const { install, uninstall } = useWatermark({
    text: 'CONFIDENTIAL',
    opacity: 0.08,
    angle: -30,
    gap: 120,
    color: '#000000'
})

onMounted(() => {
    if (containerRef.value) install(containerRef.value)
})

onBeforeUnmount(() => {
    uninstall()
})
</script>

<template>
  <div ref="containerRef" style="position: relative;">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Reactive options + patternUrl binding',
            code: `<script setup lang="ts">
import { useWatermark } from 'origam'
import { ref } from 'vue'

const opacity = ref(0.1)
const { patternUrl } = useWatermark(() => ({
    text: 'DRAFT',
    opacity: opacity.value,
    angle: -45
}))
</script>

<template>
  <div :style="{ backgroundImage: patternUrl, backgroundRepeat: 'repeat' }">
    Content
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['IUseWatermarkOptions'],
    noteFallback: 'useWatermark escapes all XML metacharacters before embedding text or image URLs in the SVG data URL, preventing attribute injection. Enable `antiTamper: true` to activate MutationObserver re-injection — note that this is a deterrent, not a security boundary, as a motivated user can still disable JS.',
}
