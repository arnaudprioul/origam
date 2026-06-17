/**
 * /components/section — full documentation data for OrigamSection.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/components/Section/OrigamSection.vue  (template BEM — WIP, minimal)
 *   - packages/ds/tokens/component/section.json             (CSS tokens)
 *
 * NOTE: OrigamSection is a WIP component (the .vue has a TODO comment).
 * Props, emits, slots and anatomy are minimal / unavailable from source.
 * Exposed fields reflect only what the token file and stub template contain.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SECTION_DOC: IComponentDoc = {
    slug: 'section',
    name: 'Section',
    tag: 'origam-section',
    icon: 'mdi-view-dashboard-variant-outline',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.section.description',
    descriptionFallback: 'Semantic section layout container. Provides a flex-column surface with default padding, gap and background tokens. Currently in active development.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-section--design',
    docUrl: 'http://localhost:4000/components/Section/OrigamSection',

    family: [],

    props: [
        {
            name: 'class',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.section.props.class.description',
            descriptionFallback: 'Additional CSS class forwarded to the root .origam-section div.'
        },
        {
            name: 'style',
            type: { label: 'StyleValue', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.section.props.style.description',
            descriptionFallback: 'Inline style forwarded to the root element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.section.slots.default.description',
            descriptionFallback: 'Main section content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.section.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-section>
    <origam-title tag="h2">Section title</origam-title>
    <p>Section body content goes here.</p>
  </origam-section>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-section',
        svgViewBox: '0 0 400 140',
        svgTitle: 'Anatomy of OrigamSection',
        svgDesc: 'Schematic of the Section component with 1 numbered part.',
        svg: `
  <rect x="0" y="0" width="400" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="360" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="200" y="75" font-size="12" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-section&gt;</code> — the root block is a flex-column container with configurable background, padding and gap tokens.`,
        legend: [
            {
                num: 1,
                cls: '.origam-section',
                descriptionKey: 'components.section.anatomy.root',
                descriptionFallback: 'Root element. Flex-column, 100% width, background from --origam-section---background-color.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-section">
  <slot name="default" />
</div>`,
        classes: [
            { cls: 'origam-section', descriptionKey: 'components.section.anatomy.root', descriptionFallback: 'Root block. Flex-column section container.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-section---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.section.css_vars.background_color',
            descriptionFallback: 'Background color of the section surface.'
        },
        {
            name: '--origam-section---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.section.css_vars.color',
            descriptionFallback: 'Foreground text color of the section.'
        },
        {
            name: '--origam-section---padding',
            defaultValue: '{space.6}',
            descriptionKey: 'components.section.css_vars.padding',
            descriptionFallback: 'Internal padding of the section container.'
        },
        {
            name: '--origam-section---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.section.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the section surface.'
        },
        {
            name: '--origam-section---gap',
            defaultValue: '{space.4}',
            descriptionKey: 'components.section.css_vars.gap',
            descriptionFallback: 'Gap between child elements in the flex-column layout.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.section.a11y.semantic_note',
                noteFallback: 'OrigamSection renders a <div class="origam-section"> by default. For full semantic correctness, consider wrapping with a native <section> or use an appropriate ARIA landmark role on the parent if needed.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/section.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'section.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.section.tokens.background_color',
                descriptionFallback: 'Section background color.'
            },
            {
                tokenPath: 'section.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.section.tokens.color',
                descriptionFallback: 'Section foreground text color.'
            },
            {
                tokenPath: 'section.padding',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.section.tokens.padding',
                descriptionFallback: 'Internal padding.'
            },
            {
                tokenPath: 'section.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.section.tokens.border_radius',
                descriptionFallback: 'Corner radius.'
            },
            {
                tokenPath: 'section.gap',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.section.tokens.gap',
                descriptionFallback: 'Gap between child elements.'
            }
        ]
    } satisfies IComponentTokens
}
