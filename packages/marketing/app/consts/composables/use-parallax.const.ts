import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PARALLAX_DOC: IComposableDoc = {
    slug: 'use-parallax',
    name: 'useParallaxRuntime',
    domain: 'Parallax',
    icon: 'mdi-layers-triple-outline',
    descriptionKey: '',
    descriptionFallback: 'Headless parallax engine used by OrigamParallax. Maintains a registry of layers, tracks scroll progress via IntersectionObserver, and drives per-frame transforms via requestAnimationFrame. Branches automatically to a CSS scroll-driven animation path (Chrome 115+) when the easing is linear and the browser supports animation-timeline: scroll(). Respects prefers-reduced-motion at OS level.',
    signature: `function useParallaxRuntime(options: IUseParallaxRuntimeOptions): {
  layers: Ref<IParallaxLayerRegistry[]>
  progress: Ref<number>
  mouseRatio: Ref<{ x: number; y: number }>
  cssScrollDriven: ComputedRef<boolean>
  reducedMotion: Ref<boolean>
  register: (layer: IParallaxLayerRegistry) => void
  unregister: (id: symbol) => void
}`,
    params: [
        {
            name: 'options.target',
            type: 'Ref<HTMLElement | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Template ref of the parallax host element. The IntersectionObserver and scroll listener are attached to this element.',
        },
        {
            name: 'options.direction',
            type: 'Ref<TParallaxDirection>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Axis of movement: "vertical" (default), "horizontal", or "both" (scroll on Y + mouse on X).',
        },
        {
            name: 'options.easing',
            type: 'Ref<TParallaxEasing | string>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Easing mode: "linear" (enables CSS scroll-driven path), "spring" (JS lerp with damping), or a CSS easing string.',
        },
        {
            name: 'options.threshold',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Minimum viewport intersection ratio [0-1] before progress starts. Delays animation until the host is sufficiently visible.',
        },
        {
            name: 'options.disabled',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'When true, layers are snapped to their static offsets and the rAF loop is paused.',
        },
        {
            name: 'options.speed',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Default speed factor for raw content (non-layer slot). Layer registrations carry their own speed override.',
        },
        {
            name: 'options.onEnter',
            type: '() => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Callback fired when the host enters the viewport.',
        },
        {
            name: 'options.onLeave',
            type: '() => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Callback fired when the host exits the viewport.',
        },
        {
            name: 'options.onProgress',
            type: '(progress: number) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Called on every scroll frame with the current normalised progress value in [0, 1].',
        },
    ],
    returns: [
        {
            name: 'layers',
            type: 'Ref<IParallaxLayerRegistry[]>',
            descriptionKey: '',
            descriptionFallback: 'Live list of registered layer descriptors. Each entry carries its target element, speed, and static offsets.',
        },
        {
            name: 'progress',
            type: 'Ref<number>',
            descriptionKey: '',
            descriptionFallback: 'Normalised scroll progress in [0, 1]. 0 = host top at viewport bottom, 1 = host bottom at viewport top.',
        },
        {
            name: 'mouseRatio',
            type: 'Ref<{ x: number; y: number }>',
            descriptionKey: '',
            descriptionFallback: 'Mouse position ratio in [-1, 1] for each axis from the host centre. Only updated when direction is "both".',
        },
        {
            name: 'cssScrollDriven',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the CSS scroll-driven animation path is active (animation-timeline: scroll() supported + easing === "linear").',
        },
        {
            name: 'reducedMotion',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Reflects the prefers-reduced-motion media query. When true, all layers are locked to their static offsets.',
        },
        {
            name: 'register',
            type: '(layer: IParallaxLayerRegistry) => void',
            descriptionKey: '',
            descriptionFallback: 'Registers a layer provided by an OrigamParallaxLayer child. Called automatically via provide/inject on mount.',
        },
        {
            name: 'unregister',
            type: '(id: symbol) => void',
            descriptionKey: '',
            descriptionFallback: 'Removes a layer by its unique symbol ID. Called on layer unmount.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Vertical parallax with multiple layers',
            code: `<template>
  <origam-parallax height="400px" @progress="onProgress">
    <origam-parallax-layer :speed="0.3" tag="img" src="/bg.jpg" />
    <origam-parallax-layer :speed="0.6" tag="img" src="/mid.png" />
    <div class="content">Foreground content</div>
  </origam-parallax>
</template>

<script setup lang="ts">
function onProgress(p: number) {
  console.log('scroll progress', p)
}
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Mouse-driven parallax (direction both)',
            code: `<origam-parallax direction="both" easing="spring">
  <origam-parallax-layer :speed="0.4" tag="img" src="/card-bg.jpg" />
  <span class="label">Hover to move layers</span>
</origam-parallax>`,
            lang: 'vue',
        },
    ],
    related: ['use-css-support', 'use-resize-observer', 'use-event-listener'],
    consumedInterfaces: ['IParallaxLayerRegistry'],
}
