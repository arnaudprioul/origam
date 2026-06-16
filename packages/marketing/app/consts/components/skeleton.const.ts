/**
 * /components/skeleton — full documentation data for OrigamSkeleton.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Skeleton/skeleton.interface.ts  (props)
 *   - packages/ds/src/components/Skeleton/OrigamSkeleton.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/skeleton.json                 (CSS tokens)
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

export const SKELETON_DOC: IComponentDoc = {
    slug: 'skeleton',
    name: 'Skeleton',
    tag: 'origam-skeleton',
    icon: 'mdi-shimmer',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.skeleton.description',
    descriptionFallback: 'Loading placeholder with animated pulse shimmer. Supports text, rectangular, circular, card and list-item variants. Renders real content via the default slot when loading=false.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-skeleton--design',
    docUrl: 'http://localhost:4000/components/Skeleton/OrigamSkeleton',

    family: [],

    related: [
        {
            slug: 'progress',
            name: 'Progress',
            kind: 'component',
            descriptionKey: 'components.skeleton.related.progress',
            descriptionFallback: 'OrigamProgress provides linear/circular loaders for determinate loading states. Use Skeleton for indeterminate content placeholders.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'variant',
            type: { label: 'TSkeletonVariant', slug: 'skeleton-variant', kind: 'type' },
            defaultValue: "'rectangular'",
            descriptionKey: 'components.skeleton.props.variant.description',
            descriptionFallback: "Skeleton shape preset. 'text' → single-line text height, 'rectangular' → block shape, 'circular' → circle (height mirrors width), 'card' → image + 3 text lines, 'list-item' → avatar circle + 2 text lines."
        },
        {
            name: 'loading',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.skeleton.props.loading.description',
            descriptionFallback: 'Controls skeleton vs real content. true = show skeleton placeholder; false = render the default slot.'
        },
        {
            name: 'pulse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.skeleton.props.pulse.description',
            descriptionFallback: 'Enables the wave shimmer animation on text and rectangular variants, and the spin animation on circular. Disabled automatically under prefers-reduced-motion.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.skeleton.props.width.description',
            descriptionFallback: 'Width of the skeleton block. Accepts a CSS length or a number (px). Defaults to 100% for text variant.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.skeleton.props.height.description',
            descriptionFallback: 'Height of the skeleton block. Defaults to --origam-skeleton---text-height (1.2em) for text variant; mirrors width for circular.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.skeleton.props.color.description',
            descriptionFallback: 'Override the skeleton foreground color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.skeleton.props.bg_color.description',
            descriptionFallback: 'Override the skeleton background color.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.skeleton.props.size.description',
            descriptionFallback: 'Size token applied to the skeleton (affects font-size / dimensional scale).'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.skeleton.props.rounded.description',
            descriptionFallback: 'Border-radius override. Defaults to circular token for variant=circular.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.skeleton.slots.default.description',
            descriptionFallback: 'Real content rendered when loading=false. When loading=true, the default slot is hidden and the skeleton placeholder is shown instead.'
        }
    ],

    examples: [
        {
            titleKey: 'components.skeleton.examples.basic.title',
            titleFallback: 'Basic variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <origam-skeleton variant="text"        :width="200" />
    <origam-skeleton variant="rectangular" :width="200" :height="80" />
    <origam-skeleton variant="circular"    :width="48" />
    <origam-skeleton variant="card"        :width="200" />
    <origam-skeleton variant="list-item"   :width="260" />
  </div>
</template>`
        },
        {
            titleKey: 'components.skeleton.examples.loading.title',
            titleFallback: 'Loading gate',
            lang: 'vue',
            code: `<template>
  <origam-skeleton variant="card" :loading="isLoading">
    <!-- Real content shown when isLoading=false -->
    <origam-card title="Article title" subtitle="Author · Date">
      <p>Full article content goes here.</p>
    </origam-card>
  </origam-skeleton>
</template>
<script setup>
const isLoading = ref(true)
setTimeout(() => { isLoading.value = false }, 2000)
</script>`
        },
        {
            titleKey: 'components.skeleton.examples.no_pulse.title',
            titleFallback: 'Without pulse',
            lang: 'vue',
            code: `<template>
  <origam-skeleton
    variant="rectangular"
    :width="320"
    :height="120"
    :pulse="false"
    rounded="md"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'text',        props: { variant: 'text',        width: 200 } },
        { label: 'rectangular', props: { variant: 'rectangular', width: 200, height: 80 } },
        { label: 'circular',    props: { variant: 'circular',    width: 48 } },
        { label: 'card',        props: { variant: 'card',        width: 200 } },
        { label: 'list-item',   props: { variant: 'list-item',   width: 260 } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-skeleton',
        svgViewBox: '0 0 560 200',
        svgTitle: 'Anatomy of OrigamSkeleton',
        svgDesc: 'Schematic of the Skeleton component with 4 numbered parts for the list-item variant.',
        svg: `
  <rect x="0" y="0" width="560" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <text x="30" y="30" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace" font-style="italic">list-item variant</text>
  <rect x="20" y="44" width="520" height="96" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <circle cx="68" cy="92" r="32" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.15))"/>
  <rect x="120" y="72" width="260" height="16" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.18))"/>
  <rect x="120" y="98" width="180" height="12" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.12))" opacity="0.7"/>
  <text x="30" y="165" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace" font-style="italic">rectangular variant (standalone)</text>
  <rect x="20" y="172" width="520" height="20" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.18))"/>
  <circle cx="28" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="70" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="74" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="130" cy="70" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="130" y="74" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="28" cy="180" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="184" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-skeleton&gt;</code> — 4 parts: composite wrapper ①, circular avatar block ②, text lines ③, and the standalone rectangular/text block ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-skeleton-wrapper',
                descriptionKey: 'components.skeleton.anatomy.wrapper',
                descriptionFallback: 'Composite variant container rendered for card and list-item variants. Carries the variant modifier class (e.g. origam-skeleton-wrapper--list-item).'
            },
            {
                num: 2,
                cls: '.origam-skeleton--circular',
                descriptionKey: 'components.skeleton.anatomy.circular',
                descriptionFallback: 'Circular avatar placeholder inside the list-item wrapper. Has the spin animation when pulse=true.'
            },
            {
                num: 3,
                cls: '.origam-skeleton--text (inside __lines)',
                descriptionKey: 'components.skeleton.anatomy.text_lines',
                descriptionFallback: 'Text line placeholders. The first line is 60% width, the second 40% with reduced opacity.'
            },
            {
                num: 4,
                cls: '.origam-skeleton--rectangular / --text (standalone)',
                descriptionKey: 'components.skeleton.anatomy.standalone',
                descriptionFallback: 'The single-block element rendered for rectangular, text and circular variants (no composite wrapper).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- loading=false → render real content -->
<template v-if="!loading">
  <slot />
</template>

<!-- list-item composite -->
<div
  v-else-if="variant === 'list-item'"
  class="origam-skeleton-wrapper origam-skeleton-wrapper--list-item"
  role="status"
  aria-busy="true"
  aria-label="Loading"
>
  <div class="origam-skeleton origam-skeleton--circular origam-skeleton--pulse" />
  <div class="origam-skeleton__lines">
    <div class="origam-skeleton origam-skeleton--text origam-skeleton--pulse" />
    <div class="origam-skeleton origam-skeleton--text origam-skeleton--pulse" />
  </div>
</div>

<!-- standalone block (rectangular / text / circular) -->
<div
  v-else
  class="origam-skeleton origam-skeleton--rectangular origam-skeleton--pulse"
  role="status"
  aria-busy="true"
  aria-label="Loading"
/>`,
        classes: [
            { cls: 'origam-skeleton', descriptionKey: 'components.skeleton.anatomy.block', descriptionFallback: 'Core skeleton block. Carries the shimmer background and animation.' },
            { cls: 'origam-skeleton--text', descriptionKey: 'components.skeleton.anatomy.modifier_text', descriptionFallback: 'Text-height variant (1.2em tall, 100% wide by default).' },
            { cls: 'origam-skeleton--rectangular', descriptionKey: 'components.skeleton.anatomy.modifier_rectangular', descriptionFallback: 'Full-height rectangular block.' },
            { cls: 'origam-skeleton--circular', descriptionKey: 'components.skeleton.anatomy.modifier_circular', descriptionFallback: 'Circular block. Height mirrors width.' },
            { cls: 'origam-skeleton--pulse', descriptionKey: 'components.skeleton.anatomy.modifier_pulse', descriptionFallback: 'Activates wave shimmer (text/rectangular) or spin (circular) animation.' },
            { cls: 'origam-skeleton-wrapper', descriptionKey: 'components.skeleton.anatomy.wrapper_class', descriptionFallback: 'Container for composite variants (card, list-item).' },
            { cls: 'origam-skeleton-wrapper--list-item', descriptionKey: 'components.skeleton.anatomy.wrapper_list_item', descriptionFallback: 'List-item composite layout (avatar + text lines).' },
            { cls: 'origam-skeleton-wrapper--card', descriptionKey: 'components.skeleton.anatomy.wrapper_card', descriptionFallback: 'Card composite layout (image block + text lines).' },
            { cls: 'origam-skeleton__lines', descriptionKey: 'components.skeleton.anatomy.lines', descriptionFallback: 'Text lines column inside list-item wrapper.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-skeleton---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.skeleton.css_vars.background_color',
            descriptionFallback: 'Base background color of the skeleton block.'
        },
        {
            name: '--origam-skeleton---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.skeleton.css_vars.border_radius',
            descriptionFallback: 'Border-radius for text and rectangular variants.'
        },
        {
            name: '--origam-skeleton---border-radius-circular',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.skeleton.css_vars.border_radius_circular',
            descriptionFallback: 'Border-radius for circular variant (50% = full circle).'
        },
        {
            name: '--origam-skeleton---animation-duration',
            defaultValue: '{motion.duration.xslow}',
            descriptionKey: 'components.skeleton.css_vars.animation_duration',
            descriptionFallback: 'Duration of the shimmer / spin animation.'
        },
        {
            name: '--origam-skeleton---text-height',
            defaultValue: '1.2em',
            descriptionKey: 'components.skeleton.css_vars.text_height',
            descriptionFallback: 'Height of the text variant block.'
        },
        {
            name: '--origam-skeleton---gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.skeleton.css_vars.gap',
            descriptionFallback: 'Gap between avatar and text lines in list-item variant.'
        },
        {
            name: '--origam-skeleton---wave-color',
            defaultValue: 'color-mix(in srgb, {skeleton.background-color} 50%, white)',
            descriptionKey: 'components.skeleton.css_vars.wave_color',
            descriptionFallback: 'Highlight color of the shimmer wave. Derived from background-color by default.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.skeleton.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.skeleton.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.skeleton.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.skeleton.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.skeleton.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.skeleton.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['status'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.skeleton.a11y.role_note',
                noteFallback: 'Each skeleton block has role="status", aria-busy="true" and aria-label="Loading". This ensures screen readers announce the loading state without repeating a full description.'
            },
            {
                noteKey: 'components.skeleton.a11y.reduced_motion_note',
                noteFallback: 'The pulse animation is disabled under prefers-reduced-motion: reduce. The skeleton remains visible as a static placeholder.'
            },
            {
                noteKey: 'components.skeleton.a11y.content_note',
                noteFallback: 'When loading=false, the skeleton is replaced by real content via the default slot. Ensure the revealed content is semantically correct (headings, alt text, etc.).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/skeleton.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'skeleton.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.skeleton.tokens.background_color',
                descriptionFallback: 'Base placeholder background color.'
            },
            {
                tokenPath: 'skeleton.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.skeleton.tokens.border_radius',
                descriptionFallback: 'Border-radius for text and rectangular variants.'
            },
            {
                tokenPath: 'skeleton.border-radius-circular',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.skeleton.tokens.border_radius_circular',
                descriptionFallback: 'Border-radius for circular variant.'
            },
            {
                tokenPath: 'skeleton.animation-duration',
                value: '{motion.duration.xslow}',
                type: 'duration',
                descriptionKey: 'components.skeleton.tokens.animation_duration',
                descriptionFallback: 'Pulse animation duration.'
            },
            {
                tokenPath: 'skeleton.text-height',
                value: '1.2em',
                type: 'dimension',
                descriptionKey: 'components.skeleton.tokens.text_height',
                descriptionFallback: 'Text variant line height.'
            },
            {
                tokenPath: 'skeleton.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.skeleton.tokens.gap',
                descriptionFallback: 'Gap in list-item composite layout.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.skeleton.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'rectangular',
                options: [
                    { label: 'text', value: 'text' },
                    { label: 'rectangular', value: 'rectangular' },
                    { label: 'circular', value: 'circular' },
                    { label: 'card', value: 'card' },
                    { label: 'list-item', value: 'list-item' }
                ]
            },
            {
                prop: 'pulse',
                kind: 'switch',
                labelKey: 'components.skeleton.playground.pulse',
                labelFallback: 'Pulse animation',
                defaultValue: true
            },
            {
                prop: 'loading',
                kind: 'switch',
                labelKey: 'components.skeleton.playground.loading',
                labelFallback: 'Loading',
                defaultValue: true
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.skeleton.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'pill', value: 'pill' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
