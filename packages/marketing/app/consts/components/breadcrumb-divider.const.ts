/**
 * /components/breadcrumb-divider — full documentation data for OrigamBreadcrumbDivider.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Breadcrumb/breadcrumb-divider.interface.ts  (props)
 *   - packages/ds/src/components/Breadcrumb/OrigamBreadcrumbDivider.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/breadcrumb.json                           (CSS tokens)
 *
 * Sub-component of: OrigamBreadcrumb (parentSlug: 'breadcrumb')
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

export const BREADCRUMB_DIVIDER_DOC: IComponentDoc = {
    slug: 'breadcrumb-divider',
    name: 'BreadcrumbDivider',
    tag: 'origam-breadcrumb-divider',
    icon: 'mdi-slash-forward',
    category: 'Navigation',
    descriptionKey: 'components.catalog.breadcrumb_divider.description',
    descriptionFallback: 'Separator rendered between breadcrumb items. Defaults to "/" but accepts any text string or MDI icon identifier.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-breadcrumb--design',
    docUrl: 'http://localhost:4000/components/Breadcrumb/OrigamBreadcrumb',
    parentSlug: 'breadcrumb',

    family: [
        {
            slug: 'breadcrumb',
            name: 'Breadcrumb',
            descriptionKey: 'components.catalog.breadcrumb.description',
            descriptionFallback: 'Hierarchical navigation trail rendered as a <nav> landmark.'
        },
        {
            slug: 'breadcrumb-item',
            name: 'BreadcrumbItem',
            descriptionKey: 'components.catalog.breadcrumb_item.description',
            descriptionFallback: 'Individual breadcrumb link or span.'
        }
    ],

    related: [
        { slug: 'breadcrumb', name: 'Breadcrumb', kind: 'component', descriptionFallback: 'Parent component that renders BreadcrumbDivider between items.', descriptionKey: 'components.catalog.breadcrumb.description' }
    ],

    props: [
        {
            name: 'divider',
            type: { label: 'string | TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'/'",
            descriptionKey: 'components.breadcrumb_divider.props.divider.description',
            descriptionFallback: 'Separator content. A plain string is rendered as text; an MDI icon identifier (e.g. "mdi-chevron-right") renders OrigamIcon.',
            required: true
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.breadcrumb_divider.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <span> (aria-hidden on the parent <li>).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_divider.props.color.description',
            descriptionFallback: 'Foreground color of the divider glyph or icon.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_divider.props.bg_color.description',
            descriptionFallback: 'Background color of the divider element.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.breadcrumb_divider.props.density.description',
            descriptionFallback: 'Density modifier that adjusts the horizontal padding around the divider.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.breadcrumb_divider.props.size.description',
            descriptionFallback: 'Size of the divider (applies to icon mode via OrigamIcon).'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.breadcrumb_divider.slots.default.description',
            descriptionFallback: 'Full override of the divider content. When provided, the divider prop and icon/text logic are bypassed.'
        }
    ],

    examples: [
        {
            titleKey: 'components.breadcrumb_divider.examples.text.title',
            titleFallback: 'Text divider',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-divider divider="/" />
</template>`
        },
        {
            titleKey: 'components.breadcrumb_divider.examples.icon.title',
            titleFallback: 'Icon divider',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-divider divider="mdi-chevron-right" color="primary" />
</template>`
        },
        {
            titleKey: 'components.breadcrumb_divider.examples.custom.title',
            titleFallback: 'Custom slot',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-divider divider="/">
    <origam-icon icon="mdi-arrow-right" size="small" />
  </origam-breadcrumb-divider>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-breadcrumb-divider',
        svgViewBox: '0 0 400 120',
        svgTitle: 'Anatomy of OrigamBreadcrumbDivider',
        svgDesc: 'Schematic of the BreadcrumbDivider component with 2 numbered parts.',
        svg: `
  <rect x="0" y="0" width="400" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="60" y="30" width="280" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="130" y="44" width="140" height="32" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="200" y="65" font-size="18" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">/</text>
  <circle cx="68" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="138" cy="46" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="138" y="50.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="78" y1="36" x2="120" y2="20" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="124" y="18" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-breadcrumb-divider</text>
  <line x1="147" y1="46" x2="200" y2="108" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="202" y="112" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">text or origam-icon</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-breadcrumb-divider&gt;</code> — root <code>&lt;span&gt;</code> ① hosts text or an <code>&lt;origam-icon&gt;</code> ② depending on whether <code>divider</code> is an MDI identifier.',
        legend: [
            {
                num: 1,
                cls: '.origam-breadcrumb-divider',
                descriptionKey: 'components.breadcrumb_divider.anatomy.root',
                descriptionFallback: 'Root element (default: <code>&lt;span&gt;</code>). Carries padding, color and density classes. Usually rendered inside a <code>&lt;li aria-hidden&gt;</code> from OrigamBreadcrumb.'
            },
            {
                num: 2,
                cls: '(text or origam-icon)',
                descriptionKey: 'components.breadcrumb_divider.anatomy.content',
                descriptionFallback: 'Content: raw text when <code>divider</code> is a plain string; <code>&lt;origam-icon&gt;</code> when it is an MDI icon identifier (resolved via <code>MDI_ICONS</code> enum check).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: <span> by default, customisable via tag prop -->
<span class="origam-breadcrumb-divider">
  <!-- icon branch: divider is an MDI identifier -->
  <origam-icon :icon="divider" />
  <!-- or text branch: divider is a plain string -->
  {{ divider }}
  <!-- or default slot override -->
  <slot />
</span>`,
        classes: [
            {
                cls: 'origam-breadcrumb-divider',
                descriptionKey: 'components.breadcrumb_divider.anatomy.root',
                descriptionFallback: 'Root element. Inline-block, vertical-align: middle. Padding inherited from density modifier.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-breadcrumb-divider---color',
            defaultValue: 'var(--origam-breadcrumb-divider---color-token, inherit)',
            descriptionKey: 'components.breadcrumb_divider.css_vars.color',
            descriptionFallback: 'Divider foreground color. Falls back to inherit so it matches the surrounding text by default.'
        },
        {
            name: '--origam-breadcrumb-divider---background',
            defaultValue: 'transparent',
            descriptionKey: 'components.breadcrumb_divider.css_vars.background',
            descriptionFallback: 'Divider background (transparent by default).'
        },
        {
            name: '--origam-breadcrumb-divider---padding-inline',
            defaultValue: '8px',
            descriptionKey: 'components.breadcrumb_divider.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding on both sides of the divider. Applied to both padding-inline-start and padding-inline-end.'
        },
        {
            name: '--origam-breadcrumb-divider---opacity',
            defaultValue: '1',
            descriptionKey: 'components.breadcrumb_divider.css_vars.opacity',
            descriptionFallback: 'Divider opacity (1 by default).'
        },
        {
            name: '--origam-breadcrumb-divider---density',
            defaultValue: '0px',
            descriptionKey: 'components.breadcrumb_divider.css_vars.density',
            descriptionFallback: 'Density offset applied to padding calculations. comfortable: −8px, default: 0px, compact: +8px.'
        },
        {
            name: '--origam-breadcrumb-divider---transition',
            defaultValue: 'transform, color 0.2s, 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.breadcrumb_divider.css_vars.transition',
            descriptionFallback: 'Transition applied to transform and color properties.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.breadcrumb_divider.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.breadcrumb_divider.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed breadcrumbDividerStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.breadcrumb_divider.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.breadcrumb_divider.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.breadcrumb_divider.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.breadcrumb_divider.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.breadcrumb_divider.a11y.aria_hidden',
                noteFallback: 'OrigamBreadcrumbDivider is aria-hidden by design — it is a purely visual separator and should not be read by screen readers. The aria-hidden attribute is applied on the parent <li> by OrigamBreadcrumb.'
            },
            {
                noteKey: 'components.breadcrumb_divider.a11y.v_contrast',
                noteFallback: 'The v-contrast directive is applied to the root element for automatic contrast adjustment when a custom color prop is provided.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/breadcrumb.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'breadcrumb.divider.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.breadcrumb_divider.tokens.color',
                descriptionFallback: 'Divider glyph color.'
            },
            {
                tokenPath: 'breadcrumb.divider.padding-inline',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.breadcrumb_divider.tokens.padding_inline',
                descriptionFallback: 'Horizontal padding around the divider character.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'divider',
                kind: 'select',
                labelKey: 'components.breadcrumb_divider.playground.divider',
                labelFallback: 'Divider',
                defaultValue: '/',
                options: [
                    { label: '/', value: '/' },
                    { label: '>', value: '>' },
                    { label: '|', value: '|' },
                    { label: 'mdi-chevron-right', value: 'mdi-chevron-right' },
                    { label: 'mdi-arrow-right', value: 'mdi-arrow-right' },
                    { label: 'mdi-slash-forward', value: 'mdi-slash-forward' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.breadcrumb_divider.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(inherit)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.breadcrumb_divider.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
