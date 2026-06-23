/**
 * /components/parallax-layer — full documentation data for OrigamParallaxLayer.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Parallax/parallax-layer.interface.ts  (props)
 *   - packages/ds/src/components/Parallax/OrigamParallaxLayer.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/parallax.json                       (CSS tokens)
 *
 * Sub-component of Parallax (multi-layer API). Must be nested inside <origam-parallax>.
 * Uses the ORIGAM_PARALLAX_LAYER_KEY injection context (distinct from the legacy
 * ORIGAM_PARALLAX_KEY used by ParallaxElement).
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const PARALLAX_LAYER_DOC: IComponentDoc = {
    slug: 'parallax-layer',
    name: 'ParallaxLayer',
    tag: 'origam-parallax-layer',
    icon: 'mdi-layers-outline',
    category: 'Media',
    descriptionKey: 'components.catalog.parallax_layer.description',
    descriptionFallback: 'Depth layer inside a Parallax container. Each layer registers a speed multiplier with the parent and is driven frame-by-frame via a rAF loop (JS path) or CSS scroll-driven animations (CSS path).',
    packageNote: 'origam',
    parentSlug: 'parallax',
    storyUrl: 'http://localhost:6006/?story=components-parallax--design',
    docUrl: 'http://localhost:4000/components/Parallax/OrigamParallax',

    family: [],

    related: [
        {
            slug: 'parallax',
            name: 'Parallax',
            kind: 'component',
            descriptionKey: 'components.catalog.parallax.description',
            descriptionFallback: 'Host parallax container required by ParallaxLayer.'
        },
        {
            slug: 'parallax-element',
            name: 'ParallaxElement',
            kind: 'component',
            descriptionKey: 'components.catalog.parallax_element.description',
            descriptionFallback: 'Alternative single-element transform API for the legacy mouse/scroll path.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────────
        {
            name: 'speed',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.parallax_layer.props.speed.description',
            descriptionFallback: 'Parallax speed multiplier: 0 = fixed, 0.5 = half scroll speed (far background), 1 = neutral, >1 = faster than scroll (foreground). Negative values reverse the direction.'
        },
        {
            name: 'offsetX',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.parallax_layer.props.offset_x.description',
            descriptionFallback: 'Static horizontal offset in px applied on top of the parallax translation. Useful to nudge a layer without changing its speed.'
        },
        {
            name: 'offsetY',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.parallax_layer.props.offset_y.description',
            descriptionFallback: 'Static vertical offset in px applied on top of the parallax translation.'
        },
        {
            name: 'zIndex',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_layer.props.z_index.description',
            descriptionFallback: 'Optional z-index override. By default layers stack in document order.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.parallax_layer.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.parallax_layer.slots.default.description',
            descriptionFallback: 'Content of this depth layer. Any markup is valid — images, text, decorative elements.'
        }
    ],

    examples: [
        {
            titleKey: 'components.parallax_layer.examples.scroll.title',
            titleFallback: 'Scroll-driven multi-layer',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="scroll" :height="500">
    <!-- far background — slow -->
    <origam-parallax-layer :speed="0.2">
      <img src="/sky.jpg" alt="Sky" style="width: 100%; height: 130%;" />
    </origam-parallax-layer>
    <!-- mid layer -->
    <origam-parallax-layer :speed="0.5" :offset-y="-20">
      <img src="/mountains.png" alt="Mountains" style="width: 100%;" />
    </origam-parallax-layer>
    <!-- foreground — faster than scroll -->
    <origam-parallax-layer :speed="1.5" :z-index="2">
      <h2>Hero title</h2>
    </origam-parallax-layer>
  </origam-parallax>
</template>`
        },
        {
            titleKey: 'components.parallax_layer.examples.css_path.title',
            titleFallback: 'CSS scroll-driven (progressive enhancement)',
            lang: 'vue',
            code: `<template>
  <!-- When animation-timeline: scroll() is supported, ParallaxLayer uses CSS
       scroll-driven animations automatically (no rAF, better performance). -->
  <origam-parallax event="scroll" :height="600">
    <origam-parallax-layer :speed="0.4" class="origam-parallax__layer--css-driven">
      <img src="/bg.jpg" alt="Background" style="width: 100%; height: 150%;" />
    </origam-parallax-layer>
  </origam-parallax>
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-parallax__layer',
        svgViewBox: '0 0 600 240',
        svgTitle: 'Anatomy of OrigamParallaxLayer',
        svgDesc: 'Schematic of the ParallaxLayer component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="600" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="560" height="200" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="300" y="14" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="600">origam-parallax (host)</text>
  <rect x="40" y="50" width="520" height="50" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="300" y="80" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Layer — speed 0.2 (background)</text>
  <rect x="40" y="115" width="520" height="50" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1.5"/>
  <text x="300" y="145" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Layer — speed 1 (neutral)</text>
  <rect x="40" y="178" width="520" height="28" rx="4" fill="var(--origam-color__surface---disabled, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="300" y="197" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Layer — speed 1.5 (foreground)</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="48" cy="123" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="127" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="48" cy="186" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="190" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-parallax-layer&gt;</code> — 4 parts: ① host parallax, ② background layer (low speed), ③ neutral layer (speed 1), ④ foreground layer (high speed). Each layer is positioned <code>absolute; inset: 0</code> and driven by a shared rAF loop or CSS scroll-driven animation.`,
        legend: [
            {
                num: 1,
                cls: '.origam-parallax (host)',
                descriptionKey: 'components.parallax_layer.anatomy.host',
                descriptionFallback: 'Parent OrigamParallax providing the injection context. Owns the scroll/mouse listeners and the rAF loop. Layers register on mount and unregister on unmount.'
            },
            {
                num: 2,
                cls: '.origam-parallax__layer (background)',
                descriptionKey: 'components.parallax_layer.anatomy.layer_bg',
                descriptionFallback: 'Background layer (speed < 1). Positioned absolute; inset: 0. Moves slower than the scroll — creates the depth illusion.'
            },
            {
                num: 3,
                cls: '.origam-parallax__layer (neutral)',
                descriptionKey: 'components.parallax_layer.anatomy.layer_neutral',
                descriptionFallback: 'Neutral layer (speed = 1). Moves with the scroll. When the CSS scroll-driven path is active, carries .origam-parallax__layer--css-driven.'
            },
            {
                num: 4,
                cls: '.origam-parallax__layer (foreground)',
                descriptionKey: 'components.parallax_layer.anatomy.layer_fg',
                descriptionFallback: 'Foreground layer (speed > 1). Moves faster than the scroll. Under prefers-reduced-motion: reduce, carries .origam-parallax__layer--reduced-motion and transform is locked to translate3d(offsetX, offsetY, 0).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- Must be nested inside origam-parallax -->
<origam-parallax event="scroll" :height="500">
  <component
    :is="tag"
    ref="layerRef"
    class="origam-parallax__layer"
    :class="{
      'origam-parallax__layer--css-driven': parallax.cssScrollDriven.value,
      'origam-parallax__layer--reduced-motion': parallax.reducedMotion.value
    }"
    :style="layerStyles"
  >
    <slot name="default" />
  </component>
</origam-parallax>`,
        classes: [
            {
                cls: 'origam-parallax__layer',
                descriptionKey: 'components.parallax_layer.anatomy.root_class',
                descriptionFallback: 'Root BEM element. position: absolute; inset: 0. will-change: transform. transform-origin: center center.'
            },
            {
                cls: 'origam-parallax__layer--css-driven',
                descriptionKey: 'components.parallax_layer.anatomy.css_driven',
                descriptionFallback: 'Present when animation-timeline: scroll() is supported. Enables the CSS scroll-driven animation keyframe instead of the JS rAF path.'
            },
            {
                cls: 'origam-parallax__layer--reduced-motion',
                descriptionKey: 'components.parallax_layer.anatomy.reduced_motion',
                descriptionFallback: 'Present under prefers-reduced-motion: reduce. Locks transform to the static offset (no movement).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-parallax__layer---will-change',
            defaultValue: 'transform',
            descriptionKey: 'components.parallax_layer.css_vars.will_change',
            descriptionFallback: 'CSS will-change hint for the layer. Defaults to transform to promote layers to compositor.'
        },
        {
            name: '--origam-parallax__layer---transform-origin',
            defaultValue: 'center center',
            descriptionKey: 'components.parallax_layer.css_vars.transform_origin',
            descriptionFallback: 'Transform origin for each layer element.'
        },
        {
            name: '--origam-parallax__layer---speed',
            defaultValue: '1',
            descriptionKey: 'components.parallax_layer.css_vars.speed',
            descriptionFallback: 'Speed multiplier used by the CSS scroll-driven keyframe (from 0 to 100% view coverage).'
        },
        {
            name: '--origam-parallax__layer---offset-x',
            defaultValue: '0px',
            descriptionKey: 'components.parallax_layer.css_vars.offset_x',
            descriptionFallback: 'Static X offset applied in the reduced-motion keyframe.'
        },
        {
            name: '--origam-parallax__layer---offset-y',
            defaultValue: '0px',
            descriptionKey: 'components.parallax_layer.css_vars.offset_y',
            descriptionFallback: 'Static Y offset applied in the reduced-motion keyframe.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.parallax_layer.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.parallax_layer.a11y.reduced_motion',
                noteFallback: 'Under prefers-reduced-motion: reduce, the CSS keyframe animation and the rAF loop are both disabled. The layer is rendered at its static offset (offsetX, offsetY) without any movement.'
            },
            {
                noteKey: 'components.parallax_layer.a11y.no_role',
                noteFallback: 'ParallaxLayer is a purely presentational layer. All semantic content must come from the slotted markup.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/parallax.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'parallax.layer.will-change',
                value: 'transform',
                type: 'other',
                descriptionKey: 'components.parallax_layer.tokens.will_change',
                descriptionFallback: 'CSS will-change hint for each layer — promotes to compositor.'
            },
            {
                tokenPath: 'parallax.layer.transform-origin',
                value: 'center center',
                type: 'other',
                descriptionKey: 'components.parallax_layer.tokens.transform_origin',
                descriptionFallback: 'Default transform-origin shared by all layers.'
            },
            {
                tokenPath: 'parallax.transition-easing-spring',
                value: 'cubic-bezier(0.16, 1, 0.3, 1)',
                type: 'cubicBezier',
                descriptionKey: 'components.parallax_layer.tokens.easing_spring',
                descriptionFallback: 'Spring-like easing curve available for the multi-layer scroll path.'
            }
        ]
    } satisfies IComponentTokens
}
