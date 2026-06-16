/**
 * /components/masonry — full documentation data for OrigamMasonry.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Masonry/masonry.interface.ts  (IMasonryProps)
 *   - packages/ds/src/components/Masonry/OrigamMasonry.vue     (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/masonry.json               (CSS tokens)
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

export const MASONRY_DOC: IComponentDoc = {
    slug: 'masonry',
    name: 'Masonry',
    tag: 'origam-masonry',
    icon: 'mdi-view-dashboard-variant-outline',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.masonry.description',
    descriptionFallback: 'Pinterest-style masonry grid. Uses native CSS grid-template-rows: masonry when supported; falls back to a ResizeObserver bucket-fill algorithm. Container-query responsive via columnBreakpoints.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-masonry--design',
    docUrl: 'http://localhost:4000/components/Masonry/OrigamMasonry',

    family: [],

    related: [
        {
            slug: 'grids',
            name: 'Grids',
            kind: 'component',
            descriptionKey: 'components.catalog.grids.description',
            descriptionFallback: 'Uniform grid layout — use Grids for equal-height cards, Masonry for variable-height items.'
        },
        {
            slug: 'virtual-scroll',
            name: 'VirtualScroll',
            kind: 'component',
            descriptionKey: 'components.catalog.virtual_scroll.description',
            descriptionFallback: 'For very large masonry lists, combine with VirtualScroll to render only visible rows.'
        }
    ],

    props: [
        // ── IMasonryProps own props ────────────────────────────────────────
        {
            name: 'columns',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '3',
            descriptionKey: 'components.masonry.props.columns.description',
            descriptionFallback: 'Default number of columns when no columnBreakpoints entry matches the container width. Must be a positive integer ≥ 1.'
        },
        {
            name: 'columnBreakpoints',
            type: { label: 'TMasonryColumnBreakpoints', slug: 'masonry', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.column_breakpoints.description',
            descriptionFallback: 'Map of min-width (px) → column count. Based on container width (not viewport) via ResizeObserver. Example: { 600: 2, 900: 3, 1200: 4 }.'
        },
        {
            name: 'gap',
            type: { label: "TGridGapSize | string | number", slug: 'grid-gap-size', kind: 'type' },
            defaultValue: "'md'",
            descriptionKey: 'components.masonry.props.gap.description',
            descriptionFallback: 'Gap between items. Accepts a token size key (xs | sm | md | lg | xl), a CSS length string, or a number (→ px). Defaults to md.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.masonry.props.animated.description',
            descriptionFallback: 'Animates item position changes (transform, top, left, width) when the column count changes. Uses CSS transition — disabled under prefers-reduced-motion.'
        },
        {
            name: 'align',
            type: { label: 'TMasonryAlign', slug: 'masonry-align', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.masonry.props.align.description',
            descriptionFallback: 'Vertical alignment of items. "top" (standard Pinterest layout) | "center". Only the JS fallback honours "center" — the CSS path always packs to the top.'
        },
        // ── IDimensionProps ────────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.height.description',
            descriptionFallback: 'Fixed height of the masonry container.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.width.description',
            descriptionFallback: 'Fixed width of the masonry container.'
        },
        // ── IBgColorProps / IColorProps ────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.bg_color.description',
            descriptionFallback: 'Background color of the masonry container.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.color.description',
            descriptionFallback: 'Foreground color inherited by children.'
        },
        // ── IElevationProps ────────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.masonry.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── IBorderProps ───────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.masonry.props.border.description',
            descriptionFallback: 'Applies a border to the container.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.masonry.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.masonry.slots.default.description',
            descriptionFallback: 'Children to layout in the masonry grid. Each direct child is treated as a masonry item. In the JS fallback path, each child is wrapped in a div.origam-masonry__item with absolute positioning.'
        }
    ],

    examples: [
        {
            titleKey: 'components.masonry.examples.basic.title',
            titleFallback: 'Basic masonry',
            lang: 'vue',
            code: `<template>
  <origam-masonry :columns="3" gap="md">
    <origam-card
      v-for="photo in photos"
      :key="photo.id"
      :image="photo.src"
      :height="photo.height"
    />
  </origam-masonry>
</template>

<script setup lang="ts">
const photos = [
  { id: 1, src: '/img/a.jpg', height: 200 },
  { id: 2, src: '/img/b.jpg', height: 320 },
  { id: 3, src: '/img/c.jpg', height: 160 },
  { id: 4, src: '/img/d.jpg', height: 260 }
]
</script>`
        },
        {
            titleKey: 'components.masonry.examples.breakpoints.title',
            titleFallback: 'Container-query breakpoints',
            lang: 'vue',
            code: `<template>
  <!-- Adapts column count based on the container width, not viewport -->
  <origam-masonry
    :columns="1"
    :column-breakpoints="{ 480: 2, 768: 3, 1024: 4 }"
    gap="lg"
  >
    <MyCard v-for="item in items" :key="item.id" v-bind="item" />
  </origam-masonry>
</template>`
        },
        {
            titleKey: 'components.masonry.examples.animated.title',
            titleFallback: 'With animation disabled',
            lang: 'vue',
            code: `<template>
  <!-- Disable position-change animation for users preferring reduced motion -->
  <origam-masonry :animated="false" :columns="2">
    <slot />
  </origam-masonry>
</template>`
        }
    ],

    previewVariants: [
        {
            label: '3 columns',
            props: { columns: 3, gap: 'md' }
        },
        {
            label: '4 columns',
            props: { columns: 4, gap: 'sm' }
        },
        {
            label: '2 cols + animated',
            props: { columns: 2, gap: 'lg', animated: true }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-masonry',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamMasonry',
        svgDesc: 'Schematic of the Masonry component in CSS and JS fallback paths.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <text x="24" y="20" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">CSS path (grid-template-rows: masonry)</text>
  <rect x="24" y="28" width="300" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="36" y="40" width="84" height="80" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <rect x="130" y="40" width="84" height="120" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <rect x="224" y="40" width="84" height="60" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <rect x="36" y="132" width="84" height="60" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <rect x="224" y="112" width="84" height="100" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="376" y="20" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">JS fallback (ResizeObserver + bucket-fill)</text>
  <rect x="376" y="28" width="300" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5" stroke-dasharray="4 2"/>
  <rect x="388" y="40" width="84" height="80" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="430" y="84" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__item</text>
  <rect x="482" y="40" width="84" height="120" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <rect x="576" y="40" width="84" height="60" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <rect x="388" y="132" width="84" height="60" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <circle cx="32" cy="36" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="40.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="384" cy="36" r="10" fill="var(--origam-color__border---default, rgba(168,85,247,0.5))"/>
  <text x="384" y="40.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="44" cy="48" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="52" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="396" cy="48" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="396" y="52" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="350" y="248" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">CSS path: display: grid + masonry / JS path: position: absolute per item</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-masonry&gt;</code> — ① CSS path (grid-template-rows: masonry, native, no wrappers), ② JS fallback path (position: relative container), ③ direct child (CSS path — no wrapper), ④ <code>.origam-masonry__item</code> (JS path — absolute wrapper added by the component).',
        legend: [
            {
                num: 1,
                cls: '.origam-masonry.origam-masonry--css',
                descriptionKey: 'components.masonry.anatomy.css_path',
                descriptionFallback: 'CSS path: <code>display: grid; grid-template-rows: masonry; align-tracks: start</code>. <code>grid-template-columns</code> set via <code>--origam-masonry---template-columns</code> CSS var. No item wrappers — children are direct grid items.'
            },
            {
                num: 2,
                cls: '.origam-masonry.origam-masonry--js',
                descriptionKey: 'components.masonry.anatomy.js_path',
                descriptionFallback: 'JS fallback path: <code>position: relative; display: block</code>. Container height driven by <code>--origam-masonry---container-height</code>. Items absolutely positioned.'
            },
            {
                num: 3,
                cls: '(direct child — CSS path)',
                descriptionKey: 'components.masonry.anatomy.css_child',
                descriptionFallback: 'In the CSS path, children are placed directly as grid items. No wrapper is injected by the component.'
            },
            {
                num: 4,
                cls: '.origam-masonry__item',
                descriptionKey: 'components.masonry.anatomy.js_item',
                descriptionFallback: 'In the JS fallback path, each child VNode is wrapped in a <code>div.origam-masonry__item</code> with <code>position: absolute; left/top/width</code> computed by useMasonry.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" role="list" class="origam-masonry origam-masonry--css">
  <!-- CSS path: children rendered directly as grid items -->
  <slot />
</component>

<!-- OR (JS fallback path) -->
<component :is="tag" role="list" class="origam-masonry origam-masonry--js">
  <div
    v-for="(child, idx) in childrenVNodes"
    :key="idx"
    class="origam-masonry__item"
    role="listitem"
    :style="getItemStyle(idx)"
  >
    <component :is="{ render: () => child }" />
  </div>
</component>`,
        classes: [
            {
                cls: 'origam-masonry',
                descriptionKey: 'components.masonry.anatomy.root',
                descriptionFallback: 'Root element. role="list". Box-sizing: border-box; gap driven by --origam-masonry---resolved-gap.'
            },
            {
                cls: 'origam-masonry--css',
                descriptionKey: 'components.masonry.anatomy.css_path',
                descriptionFallback: 'CSS path modifier. display: grid; grid-template-rows: masonry; align-tracks: start.'
            },
            {
                cls: 'origam-masonry--js',
                descriptionKey: 'components.masonry.anatomy.js_path',
                descriptionFallback: 'JS fallback modifier. position: relative; display: block; height from --origam-masonry---container-height.'
            },
            {
                cls: 'origam-masonry--animated',
                descriptionKey: 'components.masonry.anatomy.animated',
                descriptionFallback: 'Applied when animated=true. Adds CSS transitions on item position changes.'
            },
            {
                cls: 'origam-masonry__item',
                descriptionKey: 'components.masonry.anatomy.js_item',
                descriptionFallback: 'Absolute-positioned wrapper for each child VNode in the JS fallback path. role="listitem".'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-masonry---resolved-gap',
            defaultValue: 'var(--origam-grid---gap-md)',
            descriptionKey: 'components.masonry.css_vars.resolved_gap',
            descriptionFallback: 'Bridge variable: the serialised gap value (token or raw CSS). Consumed by the gap property AND read back by the JS algo via getComputedStyle.'
        },
        {
            name: '--origam-masonry---template-columns',
            defaultValue: 'repeat(3, 1fr)',
            descriptionKey: 'components.masonry.css_vars.template_columns',
            descriptionFallback: 'CSS path only. Set to repeat(N, 1fr) where N = active column count.'
        },
        {
            name: '--origam-masonry---container-height',
            defaultValue: 'auto',
            descriptionKey: 'components.masonry.css_vars.container_height',
            descriptionFallback: 'JS path only. Set to the computed total height of the bucket-fill layout.'
        },
        {
            name: '--origam-masonry---animation-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.masonry.css_vars.animation_duration',
            descriptionFallback: 'Duration of position-change transitions (animated=true).'
        },
        {
            name: '--origam-masonry---animation-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.masonry.css_vars.animation_easing',
            descriptionFallback: 'Easing of position-change transitions.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.masonry.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'layout',
            type: 'Ref<{ items: Array<{ left: number; top: number; width: number }>; containerHeight: number }>',
            descriptionKey: 'components.masonry.exposed.layout',
            descriptionFallback: 'Reactive layout data computed by useMasonry. Available in both paths but only consumed by the template in the JS path.'
        },
        {
            name: 'relayout',
            type: '() => void',
            descriptionKey: 'components.masonry.exposed.relayout',
            descriptionFallback: 'Forces an immediate re-computation of the bucket-fill layout. Useful after programmatically changing item content without changing the DOM structure.'
        },
        {
            name: 'useCssPath',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.masonry.exposed.use_css_path',
            descriptionFallback: 'True when the CSS masonry path is active. False when the JS fallback runs.'
        },
        {
            name: 'gapPx',
            type: 'Ref<number>',
            descriptionKey: 'components.masonry.exposed.gap_px',
            descriptionFallback: 'Current gap value in pixels as resolved by getComputedStyle. Used by the JS bucket-fill algorithm.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['list'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.masonry.a11y.role_note',
                noteFallback: 'OrigamMasonry renders with <code>role="list"</code>. In the JS path, each item wrapper carries <code>role="listitem"</code>. In the CSS path, direct children should carry their own semantic markup.'
            },
            {
                noteKey: 'components.masonry.a11y.order_note',
                noteFallback: 'Items are laid out in DOM order. Visual column order may differ from reading order — ensure the DOM order matches a meaningful reading sequence for keyboard and screen reader users.'
            },
            {
                noteKey: 'components.masonry.a11y.reduced_motion_note',
                noteFallback: 'Transitions are disabled under <code>prefers-reduced-motion: reduce</code> via a dedicated @media block in the SCSS.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/masonry.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. The token file is minimal — most visual configuration is expressed as CSS vars injected inline by the component.',
        excerpt: [
            {
                tokenPath: 'masonry.animation-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.masonry.tokens.animation_duration',
                descriptionFallback: 'Duration of the animated position-change transition.'
            },
            {
                tokenPath: 'masonry.animation-easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.masonry.tokens.animation_easing',
                descriptionFallback: 'Easing of the animated position-change transition.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'columns',
                kind: 'number',
                labelKey: 'components.masonry.playground.columns',
                labelFallback: 'Columns',
                defaultValue: 3
            },
            {
                prop: 'gap',
                kind: 'select',
                labelKey: 'components.masonry.playground.gap',
                labelFallback: 'Gap',
                defaultValue: 'md',
                options: [
                    { label: 'xs', value: 'xs' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' }
                ]
            },
            {
                prop: 'animated',
                kind: 'switch',
                labelKey: 'components.masonry.playground.animated',
                labelFallback: 'Animated',
                defaultValue: true
            },
            {
                prop: 'align',
                kind: 'select',
                labelKey: 'components.masonry.playground.align',
                labelFallback: 'Align',
                defaultValue: 'top',
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'center', value: 'center' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
