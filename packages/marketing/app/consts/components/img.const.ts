/**
 * /components/img — full documentation data for OrigamImg.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Img/img.interface.ts    (props, emits)
 *   - packages/ds/src/components/Img/OrigamImg.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/img.json              (CSS tokens)
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

export const IMG_DOC: IComponentDoc = {
    slug: 'img',
    name: 'Img',
    tag: 'origam-img',
    icon: 'mdi-image-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.img.description',
    descriptionFallback: 'Responsive image component with lazy loading, aspect-ratio enforcement, placeholder and error slot, optional gradient overlay, srcset / sizes support, and a smooth fade-in transition on load.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-img--design',
    docUrl: 'http://localhost:4000/components/Img/OrigamImg',

    family: [],

    related: [
        {
            slug: 'avatar',
            name: 'Avatar',
            kind: 'component',
            descriptionKey: 'components.catalog.avatar.description',
            descriptionFallback: 'Circular avatar component built on top of Img.'
        },
        {
            slug: 'card',
            name: 'Card',
            kind: 'component',
            descriptionKey: 'components.catalog.card.description',
            descriptionFallback: 'Card component that often embeds Img in a media region.'
        }
    ],

    props: [
        {
            name: 'src',
            type: { label: 'string | ISrcObject', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.src.description',
            descriptionFallback: 'Image URL, or an ISrcObject with { src, srcset, lazySrc, aspectRatio }. Both forms are accepted; the object form is used by Avatar to bundle all image metadata.'
        },
        {
            name: 'alt',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.alt.description',
            descriptionFallback: 'Alt text for the image. When provided, sets role="img" on the root element. Leave undefined only for purely decorative images (aria-hidden is set by the consumer in that case).'
        },
        {
            name: 'cover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.img.props.cover.description',
            descriptionFallback: 'Sets object-fit: cover on the picture element. Default is object-fit: contain.'
        },
        {
            name: 'gradient',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.gradient.description',
            descriptionFallback: 'CSS gradient string applied as an overlay on top of the image. Example: "to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)".'
        },
        {
            name: 'lazySrc',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.lazy_src.description',
            descriptionFallback: 'Low-quality placeholder URL shown while the full src loads. Displayed with a blur filter (--preload modifier).'
        },
        {
            name: 'srcset',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.srcset.description',
            descriptionFallback: 'Native <img> srcset attribute for resolution switching.'
        },
        {
            name: 'sizes',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.sizes.description',
            descriptionFallback: 'Native <img> sizes attribute for Art Direction with srcset.'
        },
        {
            name: 'position',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.position.description',
            descriptionFallback: 'Sets object-position on the picture element for focal-point control (e.g. "top center").'
        },
        {
            name: 'draggable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.draggable.description',
            descriptionFallback: 'HTML draggable attribute on the <img> element.'
        },
        {
            name: 'crossorigin',
            type: { label: 'TCrossOrigin', slug: 'cross-origin', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.crossorigin.description',
            descriptionFallback: "CORS attribute on the <img> element. Values: 'anonymous' | 'use-credentials'."
        },
        {
            name: 'referrerpolicy',
            type: { label: 'TReferrerPolicy', slug: 'referrer-policy', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.referrerpolicy.description',
            descriptionFallback: 'Referrer policy on the <img> element (e.g. "no-referrer", "strict-origin-when-cross-origin").'
        },
        // ── ILazyProps ─────────────────────────────────────────────────
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.img.props.eager.description',
            descriptionFallback: 'When true, loads the image immediately without waiting for it to enter the viewport (disables IntersectionObserver-based lazy loading).'
        },
        {
            name: 'options',
            type: { label: 'IIntersectionObserverInit', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.options.description',
            descriptionFallback: 'IntersectionObserver options (rootMargin, threshold) for fine-tuning when the lazy load triggers.'
        },
        // ── IResponsiveProps ────────────────────────────────────────────
        {
            name: 'aspectRatio',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.aspect_ratio.description',
            descriptionFallback: 'Forces the image container to a specific aspect ratio (e.g. "16/9" or 1.777). Prevents layout shift before the image loads.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.height.description',
            descriptionFallback: 'Container height override.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.width.description',
            descriptionFallback: 'Container width override.'
        },
        // ── ITransitionComponentProps ──────────────────────────────────
        {
            name: 'transition',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: "'fade-transition'",
            descriptionKey: 'components.img.props.transition.description',
            descriptionFallback: 'Vue transition name for the fade-in effect when the image loads. Set to false to disable.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.img.props.bg_color.description',
            descriptionFallback: 'Background colour shown while the image is loading or on error.'
        }
    ],

    emits: [
        {
            event: 'loadstart',
            payload: { label: '{ src: string }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.img.emits.loadstart.description',
            descriptionFallback: 'Fired before the network request begins. Provides the resolved src.'
        },
        {
            event: 'load',
            payload: { label: '{ src: string }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.img.emits.load.description',
            descriptionFallback: 'Fired when the image is fully decoded and rendered. Provides the resolved currentSrc or src.'
        },
        {
            event: 'error',
            payload: { label: '{ src: string }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.img.emits.error.description',
            descriptionFallback: 'Fired when the browser cannot load the image (network error, 404, CORS block). Provides the attempted src.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.img.slots.default.description',
            descriptionFallback: 'Overlay content rendered on top of the image (e.g. a caption, a play button, badges). Positioned absolutely over the image surface.'
        },
        {
            slot: 'placeholder',
            slotProps: '—',
            descriptionKey: 'components.img.slots.placeholder.description',
            descriptionFallback: 'Shown while the image is loading (before the load event fires) or while lazySrc is displayed. Typically a skeleton or a low-resolution blur.'
        },
        {
            slot: 'error',
            slotProps: '—',
            descriptionKey: 'components.img.slots.error.description',
            descriptionFallback: 'Shown when the image fails to load (error event). Typically an error icon or a fallback image.'
        }
    ],

    examples: [
        {
            titleKey: 'components.img.examples.basic.title',
            titleFallback: 'Basic image',
            lang: 'vue',
            code: `<template>
  <origam-img
    src="https://picsum.photos/600/400"
    alt="Landscape photo"
    :aspect-ratio="16/9"
    cover
  />
</template>`
        },
        {
            titleKey: 'components.img.examples.lazy.title',
            titleFallback: 'Lazy loading with blur placeholder',
            lang: 'vue',
            code: `<template>
  <origam-img
    src="https://picsum.photos/1200/800"
    lazy-src="https://picsum.photos/60/40"
    alt="Lazy loaded image"
    :aspect-ratio="3/2"
    cover
    width="100%"
  />
</template>`
        },
        {
            titleKey: 'components.img.examples.gradient.title',
            titleFallback: 'Gradient overlay with slot',
            lang: 'vue',
            code: `<template>
  <origam-img
    src="https://picsum.photos/800/600"
    alt="Hero image"
    :aspect-ratio="4/3"
    cover
    gradient="to top, rgba(0,0,0,0.6), transparent"
  >
    <div style="position:absolute;bottom:1rem;left:1rem;color:#fff;">
      <h2>Caption</h2>
    </div>
  </origam-img>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'contain',
            props: { src: 'https://picsum.photos/400/300', alt: 'Photo (contain)', aspectRatio: '4/3', width: 200 }
        },
        {
            label: 'cover',
            props: { src: 'https://picsum.photos/400/300', alt: 'Photo (cover)', aspectRatio: '4/3', cover: true, width: 200 }
        },
        {
            label: 'rounded',
            props: { src: 'https://picsum.photos/300/300', alt: 'Rounded photo', aspectRatio: 1, cover: true, rounded: 'xl', width: 120 }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-img',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamImg',
        svgDesc: 'Schematic of the Img component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="168" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="48" y="36" width="604" height="108" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="80" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__picture (absolute, object-fit: contain/cover)</text>
  <rect x="200" y="52" width="300" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="76" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">__placeholder (lazy load blur)</text>
  <rect x="48" y="156" width="604" height="20" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="170" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">#default slot (overlay content)</text>
  <circle cx="36" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="44" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="48" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="200" cy="56" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="200" y="60" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-img&gt;</code> — 5 internal parts. The root ① wraps OrigamResponsive for aspect-ratio enforcement. The picture ② is absolutely positioned. Placeholder ③ and error ④ layers are conditional. The gradient ⑤ is an absolute div when the gradient prop is set.`,
        legend: [
            {
                num: 1,
                cls: '.origam-img',
                descriptionKey: 'components.img.anatomy.root',
                descriptionFallback: 'Root element wrapping OrigamResponsive. Carries role="img" when alt is present. Has --booting modifier until aspectRatio resolves.'
            },
            {
                num: 2,
                cls: '.origam-img__picture',
                descriptionKey: 'components.img.anatomy.picture',
                descriptionFallback: 'Native <img> element. Absolutely positioned, 100% width/height. Has --cover (object-fit: cover) or --contain (object-fit: contain) modifier. Has --preload modifier with blur filter when showing lazySrc.'
            },
            {
                num: 3,
                cls: '.origam-img__placeholder',
                descriptionKey: 'components.img.anatomy.placeholder',
                descriptionFallback: 'Shown during loading (or lazySrc phase) when the #placeholder slot is provided. Absolutely positioned layer behind the main image.'
            },
            {
                num: 4,
                cls: '.origam-img__error',
                descriptionKey: 'components.img.anatomy.error',
                descriptionFallback: 'Shown when the image fails to load and the #error slot is provided.'
            },
            {
                num: 5,
                cls: '.origam-img__gradient',
                descriptionKey: 'components.img.anatomy.gradient',
                descriptionFallback: 'Absolutely positioned <div> rendered when gradient prop is set. Applies background-image: linear-gradient(...).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamImg — wraps OrigamResponsive for aspect ratio -->
<origam-responsive
  v-intersect="intersect"
  :aria-label="alt"
  :aspect-ratio="aspectRatio"
  :role="alt ? 'img' : undefined"
  class="origam-img"
>
  <template #additional>
    <!-- main image (fade-in on load) -->
    <origam-transition :transition="transition">
      <img v-show="isLoaded" class="origam-img__picture origam-img__picture--cover" />
    </origam-transition>

    <!-- lazySrc placeholder (blur filter) -->
    <origam-transition :transition="transition">
      <img v-if="lazySrc && !isLoaded" class="origam-img__picture origam-img__picture--preload" />
    </origam-transition>

    <!-- #placeholder slot — v-if isLoading && slots.placeholder -->
    <div v-if="(isLoading || isError) && slots.placeholder" class="origam-img__placeholder">
      <slot name="placeholder" />
    </div>

    <!-- #error slot — v-if isError && slots.error -->
    <div v-if="isError && slots.error" class="origam-img__error">
      <slot name="error" />
    </div>

    <!-- gradient overlay — v-if gradient -->
    <div v-if="gradient" class="origam-img__gradient" />
  </template>

  <!-- #default slot — overlay content -->
  <template #default v-if="hasContent">
    <slot name="default" />
  </template>
</origam-responsive>`,
        classes: [
            {
                cls: 'origam-img',
                descriptionKey: 'components.img.anatomy.root',
                descriptionFallback: 'Root element. Has --booting class until aspectRatio resolves (prevents premature paint).'
            },
            {
                cls: 'origam-img--booting',
                descriptionKey: 'components.img.anatomy.booting',
                descriptionFallback: 'Disables the sizer transition during initial mount. Removed after first rAF.'
            },
            {
                cls: 'origam-img__picture',
                descriptionKey: 'components.img.anatomy.picture',
                descriptionFallback: 'Native <img>. Always absolutely positioned inside the responsive sizer.'
            },
            {
                cls: 'origam-img__picture--cover',
                descriptionKey: 'components.img.anatomy.picture_cover',
                descriptionFallback: 'object-fit: cover — image fills the container, cropped.'
            },
            {
                cls: 'origam-img__picture--contain',
                descriptionKey: 'components.img.anatomy.picture_contain',
                descriptionFallback: 'object-fit: contain — image fits inside the container without cropping.'
            },
            {
                cls: 'origam-img__picture--preload',
                descriptionKey: 'components.img.anatomy.picture_preload',
                descriptionFallback: 'Applied to the lazySrc image. Has blur filter while the full-res image loads.'
            },
            {
                cls: 'origam-img__placeholder',
                descriptionKey: 'components.img.anatomy.placeholder',
                descriptionFallback: '#placeholder slot wrapper. Shown during loading.'
            },
            {
                cls: 'origam-img__error',
                descriptionKey: 'components.img.anatomy.error',
                descriptionFallback: '#error slot wrapper. Shown on load failure.'
            },
            {
                cls: 'origam-img__gradient',
                descriptionKey: 'components.img.anatomy.gradient',
                descriptionFallback: 'Gradient overlay div. background-image set from the gradient prop.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-img---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.img.css_vars.background_color',
            descriptionFallback: 'Background colour of the image container while the image loads.'
        },
        {
            name: '--origam-img---border-radius',
            defaultValue: '{radius.none} (0px)',
            descriptionKey: 'components.img.css_vars.border_radius',
            descriptionFallback: 'Corner radius of the image root. Overridden by the rounded prop.'
        },
        {
            name: '--origam-img---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.img.css_vars.transition_duration',
            descriptionFallback: 'Fade-in transition duration when the image loads.'
        },
        {
            name: '--origam-img__picture--preload---filter',
            defaultValue: 'blur(4px)',
            descriptionKey: 'components.img.css_vars.picture_preload_filter',
            descriptionFallback: 'CSS filter applied to the lazySrc placeholder image.'
        },
        {
            name: '--origam-img__picture--contain---object-fit',
            defaultValue: 'contain',
            descriptionKey: 'components.img.css_vars.picture_contain_object_fit',
            descriptionFallback: 'object-fit value for the --contain modifier.'
        },
        {
            name: '--origam-img__picture--cover---object-fit',
            defaultValue: 'cover',
            descriptionKey: 'components.img.css_vars.picture_cover_object_fit',
            descriptionFallback: 'object-fit value for the --cover modifier.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.img.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.img.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.img.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.img.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.img.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.img.exposed.is_loaded',
            descriptionFallback: 'True when the image has successfully loaded (state === LOADED).'
        },
        {
            name: 'styleIsLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.img.exposed.style_is_loaded',
            descriptionFallback: 'True once the component style sheet has been injected. Note: distinct from isLoaded (image load state).'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['img'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.img.a11y.alt',
                noteFallback: 'Always provide a meaningful alt text. When alt is present, role="img" and aria-label={alt} are set on the root. For decorative images, omit alt and set aria-hidden="true" on the parent.'
            },
            {
                noteKey: 'components.img.a11y.lazy_loading',
                noteFallback: 'Lazy loading is handled via IntersectionObserver (not the native loading="lazy" attribute) so the component loads the image only when it enters the viewport. The placeholder slot is announced by the browser as the alt text is still present on the root.'
            },
            {
                noteKey: 'components.img.a11y.error_slot',
                noteFallback: 'When the image fails to load, the #error slot is shown. The slot content should include meaningful text or an icon-with-label so users know the image did not load.'
            },
            {
                noteKey: 'components.img.a11y.reduced_motion',
                noteFallback: 'The fade-in transition respects prefers-reduced-motion. When the user prefers reduced motion, set transition="false" or use --origam-img---transition-duration: 0ms.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/img.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'img.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.img.tokens.background_color',
                descriptionFallback: 'Container background while loading.'
            },
            {
                tokenPath: 'img.border-radius',
                value: '{radius.none}',
                type: 'dimension',
                descriptionKey: 'components.img.tokens.border_radius',
                descriptionFallback: 'Default corner radius (0 — overridden by rounded prop).'
            },
            {
                tokenPath: 'img.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.img.tokens.transition_duration',
                descriptionFallback: 'Fade-in duration on load.'
            },
            {
                tokenPath: 'img.placeholder.background-color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.img.tokens.placeholder_bg',
                descriptionFallback: 'Background of the placeholder slot zone.'
            },
            {
                tokenPath: 'img.error.background-color',
                value: '{color.feedback.danger.bgSubtle}',
                type: 'color',
                descriptionKey: 'components.img.tokens.error_bg',
                descriptionFallback: 'Background of the error slot zone.'
            },
            {
                tokenPath: 'img.error.color',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.img.tokens.error_color',
                descriptionFallback: 'Foreground colour of the error slot zone.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'src',
                kind: 'text',
                labelKey: 'components.img.playground.src',
                labelFallback: 'Source URL',
                defaultValue: 'https://picsum.photos/600/400'
            },
            {
                prop: 'alt',
                kind: 'text',
                labelKey: 'components.img.playground.alt',
                labelFallback: 'Alt text',
                defaultValue: 'Landscape photo'
            },
            {
                prop: 'cover',
                kind: 'switch',
                labelKey: 'components.img.playground.cover',
                labelFallback: 'Cover (vs contain)',
                defaultValue: false
            },
            {
                prop: 'aspectRatio',
                kind: 'select',
                labelKey: 'components.img.playground.aspect_ratio',
                labelFallback: 'Aspect ratio',
                defaultValue: '',
                options: [
                    { label: '(auto)', value: '' },
                    { label: '16/9', value: '1.7778' },
                    { label: '4/3', value: '1.3333' },
                    { label: '1/1 (square)', value: '1' },
                    { label: '3/4 (portrait)', value: '0.75' }
                ]
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.img.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' },
                    { label: 'pill', value: 'pill' }
                ]
            },
            {
                prop: 'gradient',
                kind: 'select',
                labelKey: 'components.img.playground.gradient',
                labelFallback: 'Gradient',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'to bottom (dark)', value: 'to bottom, transparent, rgba(0,0,0,0.6)' },
                    { label: 'to top (dark)', value: 'to top, transparent, rgba(0,0,0,0.6)' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
