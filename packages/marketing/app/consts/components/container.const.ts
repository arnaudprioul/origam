/**
 * /components/container — full documentation data for OrigamContainer.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grids/container.interface.ts  (IContainerProps)
 *   - packages/ds/src/components/Grids/OrigamContainer.vue     (template BEM, CSS vars, defineExpose)
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

export const CONTAINER_DOC: IComponentDoc = {
    slug: 'container',
    name: 'Container',
    tag: 'origam-container',
    icon: 'mdi-page-layout-body',
    category: 'Layout',
    descriptionKey: 'components.catalog.container.description',
    descriptionFallback: 'Page-level structural wrapper with responsive max-width breakpoints. Supports fluid and fullscreen modes.',
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
            slug: 'col',
            name: 'Col',
            descriptionKey: 'components.catalog.col.description',
            descriptionFallback: 'Responsive flex column that spans 1–12 grid tracks.'
        }
    ],

    props: [
        {
            name: 'fluid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.container.props.fluid.description',
            descriptionFallback: 'When true, max-width is set to 100% — the container spans the full viewport width at all breakpoints.'
        },
        {
            name: 'fullscreen',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.container.props.fullscreen.description',
            descriptionFallback: 'When true, the container takes 100% width and height with display:flex and align-items:center — useful for centred full-viewport sections.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.container.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <div>.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.container.slots.default.description',
            descriptionFallback: 'Container content. Typically an OrigamRow wrapping OrigamCol elements.'
        }
    ],

    examples: [
        {
            titleKey: 'components.container.examples.basic.title',
            titleFallback: 'Basic container',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col cols="12">Page content</origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.container.examples.fluid.title',
            titleFallback: 'Fluid container',
            lang: 'vue',
            code: `<template>
  <origam-container fluid>
    Full-width content
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.container.examples.fullscreen.title',
            titleFallback: 'Fullscreen hero',
            lang: 'vue',
            code: `<template>
  <origam-container fullscreen>
    <h1>Centred hero</h1>
  </origam-container>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: {}, slotContent: 'Container content' },
        { label: 'fluid', props: { fluid: true }, slotContent: 'Fluid container' }
    ],

    anatomy: {
        rootClass: 'origam-container',
        svgViewBox: '0 0 600 120',
        svgTitle: 'Anatomy of OrigamContainer',
        svgDesc: 'Schematic of Container with root wrapper and content slot.',
        svg: `
  <rect x="0" y="0" width="600" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="10" y="15" width="580" height="90" rx="4" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="6 3"/>
  <rect x="60" y="25" width="480" height="70" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="300" y="65" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">max-width breakpoint zone</text>
  <circle cx="68" cy="33" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="37" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <line x1="77" y1="33" x2="160" y2="12" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="164" y="14" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-container</text>
  <text x="18" y="10" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">viewport</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-container&gt;</code> — 1 root element with responsive max-width and a default slot. The outer dashed rectangle represents the viewport.',
        legend: [
            {
                num: 1,
                cls: '.origam-container',
                descriptionKey: 'components.container.anatomy.root',
                descriptionFallback: 'Root element (defaults to <code>&lt;div&gt;</code>). Applies horizontal auto margins and responsive max-width steps. Modifiers: <code>--fluid</code> (max-width: 100%), <code>--fullscreen</code> (100vh flex centred).'
            }
        ],
        code: `<div class="origam-container">
  <!-- origam-container--fluid when fluid=true -->
  <!-- origam-container--fullscreen when fullscreen=true -->
  <slot name="default" />
</div>`,
        classes: [
            {
                cls: 'origam-container',
                descriptionKey: 'components.container.anatomy.root',
                descriptionFallback: 'Base container class. Applies margin: auto and responsive max-width steps.'
            },
            {
                cls: 'origam-container--fluid',
                descriptionKey: 'components.container.anatomy.fluid',
                descriptionFallback: 'Removes the max-width constraint (100% width at all breakpoints).'
            },
            {
                cls: 'origam-container--fullscreen',
                descriptionKey: 'components.container.anatomy.fullscreen',
                descriptionFallback: 'Forces 100% width and 100% height with flex centring.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-container---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.container.css_vars.max_width',
            descriptionFallback: 'Container max-width. Overridden per media breakpoint: 900px (md), 1200px (lg), 1800px (xl), 2400px (xxl).'
        },
        {
            name: '--origam-container---padding-inline-start',
            defaultValue: '16px',
            descriptionKey: 'components.container.css_vars.padding_inline_start',
            descriptionFallback: 'Horizontal inner padding — start side.'
        },
        {
            name: '--origam-container---padding-inline-end',
            defaultValue: '16px',
            descriptionKey: 'components.container.css_vars.padding_inline_end',
            descriptionFallback: 'Horizontal inner padding — end side.'
        },
        {
            name: '--origam-container---margin-inline-start',
            defaultValue: 'auto',
            descriptionKey: 'components.container.css_vars.margin_inline_start',
            descriptionFallback: 'Left auto margin (centres the container horizontally).'
        },
        {
            name: '--origam-container---margin-inline-end',
            defaultValue: 'auto',
            descriptionKey: 'components.container.css_vars.margin_inline_end',
            descriptionFallback: 'Right auto margin (centres the container horizontally).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.container.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.container.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.container.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.container.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.container.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.container.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.container.a11y.semantic',
                noteFallback: 'Container renders as <div> by default. Use the tag prop to set a semantic landmark element (e.g. <main>, <section>) when appropriate.'
            },
            {
                noteKey: 'components.container.a11y.rtl',
                noteFallback: 'Container applies RTL-aware classes via useRtl(). Padding and margin are expressed as logical properties (inline-start/end) so RTL layouts work without extra CSS.'
            }
        ]
    } satisfies IComponentA11y
}
