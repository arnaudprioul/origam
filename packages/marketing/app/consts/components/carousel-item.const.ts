/**
 * /components/carousel-item — full documentation data for OrigamCarouselItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Carousel/carousel-item.interface.ts  (props)
 *   - packages/ds/src/components/Carousel/OrigamCarouselItem.vue      (template BEM, defineExpose)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const CAROUSEL_ITEM_DOC: IComponentDoc = {
    slug: 'carousel-item',
    name: 'CarouselItem',
    tag: 'origam-carousel-item',
    icon: 'mdi-image-outline',
    category: 'Display',
    descriptionKey: 'components.catalog.carousel_item.description',
    descriptionFallback: 'A single slide inside OrigamCarousel — wraps OrigamWindowItem and OrigamImg, forwarding all image and window-item props.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-carousel--design',
    docUrl: 'http://localhost:4000/components/Carousel/OrigamCarousel',

    parentSlug: 'carousel',

    family: [
        {
            slug: 'carousel',
            name: 'Carousel',
            descriptionKey: 'components.catalog.carousel.description',
            descriptionFallback: 'Sliding window component for cycling through a set of items, with pagination dots, optional progress bar, auto-play interval and keyboard navigation.'
        }
    ],

    related: [
        {
            slug: 'window',
            name: 'Window',
            kind: 'component',
            descriptionKey: 'components.catalog.window.description',
            descriptionFallback: 'Low-level sliding container that Carousel (and CarouselItem) delegates rendering to.'
        },
        {
            slug: 'img',
            name: 'Img',
            kind: 'component',
            descriptionKey: 'components.catalog.img.description',
            descriptionFallback: 'Image component with lazy loading, placeholder and error slots — embedded inside CarouselItem.'
        }
    ],

    props: [
        {
            name: 'transition',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.transition.description',
            descriptionFallback: 'Slide-in transition name or false to disable. Forwarded to OrigamWindowItem.'
        },
        {
            name: 'reverseTransition',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.reverse_transition.description',
            descriptionFallback: 'Reverse (slide-out) transition. Forwarded to OrigamWindowItem.'
        },
        {
            name: 'src',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.src.description',
            descriptionFallback: 'Image URL. Forwarded to OrigamImg. When omitted, the default slot fills the slide area.'
        },
        {
            name: 'srcset',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.srcset.description',
            descriptionFallback: 'Responsive image srcset. Forwarded to OrigamImg.'
        },
        {
            name: 'alt',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.alt.description',
            descriptionFallback: 'Alt text for the embedded image. Required for accessibility when src is set.'
        },
        {
            name: 'cover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel_item.props.cover.description',
            descriptionFallback: 'Passes object-fit: cover to OrigamImg so the image fills the slide without distortion.'
        },
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel_item.props.eager.description',
            descriptionFallback: 'Loads the image immediately instead of using IntersectionObserver lazy loading.'
        },
        {
            name: 'value',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.value.description',
            descriptionFallback: 'Model value used by OrigamWindow to identify the active slide.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.carousel_item.props.disabled.description',
            descriptionFallback: 'Prevents this slide from being selected.'
        },
        {
            name: 'style',
            type: { label: 'StyleValue', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.carousel_item.props.style.description',
            descriptionFallback: 'Inline styles forwarded to the root OrigamWindowItem element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.carousel_item.slots.default.description',
            descriptionFallback: 'Full slide content. When used, the embedded OrigamImg is replaced entirely by this slot.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.carousel_item.slots.content.description',
            descriptionFallback: 'Projected into the OrigamImg default slot — renders on top of the image (overlay text, badges, etc.).'
        },
        {
            slot: 'error',
            slotProps: '—',
            descriptionKey: 'components.carousel_item.slots.error.description',
            descriptionFallback: 'Shown inside OrigamImg when the image fails to load.'
        },
        {
            slot: 'placeholder',
            slotProps: '—',
            descriptionKey: 'components.carousel_item.slots.placeholder.description',
            descriptionFallback: 'Shown inside OrigamImg while the image is still loading.'
        }
    ],

    examples: [
        {
            titleKey: 'components.carousel_item.examples.basic.title',
            titleFallback: 'Basic slide with image',
            lang: 'vue',
            code: `<template>
  <origam-carousel height="300">
    <origam-carousel-item
      src="https://picsum.photos/seed/1/800/400"
      alt="Landscape 1"
      cover
    />
    <origam-carousel-item
      src="https://picsum.photos/seed/2/800/400"
      alt="Landscape 2"
      cover
    />
  </origam-carousel>
</template>`
        },
        {
            titleKey: 'components.carousel_item.examples.custom.title',
            titleFallback: 'Custom slide content',
            lang: 'vue',
            code: `<template>
  <origam-carousel height="260">
    <origam-carousel-item
      src="https://picsum.photos/seed/3/800/400"
      alt="Slide"
      cover
    >
      <template #content>
        <div style="position: absolute; bottom: 16px; left: 16px; color: #fff;">
          <strong>Caption text</strong>
        </div>
      </template>
    </origam-carousel-item>
  </origam-carousel>
</template>`
        },
        {
            titleKey: 'components.carousel_item.examples.placeholder.title',
            titleFallback: 'Loading placeholder',
            lang: 'vue',
            code: `<template>
  <origam-carousel height="300">
    <origam-carousel-item
      src="https://picsum.photos/seed/4/800/400"
      alt="Slide with placeholder"
      cover
    >
      <template #placeholder>
        <div style="display:flex;align-items:center;justify-content:center;height:100%;">
          Loading…
        </div>
      </template>
    </origam-carousel-item>
  </origam-carousel>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-carousel-item',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamCarouselItem',
        svgDesc: 'Schematic of the CarouselItem component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="20" width="660" height="140" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="50" y="40" width="600" height="100" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="96" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-img (src, cover, srcset, alt…)</text>
  <rect x="50" y="110" width="300" height="30" rx="2" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.12))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="200" y="128" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#content slot (overlay)</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="58" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="58" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="58" cy="118" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="58" y="122" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="350" y="185" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">① root = origam-window-item; height: inherit flows from the parent Carousel</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-carousel-item&gt;</code> — 3 internal parts. The root delegates to OrigamWindowItem; the image fills the inherited height.`,
        legend: [
            {
                num: 1,
                cls: '.origam-carousel-item',
                descriptionKey: 'components.carousel_item.anatomy.root',
                descriptionFallback: 'Root element. Delegates to OrigamWindowItem and inherits height from the parent Carousel.'
            },
            {
                num: 2,
                cls: 'origam-img (embedded)',
                descriptionKey: 'components.carousel_item.anatomy.img',
                descriptionFallback: 'OrigamImg instance filling the slide area. Props (src, cover, alt, srcset, eager…) are forwarded automatically. Skipped when the default slot is used.'
            },
            {
                num: 3,
                cls: '#content slot',
                descriptionKey: 'components.carousel_item.anatomy.content_slot',
                descriptionFallback: 'Projected into OrigamImg\'s default slot. Use for overlay captions, badges, or action buttons positioned over the image.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root delegates to origam-window-item -->
<origam-window-item class="origam-carousel-item">
  <template #default>
    <!-- default slot: full custom content -->
    <slot name="default">
      <!-- embedded image when no default slot is provided -->
      <origam-img v-bind="imgProps">
        <!-- overlay content -->
        <template #default>
          <slot name="content" />
        </template>
        <!-- error fallback -->
        <template #error>
          <slot name="error" />
        </template>
        <!-- loading placeholder -->
        <template #placeholder>
          <slot name="placeholder" />
        </template>
      </origam-img>
    </slot>
  </template>
</origam-window-item>`,
        classes: [
            {
                cls: 'origam-carousel-item',
                descriptionKey: 'components.carousel_item.anatomy.root',
                descriptionFallback: 'Root element. display: block; height: inherit — fills the Carousel height.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-carousel-item---display',
            defaultValue: 'block',
            descriptionKey: 'components.carousel_item.css_vars.display',
            descriptionFallback: 'Display mode of the root element.'
        },
        {
            name: '--origam-carousel-item---height',
            defaultValue: 'inherit',
            descriptionKey: 'components.carousel_item.css_vars.height',
            descriptionFallback: 'Height inherited from the parent Carousel container.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.carousel_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component (OrigamImg or OrigamWindowItem).'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.carousel_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle for the carousel item.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.carousel_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.carousel_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.carousel_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.carousel_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.carousel_item.a11y.key_tab',
                actionFallback: 'Focus moves to interactive content inside the slide (links, buttons, form elements).'
            }
        ],
        notes: [
            {
                noteKey: 'components.carousel_item.a11y.alt_required',
                noteFallback: 'When src is set, always provide a meaningful alt attribute. An empty alt="" is acceptable for purely decorative images.'
            },
            {
                noteKey: 'components.carousel_item.a11y.hidden_slides',
                noteFallback: 'Inactive slides are hidden from the accessibility tree by OrigamWindowItem (aria-hidden="true") — only the active slide is reachable by keyboard and screen readers.'
            }
        ]
    } satisfies IComponentA11y
}
