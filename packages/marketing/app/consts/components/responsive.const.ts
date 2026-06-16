/**
 * /components/responsive — full documentation data for OrigamResponsive.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Responsive/responsive.interface.ts  (props)
 *   - packages/ds/src/components/Responsive/OrigamResponsive.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/responsive.json                   (CSS tokens)
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

export const RESPONSIVE_DOC: IComponentDoc = {
    slug: 'responsive',
    name: 'Responsive',
    tag: 'origam-responsive',
    icon: 'mdi-aspect-ratio',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.responsive.description',
    descriptionFallback: 'Aspect-ratio container that constrains its content to a fixed ratio using a sizer trick. Supports inline mode, dimension overrides and standard spacing props.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-responsive--design',
    docUrl: 'http://localhost:4000/components/Responsive/OrigamResponsive',

    family: [],

    related: [
        {
            slug: 'img',
            name: 'Img',
            kind: 'component',
            descriptionKey: 'components.responsive.related.img',
            descriptionFallback: 'OrigamImg can be placed inside OrigamResponsive to lock an image to a given aspect ratio.'
        },
        {
            slug: 'video',
            name: 'Video',
            kind: 'component',
            descriptionKey: 'components.responsive.related.video',
            descriptionFallback: 'OrigamVideo uses OrigamResponsive internally to maintain its aspect ratio.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'aspectRatio',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.aspect_ratio.description',
            descriptionFallback: "Desired aspect ratio expressed as 'width/height' string (e.g. '16/9') or a decimal number. When set, drives the padding-block-end sizer trick."
        },
        {
            name: 'contentClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.content_class.description',
            descriptionFallback: 'Additional CSS class applied to the inner .origam-responsive__content div.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.responsive.props.inline.description',
            descriptionFallback: 'Switches the root from display:block to display:inline-flex, making the container flow inline with text.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.height.description',
            descriptionFallback: 'Explicit height override. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.width.description',
            descriptionFallback: 'Explicit width override.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.max_height.description',
            descriptionFallback: 'Maximum height. Useful to cap a 16/9 container at a given viewport height.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.max_width.description',
            descriptionFallback: 'Maximum width.'
        },
        {
            name: 'minHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.min_height.description',
            descriptionFallback: 'Minimum height.'
        },
        {
            name: 'minWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.min_width.description',
            descriptionFallback: 'Minimum width.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.padding.description',
            descriptionFallback: 'Shorthand CSS padding applied to the root container.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.margin.description',
            descriptionFallback: 'Shorthand CSS margin applied to the root container.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.responsive.props.border.description',
            descriptionFallback: 'Applies a border to the responsive container.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.responsive.props.rounded.description',
            descriptionFallback: 'Border-radius applied to the container (clips overflow of the content).'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.responsive.slots.default.description',
            descriptionFallback: 'Content placed inside .origam-responsive__content, absolutely positioned to fill the ratio-locked area.'
        },
        {
            slot: 'additional',
            slotProps: '—',
            descriptionKey: 'components.responsive.slots.additional.description',
            descriptionFallback: 'Extra content placed between the sizer and the main content div. Useful for overlays or decorative layers.'
        }
    ],

    examples: [
        {
            titleKey: 'components.responsive.examples.basic.title',
            titleFallback: '16/9 video embed',
            lang: 'vue',
            code: `<template>
  <origam-responsive aspect-ratio="16/9">
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Video"
      allow="autoplay"
      style="width:100%;height:100%;border:0;"
    />
  </origam-responsive>
</template>`
        },
        {
            titleKey: 'components.responsive.examples.image.title',
            titleFallback: 'Responsive image',
            lang: 'vue',
            code: `<template>
  <origam-responsive aspect-ratio="4/3" rounded="lg" :max-width="480">
    <origam-img src="/photo.jpg" cover />
  </origam-responsive>
</template>`
        },
        {
            titleKey: 'components.responsive.examples.inline.title',
            titleFallback: 'Inline mode',
            lang: 'vue',
            code: `<template>
  <p>
    Here is an inline ratio box:
    <origam-responsive aspect-ratio="1" :inline="true" :width="80" rounded="sm">
      <origam-img src="/avatar.jpg" />
    </origam-responsive>
    next to some text.
  </p>
</template>`
        }
    ],

    previewVariants: [
        { label: '16/9', props: { aspectRatio: '16/9', width: 280 }, slotContent: '16 : 9' },
        { label: '4/3',  props: { aspectRatio: '4/3',  width: 200 }, slotContent: '4 : 3' },
        { label: '1/1',  props: { aspectRatio: '1',    width: 160 }, slotContent: '1 : 1' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-responsive',
        svgViewBox: '0 0 480 180',
        svgTitle: 'Anatomy of OrigamResponsive',
        svgDesc: 'Schematic of the Responsive component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="480" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="440" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="40" width="400" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.1))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="240" y="52" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__sizer (padding-block-end drives ratio)</text>
  <rect x="40" y="68" width="400" height="72" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="240" y="110" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot content</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="50" cy="80" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="50" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-responsive&gt;</code> — 3 parts: root container ①, sizer div ② (drives padding-block-end aspect trick), and content div ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-responsive',
                descriptionKey: 'components.responsive.anatomy.root',
                descriptionFallback: 'Root element. Block or inline-flex, overflow hidden. Receives dimension, padding, margin, border and rounded classes.'
            },
            {
                num: 2,
                cls: '.origam-responsive__sizer',
                descriptionKey: 'components.responsive.anatomy.sizer',
                descriptionFallback: 'Zero-height helper div. Its padding-block-end (set via useAspectRatio) forces the container to the correct ratio height.'
            },
            {
                num: 3,
                cls: '.origam-responsive__content',
                descriptionKey: 'components.responsive.anatomy.content',
                descriptionFallback: 'Absolutely positioned content area filling the ratio-locked space. Receives contentClass.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-responsive">
  <!-- sizer: padding-block-end = (height / width) * 100% -->
  <div class="origam-responsive__sizer" />

  <!-- additional slot (overlays, decorations) -->
  <slot name="additional" />

  <!-- main content, absolutely fills the container -->
  <div class="origam-responsive__content">
    <slot name="default" />
  </div>
</div>`,
        classes: [
            { cls: 'origam-responsive', descriptionKey: 'components.responsive.anatomy.root', descriptionFallback: 'Root block element.' },
            { cls: 'origam-responsive--inline', descriptionKey: 'components.responsive.anatomy.modifier_inline', descriptionFallback: 'Applied when inline=true. Switches to display:inline-flex.' },
            { cls: 'origam-responsive__sizer', descriptionKey: 'components.responsive.anatomy.sizer', descriptionFallback: 'Aspect-ratio sizer helper div.' },
            { cls: 'origam-responsive__content', descriptionKey: 'components.responsive.anatomy.content', descriptionFallback: 'Content area, absolutely positioned.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-responsive---aspect-ratio-default',
            defaultValue: '16 / 9',
            descriptionKey: 'components.responsive.css_vars.aspect_ratio_default',
            descriptionFallback: 'Default aspect ratio when no aspectRatio prop is set.'
        },
        {
            name: '--origam-responsive---overflow',
            defaultValue: 'hidden',
            descriptionKey: 'components.responsive.css_vars.overflow',
            descriptionFallback: 'Overflow applied to the root container. Hidden by default to clip content.'
        },
        {
            name: '--origam-responsive---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.responsive.css_vars.max_width',
            descriptionFallback: 'Default max-width of the responsive container.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.responsive.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.responsive.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.responsive.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.responsive.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.responsive.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.responsive.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.responsive.a11y.container_note',
                noteFallback: 'OrigamResponsive is a pure layout container with no interactive role. Accessibility is owned by the content placed in the default slot.'
            },
            {
                noteKey: 'components.responsive.a11y.media_note',
                noteFallback: 'When wrapping an iframe or img, ensure the embedded element has appropriate title or alt attributes for screen readers.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/responsive.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'responsive.aspect-ratio-default',
                value: '16 / 9',
                type: 'other',
                descriptionKey: 'components.responsive.tokens.aspect_ratio_default',
                descriptionFallback: 'Default aspect ratio applied when no prop is set.'
            },
            {
                tokenPath: 'responsive.max-width',
                value: '100%',
                type: 'other',
                descriptionKey: 'components.responsive.tokens.max_width',
                descriptionFallback: 'Default max-width of the container.'
            },
            {
                tokenPath: 'responsive.overflow',
                value: 'hidden',
                type: 'other',
                descriptionKey: 'components.responsive.tokens.overflow',
                descriptionFallback: 'Overflow mode — hidden clips content to the ratio box.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'aspectRatio',
                kind: 'select',
                labelKey: 'components.responsive.playground.aspect_ratio',
                labelFallback: 'Aspect ratio',
                defaultValue: '16/9',
                options: [
                    { label: '16/9', value: '16/9' },
                    { label: '4/3', value: '4/3' },
                    { label: '1/1', value: '1' },
                    { label: '3/4 (portrait)', value: '3/4' },
                    { label: '21/9 (ultrawide)', value: '21/9' }
                ]
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.responsive.playground.inline',
                labelFallback: 'Inline',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.responsive.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' }
                ]
            },
            {
                prop: 'maxWidth',
                kind: 'select',
                labelKey: 'components.responsive.playground.max_width',
                labelFallback: 'Max width',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: '320px', value: '320px' },
                    { label: '480px', value: '480px' },
                    { label: '640px', value: '640px' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
