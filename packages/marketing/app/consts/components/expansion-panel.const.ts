/**
 * /components/expansion-panel — full documentation data for OrigamExpansionPanel family.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ExpensionPanel/expansion-panel*.interface.ts   (props)
 *   - packages/ds/src/components/ExpansionPanel/OrigamExpansion*.vue            (template BEM, slots, defineExpose)
 *   - packages/ds/tokens/component/expansion-panel.json                         (CSS tokens)
 *
 * FAMILY (4 .vue):
 *   OrigamExpansionPanels, OrigamExpansionPanel,
 *   OrigamExpansionPanelHeader, OrigamExpansionPanelContent
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

export const EXPANSION_PANEL_DOC: IComponentDoc = {
    slug: 'expansion-panel',
    name: 'ExpansionPanel',
    tag: 'origam-expansion-panel',
    icon: 'mdi-chevron-down-box-outline',
    category: 'Layout',
    descriptionKey: 'components.catalog.expansion_panel.description',
    descriptionFallback: 'Collapsible panel with animated header and content reveal. Supports accordion, popout and inset layout modes; optional loader, ripple and density controls.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-expansionpanel--design',
    docUrl: 'http://localhost:4000/components/ExpansionPanel/OrigamExpansionPanel',

    family: [
        {
            slug: 'expansion-panels',
            name: 'ExpansionPanels',
            descriptionKey: 'components.catalog.expansion_panels.description',
            descriptionFallback: 'Container managing a group of ExpansionPanel items. Supports accordion, flat, popout and inset display modes.'
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
            descriptionFallback: 'Animated content region revealed when the panel is expanded. Has role="region" and aria-labelledby pointing to the header.'
        }
    ],

    related: [
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'components.catalog.dialog.description',
            descriptionFallback: 'Overlay dialog for more complex expandable content.'
        }
    ],

    props: [
        // ── IExpansionPanelProps ──────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.title.description',
            descriptionFallback: 'Panel header title text. Can also be set via the #title slot.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.expansion_panel.props.tag.description',
            descriptionFallback: 'HTML element rendered at the panel root.'
        },
        // ── IGroupItemProps ────────────────────────────────────────────
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.value.description',
            descriptionFallback: 'Panel identifier used by the parent group to track selection. Auto-generated when omitted.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.disabled.description',
            descriptionFallback: 'Disables the panel header interaction. Sets aria-disabled and removes pointer events.'
        },
        // ── IExpansionPanelHeaderProps ─────────────────────────────────
        {
            name: 'expandIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-down'",
            descriptionKey: 'components.expansion_panel.props.expand_icon.description',
            descriptionFallback: 'Icon shown in the header when the panel is collapsed.'
        },
        {
            name: 'collapseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-up'",
            descriptionKey: 'components.expansion_panel.props.collapse_icon.description',
            descriptionFallback: 'Icon shown in the header when the panel is expanded. Falls back to expandIcon with a 180deg rotation when not set.'
        },
        {
            name: 'hideActions',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.hide_actions.description',
            descriptionFallback: 'Hides the expand/collapse icon in the header.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.readonly.description',
            descriptionFallback: 'Makes the panel non-interactive without disabling it visually.'
        },
        {
            name: 'static',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.static.description',
            descriptionFallback: 'Renders the header without expand/collapse behaviour — used to embed the panel inside custom workflows.'
        },
        {
            name: 'focusable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.expansion_panel.props.focusable.description',
            descriptionFallback: 'Allows the header button to receive keyboard focus. Set to false only in non-interactive layouts.'
        },
        // ── IExpansionPanelContentProps ───────────────────────────────
        {
            name: 'content',
            type: { label: 'string | Component', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.content.description',
            descriptionFallback: 'Content rendered inside the panel body. Accepts a plain string or a Vue component reference. Superseded by the default slot.'
        },
        // ── ILoaderProps ──────────────────────────────────────────────
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.loading.description',
            descriptionFallback: 'Shows a progress loader at the top of the panel. Supports line, circular and skeleton modes.'
        },
        // ── ILazyProps ────────────────────────────────────────────────
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel.props.eager.description',
            descriptionFallback: 'When true, renders content immediately even when collapsed. Useful for SEO or when content must be mounted before first expand.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.expansion_panel.props.density.description',
            descriptionFallback: 'Header density: compact, comfortable or default.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.color.description',
            descriptionFallback: 'Foreground colour for the panel header and content.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.bg_color.description',
            descriptionFallback: 'Background colour of the panel surface.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.rounded.description',
            descriptionFallback: 'Border-radius of the panel. Applied to all four corners; the active panel resets the bottom radius.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation. The shadow is rendered on a pseudo __shadow element so it does not clip the content.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.expansion_panel.props.ripple.description',
            descriptionFallback: 'Material ripple on the header click. Set to false to disable.'
        }
    ],

    emits: [
        {
            event: 'group:selected',
            payload: { label: '{ value: boolean }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.expansion_panel.emits.group_selected.description',
            descriptionFallback: 'Fired when the panel selection state changes inside its parent group.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.expansion_panel.slots.default.description',
            descriptionFallback: 'Panel body content rendered inside OrigamExpansionPanelContent.'
        },
        {
            slot: 'title',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panel.slots.title.description',
            descriptionFallback: 'Replaces the title text inside the header. Receives expand() method and isSelected boolean.'
        },
        {
            slot: 'header',
            slotProps: '{ expand, isSelected, ...headerProps }',
            descriptionKey: 'components.expansion_panel.slots.header.description',
            descriptionFallback: 'Replaces the entire OrigamExpansionPanelHeader with custom markup.'
        },
        {
            slot: 'prepend',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panel.slots.prepend.description',
            descriptionFallback: 'Leading area of the header (before the title). Typically an icon or avatar.'
        },
        {
            slot: 'append',
            slotProps: '{ expand, isSelected }',
            descriptionKey: 'components.expansion_panel.slots.append.description',
            descriptionFallback: 'Trailing area of the header (after expand/collapse icon).'
        },
        {
            slot: 'wrapper',
            slotProps: '{ ...contentProps }',
            descriptionKey: 'components.expansion_panel.slots.wrapper.description',
            descriptionFallback: 'Replaces the entire OrigamExpansionPanelContent wrapper.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.expansion_panel.slots.loader.description',
            descriptionFallback: 'Custom loader shown at the top of the panel when loading is active.'
        }
    ],

    examples: [
        {
            titleKey: 'components.expansion_panel.examples.basic.title',
            titleFallback: 'Basic accordion',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panels>
    <origam-expansion-panel title="Section 1">
      Content for section 1.
    </origam-expansion-panel>
    <origam-expansion-panel title="Section 2">
      Content for section 2.
    </origam-expansion-panel>
    <origam-expansion-panel title="Section 3" disabled>
      This panel is disabled.
    </origam-expansion-panel>
  </origam-expansion-panels>
</template>`
        },
        {
            titleKey: 'components.expansion_panel.examples.accordion_mode.title',
            titleFallback: 'Accordion mode (single open)',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panels accordion>
    <origam-expansion-panel
      v-for="i in 3"
      :key="i"
      :title="\`Panel \${i}\`"
    >
      Content of panel {{ i }}.
    </origam-expansion-panel>
  </origam-expansion-panels>
</template>`
        },
        {
            titleKey: 'components.expansion_panel.examples.items_prop.title',
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
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-expansion-panel',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamExpansionPanel',
        svgDesc: 'Schematic of the ExpansionPanel component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="168" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="28" y="16" width="644" height="168" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
  <rect x="28" y="16" width="644" height="4" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.18))"/>
  <rect x="48" y="32" width="604" height="52" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="61" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-expansion-panel-header (button)</text>
  <rect x="48" y="96" width="604" height="76" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="138" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-expansion-panel-content (role=region)</text>
  <circle cx="36" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="36" cy="20" r="7" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="36" y="23" font-size="7" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="56" cy="40" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="44" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="56" cy="104" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="108" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expansion-panel&gt;</code> — 4 internal parts. The shadow ① is an absolutely-positioned sibling. Header ③ is a <code>&lt;button&gt;</code> with aria-expanded. Content ④ has <code>role="region"</code> and <code>aria-labelledby</code> pointing to the header.`,
        legend: [
            {
                num: 1,
                cls: '.origam-expansion-panel',
                descriptionKey: 'components.expansion_panel.anatomy.root',
                descriptionFallback: 'Root element. Flex container for shadow, header and content.'
            },
            {
                num: 2,
                cls: '.origam-expansion-panel__shadow',
                descriptionKey: 'components.expansion_panel.anatomy.shadow',
                descriptionFallback: 'Absolutely positioned shadow layer. Uses box-shadow token. z-index: -1 prevents clipping content.'
            },
            {
                num: 3,
                cls: '.origam-expansion-panel__header / origam-expansion-panel-header',
                descriptionKey: 'components.expansion_panel.anatomy.header',
                descriptionFallback: 'Rendered as a <button> with aria-expanded and aria-controls. Carries the overlay, wrapper, prepend, title, append and expand icon.'
            },
            {
                num: 4,
                cls: '.origam-expansion-panel__content / origam-expansion-panel-content',
                descriptionKey: 'components.expansion_panel.anatomy.content',
                descriptionFallback: 'Content region with role="region" and aria-labelledby. Animated via OrigamExpandY transition. Hosts the default slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-expansion-panel">
  <!-- shadow pseudo-element -->
  <div class="origam-expansion-panel__shadow" />

  <!-- conditional loader -->
  <div class="origam-expansion-panel__loader"><!-- OrigamProgress --></div>

  <!-- header (button) -->
  <origam-expansion-panel-header
    class="origam-expansion-panel__header"
    aria-expanded="false"
    aria-controls="expansion-panel-content-{id}"
  >
    <slot name="prepend" />
    <slot name="title" />
    <!-- expand/collapse icon -->
  </origam-expansion-panel-header>

  <!-- content (region) -->
  <origam-expansion-panel-content
    class="origam-expansion-panel__content"
    role="region"
    aria-labelledby="expansion-panel-header-{id}"
  >
    <slot name="default" />
  </origam-expansion-panel-content>
</div>`,
        classes: [
            {
                cls: 'origam-expansion-panel',
                descriptionKey: 'components.expansion_panel.anatomy.root',
                descriptionFallback: 'Root element.'
            },
            {
                cls: 'origam-expansion-panel--active',
                descriptionKey: 'components.expansion_panel.anatomy.active',
                descriptionFallback: 'Applied when the panel is selected/expanded.'
            },
            {
                cls: 'origam-expansion-panel--disabled',
                descriptionKey: 'components.expansion_panel.anatomy.disabled',
                descriptionFallback: 'Applied when disabled. Dims the header via overlay opacity.'
            },
            {
                cls: 'origam-expansion-panel__shadow',
                descriptionKey: 'components.expansion_panel.anatomy.shadow',
                descriptionFallback: 'Absolute shadow layer. z-index: -1.'
            },
            {
                cls: 'origam-expansion-panel-header',
                descriptionKey: 'components.expansion_panel.anatomy.header_class',
                descriptionFallback: 'Header button root. Carries aria-expanded, aria-controls, ripple.'
            },
            {
                cls: 'origam-expansion-panel-header__wrapper',
                descriptionKey: 'components.expansion_panel.anatomy.header_wrapper',
                descriptionFallback: 'Inner flex row: prepend | title | append.'
            },
            {
                cls: 'origam-expansion-panel-content',
                descriptionKey: 'components.expansion_panel.anatomy.content_class',
                descriptionFallback: 'Content region. role="region" with aria-labelledby referencing header ID.'
            },
            {
                cls: 'origam-expansion-panel-content__wrapper',
                descriptionKey: 'components.expansion_panel.anatomy.content_wrapper',
                descriptionFallback: 'Inner padding wrapper for the panel body content.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-expansion-panel---border-radius',
            defaultValue: '{radius.sm} (4px)',
            descriptionKey: 'components.expansion_panel.css_vars.border_radius',
            descriptionFallback: 'Panel corner radius. Reset to 0 on inner panels in accordion/flat mode.'
        },
        {
            name: '--origam-expansion-panel---transition-duration',
            defaultValue: '{motion.duration.slow} (0.3s)',
            descriptionKey: 'components.expansion_panel.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for margin, radius and max-width changes on expand/collapse.'
        },
        {
            name: '--origam-expansion-panel---active-margin-top',
            defaultValue: '{space.4} (16px)',
            descriptionKey: 'components.expansion_panel.css_vars.active_margin_top',
            descriptionFallback: 'Margin applied above an active panel (and the panel following it) to visually separate it from siblings.'
        },
        {
            name: '--origam-expansion-panel---divider-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.expansion_panel.css_vars.divider_color',
            descriptionFallback: 'Colour of the ::after separator line between panels (non-accordion mode).'
        },
        {
            name: '--origam-expansion-panel---divider-opacity',
            defaultValue: '0.12',
            descriptionKey: 'components.expansion_panel.css_vars.divider_opacity',
            descriptionFallback: 'Opacity of the ::after separator. Fades to 0 adjacent to active panels.'
        },
        {
            name: '--origam-expansion-panel__shadow---box-shadow',
            defaultValue: '{shadow.sm}',
            descriptionKey: 'components.expansion_panel.css_vars.shadow_box_shadow',
            descriptionFallback: 'Box shadow of the elevation pseudo-element.'
        },
        {
            name: '--origam-expansion-panel---header-min-height',
            defaultValue: '48px',
            descriptionKey: 'components.expansion_panel.css_vars.header_min_height',
            descriptionFallback: 'Header minimum height at rest. Increases to 64px when the panel is active.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expansion_panel.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to header/content sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.expansion_panel.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.expansion_panel.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.expansion_panel.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.expansion_panel.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.expansion_panel.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button', 'region'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.expansion_panel.a11y.key_activate',
                actionFallback: 'Toggles the panel expanded/collapsed when focus is on the header button.'
            },
            {
                key: 'Tab',
                actionKey: 'components.expansion_panel.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element (next header or content).'
            }
        ],
        notes: [
            {
                noteKey: 'components.expansion_panel.a11y.aria_expanded',
                noteFallback: 'The header button carries aria-expanded="true|false" reflecting the current panel state. Screen readers announce the expanded/collapsed status.'
            },
            {
                noteKey: 'components.expansion_panel.a11y.aria_controls',
                noteFallback: 'The header button carries aria-controls pointing to the content region ID. The content region carries aria-labelledby pointing to the header ID.'
            },
            {
                noteKey: 'components.expansion_panel.a11y.disabled',
                noteFallback: 'Disabled panels use tabindex="-1" on the header and add aria-disabled via the disabled HTML attribute.'
            },
            {
                noteKey: 'components.expansion_panel.a11y.reduced_motion',
                noteFallback: 'The expand/collapse animation respects prefers-reduced-motion: the transition-duration is overridden to 0ms.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/expansion-panel.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'expansion-panel.background',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.expansion_panel.tokens.background',
                descriptionFallback: 'Panel background — raised surface.'
            },
            {
                tokenPath: 'expansion-panel.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel.tokens.border_radius',
                descriptionFallback: 'Panel corner radius.'
            },
            {
                tokenPath: 'expansion-panel.transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.expansion_panel.tokens.transition_duration',
                descriptionFallback: 'Transition duration for expand/collapse animations.'
            },
            {
                tokenPath: 'expansion-panel.active-margin-top',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel.tokens.active_margin_top',
                descriptionFallback: 'Margin above active panels (16px).'
            },
            {
                tokenPath: 'expansion-panel.header.min-height',
                value: '48px',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel.tokens.header_min_height',
                descriptionFallback: 'Header minimum height at rest.'
            },
            {
                tokenPath: 'expansion-panel.header.min-height-active',
                value: '64px',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel.tokens.header_min_height_active',
                descriptionFallback: 'Header minimum height when panel is expanded.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.expansion_panel.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Panel title'
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.expansion_panel.playground.color',
                labelFallback: 'Color',
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
                labelKey: 'components.expansion_panel.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.expansion_panel.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'hideActions',
                kind: 'switch',
                labelKey: 'components.expansion_panel.playground.hide_actions',
                labelFallback: 'Hide actions',
                defaultValue: false
            }
        ],
        defaultSlotContent: 'This is the panel body content.'
    } satisfies IComponentPlayground
}
