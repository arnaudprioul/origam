/**
 * /components/expansion-panels — documentation data for OrigamExpansionPanels.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ExpensionPanel/expansion-panels.interface.ts  (props)
 *   - packages/ds/src/components/ExpansionPanel/OrigamExpansionPanels.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/expansion-panel.json                        (CSS tokens)
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

export const EXPANSION_PANELS_DOC: IComponentDoc = {
    slug: 'expansion-panels',
    name: 'ExpansionPanels',
    tag: 'origam-expansion-panels',
    icon: 'mdi-view-list-outline',
    category: 'Layout',
    descriptionKey: 'components.catalog.expansion_panels.description',
    descriptionFallback: 'Container managing a group of ExpansionPanel items. Supports accordion, flat, popout and inset display modes. Props cascade to all child panels via DefaultsProvider.',
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
            slug: 'expansion-panel-header',
            name: 'ExpansionPanelHeader',
            descriptionKey: 'components.catalog.expansion_panel_header.description',
            descriptionFallback: 'Clickable header row with expand/collapse icon, prepend/append slots and ripple support.'
        },
        {
            slug: 'expansion-panel-content',
            name: 'ExpansionPanelContent',
            descriptionKey: 'components.catalog.expansion_panel_content.description',
            descriptionFallback: 'Animated content region revealed when the panel is expanded.'
        }
    ],

    related: [
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'components.catalog.dialog.description',
            descriptionFallback: 'Overlay dialog for complex expandable content.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.expansion_panels.props.tag.description',
            descriptionFallback: 'HTML element rendered at the panels container root.'
        },
        {
            name: 'items',
            type: { label: 'Array<IExpansionPanelProps>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.items.description',
            descriptionFallback: 'Data-driven array of panel definitions. Each item is spread as props onto an OrigamExpansionPanel instance.'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.flat.description',
            descriptionFallback: 'Removes the shadow and the border separator between panels.'
        },
        {
            name: 'accordion',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.accordion.description',
            descriptionFallback: 'Collapses all other panels when one is opened (single-open mode). Panels are rendered without gaps and border-radius is managed per position.'
        },
        {
            name: 'popout',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.popout.description',
            descriptionFallback: 'Active panel expands horizontally beyond the container width, creating a popout effect.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.inset.description',
            descriptionFallback: 'Active panel shrinks horizontally to sit inside the container, creating an inset effect.'
        },
        {
            name: 'expandIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-down'",
            descriptionKey: 'components.expansion_panels.props.expand_icon.description',
            descriptionFallback: 'Icon passed down to every child panel header for the collapsed state.'
        },
        {
            name: 'collapseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-up'",
            descriptionKey: 'components.expansion_panels.props.collapse_icon.description',
            descriptionFallback: 'Icon passed down to every child panel header for the expanded state.'
        },
        {
            name: 'hideActions',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.hide_actions.description',
            descriptionFallback: 'Passed down to every child panel header to hide the expand/collapse icon.'
        },
        {
            name: 'modelValue',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.model_value.description',
            descriptionFallback: 'Active panel value(s). Bound to v-model. Array for multiple, single value for one.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.multiple.description',
            descriptionFallback: 'Allows multiple panels to be expanded simultaneously.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean | "force"', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.mandatory.description',
            descriptionFallback: 'At least one panel must remain open. "force" prevents deselection even if the same item is clicked.'
        },
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.loading.description',
            descriptionFallback: 'Shows a progress loader on the panels container.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.expansion_panels.props.density.description',
            descriptionFallback: 'Cascaded density to all child panels: compact, comfortable or default.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.color.description',
            descriptionFallback: 'Foreground colour cascaded to all child panels.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.bg_color.description',
            descriptionFallback: 'Background colour cascaded to all child panels.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.rounded.description',
            descriptionFallback: 'Border-radius of the container and cascaded to all child panels.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panels.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation of the panels container.'
        },
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panels.props.eager.description',
            descriptionFallback: 'When true, all panel content is rendered on mount even if collapsed.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'unknown', slug: '', kind: 'primitive' },
            descriptionKey: 'components.expansion_panels.emits.update_model_value.description',
            descriptionFallback: 'Fired when the active panel selection changes. Carries the new value or array of values.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.expansion_panels.slots.default.description',
            descriptionFallback: 'Default slot for manual <origam-expansion-panel> children. Used when items prop is not provided.'
        },
        {
            slot: 'item',
            slotProps: '{ item, index, collapseIcon, expandIcon, hideActions }',
            descriptionKey: 'components.expansion_panels.slots.item.description',
            descriptionFallback: 'Overrides the default panel rendering for all data-driven items.'
        },
        {
            slot: 'item.{index}',
            slotProps: '{ item, index, collapseIcon, expandIcon, hideActions }',
            descriptionKey: 'components.expansion_panels.slots.item_index.description',
            descriptionFallback: 'Overrides the rendering of a specific panel at the given index.'
        },
        {
            slot: 'header',
            slotProps: '{ expand, isSelected, ...headerProps }',
            descriptionKey: 'components.expansion_panels.slots.header.description',
            descriptionFallback: 'Replaces the header inside all data-driven panels.'
        },
        {
            slot: 'prepend',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panels.slots.prepend.description',
            descriptionFallback: 'Leading slot for all data-driven panel headers.'
        },
        {
            slot: 'title',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panels.slots.title.description',
            descriptionFallback: 'Title slot for all data-driven panel headers.'
        },
        {
            slot: 'append',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panels.slots.append.description',
            descriptionFallback: 'Trailing slot for all data-driven panel headers.'
        },
        {
            slot: 'wrapper',
            slotProps: '{ ...contentProps }',
            descriptionKey: 'components.expansion_panels.slots.wrapper.description',
            descriptionFallback: 'Replaces the content wrapper for all data-driven panels.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.expansion_panels.slots.content.description',
            descriptionFallback: 'Body content slot for all data-driven panels.'
        }
    ],

    examples: [
        {
            titleKey: 'components.expansion_panels.examples.basic.title',
            titleFallback: 'Basic group',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panels>
    <origam-expansion-panel title="Section 1">Content 1</origam-expansion-panel>
    <origam-expansion-panel title="Section 2">Content 2</origam-expansion-panel>
    <origam-expansion-panel title="Section 3" disabled>Disabled</origam-expansion-panel>
  </origam-expansion-panels>
</template>`
        },
        {
            titleKey: 'components.expansion_panels.examples.accordion.title',
            titleFallback: 'Accordion (single open)',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panels accordion>
    <origam-expansion-panel v-for="i in 4" :key="i" :title="\`Panel \${i}\`">
      Content {{ i }}
    </origam-expansion-panel>
  </origam-expansion-panels>
</template>`
        },
        {
            titleKey: 'components.expansion_panels.examples.items_prop.title',
            titleFallback: 'Data-driven via items prop',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panels
    :items="[
      { title: 'What is Origam?', content: 'A Vue 3 design system.' },
      { title: 'How to install?', content: 'npm install origam' },
    ]"
  />
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: {}
        },
        {
            label: 'accordion',
            props: { accordion: true }
        },
        {
            label: 'flat',
            props: { flat: true }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-expansion-panels',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamExpansionPanels',
        svgDesc: 'Schematic of the ExpansionPanels container with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="16" width="668" height="188" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="44" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">.origam-expansion-panels</text>
  <rect x="32" y="56" width="636" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="90" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-expansion-panel ① (slot item 0)</text>
  <rect x="32" y="128" width="636" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="162" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-expansion-panel ② (slot item 1)</text>
  <circle cx="24" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="28" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="40" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="40" y="68" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expansion-panels&gt;</code>. The root ① is a flex container wrapping all child panels ②. Mode modifiers (accordion, flat, popout, inset) are applied as root class modifiers.`,
        legend: [
            {
                num: 1,
                cls: '.origam-expansion-panels',
                descriptionKey: 'components.expansion_panels.anatomy.root',
                descriptionFallback: 'Root flex container. Wraps all panels. Mode modifier classes (--accordion, --flat, --popout, --inset) control layout and border-radius of children.'
            },
            {
                num: 2,
                cls: '.origam-expansion-panel (child)',
                descriptionKey: 'components.expansion_panels.anatomy.panel_child',
                descriptionFallback: 'Each OrigamExpansionPanel child. Border-radius is managed by the parent\'s CSS selectors (:first-child, :last-child) for mode-specific shapes.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-expansion-panels origam-expansion-panels--accordion">
  <!-- DefaultsProvider cascades density, color, bgColor, rounded, border -->
  <origam-expansion-panel title="Section 1">...</origam-expansion-panel>
  <origam-expansion-panel title="Section 2">...</origam-expansion-panel>
</div>`,
        classes: [
            {
                cls: 'origam-expansion-panels',
                descriptionKey: 'components.expansion_panels.anatomy.root',
                descriptionFallback: 'Root container element.'
            },
            {
                cls: 'origam-expansion-panels--accordion',
                descriptionKey: 'components.expansion_panels.anatomy.accordion',
                descriptionFallback: 'Accordion mode: panels are flush, one open at a time.'
            },
            {
                cls: 'origam-expansion-panels--flat',
                descriptionKey: 'components.expansion_panels.anatomy.flat',
                descriptionFallback: 'Flat mode: no shadow, no border separator.'
            },
            {
                cls: 'origam-expansion-panels--popout',
                descriptionKey: 'components.expansion_panels.anatomy.popout',
                descriptionFallback: 'Popout mode: active panel extends beyond container width.'
            },
            {
                cls: 'origam-expansion-panels--inset',
                descriptionKey: 'components.expansion_panels.anatomy.inset',
                descriptionFallback: 'Inset mode: active panel shrinks inside container width.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-expansion-panel__popout---max-width',
            defaultValue: 'calc(100% - 32px)',
            descriptionKey: 'components.expansion_panels.css_vars.popout_max_width',
            descriptionFallback: 'Width of inactive panels in popout mode.'
        },
        {
            name: '--origam-expansion-panel__popout---max-width-active',
            defaultValue: 'calc(100% + 16px)',
            descriptionKey: 'components.expansion_panels.css_vars.popout_max_width_active',
            descriptionFallback: 'Width of the active panel in popout mode.'
        },
        {
            name: '--origam-expansion-panel__inset---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.expansion_panels.css_vars.inset_max_width',
            descriptionFallback: 'Width of inactive panels in inset mode.'
        },
        {
            name: '--origam-expansion-panel__inset---max-width-active',
            defaultValue: 'calc(100% - 32px)',
            descriptionKey: 'components.expansion_panels.css_vars.inset_max_width_active',
            descriptionFallback: 'Width of the active panel in inset mode.'
        },
        {
            name: '--origam-expansion-panel__accordion---header-overlay-transition',
            defaultValue: '{motion.duration.slow} (0.3s)',
            descriptionKey: 'components.expansion_panels.css_vars.accordion_header_overlay_transition',
            descriptionFallback: 'Transition duration for the header overlay border-radius animation in accordion mode.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expansion_panels.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.expansion_panels.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.expansion_panels.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.expansion_panels.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.expansion_panels.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.expansion_panels.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.expansion_panels.a11y.key_tab',
                actionFallback: 'Moves focus between panel headers in sequence.'
            }
        ],
        notes: [
            {
                noteKey: 'components.expansion_panels.a11y.group_management',
                noteFallback: 'The container manages group selection state and propagates it to child panels via inject/provide. Each panel header receives aria-expanded and aria-controls independently.'
            },
            {
                noteKey: 'components.expansion_panels.a11y.cascade',
                noteFallback: 'Visual props (density, color, bgColor, rounded, border) are cascaded via OrigamDefaultsProvider so all child panels share the same visual treatment without per-panel repetition.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/expansion-panel.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'expansion-panel.popout.max-width',
                value: 'calc(100% - 32px)',
                type: 'dimension',
                descriptionKey: 'components.expansion_panels.tokens.popout_max_width',
                descriptionFallback: 'Inactive panel width in popout mode.'
            },
            {
                tokenPath: 'expansion-panel.popout.max-width-active',
                value: 'calc(100% + 16px)',
                type: 'dimension',
                descriptionKey: 'components.expansion_panels.tokens.popout_max_width_active',
                descriptionFallback: 'Active panel width in popout mode.'
            },
            {
                tokenPath: 'expansion-panel.inset.max-width-active',
                value: 'calc(100% - 32px)',
                type: 'dimension',
                descriptionKey: 'components.expansion_panels.tokens.inset_max_width_active',
                descriptionFallback: 'Active panel width in inset mode.'
            },
            {
                tokenPath: 'expansion-panel.accordion.header-overlay-transition',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.expansion_panels.tokens.accordion_header_overlay_transition',
                descriptionFallback: 'Transition duration for border-radius animation in accordion header overlay.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'accordion',
                kind: 'switch',
                labelKey: 'components.expansion_panels.playground.accordion',
                labelFallback: 'Accordion',
                defaultValue: false
            },
            {
                prop: 'flat',
                kind: 'switch',
                labelKey: 'components.expansion_panels.playground.flat',
                labelFallback: 'Flat',
                defaultValue: false
            },
            {
                prop: 'popout',
                kind: 'switch',
                labelKey: 'components.expansion_panels.playground.popout',
                labelFallback: 'Popout',
                defaultValue: false
            },
            {
                prop: 'inset',
                kind: 'switch',
                labelKey: 'components.expansion_panels.playground.inset',
                labelFallback: 'Inset',
                defaultValue: false
            },
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.expansion_panels.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.expansion_panels.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
