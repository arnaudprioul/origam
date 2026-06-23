/**
 * /components/parallax — full documentation data for OrigamParallax.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Parallax/parallax.interface.ts
 * cross-checked against packages/ds/src/components/Parallax/OrigamParallax.vue.
 * Sub-components: OrigamParallaxElement, OrigamParallaxLayer.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const PARALLAX_DOC: IComponentDoc = {
    slug: 'parallax',
    name: 'Parallax',
    tag: 'origam-parallax',
    icon: 'mdi-layers-triple-outline',
    category: 'Media',
    descriptionKey: 'components.catalog.parallax.description',
    descriptionFallback: 'Scroll-driven parallax effect for images and layers.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-parallax--design',
    docUrl: 'http://localhost:4000/components/Parallax/OrigamParallax',

    family: [
        {
            slug: 'parallax-element',
            name: 'ParallaxElement',
            descriptionKey: 'components.catalog.parallax_element.description',
            descriptionFallback: 'Individually scrolling element inside a Parallax.'
        },
        {
            slug: 'parallax-layer',
            name: 'ParallaxLayer',
            descriptionKey: 'components.catalog.parallax_layer.description',
            descriptionFallback: 'Depth layer inside a Parallax container.'
        }
    ],

    props: [
        {
            name: 'event',
            type: { label: "'scroll' | 'move' | 'audio'", slug: '', kind: 'primitive' },
            defaultValue: "'move'",
            descriptionKey: 'components.parallax.props.event.description',
            descriptionFallback: "Driving event for the parallax effect: mouse move, scroll, or audio data."
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.parallax.props.active.description',
            descriptionFallback: 'Activates or freezes the mouse-driven movement mode.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.parallax.props.disabled.description',
            descriptionFallback: 'Forces the parallax translation to 0 regardless of scroll or events.'
        },
        {
            name: 'direction',
            type: { label: "'vertical' | 'horizontal' | 'both'", slug: '', kind: 'primitive' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.parallax.props.direction.description',
            descriptionFallback: 'Axis of the parallax effect. Both enables 2D mouse tracking.'
        },
        {
            name: 'speed',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.5',
            descriptionKey: 'components.parallax.props.speed.description',
            descriptionFallback: 'Global speed multiplier for single-layer mode (0 = fixed, 1 = scroll speed, >1 = faster).'
        },
        {
            name: 'easing',
            type: { label: "'linear' | 'ease-out' | 'spring' | string", slug: '', kind: 'primitive' },
            defaultValue: "'linear'",
            descriptionKey: 'components.parallax.props.easing.description',
            descriptionFallback: 'Easing curve for the parallax animation. Accepts tokens or any CSS timing function.'
        },
        {
            name: 'duration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1000',
            descriptionKey: 'components.parallax.props.duration.description',
            descriptionFallback: 'Animation duration in milliseconds for the legacy mouse/transition path.'
        },
        {
            name: 'perspective',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1000',
            descriptionKey: 'components.parallax.props.perspective.description',
            descriptionFallback: 'CSS perspective depth value for the 3D transform context.'
        },
        {
            name: 'threshold',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.parallax.props.threshold.description',
            descriptionFallback: 'Proportion (0–1) of the host that must enter the viewport before the effect activates.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.parallax.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax.props.color.description',
            descriptionFallback: 'Text color applied to the parallax root.'
        },
        {
            name: 'bgColor',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax.props.bg_color.description',
            descriptionFallback: 'Background color applied to the parallax root.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax.props.height.description',
            descriptionFallback: 'Height of the parallax container.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax.props.width.description',
            descriptionFallback: 'Width of the parallax container.'
        }
    ],

    emits: [
        {
            event: 'enter',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.parallax.emits.enter.description',
            descriptionFallback: 'Fired when the mouse enters the parallax area (move mode).'
        },
        {
            event: 'leave',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.parallax.emits.leave.description',
            descriptionFallback: 'Fired when the mouse leaves the parallax area (move mode).'
        },
        {
            event: 'scroll-progress',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.parallax.emits.scroll_progress.description',
            descriptionFallback: 'Fired on scroll with the normalised progress value (0–1).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.parallax.slots.default.description',
            descriptionFallback: 'Content rendered inside the parallax container. Add ParallaxLayer or ParallaxElement children here.'
        }
    ],

    examples: [
        {
            titleKey: 'components.parallax.examples.scroll.title',
            titleFallback: 'Scroll-driven parallax',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="scroll" :height="400">
    <origam-parallax-layer :speed="0.3">
      <img src="/bg.jpg" alt="Background" style="width: 100%; height: 120%;" />
    </origam-parallax-layer>
    <origam-parallax-layer :speed="1">
      <h2>Foreground content</h2>
    </origam-parallax-layer>
  </origam-parallax>
</template>`
        },
        {
            titleKey: 'components.parallax.examples.mouse.title',
            titleFallback: 'Mouse-driven parallax',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="move" direction="both" :height="300">
    <origam-parallax-element :strength="20">
      <div class="card">Hover me</div>
    </origam-parallax-element>
  </origam-parallax>
</template>`
        },
        {
            titleKey: 'components.parallax.examples.single_layer.title',
            titleFallback: 'Single-layer (speed prop)',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="scroll" :speed="0.4" :height="500">
    <img src="/hero.jpg" alt="Hero" style="width: 100%; height: 130%;" />
  </origam-parallax>
</template>`
        }
    ]
}
