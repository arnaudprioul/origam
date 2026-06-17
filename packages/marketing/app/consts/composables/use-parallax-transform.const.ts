import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PARALLAX_TRANSFORM_DOC: IComposableDoc = {
    slug: 'use-parallax-transform',
    name: 'useParallaxTransform',
    domain: 'Parallax',
    icon: 'mdi-layers-triple-outline',
    descriptionKey: '',
    descriptionFallback: 'Computes CSS transform strings for parallax layer elements based on normalised mouse-position coordinates. Supports five transform types: translate, rotate, depth (3-D tilt), depth-inv (inverted tilt), scale, scale-x, and scale-y. Consumed by OrigamParallax to animate child layers.',
    signature: `function useParallaxTransform(
  props: IParallaxElementProps
): {
  strength: ComputedRef<number>
  transformStyles: (x: number, y: number) => string | undefined
}`,
    params: [
        {
            name: 'props',
            type: 'IParallaxElementProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props of a parallax layer element. Reads `type` (PARALLAX_ELEMENT_TYPE enum), `strength` (movement intensity, default 10), and `axis` (AXIS enum, used for rotate type to constrain movement to a single axis).',
        },
    ],
    returns: [
        {
            name: 'strength',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Resolved movement strength. For depth / depth-inv types the absolute value is taken so the depth always projects forward.',
        },
        {
            name: 'transformStyles',
            type: '(x: number, y: number) => string | undefined',
            descriptionKey: '',
            descriptionFallback: 'Function that accepts normalised mouse coordinates (typically in [-1, 1]) and returns a CSS transform string. Returns undefined when the type does not match any known case.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Manual parallax layer (custom wrapper)',
            code: `<script setup lang="ts">
import { useParallaxTransform } from 'origam'
import { PARALLAX_ELEMENT_TYPE } from 'origam/enums'
import { ref, computed } from 'vue'

const props = {
    type: PARALLAX_ELEMENT_TYPE.TRANSLATE,
    strength: 20
}

const { transformStyles } = useParallaxTransform(props)

const mouse = ref({ x: 0, y: 0 })
const layerStyle = computed(() => ({
    transform: transformStyles(mouse.value.x, mouse.value.y)
}))
</script>

<template>
  <div :style="layerStyle">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Using OrigamParallax (recommended)',
            code: `<template>
  <origam-parallax>
    <origam-parallax-element type="translate" :strength="15">
      <img src="/hero-bg.jpg" alt="" />
    </origam-parallax-element>
    <origam-parallax-element type="depth" :strength="8">
      <h1>Welcome</h1>
    </origam-parallax-element>
  </origam-parallax>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-css-support'],
    consumedInterfaces: ['IParallaxElementProps'],
    noteFallback: 'useParallaxTransform is a pure computation helper — it has no side effects and does not touch the DOM. OrigamParallax owns the mousemove listener and passes the normalised coordinates down to each layer via this composable.',
}
