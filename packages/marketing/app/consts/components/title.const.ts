/**
 * /components/title — full documentation data for OrigamTitle.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Title/title.interface.ts  (props)
 *   - packages/ds/src/components/Title/OrigamTitle.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/title.json              (CSS tokens)
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

export const TITLE_DOC: IComponentDoc = {
    slug: 'title',
    name: 'Title',
    tag: 'origam-title',
    icon: 'mdi-format-header-1',
    category: 'Data Display',
    descriptionKey: 'components.catalog.title.description',
    descriptionFallback: 'Polymorphic heading with configurable tag (h1–h6 or any block element) and density-driven typography tokens.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-title--design',
    docUrl: 'http://localhost:4000/components/Title/OrigamTitle',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.title.props.text.description',
            descriptionFallback: 'Heading text content. Can also be set via the default slot.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'h1'",
            descriptionKey: 'components.title.props.tag.description',
            descriptionFallback: "HTML heading element rendered at root. Defaults to h1. Use 'h2' through 'h6' to set the correct document hierarchy."
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.title.props.color.description',
            descriptionFallback: 'Foreground (text) color. Accepts semantic intents or a CSS color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.title.props.bg_color.description',
            descriptionFallback: 'Background color override.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.title.props.density.description',
            descriptionFallback: "Controls font size via token tiers. 'compact' → font-size-xs, 'default' → font-size-md, 'comfortable' → font-size-xl."
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.title.props.border.description',
            descriptionFallback: 'Applies a border to the heading element.'
        },
        // ── IMarginProps / IPaddingProps ───────────────────────────────
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.title.props.margin.description',
            descriptionFallback: 'CSS margin shorthand applied via the margin composable.'
        },
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.title.props.padding.description',
            descriptionFallback: 'CSS padding shorthand applied via the padding composable.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.title.slots.default.description',
            descriptionFallback: 'Heading content. Overrides the text prop. Accepts rich markup (inline elements, nested spans, etc.).'
        }
    ],

    examples: [
        {
            titleKey: 'components.title.examples.basic.title',
            titleFallback: 'Heading levels',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-title tag="h1" text="H1 — Page title" />
    <origam-title tag="h2" text="H2 — Section title" />
    <origam-title tag="h3" text="H3 — Sub-section" />
    <origam-title tag="h4" text="H4 — Detail heading" />
  </div>
</template>`
        },
        {
            titleKey: 'components.title.examples.density.title',
            titleFallback: 'Density (font size)',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-title density="compact"     text="Compact — xs font" />
    <origam-title density="default"     text="Default — md font" />
    <origam-title density="comfortable" text="Comfortable — xl font" />
  </div>
</template>`
        },
        {
            titleKey: 'components.title.examples.colors.title',
            titleFallback: 'Colors',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-title text="Primary heading" color="primary" />
    <origam-title text="Success heading" color="success" />
    <origam-title text="Danger heading"  color="danger" />
  </div>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-title',
        svgViewBox: '0 0 600 160',
        svgTitle: 'Anatomy of OrigamTitle',
        svgDesc: 'Schematic of the Title component — single root element with density class.',
        svg: `
  <rect x="0" y="0" width="600" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="544" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="52" y="90" font-size="28" fill="var(--origam-color__text---primary, #1a1a2e)" font-weight="700" font-family="sans-serif">Page Title</text>
  <circle cx="36" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <line x1="46" y1="40" x2="80" y2="22" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-title (tag=h1 default)</text>
  <text x="300" y="140" font-size="8" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">density: compact → xs · default → md · comfortable → xl</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-title&gt;</code> — a single polymorphic element ①. Font size is controlled by <code>density</code> via three token tiers.`,
        legend: [
            {
                num: 1,
                cls: '.origam-title',
                descriptionKey: 'components.title.anatomy.root',
                descriptionFallback: 'Root element. Renders as <h1> by default (overridable via tag prop). Uses vContrast directive for automatic text color contrast. Three density modifier classes control font size: --density-compact, --density-default, --density-comfortable.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: polymorphic heading, h1 by default -->
<component
  :is="tag"
  :id="id"
  v-contrast
  class="origam-title"
  :class="[densityClasses, colorClasses, borderClasses, paddingClasses, marginClasses]"
  :style="[colorStyles, borderStyles, paddingStyles, marginStyles]"
>
  <slot v-if="hasContent" name="default">{{ text }}</slot>
</component>`,
        classes: [
            {
                cls: 'origam-title',
                descriptionKey: 'components.title.anatomy.root',
                descriptionFallback: 'Root element. font-family, font-weight, letter-spacing, line-height come from tokens.'
            },
            {
                cls: 'origam-title--density-compact',
                descriptionKey: 'components.title.anatomy.density_compact',
                descriptionFallback: 'Applied when density="compact". font-size: var(--origam-title---font-size-xs).'
            },
            {
                cls: 'origam-title--density-default',
                descriptionKey: 'components.title.anatomy.density_default',
                descriptionFallback: 'Applied when density="default". font-size: var(--origam-title---font-size-md).'
            },
            {
                cls: 'origam-title--density-comfortable',
                descriptionKey: 'components.title.anatomy.density_comfortable',
                descriptionFallback: 'Applied when density="comfortable". font-size: var(--origam-title---font-size-xl).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-title---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.title.css_vars.color',
            descriptionFallback: 'Default heading text color.'
        },
        {
            name: '--origam-title---font-family',
            defaultValue: '{font.family.sans}',
            descriptionKey: 'components.title.css_vars.font_family',
            descriptionFallback: 'Heading font family.'
        },
        {
            name: '--origam-title---font-weight',
            defaultValue: '{font.weight.semibold}',
            descriptionKey: 'components.title.css_vars.font_weight',
            descriptionFallback: 'Heading font weight.'
        },
        {
            name: '--origam-title---letter-spacing',
            defaultValue: '{font.letterSpacing.tight}',
            descriptionKey: 'components.title.css_vars.letter_spacing',
            descriptionFallback: 'Heading letter-spacing.'
        },
        {
            name: '--origam-title---line-height',
            defaultValue: '{font.lineHeight.tight}',
            descriptionKey: 'components.title.css_vars.line_height',
            descriptionFallback: 'Heading line-height.'
        },
        {
            name: '--origam-title---font-size-xs',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.title.css_vars.font_size_xs',
            descriptionFallback: 'Font size for density="compact".'
        },
        {
            name: '--origam-title---font-size-md',
            defaultValue: '{font.size.xl}',
            descriptionKey: 'components.title.css_vars.font_size_md',
            descriptionFallback: 'Font size for density="default".'
        },
        {
            name: '--origam-title---font-size-xl',
            defaultValue: '{font.size.3xl}',
            descriptionKey: 'components.title.css_vars.font_size_xl',
            descriptionFallback: 'Font size for density="comfortable".'
        },
        {
            name: '--origam-title---margin-block-start',
            defaultValue: '{space.0}',
            descriptionKey: 'components.title.css_vars.margin_block_start',
            descriptionFallback: 'Top margin override (zeroed by default — control spacing via the margin prop).'
        },
        {
            name: '--origam-title---margin-block-end',
            defaultValue: '{space.0}',
            descriptionKey: 'components.title.css_vars.margin_block_end',
            descriptionFallback: 'Bottom margin override (zeroed by default).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.title.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.title.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.title.exposed.id',
            descriptionFallback: 'Unique style-sheet ID (aliased to styleId internally to avoid shadowing the id prop).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.title.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.title.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.title.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['heading (native HTML)'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.title.a11y.heading_level_note',
                noteFallback: 'Always choose a tag value that fits the document heading hierarchy (h1 for the page title, h2 for sections, etc.). Skipping heading levels (h1 → h3) impairs screen reader navigation.'
            },
            {
                noteKey: 'components.title.a11y.vcontrast_note',
                noteFallback: 'The vContrast directive automatically adjusts the text color for sufficient contrast against the background. Do not suppress it without verifying WCAG AA compliance manually.'
            },
            {
                noteKey: 'components.title.a11y.color_note',
                noteFallback: 'When setting color or bgColor, verify that the contrast ratio meets WCAG 2.1 AA (≥ 4.5:1 for normal text). The vContrast directive assists but does not guarantee compliance for every color combination.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/title.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'title.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.title.tokens.color',
                descriptionFallback: 'Default heading text color.'
            },
            {
                tokenPath: 'title.font-family',
                value: '{font.family.sans}',
                type: 'fontFamily',
                descriptionKey: 'components.title.tokens.font_family',
                descriptionFallback: 'Heading font family.'
            },
            {
                tokenPath: 'title.font-weight',
                value: '{font.weight.semibold}',
                type: 'fontWeight',
                descriptionKey: 'components.title.tokens.font_weight',
                descriptionFallback: 'Heading font weight.'
            },
            {
                tokenPath: 'title.font-size-md',
                value: '{font.size.xl}',
                type: 'dimension',
                descriptionKey: 'components.title.tokens.font_size_md',
                descriptionFallback: 'Font size for density=default.'
            },
            {
                tokenPath: 'title.font-size-xl',
                value: '{font.size.3xl}',
                type: 'dimension',
                descriptionKey: 'components.title.tokens.font_size_xl',
                descriptionFallback: 'Font size for density=comfortable.'
            },
            {
                tokenPath: 'title.font-size-xs',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.title.tokens.font_size_xs',
                descriptionFallback: 'Font size for density=compact.'
            },
            {
                tokenPath: 'title.letter-spacing',
                value: '{font.letterSpacing.tight}',
                type: 'dimension',
                descriptionKey: 'components.title.tokens.letter_spacing',
                descriptionFallback: 'Heading letter-spacing.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Page Title',
        controls: [
            {
                prop: 'tag',
                kind: 'select',
                labelKey: 'components.title.playground.tag',
                labelFallback: 'Tag (heading level)',
                defaultValue: 'h1',
                options: [
                    { label: 'h1', value: 'h1' },
                    { label: 'h2', value: 'h2' },
                    { label: 'h3', value: 'h3' },
                    { label: 'h4', value: 'h4' },
                    { label: 'h5', value: 'h5' },
                    { label: 'h6', value: 'h6' },
                    { label: 'p', value: 'p' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.title.playground.density',
                labelFallback: 'Density (font size)',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.title.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
