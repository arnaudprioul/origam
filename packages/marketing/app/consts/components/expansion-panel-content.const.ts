/**
 * /components/expansion-panel-content — documentation data for OrigamExpansionPanelContent.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ExpensionPanel/expansion-panel-content.interface.ts  (props)
 *   - packages/ds/src/components/ExpansionPanel/OrigamExpansionPanelContent.vue        (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/expansion-panel.json                               (CSS tokens — content section)
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

export const EXPANSION_PANEL_CONTENT_DOC: IComponentDoc = {
    slug: 'expansion-panel-content',
    name: 'ExpansionPanelContent',
    tag: 'origam-expansion-panel-content',
    icon: 'mdi-card-text-outline',
    category: 'Layout',
    descriptionKey: 'components.catalog.expansion_panel_content.description',
    descriptionFallback: 'Animated content region revealed when the parent ExpansionPanel is expanded. Has role="region" and aria-labelledby pointing to the header.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-expansionpanel--design',
    docUrl: 'http://localhost:4000/components/ExpansionPanel/OrigamExpansionPanel',

    parentSlug: 'expansion-panel',

    family: [
        {
            slug: 'expansion-panel',
            name: 'ExpansionPanel',
            descriptionKey: 'components.catalog.expansion_panel.description',
            descriptionFallback: 'Collapsible panel with animated header and content reveal.'
        },
        {
            slug: 'expansion-panels',
            name: 'ExpansionPanels',
            descriptionKey: 'components.catalog.expansion_panels.description',
            descriptionFallback: 'Container managing a group of ExpansionPanel items.'
        },
        {
            slug: 'expansion-panel-header',
            name: 'ExpansionPanelHeader',
            descriptionKey: 'components.catalog.expansion_panel_header.description',
            descriptionFallback: 'Clickable header row with expand/collapse icon, prepend/append slots and ripple support.'
        }
    ],

    related: [
        {
            slug: 'expansion-panel',
            name: 'ExpansionPanel',
            kind: 'component',
            descriptionKey: 'components.catalog.expansion_panel.description',
            descriptionFallback: 'Parent component that orchestrates header and content together.'
        }
    ],

    props: [
        {
            name: 'content',
            type: { label: 'string | Component', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.content.description',
            descriptionFallback: 'Content to render inside the panel body. Accepts a plain string or a Vue component reference. Superseded by the default slot.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.expansion_panel_content.props.tag.description',
            descriptionFallback: 'HTML element rendered as the content region root.'
        },
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel_content.props.loading.description',
            descriptionFallback: 'Shows a progress loader inside the content area. Supports line, circular and skeleton modes.'
        },
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel_content.props.eager.description',
            descriptionFallback: 'When true, renders content immediately even while the panel is collapsed. Useful for SEO or when the slot must be mounted before first expand.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.expansion_panel_content.props.density.description',
            descriptionFallback: 'Content density: compact, comfortable or default.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.color.description',
            descriptionFallback: 'Foreground colour applied to the content region.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.bg_color.description',
            descriptionFallback: 'Background colour of the content region surface.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.rounded.description',
            descriptionFallback: 'Border-radius applied to the content region root element.'
        },
        {
            name: 'border',
            type: { label: 'string | number | boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.border.description',
            descriptionFallback: 'Border shorthand applied to the content region.'
        },
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.padding.description',
            descriptionFallback: 'Padding override for the content region root element.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_content.props.margin.description',
            descriptionFallback: 'Margin override for the content region root element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.expansion_panel_content.slots.default.description',
            descriptionFallback: 'Panel body content. Rendered inside the inner __wrapper div when the panel is expanded (or eager).'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.expansion_panel_content.slots.loader.description',
            descriptionFallback: 'Custom loader shown when loading is active. Defaults to OrigamProgress (line/circular) or three OrigamSkeleton rows (skeleton mode).'
        }
    ],

    examples: [
        {
            titleKey: 'components.expansion_panel_content.examples.basic.title',
            titleFallback: 'Default slot content',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panel title="Section 1">
    <origam-expansion-panel-content>
      <p>This is the body of the panel.</p>
    </origam-expansion-panel-content>
  </origam-expansion-panel>
</template>`
        },
        {
            titleKey: 'components.expansion_panel_content.examples.component_prop.title',
            titleFallback: 'Component prop',
            lang: 'vue',
            code: `<script setup>
import MyPanelBody from './MyPanelBody.vue'
</script>

<template>
  <origam-expansion-panel title="Dynamic body">
    <origam-expansion-panel-content :content="MyPanelBody" />
  </origam-expansion-panel>
</template>`
        },
        {
            titleKey: 'components.expansion_panel_content.examples.loading.title',
            titleFallback: 'Loading state (skeleton)',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panel title="Async content">
    <origam-expansion-panel-content loading="skeleton">
      <p>Content loaded!</p>
    </origam-expansion-panel-content>
  </origam-expansion-panel>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-expansion-panel-content',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamExpansionPanelContent',
        svgDesc: 'Schematic of the ExpansionPanelContent component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="148" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="50" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">.origam-expansion-panel-content (role=region)</text>
  <rect x="48" y="64" width="604" height="80" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="108" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">.origam-expansion-panel-content__wrapper</text>
  <circle cx="36" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="72" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="76" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expansion-panel-content&gt;</code> — 2 internal parts. Root ① has <code>role="region"</code> and <code>aria-labelledby</code> pointing to the sibling header. Inner wrapper ② carries the padding tokens.`,
        legend: [
            {
                num: 1,
                cls: '.origam-expansion-panel-content',
                descriptionKey: 'components.expansion_panel_content.anatomy.root',
                descriptionFallback: 'Root element. role="region" with aria-labelledby referencing the header ID. Displayed via OrigamExpandY animated transition.'
            },
            {
                num: 2,
                cls: '.origam-expansion-panel-content__wrapper',
                descriptionKey: 'components.expansion_panel_content.anatomy.wrapper',
                descriptionFallback: 'Inner padding wrapper. Hosts the default slot, the loader slot, and the progress indicator.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div
  class="origam-expansion-panel-content"
  role="region"
  aria-labelledby="expansion-panel-header-{id}"
>
  <div class="origam-expansion-panel-content__wrapper">
    <!-- loader slot (line/circular/skeleton) when loading -->
    <!-- default slot / content prop -->
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-expansion-panel-content',
                descriptionKey: 'components.expansion_panel_content.anatomy.root',
                descriptionFallback: 'Root element with role="region".'
            },
            {
                cls: 'origam-expansion-panel-content__wrapper',
                descriptionKey: 'components.expansion_panel_content.anatomy.wrapper',
                descriptionFallback: 'Inner padding wrapper hosting slot content and loader.'
            },
            {
                cls: 'origam-expansion-panel-content__progress',
                descriptionKey: 'components.expansion_panel_content.anatomy.progress',
                descriptionFallback: 'Progress indicator shown during loading (line or circular mode).'
            },
            {
                cls: 'origam-expansion-panel-content__progress--linear',
                descriptionKey: 'components.expansion_panel_content.anatomy.progress_linear',
                descriptionFallback: 'Modifier applied when loader kind is "line".'
            },
            {
                cls: 'origam-expansion-panel-content__progress--circular',
                descriptionKey: 'components.expansion_panel_content.anatomy.progress_circular',
                descriptionFallback: 'Modifier applied when loader kind is "circular".'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-expansion-panel__content---display',
            defaultValue: 'flex',
            descriptionKey: 'components.expansion_panel_content.css_vars.display',
            descriptionFallback: 'Display mode of the content region root. Defaults to flex.'
        },
        {
            name: '--origam-expansion-panel__content---padding-block-start',
            defaultValue: '8px ({space.2})',
            descriptionKey: 'components.expansion_panel_content.css_vars.padding_block_start',
            descriptionFallback: 'Top padding of the inner wrapper.'
        },
        {
            name: '--origam-expansion-panel__content---padding-block-end',
            defaultValue: '16px ({space.4})',
            descriptionKey: 'components.expansion_panel_content.css_vars.padding_block_end',
            descriptionFallback: 'Bottom padding of the inner wrapper.'
        },
        {
            name: '--origam-expansion-panel__content---padding-inline-start',
            defaultValue: '24px ({space.6})',
            descriptionKey: 'components.expansion_panel_content.css_vars.padding_inline_start',
            descriptionFallback: 'Leading (left) padding of the inner wrapper.'
        },
        {
            name: '--origam-expansion-panel__content---padding-inline-end',
            defaultValue: '24px ({space.6})',
            descriptionKey: 'components.expansion_panel_content.css_vars.padding_inline_end',
            descriptionFallback: 'Trailing (right) padding of the inner wrapper.'
        },
        {
            name: '--origam-expansion-panel__content---flex',
            defaultValue: '1 1 auto',
            descriptionKey: 'components.expansion_panel_content.css_vars.flex',
            descriptionFallback: 'Flex grow/shrink/basis of the inner wrapper inside the flex root.'
        },
        {
            name: '--origam-expansion-panel__content---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.expansion_panel_content.css_vars.max_width',
            descriptionFallback: 'Maximum width of the inner wrapper. Prevents overflow.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expansion_panel_content.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.expansion_panel_content.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.expansion_panel_content.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.expansion_panel_content.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.expansion_panel_content.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.expansion_panel_content.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.expansion_panel_content.a11y.key_tab',
                actionFallback: 'Moves focus into and out of the content region when it is expanded.'
            }
        ],
        notes: [
            {
                noteKey: 'components.expansion_panel_content.a11y.aria_labelledby',
                noteFallback: 'The content root carries aria-labelledby pointing to the sibling header ID, associating the region with its label for screen readers.'
            },
            {
                noteKey: 'components.expansion_panel_content.a11y.visibility',
                noteFallback: 'Uses v-show to hide the content — it remains in the DOM (unless eager=false and not yet revealed) so focus management works correctly after expand.'
            },
            {
                noteKey: 'components.expansion_panel_content.a11y.lazy',
                noteFallback: 'Content is lazily rendered on first expand (unless eager is true). After first expand, the DOM is preserved on collapse via v-show.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/expansion-panel.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'expansion-panel.content.display',
                value: 'flex',
                type: 'other',
                descriptionKey: 'components.expansion_panel_content.tokens.display',
                descriptionFallback: 'Display mode of the content region.'
            },
            {
                tokenPath: 'expansion-panel.content.padding-block-start',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_content.tokens.padding_block_start',
                descriptionFallback: 'Top padding of the inner wrapper (8px).'
            },
            {
                tokenPath: 'expansion-panel.content.padding-block-end',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_content.tokens.padding_block_end',
                descriptionFallback: 'Bottom padding of the inner wrapper (16px).'
            },
            {
                tokenPath: 'expansion-panel.content.padding-inline-start',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_content.tokens.padding_inline_start',
                descriptionFallback: 'Leading padding of the inner wrapper (24px).'
            },
            {
                tokenPath: 'expansion-panel.content.padding-inline-end',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_content.tokens.padding_inline_end',
                descriptionFallback: 'Trailing padding of the inner wrapper (24px).'
            },
            {
                tokenPath: 'expansion-panel.content.flex',
                value: '1 1 auto',
                type: 'other',
                descriptionKey: 'components.expansion_panel_content.tokens.flex',
                descriptionFallback: 'Flex shorthand of the inner wrapper.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.expansion_panel_content.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'error', value: 'error' }
                ]
            },
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.expansion_panel_content.playground.bg_color',
                labelFallback: 'Background color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.expansion_panel_content.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' }
                ]
            },
            {
                prop: 'eager',
                kind: 'switch',
                labelKey: 'components.expansion_panel_content.playground.eager',
                labelFallback: 'Eager',
                defaultValue: false
            }
        ],
        defaultSlotContent: 'This is the expanded content of the panel.'
    } satisfies IComponentPlayground
}
