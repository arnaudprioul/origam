/**
 * /components/expansion-panel-header — documentation data for OrigamExpansionPanelHeader.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ExpensionPanel/expansion-panel-header.interface.ts  (props)
 *   - packages/ds/src/components/ExpansionPanel/OrigamExpansionPanelHeader.vue        (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/expansion-panel.json                              (CSS tokens — header section)
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

export const EXPANSION_PANEL_HEADER_DOC: IComponentDoc = {
    slug: 'expansion-panel-header',
    name: 'ExpansionPanelHeader',
    tag: 'origam-expansion-panel-header',
    icon: 'mdi-chevron-down-box',
    category: 'Layout',
    descriptionKey: 'components.catalog.expansion_panel_header.description',
    descriptionFallback: 'Clickable header button with expand/collapse icon, prepend/append slots and ripple support. Carries aria-expanded and aria-controls.',
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
            slug: 'expansion-panel-content',
            name: 'ExpansionPanelContent',
            descriptionKey: 'components.catalog.expansion_panel_content.description',
            descriptionFallback: 'Animated content region revealed when the panel is expanded.'
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
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.title.description',
            descriptionFallback: 'Header title text rendered in the middle area. Can be replaced by the default slot.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'button'",
            descriptionKey: 'components.expansion_panel_header.props.tag.description',
            descriptionFallback: 'HTML element rendered at the header root. Defaults to button for accessibility.'
        },
        {
            name: 'expandIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-down'",
            descriptionKey: 'components.expansion_panel_header.props.expand_icon.description',
            descriptionFallback: 'Icon displayed in the append area when the panel is collapsed.'
        },
        {
            name: 'collapseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-up'",
            descriptionKey: 'components.expansion_panel_header.props.collapse_icon.description',
            descriptionFallback: 'Icon displayed in the append area when the panel is expanded.'
        },
        {
            name: 'hideActions',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel_header.props.hide_actions.description',
            descriptionFallback: 'Hides the expand/collapse icon in the append area.'
        },
        {
            name: 'focusable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.expansion_panel_header.props.focusable.description',
            descriptionFallback: 'When true, the header button is focusable and shows an overlay on focus.'
        },
        {
            name: 'static',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel_header.props.static.description',
            descriptionFallback: 'Renders the header in static mode — clicking does not toggle the panel. The static class modifier is applied.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expansion_panel_header.props.readonly.description',
            descriptionFallback: 'Prevents click interactions without disabling the button visually. The panel state cannot be toggled.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.prepend_icon.description',
            descriptionFallback: 'MDI icon shown in the leading (prepend) area before the title.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar shown in the leading area before the title.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.append_icon.description',
            descriptionFallback: 'MDI icon shown in the trailing (append) area after the expand/collapse icon.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar shown in the trailing area.'
        },
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.expansion_panel_header.props.ripple.description',
            descriptionFallback: 'Material ripple effect on the header click. Set to false to disable.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.expansion_panel_header.props.density.description',
            descriptionFallback: 'Header density: compact, comfortable or default.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.color.description',
            descriptionFallback: 'Foreground colour applied to the header text and icons.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.bg_color.description',
            descriptionFallback: 'Background colour of the header button surface.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.expansion_panel_header.props.rounded.description',
            descriptionFallback: 'Border-radius applied to the header button. Inherits from the parent panel by default.'
        },
        {
            name: 'border',
            type: { label: 'string | number | boolean', slug: '', kind: 'primitive' },
            defaultValue: 'none',
            descriptionKey: 'components.expansion_panel_header.props.border.description',
            descriptionFallback: 'Border shorthand applied to the header. Defaults to none.'
        }
    ],

    emits: [
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.expansion_panel_header.emits.click_prepend.description',
            descriptionFallback: 'Fired when the prepend area (icon or avatar) is clicked.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.expansion_panel_header.emits.click_append.description',
            descriptionFallback: 'Fired when the append area (icon or avatar) is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ collapseIcon, disabled, expanded, expandIcon, readonly }',
            descriptionKey: 'components.expansion_panel_header.slots.default.description',
            descriptionFallback: 'Replaces the title text. Receives the current expand/collapse state and icon props.'
        },
        {
            slot: 'prepend',
            slotProps: '{ collapseIcon, disabled, expanded, expandIcon, readonly }',
            descriptionKey: 'components.expansion_panel_header.slots.prepend.description',
            descriptionFallback: 'Leading area before the title. Defaults to prependAvatar / prependIcon.'
        },
        {
            slot: 'append',
            slotProps: '{ collapseIcon, disabled, expanded, expandIcon, readonly }',
            descriptionKey: 'components.expansion_panel_header.slots.append.description',
            descriptionFallback: 'Trailing area after the title. Defaults to appendAvatar / appendIcon followed by the expand/collapse icon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.expansion_panel_header.examples.basic.title',
            titleFallback: 'Basic header with title',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panel>
    <origam-expansion-panel-header title="My section" />
    <origam-expansion-panel-content>Body text.</origam-expansion-panel-content>
  </origam-expansion-panel>
</template>`
        },
        {
            titleKey: 'components.expansion_panel_header.examples.prepend_icon.title',
            titleFallback: 'Prepend icon',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panel>
    <origam-expansion-panel-header
      title="With icon"
      prepend-icon="mdi-information-outline"
    />
    <origam-expansion-panel-content>Content.</origam-expansion-panel-content>
  </origam-expansion-panel>
</template>`
        },
        {
            titleKey: 'components.expansion_panel_header.examples.custom_icons.title',
            titleFallback: 'Custom expand / collapse icons',
            lang: 'vue',
            code: `<template>
  <origam-expansion-panel>
    <origam-expansion-panel-header
      title="Custom icons"
      expand-icon="mdi-plus"
      collapse-icon="mdi-minus"
    />
    <origam-expansion-panel-content>Content.</origam-expansion-panel-content>
  </origam-expansion-panel>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-expansion-panel-header',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamExpansionPanelHeader',
        svgDesc: 'Schematic of the ExpansionPanelHeader component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="148" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="50" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">.origam-expansion-panel-header (button)</text>
  <rect x="40" y="20" width="640" height="140" rx="3" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="68" y="108" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__overlay</text>
  <rect x="56" y="72" width="80" height="64" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="68" y="112" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__prepend</text>
  <rect x="148" y="72" width="300" height="64" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="250" y="108" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__title (__wrapper)</text>
  <rect x="460" y="72" width="160" height="64" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="530" y="112" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__append</text>
  <circle cx="36" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="76" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="80" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="76" cy="76" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="76" y="80" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="160" cy="76" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="160" y="80" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="472" cy="76" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="472" y="80" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expansion-panel-header&gt;</code> — 5 internal parts. Root ① is rendered as a <code>&lt;button&gt;</code> with <code>aria-expanded</code> and <code>aria-controls</code>. The overlay ② covers the entire button for hover/focus state painting.`,
        legend: [
            {
                num: 1,
                cls: '.origam-expansion-panel-header',
                descriptionKey: 'components.expansion_panel_header.anatomy.root',
                descriptionFallback: 'Root button element. Carries aria-expanded, aria-controls, tabindex and the ripple directive.'
            },
            {
                num: 2,
                cls: '.origam-expansion-panel-header__overlay',
                descriptionKey: 'components.expansion_panel_header.anatomy.overlay',
                descriptionFallback: 'Absolutely positioned overlay for hover/focus state painting. Opacity is 0 at rest, increases on hover and focus-visible.'
            },
            {
                num: 3,
                cls: '.origam-expansion-panel-header__prepend',
                descriptionKey: 'components.expansion_panel_header.anatomy.prepend',
                descriptionFallback: 'Leading area hosting prependAvatar or prependIcon. Emits click:prepend when clicked.'
            },
            {
                num: 4,
                cls: '.origam-expansion-panel-header__title',
                descriptionKey: 'components.expansion_panel_header.anatomy.title',
                descriptionFallback: 'Title text span. Hosts the default slot or the title prop value.'
            },
            {
                num: 5,
                cls: '.origam-expansion-panel-header__append',
                descriptionKey: 'components.expansion_panel_header.anatomy.append',
                descriptionFallback: 'Trailing area hosting appendAvatar, appendIcon, and the expand/collapse icon. Emits click:append when clicked.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<button
  class="origam-expansion-panel-header"
  type="button"
  aria-expanded="false"
  aria-controls="expansion-panel-content-{id}"
>
  <span class="origam-expansion-panel-header__overlay" />
  <div class="origam-expansion-panel-header__wrapper">
    <span class="origam-expansion-panel-header__prepend"><!-- prepend slot / icon --></span>
    <span class="origam-expansion-panel-header__title"><!-- default slot / title --></span>
    <span class="origam-expansion-panel-header__append">
      <!-- append slot / icon -->
      <!-- expand / collapse icon -->
    </span>
  </div>
</button>`,
        classes: [
            {
                cls: 'origam-expansion-panel-header',
                descriptionKey: 'components.expansion_panel_header.anatomy.root',
                descriptionFallback: 'Root button element.'
            },
            {
                cls: 'origam-expansion-panel-header--active',
                descriptionKey: 'components.expansion_panel_header.anatomy.active',
                descriptionFallback: 'Applied when the parent panel is expanded.'
            },
            {
                cls: 'origam-expansion-panel-header--focusable',
                descriptionKey: 'components.expansion_panel_header.anatomy.focusable',
                descriptionFallback: 'Applied when focusable=true. Enhances overlay opacity when active and focused.'
            },
            {
                cls: 'origam-expansion-panel-header--static',
                descriptionKey: 'components.expansion_panel_header.anatomy.static',
                descriptionFallback: 'Applied when static=true. Header is rendered without toggle behaviour.'
            },
            {
                cls: 'origam-expansion-panel-header__overlay',
                descriptionKey: 'components.expansion_panel_header.anatomy.overlay',
                descriptionFallback: 'Absolutely positioned state overlay.'
            },
            {
                cls: 'origam-expansion-panel-header__wrapper',
                descriptionKey: 'components.expansion_panel_header.anatomy.wrapper',
                descriptionFallback: 'Inner flex row containing prepend, title and append.'
            },
            {
                cls: 'origam-expansion-panel-header__prepend',
                descriptionKey: 'components.expansion_panel_header.anatomy.prepend',
                descriptionFallback: 'Leading slot area.'
            },
            {
                cls: 'origam-expansion-panel-header__title',
                descriptionKey: 'components.expansion_panel_header.anatomy.title',
                descriptionFallback: 'Title text span.'
            },
            {
                cls: 'origam-expansion-panel-header__append',
                descriptionKey: 'components.expansion_panel_header.anatomy.append',
                descriptionFallback: 'Trailing slot area with expand/collapse icon.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-expansion-panel__header---font-size',
            defaultValue: '0.9375rem',
            descriptionKey: 'components.expansion_panel_header.css_vars.font_size',
            descriptionFallback: 'Font size of the header title text (15px).'
        },
        {
            name: '--origam-expansion-panel__header---font-weight',
            defaultValue: '{font.weight.regular}',
            descriptionKey: 'components.expansion_panel_header.css_vars.font_weight',
            descriptionFallback: 'Font weight of the header title text.'
        },
        {
            name: '--origam-expansion-panel__header---line-height',
            defaultValue: '1',
            descriptionKey: 'components.expansion_panel_header.css_vars.line_height',
            descriptionFallback: 'Line height of the header button.'
        },
        {
            name: '--origam-expansion-panel__header---min-height',
            defaultValue: '48px',
            descriptionKey: 'components.expansion_panel_header.css_vars.min_height',
            descriptionFallback: 'Minimum height of the header at rest.'
        },
        {
            name: '--origam-expansion-panel__header---border-radius',
            defaultValue: 'inherit',
            descriptionKey: 'components.expansion_panel_header.css_vars.border_radius',
            descriptionFallback: 'Border-radius inherited from the parent panel.'
        },
        {
            name: '--origam-expansion-panel__header__wrapper---padding-block',
            defaultValue: '16px ({space.4})',
            descriptionKey: 'components.expansion_panel_header.css_vars.wrapper_padding_block',
            descriptionFallback: 'Top and bottom padding of the inner wrapper row.'
        },
        {
            name: '--origam-expansion-panel__header__wrapper---padding-inline',
            defaultValue: '24px ({space.6})',
            descriptionKey: 'components.expansion_panel_header.css_vars.wrapper_padding_inline',
            descriptionFallback: 'Leading and trailing padding of the inner wrapper row.'
        },
        {
            name: '--origam-expansion-panel__header__overlay---opacity',
            defaultValue: '0',
            descriptionKey: 'components.expansion_panel_header.css_vars.overlay_opacity',
            descriptionFallback: 'Base opacity of the state overlay. Increases to ~0.04 on hover and ~0.12 on focus-visible.'
        },
        {
            name: '--origam-expansion-panel__header---focus-overlay-opacity',
            defaultValue: 'calc(0.12 * 1)',
            descriptionKey: 'components.expansion_panel_header.css_vars.focus_overlay_opacity',
            descriptionFallback: 'Overlay opacity when the header is focused (focus-visible).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expansion_panel_header.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.expansion_panel_header.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.expansion_panel_header.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.expansion_panel_header.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.expansion_panel_header.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.expansion_panel_header.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.expansion_panel_header.a11y.key_activate',
                actionFallback: 'Toggles the parent panel expanded/collapsed when focus is on the header button.'
            },
            {
                key: 'Tab',
                actionKey: 'components.expansion_panel_header.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.expansion_panel_header.a11y.aria_expanded',
                noteFallback: 'The header button carries aria-expanded="true|false" reflecting the current panel selection state.'
            },
            {
                noteKey: 'components.expansion_panel_header.a11y.aria_controls',
                noteFallback: 'The header button carries aria-controls pointing to the content region ID (expansion-panel-content-{id}).'
            },
            {
                noteKey: 'components.expansion_panel_header.a11y.disabled',
                noteFallback: 'Disabled panels apply tabindex="-1" and the disabled HTML attribute to the header button. Pointer events are removed.'
            },
            {
                noteKey: 'components.expansion_panel_header.a11y.readonly',
                noteFallback: 'When readonly is true, clicks are intercepted but not propagated — the button remains focusable and receives keyboard events without toggling.'
            },
            {
                noteKey: 'components.expansion_panel_header.a11y.ripple',
                noteFallback: 'The ripple directive provides a visual affordance for click interactions that supplements focus-visible styling.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/expansion-panel.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'expansion-panel.header.font-size',
                value: '0.9375rem',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_header.tokens.font_size',
                descriptionFallback: 'Header title font size (15px).'
            },
            {
                tokenPath: 'expansion-panel.header.min-height',
                value: '48px',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_header.tokens.min_height',
                descriptionFallback: 'Header minimum height at rest.'
            },
            {
                tokenPath: 'expansion-panel.header.min-height-active',
                value: '64px',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_header.tokens.min_height_active',
                descriptionFallback: 'Header minimum height when panel is expanded.'
            },
            {
                tokenPath: 'expansion-panel.header.wrapper.padding-block',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_header.tokens.wrapper_padding_block',
                descriptionFallback: 'Top and bottom padding of the wrapper row (16px).'
            },
            {
                tokenPath: 'expansion-panel.header.wrapper.padding-inline',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.expansion_panel_header.tokens.wrapper_padding_inline',
                descriptionFallback: 'Leading and trailing padding of the wrapper row (24px).'
            },
            {
                tokenPath: 'expansion-panel.header.hover-overlay-opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.expansion_panel_header.tokens.hover_overlay_opacity',
                descriptionFallback: 'Base overlay opacity on hover (resolved via scoped style to 0.04).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.expansion_panel_header.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Panel header'
            },
            {
                prop: 'expandIcon',
                kind: 'select',
                labelKey: 'components.expansion_panel_header.playground.expand_icon',
                labelFallback: 'Expand icon',
                defaultValue: 'mdi-chevron-down',
                options: [
                    { label: 'chevron-down', value: 'mdi-chevron-down' },
                    { label: 'plus', value: 'mdi-plus' },
                    { label: 'arrow-down', value: 'mdi-arrow-down' }
                ]
            },
            {
                prop: 'hideActions',
                kind: 'switch',
                labelKey: 'components.expansion_panel_header.playground.hide_actions',
                labelFallback: 'Hide actions',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.expansion_panel_header.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.expansion_panel_header.playground.color',
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
