/**
 * /components/carousel — full documentation data for OrigamCarousel.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Carousel/carousel.interface.ts  (props)
 *   - packages/ds/src/components/Carousel/OrigamCarousel.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/carousel.json                 (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CAROUSEL_DOC: IComponentDoc = {
    slug: 'carousel',
    name: 'Carousel',
    tag: 'origam-carousel',
    icon: 'mdi-view-carousel',
    category: 'Display',
    descriptionKey: 'components.catalog.carousel.description',
    descriptionFallback: 'Sliding window component for cycling through a set of items, with pagination dots, optional progress bar, auto-play interval and keyboard navigation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-carousel--design',
    docUrl: 'http://localhost:4000/components/Carousel/OrigamCarousel',

    family: [
        {
            slug: 'carousel-item',
            name: 'CarouselItem',
            descriptionKey: 'components.catalog.carousel_item.description',
            descriptionFallback: 'A single slide inside OrigamCarousel — wraps OrigamWindowItem and OrigamImg.'
        }
    ],

    related: [
        {
            slug: 'window',
            name: 'Window',
            kind: 'component',
            descriptionKey: 'components.catalog.window.description',
            descriptionFallback: 'Low-level sliding container that Carousel delegates rendering to.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'cycle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel.props.cycle.description',
            descriptionFallback: 'Enables automatic slide cycling. Uses the interval prop to control timing.'
        },
        {
            name: 'delimiterIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-circle'",
            descriptionKey: 'components.carousel.props.delimiter_icon.description',
            descriptionFallback: 'Icon rendered inside each pagination dot button.'
        },
        {
            name: 'hideDelimiters',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel.props.hide_delimiters.description',
            descriptionFallback: 'Hides the pagination dot bar entirely.'
        },
        {
            name: 'hideDelimiterBackground',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel.props.hide_delimiter_background.description',
            descriptionFallback: 'Removes the semi-transparent background from the pagination dot strip.'
        },
        {
            name: 'interval',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '6000',
            descriptionKey: 'components.carousel.props.interval.description',
            descriptionFallback: 'Auto-play interval in milliseconds. Only active when cycle=true.'
        },
        {
            name: 'progress',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel.props.progress.description',
            descriptionFallback: 'Displays a thin progress bar at the top that fills over the interval duration. Resets on each slide change.'
        },
        {
            name: 'verticalDelimiters',
            type: { label: "boolean | 'left' | 'right'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel.props.vertical_delimiters.description',
            descriptionFallback: 'Renders the pagination dots vertically on the left or right edge.'
        },
        // ── IWindowProps (delegated to OrigamWindow) ───────────────────
        {
            name: 'modelValue',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.model_value.description',
            descriptionFallback: 'Currently active slide value. Use with v-model for two-way binding.'
        },
        {
            name: 'showArrows',
            type: { label: "boolean | 'hover'", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.carousel.props.show_arrows.description',
            descriptionFallback: "Shows prev/next navigation arrows. Pass 'hover' to show only on pointer hover."
        },
        {
            name: 'continuous',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.carousel.props.continuous.description',
            descriptionFallback: 'Allows wrapping around from the last item to the first and vice versa.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.carousel.props.mandatory.description',
            descriptionFallback: 'Keeps at least one slide selected at all times.'
        },
        {
            name: 'direction',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.carousel.props.direction.description',
            descriptionFallback: 'Slide transition direction. horizontal or vertical.'
        },
        // ── IBgColorProps / IColorProps ────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.bg_color.description',
            descriptionFallback: 'Background color applied to the pagination dot strip (controls area).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.color.description',
            descriptionFallback: 'Active dot color intent.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '500',
            descriptionKey: 'components.carousel.props.height.description',
            descriptionFallback: 'Height of the carousel in pixels or a CSS length.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.width.description',
            descriptionFallback: 'Explicit width override.'
        },
        // ── IActiveProps ───────────────────────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean | object', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.active.description',
            descriptionFallback: 'Surface applied to the active pagination dot. Pass an object for customised state styling.'
        },
        // ── IHoverProps ────────────────────────────────────────────────
        {
            name: 'hover',
            type: { label: 'boolean | object', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel.props.hover.description',
            descriptionFallback: 'Surface applied to pagination dots on pointer hover.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'unknown', slug: '', kind: 'primitive' },
            descriptionKey: 'components.carousel.emits.update_model_value.description',
            descriptionFallback: 'Fired when the active slide changes. Carries the new slide value.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ group }',
            descriptionKey: 'components.carousel.slots.default.description',
            descriptionFallback: 'Container for OrigamCarouselItem elements. Receives group context from OrigamWindow.'
        },
        {
            slot: 'additional',
            slotProps: '{ group }',
            descriptionKey: 'components.carousel.slots.additional.description',
            descriptionFallback: 'Renders after the slide content area. By default contains the pagination dots and progress bar. Replace to take full control.'
        },
        {
            slot: 'item',
            slotProps: '{ props, item, index }',
            descriptionKey: 'components.carousel.slots.item.description',
            descriptionFallback: 'Replaces all pagination dot buttons at once. Receives props (bind to trigger), item and index.'
        },
        {
            slot: 'item.{index}',
            slotProps: '{ props, item }',
            descriptionKey: 'components.carousel.slots.item_n.description',
            descriptionFallback: 'Replaces the pagination dot at position {index}. Useful for custom per-slide indicators.'
        },
        {
            slot: 'progress',
            slotProps: '{ percent }',
            descriptionKey: 'components.carousel.slots.progress.description',
            descriptionFallback: 'Replaces the auto-play progress bar. Receives percent (0–100).'
        },
        {
            slot: 'prev',
            slotProps: '{ props, canMove }',
            descriptionKey: 'components.carousel.slots.prev.description',
            descriptionFallback: 'Replaces the previous-slide arrow button.'
        },
        {
            slot: 'next',
            slotProps: '{ props, canMove }',
            descriptionKey: 'components.carousel.slots.next.description',
            descriptionFallback: 'Replaces the next-slide arrow button.'
        },
        {
            slot: 'arrows',
            slotProps: '{ canMoveBack, canMoveForward, nextProps, prevProps }',
            descriptionKey: 'components.carousel.slots.arrows.description',
            descriptionFallback: 'Replaces both navigation arrows in one go. Useful to lay them out differently.'
        }
    ],

    examples: [
        {
            titleKey: 'components.carousel.examples.basic.title',
            titleFallback: 'Basic carousel',
            lang: 'vue',
            code: `<template>
  <origam-carousel height="300">
    <origam-carousel-item
      v-for="(src, i) in slides"
      :key="i"
      :src="src"
      cover
    />
  </origam-carousel>
</template>

<script setup lang="ts">
const slides = [
  'https://picsum.photos/seed/1/800/400',
  'https://picsum.photos/seed/2/800/400',
  'https://picsum.photos/seed/3/800/400'
]
</script>`
        },
        {
            titleKey: 'components.carousel.examples.cycle.title',
            titleFallback: 'Auto-play with progress',
            lang: 'vue',
            code: `<template>
  <origam-carousel
    cycle
    :interval="4000"
    progress
    height="280"
  >
    <origam-carousel-item
      v-for="n in 4"
      :key="n"
      :src="\`https://picsum.photos/seed/\${n}/800/400\`"
      cover
    />
  </origam-carousel>
</template>`
        },
        {
            titleKey: 'components.carousel.examples.custom_item.title',
            titleFallback: 'Custom slide content',
            lang: 'vue',
            code: `<template>
  <origam-carousel height="260" hide-delimiter-background>
    <origam-carousel-item v-for="slide in slides" :key="slide.id">
      <div class="slide-content">
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.subtitle }}</p>
      </div>
    </origam-carousel-item>
  </origam-carousel>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { height: 180, continuous: true, showArrows: true }, slotContent: '' },
        { label: 'no arrows', props: { height: 180, showArrows: false }, slotContent: '' },
        { label: 'vertical dots', props: { height: 180, verticalDelimiters: 'left' }, slotContent: '' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-carousel',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamCarousel',
        svgDesc: 'Schematic of the Carousel component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="160" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="108" font-size="13" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Slide content (#default slot)</text>
  <rect x="20" y="160" width="660" height="20" rx="0" fill="rgba(0,0,0,0.38)"/>
  <circle cx="320" cy="170" r="5" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="340" cy="170" r="5" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="360" cy="170" r="5" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <rect x="20" y="20" width="32" height="160" rx="4" fill="rgba(0,0,0,0.18)"/>
  <text x="36" y="105" font-size="18" fill="#fff" text-anchor="middle">‹</text>
  <rect x="648" y="20" width="32" height="160" rx="4" fill="rgba(0,0,0,0.18)"/>
  <text x="664" y="105" font-size="18" fill="#fff" text-anchor="middle">›</text>
  <rect x="20" y="20" width="660" height="4" rx="0" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.7"/>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="28" cy="164" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="28" y="168" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="340" cy="164" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="340" y="168" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="36" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="36" y="36" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="350" cy="24" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="28" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="350" y="220" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">⑤ progress bar is absolutely positioned at top; ② controls strip sits at bottom</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-carousel&gt;</code> — 5 internal parts.`,
        legend: [
            {
                num: 1,
                cls: '.origam-carousel',
                descriptionKey: 'components.carousel.anatomy.root',
                descriptionFallback: 'Root element. Delegates slide rendering to an inner OrigamWindow.'
            },
            {
                num: 2,
                cls: '.origam-carousel__controls',
                descriptionKey: 'components.carousel.anatomy.controls',
                descriptionFallback: 'Absolute strip at the bottom. Contains the delimiter (dot) buttons. Hidden when hideDelimiters=true.'
            },
            {
                num: 3,
                cls: '.origam-carousel__controls-item',
                descriptionKey: 'components.carousel.anatomy.controls_item',
                descriptionFallback: 'One pagination dot — an OrigamBtn rendered per slide. Gets --active modifier when its slide is selected.'
            },
            {
                num: 4,
                cls: '.origam-carousel__controls-item--active',
                descriptionKey: 'components.carousel.anatomy.controls_item_active',
                descriptionFallback: 'BEM modifier applied to the active dot. Icon opacity rises from 0.5 to 1.'
            },
            {
                num: 5,
                cls: '.origam-carousel__progress',
                descriptionKey: 'components.carousel.anatomy.progress',
                descriptionFallback: 'Absolute strip at the top. Wraps OrigamProgressLinear. Visible only when progress=true.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root wraps OrigamWindow -->
<origam-window class="origam-carousel">
  <!-- slide items projected here -->
  <slot name="default" />

  <!-- additional content: dots + progress -->
  <template #additional>
    <!-- pagination dots (hidden when hideDelimiters) -->
    <div class="origam-carousel__controls">
      <origam-btn
        v-for="(item, index) in items"
        :key="index"
        class="origam-carousel__controls-item"
      />
    </div>

    <!-- progress bar (visible when progress=true) -->
    <div class="origam-carousel__progress">
      <origam-progress-linear :model-value="progressPercent" />
    </div>
  </template>
</origam-window>`,
        classes: [
            { cls: 'origam-carousel', descriptionKey: 'components.carousel.anatomy.root', descriptionFallback: 'Root carousel element.' },
            { cls: 'origam-carousel__controls', descriptionKey: 'components.carousel.anatomy.controls', descriptionFallback: 'Pagination dots strip, absolutely positioned at the bottom.' },
            { cls: 'origam-carousel__controls-item', descriptionKey: 'components.carousel.anatomy.controls_item', descriptionFallback: 'Single pagination dot button.' },
            { cls: 'origam-carousel__controls-item--active', descriptionKey: 'components.carousel.anatomy.controls_item_active', descriptionFallback: 'Active state on the current slide dot.' },
            { cls: 'origam-carousel__progress', descriptionKey: 'components.carousel.anatomy.progress', descriptionFallback: 'Progress bar container, absolutely positioned at the top.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-carousel---overflow',
            defaultValue: 'hidden',
            descriptionKey: 'components.carousel.css_vars.overflow',
            descriptionFallback: 'Overflow mode of the carousel root.'
        },
        {
            name: '--origam-carousel---position',
            defaultValue: 'relative',
            descriptionKey: 'components.carousel.css_vars.position',
            descriptionFallback: 'CSS position of the root element.'
        },
        {
            name: '--origam-carousel---width',
            defaultValue: '100%',
            descriptionKey: 'components.carousel.css_vars.width',
            descriptionFallback: 'Root width.'
        },
        {
            name: '--origam-carousel__controls---background-color',
            defaultValue: 'rgba(0, 0, 0, 0.4)',
            descriptionKey: 'components.carousel.css_vars.controls_bg',
            descriptionFallback: 'Background of the pagination dots strip.'
        },
        {
            name: '--origam-carousel__controls---height',
            defaultValue: '50px',
            descriptionKey: 'components.carousel.css_vars.controls_height',
            descriptionFallback: 'Height of the controls strip.'
        },
        {
            name: '--origam-carousel__controls---z-index',
            defaultValue: '{zIndex.raised}',
            descriptionKey: 'components.carousel.css_vars.controls_z_index',
            descriptionFallback: 'Z-index of the controls strip, ensuring it renders above slide content.'
        },
        {
            name: '--origam-carousel__controls-item---opacity',
            defaultValue: '0.5',
            descriptionKey: 'components.carousel.css_vars.controls_item_opacity',
            descriptionFallback: 'Default icon opacity inside a pagination dot.'
        },
        {
            name: '--origam-carousel__controls-item---opacity-active',
            defaultValue: '1',
            descriptionKey: 'components.carousel.css_vars.controls_item_opacity_active',
            descriptionFallback: 'Icon opacity inside the active pagination dot.'
        },
        {
            name: '--origam-carousel__progress---position-top',
            defaultValue: '0',
            descriptionKey: 'components.carousel.css_vars.progress_position_top',
            descriptionFallback: 'Top offset of the progress bar. Set to auto and provide bottom to move it.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.carousel.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.carousel.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed carousel styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.carousel.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.carousel.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.carousel.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.carousel.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region'],
        keyboard: [
            {
                key: 'ArrowLeft / ArrowRight',
                actionKey: 'components.carousel.a11y.key_arrows',
                actionFallback: 'Navigates to the previous or next slide when focused on the carousel.'
            },
            {
                key: 'Tab',
                actionKey: 'components.carousel.a11y.key_tab',
                actionFallback: 'Moves focus through pagination dots and navigation arrows.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.carousel.a11y.key_activate',
                actionFallback: 'Activates the focused pagination dot or arrow button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.carousel.a11y.delimiter_label',
                noteFallback: 'Each pagination dot receives aria-label="Slide N of M" via useLocale t() — screen readers announce position.'
            },
            {
                noteKey: 'components.carousel.a11y.reduced_motion',
                noteFallback: 'Auto-play is suppressed when prefers-reduced-motion: reduce is detected (prefersReducedMotion() check on mount).'
            },
            {
                noteKey: 'components.carousel.a11y.pause_on_focus',
                noteFallback: 'The slide timer is cleared on unmount and restarted on modelValue change, but there is no explicit pause-on-focus — consider disabling cycle for keyboard-heavy contexts.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/carousel.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'carousel.controls.background-color',
                value: 'rgba(0, 0, 0, 0.4)',
                type: 'color',
                descriptionKey: 'components.carousel.tokens.controls_bg',
                descriptionFallback: 'Dot strip background. Transparent when hideDelimiterBackground=true.'
            },
            {
                tokenPath: 'carousel.controls.height',
                value: '50px',
                type: 'dimension',
                descriptionKey: 'components.carousel.tokens.controls_height',
                descriptionFallback: 'Height of the pagination dot strip.'
            },
            {
                tokenPath: 'carousel.controls-item.opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.carousel.tokens.dot_opacity',
                descriptionFallback: 'Icon opacity inside inactive dots.'
            },
            {
                tokenPath: 'carousel.controls-item.opacity-active',
                value: '{opacity.100}',
                type: 'number',
                descriptionKey: 'components.carousel.tokens.dot_opacity_active',
                descriptionFallback: 'Icon opacity inside the active dot.'
            },
            {
                tokenPath: 'carousel.transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.carousel.tokens.transition_duration',
                descriptionFallback: 'Slide transition duration.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'cycle',
                kind: 'switch',
                labelKey: 'components.carousel.playground.cycle',
                labelFallback: 'Auto-play',
                defaultValue: false
            },
            {
                prop: 'interval',
                kind: 'number',
                labelKey: 'components.carousel.playground.interval',
                labelFallback: 'Interval (ms)',
                defaultValue: 6000
            },
            {
                prop: 'progress',
                kind: 'switch',
                labelKey: 'components.carousel.playground.progress',
                labelFallback: 'Progress bar',
                defaultValue: false
            },
            {
                prop: 'showArrows',
                kind: 'switch',
                labelKey: 'components.carousel.playground.show_arrows',
                labelFallback: 'Show arrows',
                defaultValue: true
            },
            {
                prop: 'hideDelimiters',
                kind: 'switch',
                labelKey: 'components.carousel.playground.hide_delimiters',
                labelFallback: 'Hide delimiters',
                defaultValue: false
            },
            {
                prop: 'hideDelimiterBackground',
                kind: 'switch',
                labelKey: 'components.carousel.playground.hide_delimiter_background',
                labelFallback: 'Hide delimiter background',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
