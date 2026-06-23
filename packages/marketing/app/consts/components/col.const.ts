/**
 * /components/col — full documentation data for OrigamCol.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grids/col.interface.ts     (IColProps)
 *   - packages/ds/src/components/Grids/OrigamCol.vue        (template BEM, CSS vars, defineExpose)
 *
 * PARENT: grids
 * FAMILY: Grids/ sub-components
 */
import type {
    IComponentDoc,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y
} from '~/interfaces/components-catalog.interface'

export const COL_DOC: IComponentDoc = {
    slug: 'col',
    name: 'Col',
    tag: 'origam-col',
    icon: 'mdi-view-column-outline',
    category: 'Layout',
    descriptionKey: 'components.catalog.col.description',
    descriptionFallback: 'Responsive flex column that spans 1–12 grid tracks. Supports per-breakpoint span, offset, order and alignment overrides via props.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-grids--design',
    docUrl: 'http://localhost:4000/components/Grids/OrigamGrids',

    parentSlug: 'grids',

    family: [
        {
            slug: 'grids',
            name: 'Grids',
            descriptionKey: 'components.catalog.grids.description',
            descriptionFallback: 'Responsive 12-column grid system (Container, Row, Col, Spacer).'
        },
        {
            slug: 'container',
            name: 'Container',
            descriptionKey: 'components.catalog.container.description',
            descriptionFallback: 'Page-level structural wrapper with optional fluid/fullscreen modes.'
        }
    ],

    props: [
        {
            name: 'cols',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.cols.description',
            descriptionFallback: 'Number of columns to span (1–12) or "auto". Applied at all breakpoints unless overridden.'
        },
        {
            name: 'sm',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.sm.description',
            descriptionFallback: 'Column span override at the sm breakpoint (≥ 600 px).'
        },
        {
            name: 'md',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.md.description',
            descriptionFallback: 'Column span override at the md breakpoint (≥ 960 px).'
        },
        {
            name: 'lg',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.lg.description',
            descriptionFallback: 'Column span override at the lg breakpoint (≥ 1280 px).'
        },
        {
            name: 'xl',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.xl.description',
            descriptionFallback: 'Column span override at the xl breakpoint (≥ 1920 px).'
        },
        {
            name: 'xxl',
            type: { label: 'TCols', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.xxl.description',
            descriptionFallback: 'Column span override at the xxl breakpoint (≥ 2560 px).'
        },
        {
            name: 'offset',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset.description',
            descriptionFallback: 'Left margin offset in columns (1–11). Applied at all breakpoints.'
        },
        {
            name: 'offsetSm',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset_sm.description',
            descriptionFallback: 'Offset override at the sm breakpoint.'
        },
        {
            name: 'offsetMd',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset_md.description',
            descriptionFallback: 'Offset override at the md breakpoint.'
        },
        {
            name: 'offsetLg',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset_lg.description',
            descriptionFallback: 'Offset override at the lg breakpoint.'
        },
        {
            name: 'offsetXl',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset_xl.description',
            descriptionFallback: 'Offset override at the xl breakpoint.'
        },
        {
            name: 'offsetXxl',
            type: { label: 'TCols (excl. 12)', slug: 'cols', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.offset_xxl.description',
            descriptionFallback: 'Offset override at the xxl breakpoint.'
        },
        {
            name: 'order',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order.description',
            descriptionFallback: 'CSS order value. Also accepts the named values "first" (-9999) and "last" (9999).'
        },
        {
            name: 'orderSm',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order_sm.description',
            descriptionFallback: 'Order override at the sm breakpoint.'
        },
        {
            name: 'orderMd',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order_md.description',
            descriptionFallback: 'Order override at the md breakpoint.'
        },
        {
            name: 'orderLg',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order_lg.description',
            descriptionFallback: 'Order override at the lg breakpoint.'
        },
        {
            name: 'orderXl',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order_xl.description',
            descriptionFallback: 'Order override at the xl breakpoint.'
        },
        {
            name: 'orderXxl',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.order_xxl.description',
            descriptionFallback: 'Order override at the xxl breakpoint.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.col.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <div>.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.color.description',
            descriptionFallback: 'Foreground color for content inside the column.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.col.props.bg_color.description',
            descriptionFallback: 'Background color of the column.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.col.slots.default.description',
            descriptionFallback: 'Column content. Typically other layout or content components.'
        }
    ],

    examples: [
        {
            titleKey: 'components.col.examples.basic.title',
            titleFallback: 'Basic 12-column grid',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col cols="6">Left half</origam-col>
      <origam-col cols="6">Right half</origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.col.examples.responsive.title',
            titleFallback: 'Responsive breakpoints',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col cols="12" sm="6" md="4" lg="3">Item</origam-col>
      <origam-col cols="12" sm="6" md="4" lg="3">Item</origam-col>
      <origam-col cols="12" sm="6" md="4" lg="3">Item</origam-col>
      <origam-col cols="12" sm="6" md="4" lg="3">Item</origam-col>
    </origam-row>
  </origam-container>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-col',
        svgViewBox: '0 0 500 120',
        svgTitle: 'Anatomy of OrigamCol',
        svgDesc: 'Schematic of Col with root and content slot.',
        svg: `
  <rect x="0" y="0" width="500" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="460" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="30" y="30" width="440" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="250" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <line x1="37" y1="28" x2="70" y2="12" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="74" y="14" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-col</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-col&gt;</code> — 1 root element with a default slot. BEM size/offset/order modifiers are generated dynamically from props.',
        legend: [
            {
                num: 1,
                cls: '.origam-col',
                descriptionKey: 'components.col.anatomy.root',
                descriptionFallback: 'Root element (defaults to <code>&lt;div&gt;</code>). Responsive modifiers such as <code>origam-col--6</code>, <code>origam-col--md-4</code> and <code>origam-col--offset-2</code> are generated from props.'
            }
        ],
        code: `<div class="origam-col origam-col--6 origam-col--md-4">
  <slot name="default" />
</div>`,
        classes: [
            {
                cls: 'origam-col',
                descriptionKey: 'components.col.anatomy.root',
                descriptionFallback: 'Base flex column class.'
            },
            {
                cls: 'origam-col--{n}',
                descriptionKey: 'components.col.anatomy.size',
                descriptionFallback: 'Column span modifier (1–12 or auto).'
            },
            {
                cls: 'origam-col--{bp}-{n}',
                descriptionKey: 'components.col.anatomy.breakpoint_size',
                descriptionFallback: 'Breakpoint-specific span modifier, e.g. origam-col--md-6.'
            },
            {
                cls: 'origam-col--offset-{n}',
                descriptionKey: 'components.col.anatomy.offset',
                descriptionFallback: 'Left-margin offset in columns.'
            },
            {
                cls: 'origam-col--align-{value}',
                descriptionKey: 'components.col.anatomy.align',
                descriptionFallback: 'align-self override (start, end, center, baseline, stretch).'
            },
            {
                cls: 'origam-col--order-{value}',
                descriptionKey: 'components.col.anatomy.order',
                descriptionFallback: 'CSS order override (0–12, first, last).'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-col---width',
            defaultValue: '100%',
            descriptionKey: 'components.col.css_vars.width',
            descriptionFallback: 'Default column width before breakpoint modifiers are applied.'
        },
        {
            name: '--origam-col---flex-basis',
            defaultValue: '0',
            descriptionKey: 'components.col.css_vars.flex_basis',
            descriptionFallback: 'Flex basis. Overridden per span modifier to calc(100% / (12 / n)).'
        },
        {
            name: '--origam-col---flex-grow',
            defaultValue: '1',
            descriptionKey: 'components.col.css_vars.flex_grow',
            descriptionFallback: 'flex-grow value. Set to 0 for auto columns.'
        },
        {
            name: '--origam-col---padding-inline-start',
            defaultValue: '12px',
            descriptionKey: 'components.col.css_vars.padding_inline_start',
            descriptionFallback: 'Horizontal gutter — start side. Matches the Row gutter half-width.'
        },
        {
            name: '--origam-col---padding-inline-end',
            defaultValue: '12px',
            descriptionKey: 'components.col.css_vars.padding_inline_end',
            descriptionFallback: 'Horizontal gutter — end side.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.col.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.col.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.col.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.col.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.col.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.col.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.col.a11y.semantic',
                noteFallback: 'Col renders as <div> by default. Use the tag prop to render a semantic element (e.g. <article>, <section>) when appropriate for the content.'
            }
        ]
    } satisfies IComponentA11y
}
