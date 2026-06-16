/**
 * /components/parallax-element — full documentation data for OrigamParallaxElement.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Parallax/parallax-element.interface.ts  (props)
 *   - packages/ds/src/components/Parallax/OrigamParallaxElement.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/parallax.json                         (CSS tokens)
 *
 * Sub-component of Parallax — must be nested inside <origam-parallax>.
 * Uses the legacy mouse/audio/scroll ORIGAM_PARALLAX_KEY injection context.
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

export const PARALLAX_ELEMENT_DOC: IComponentDoc = {
    slug: 'parallax-element',
    name: 'ParallaxElement',
    tag: 'origam-parallax-element',
    icon: 'mdi-layers-outline',
    category: 'Media',
    descriptionKey: 'components.catalog.parallax_element.description',
    descriptionFallback: 'Individually moving element inside a Parallax container. Driven by mouse position, scroll or audio data. Uses translate, rotate, scale or opacity transforms.',
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
            descriptionFallback: 'Scroll-driven parallax effect for images and layers. Host component required by ParallaxElement.'
        },
        {
            slug: 'parallax-layer',
            name: 'ParallaxLayer',
            kind: 'component',
            descriptionKey: 'components.catalog.parallax_layer.description',
            descriptionFallback: 'Depth layer inside a Parallax container. Alternative multi-layer API.'
        }
    ],

    props: [
        // ── IParallaxElementTypeProps ──────────────────────────────────────
        {
            name: 'type',
            type: { label: "TParallaxElementType", slug: '', kind: 'primitive' },
            defaultValue: "'translate'",
            descriptionKey: 'components.parallax_element.props.type.description',
            descriptionFallback: "Transform type applied by the element: 'translate', 'rotate', 'scale' or 'opacity'."
        },
        // ── Own props ──────────────────────────────────────────────────────
        {
            name: 'transformOrigin',
            type: { label: 'TAnchor | string', slug: '', kind: 'primitive' },
            defaultValue: "'center'",
            descriptionKey: 'components.parallax_element.props.transform_origin.description',
            descriptionFallback: 'CSS transform-origin value, e.g. "center", "top left". Passed directly to the transform CSS property.'
        },
        {
            name: 'originX',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '50',
            descriptionKey: 'components.parallax_element.props.origin_x.description',
            descriptionFallback: 'Horizontal reference point (0–100 %) for movement calculation relative to the parallax container.'
        },
        {
            name: 'originY',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '50',
            descriptionKey: 'components.parallax_element.props.origin_y.description',
            descriptionFallback: 'Vertical reference point (0–100 %) for movement calculation relative to the parallax container.'
        },
        {
            name: 'strength',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '10',
            descriptionKey: 'components.parallax_element.props.strength.description',
            descriptionFallback: 'Magnitude of the transform effect in pixels (translate) or degrees (rotate). Larger values produce more intense movement.'
        },
        {
            name: 'axis',
            type: { label: "'x' | 'y'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.axis.description',
            descriptionFallback: "Constrains the movement to a single axis: 'x' (horizontal only) or 'y' (vertical only). When omitted both axes are active."
        },
        {
            name: 'maxX',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.max_x.description',
            descriptionFallback: 'Maximum horizontal translation in pixels. Clamps the computed X offset.'
        },
        {
            name: 'maxY',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.max_y.description',
            descriptionFallback: 'Maximum vertical translation in pixels. Clamps the computed Y offset.'
        },
        {
            name: 'minX',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.min_x.description',
            descriptionFallback: 'Minimum horizontal translation in pixels. Clamps the computed X offset.'
        },
        {
            name: 'minY',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.min_y.description',
            descriptionFallback: 'Minimum vertical translation in pixels. Clamps the computed Y offset.'
        },
        {
            name: 'cycle',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.parallax_element.props.cycle.description',
            descriptionFallback: 'Number of cyclic loops for the movement pattern. 0 = linear, ≥1 = cyclic sinusoidal path.'
        },
        {
            name: 'audioIndex',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '50',
            descriptionKey: 'components.parallax_element.props.audio_index.description',
            descriptionFallback: 'Index into the audio frequency array (0–255) used as the movement driver when event="audio" on the host Parallax.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.parallax_element.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        },
        // ── IBorderProps ───────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.parallax_element.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default border or a CSS shorthand string.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean. true = theme default; pill = full-round.'
        },
        // ── IElevationProps ────────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the element root.'
        },
        // ── IPaddingProps ──────────────────────────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.padding.description',
            descriptionFallback: 'Shorthand CSS padding applied to the root element.'
        },
        // ── IMarginProps ───────────────────────────────────────────────────
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.parallax_element.props.margin.description',
            descriptionFallback: 'Shorthand CSS margin applied to the root element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.parallax_element.slots.default.description',
            descriptionFallback: 'Content to animate. Any markup placed here is translated/rotated/scaled by the parallax effect.'
        }
    ],

    examples: [
        {
            titleKey: 'components.parallax_element.examples.mouse.title',
            titleFallback: 'Mouse-driven element',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="move" direction="both" :height="400">
    <origam-parallax-element :strength="20" type="translate">
      <div class="card">Hover me</div>
    </origam-parallax-element>
    <origam-parallax-element :strength="8" type="rotate" :origin-x="30" :origin-y="40">
      <img src="/star.svg" alt="Floating star" style="width: 64px;" />
    </origam-parallax-element>
  </origam-parallax>
</template>`
        },
        {
            titleKey: 'components.parallax_element.examples.axis.title',
            titleFallback: 'Constrained axis',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="scroll" :height="300">
    <origam-parallax-element axis="y" :strength="30">
      <img src="/bg-layer.png" alt="" style="width: 100%;" />
    </origam-parallax-element>
  </origam-parallax>
</template>`
        },
        {
            titleKey: 'components.parallax_element.examples.clamped.title',
            titleFallback: 'Clamped movement',
            lang: 'vue',
            code: `<template>
  <origam-parallax event="move" :height="400">
    <origam-parallax-element :strength="50" :max-x="20" :max-y="20" :min-x="-20" :min-y="-20">
      <span>Clamped ±20 px</span>
    </origam-parallax-element>
  </origam-parallax>
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-parallax-element',
        svgViewBox: '0 0 600 220',
        svgTitle: 'Anatomy of OrigamParallaxElement',
        svgDesc: 'Schematic of the ParallaxElement component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="600" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="30" width="540" height="160" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="300" y="20" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="600">origam-parallax (host)</text>
  <rect x="80" y="60" width="440" height="110" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1.5"/>
  <text x="300" y="90" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-parallax-element</text>
  <rect x="140" y="100" width="320" height="50" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="300" y="130" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot — user content</text>
  <circle cx="38" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="88" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="88" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="148" cy="108" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="148" y="112" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="300" y="198" font-size="8" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Transform driven by mouse position / scroll / audio via inject(ORIGAM_PARALLAX_KEY)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-parallax-element&gt;</code> — 3 parts: ① host container, ② root element (receives transform style), ③ default slot content.`,
        legend: [
            {
                num: 1,
                cls: '.origam-parallax (host)',
                descriptionKey: 'components.parallax_element.anatomy.host',
                descriptionFallback: 'Parent OrigamParallax required as the injection context. Provides movement data via provide(ORIGAM_PARALLAX_KEY).'
            },
            {
                num: 2,
                cls: '.origam-parallax-element',
                descriptionKey: 'components.parallax_element.anatomy.root',
                descriptionFallback: 'Root element. Receives the computed CSS transform (translate/rotate/scale/opacity) and transition parameters on each animation frame.'
            },
            {
                num: 3,
                cls: '#default slot',
                descriptionKey: 'components.parallax_element.anatomy.slot',
                descriptionFallback: 'User content rendered inside the animated root. Any markup is valid.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- Must be nested inside origam-parallax -->
<origam-parallax event="move" direction="both" :height="400">
  <!-- root receives computed transform + transition styles -->
  <component :is="tag" class="origam-parallax-element" :style="parallaxElementStyles">
    <slot name="default" />
  </component>
</origam-parallax>`,
        classes: [
            {
                cls: 'origam-parallax-element',
                descriptionKey: 'components.parallax_element.anatomy.root',
                descriptionFallback: 'Root block element. Renders as the tag prop value (default: div). Carries all transform and border/rounded/elevation classes.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-parallax---perspective',
            defaultValue: '1000px',
            descriptionKey: 'components.parallax_element.css_vars.perspective',
            descriptionFallback: 'CSS perspective depth inherited from the host Parallax. Applied on the parent container, not the element itself.'
        },
        {
            name: '--origam-parallax__element---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.parallax_element.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for the transform applied to each element. Sourced from parallax.element.transition-duration token.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.parallax_element.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.parallax_element.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed parallaxElementStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.parallax_element.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.parallax_element.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.parallax_element.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.parallax_element.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.parallax_element.a11y.reduced_motion',
                noteFallback: 'The transform transition is inherited from the host Parallax. Under prefers-reduced-motion: reduce, the host disables transitions, so all element movements stop automatically.'
            },
            {
                noteKey: 'components.parallax_element.a11y.no_role',
                noteFallback: 'ParallaxElement is a presentational wrapper — it carries no ARIA role. Accessible text must come from the slotted content.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/parallax.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'parallax.element.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.parallax_element.tokens.transition_duration',
                descriptionFallback: 'Transition duration applied to the per-element CSS transform.'
            },
            {
                tokenPath: 'parallax.perspective',
                value: '1000px',
                type: 'other',
                descriptionKey: 'components.parallax_element.tokens.perspective',
                descriptionFallback: 'CSS perspective value set on the host Parallax container.'
            },
            {
                tokenPath: 'parallax.transform-origin',
                value: 'center center',
                type: 'other',
                descriptionKey: 'components.parallax_element.tokens.transform_origin',
                descriptionFallback: 'Default transform-origin for the host container. Elements can override via the transformOrigin prop.'
            }
        ]
    } satisfies IComponentTokens
}
