/**
 * /components/spacer — full documentation data for OrigamSpacer.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grids/spacer.interface.ts   (props)
 *   - packages/ds/src/components/Grids/OrigamSpacer.vue      (template, defineExpose)
 *
 * There is no dedicated token file for Spacer — it relies solely on
 * --origam-spacer---flex-grow declared as a :root CSS variable.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SPACER_DOC: IComponentDoc = {
    slug: 'spacer',
    name: 'Spacer',
    tag: 'origam-spacer',
    icon: 'mdi-arrow-expand-horizontal',
    category: 'Layout',
    descriptionKey: 'components.catalog.spacer.description',
    descriptionFallback: 'Flex spacer that grows to fill available space inside a flex row or column, pushing siblings apart.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-spacer--design',
    docUrl: 'http://localhost:4000/components/Spacer/OrigamSpacer',

    family: [
        {
            slug: 'col',
            name: 'Col',
            descriptionKey: 'components.catalog.col.description',
            descriptionFallback: 'Grid column item inside a Row.'
        },
        {
            slug: 'container',
            name: 'Container',
            descriptionKey: 'components.catalog.container.description',
            descriptionFallback: 'Centred max-width layout wrapper.'
        },
        {
            slug: 'grids',
            name: 'Row',
            descriptionKey: 'components.catalog.grids.description',
            descriptionFallback: 'Flex row host for Col and Spacer elements.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.spacer.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to div.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.spacer.slots.default.description',
            descriptionFallback: 'Optional content rendered inside the spacer element.'
        }
    ],

    examples: [
        {
            titleKey: 'components.spacer.examples.basic.title',
            titleFallback: 'Basic usage — push apart in a toolbar',
            lang: 'vue',
            code: `<template>
  <origam-toolbar>
    <origam-btn icon="mdi-menu" aria-label="Open menu" />
    <origam-title>My App</origam-title>
    <origam-spacer />
    <origam-btn icon="mdi-account" aria-label="Account" />
    <origam-btn icon="mdi-dots-vertical" aria-label="More options" />
  </origam-toolbar>
</template>`
        },
        {
            titleKey: 'components.spacer.examples.row.title',
            titleFallback: 'Usage inside a Row',
            lang: 'vue',
            code: `<template>
  <origam-row>
    <origam-col>Left content</origam-col>
    <origam-spacer />
    <origam-col>Right content</origam-col>
  </origam-row>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-spacer',
        svgViewBox: '0 0 700 120',
        svgTitle: 'Anatomy of OrigamSpacer',
        svgDesc: 'Schematic of the Spacer component with 1 numbered part inside a flex container.',
        svg: `
  <rect x="0" y="0" width="700" height="120" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.4))" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="32" y="38" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">flex container (e.g. origam-toolbar / origam-row)</text>
  <rect x="32" y="48" width="80" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="72" y="70" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">sibling</text>
  <rect x="124" y="48" width="432" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="340" y="70" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-spacer  (flex-grow: 1)</text>
  <rect x="568" y="48" width="80" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="608" y="70" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">sibling</text>
  <circle cx="132" cy="56" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="132" y="60" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-spacer&gt;</code> — a single element that grows to fill all remaining space in a flex container.`,
        legend: [
            {
                num: 1,
                cls: '.origam-spacer',
                descriptionKey: 'components.spacer.anatomy.root',
                descriptionFallback: 'Root element. <code>flex-grow: 1</code> (driven by <code>--origam-spacer---flex-grow</code>). No visual surface by default — purely a layout utility.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-spacer">
  <slot />
</div>`,
        classes: [
            {
                cls: 'origam-spacer',
                descriptionKey: 'components.spacer.anatomy.root',
                descriptionFallback: 'Root element. flex-grow: 1 via --origam-spacer---flex-grow.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-spacer---flex-grow',
            defaultValue: '1',
            descriptionKey: 'components.spacer.css_vars.flex_grow',
            descriptionFallback: 'Controls how greedily the spacer grows inside a flex container. Default is 1 (fill all remaining space).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.spacer.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.spacer.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.spacer.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.spacer.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.spacer.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.spacer.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.spacer.a11y.presentational_note',
                noteFallback: 'Spacer is a purely presentational layout element with no semantic role. Screen readers skip it entirely. No ARIA attributes are needed.'
            }
        ]
    } satisfies IComponentA11y
}
