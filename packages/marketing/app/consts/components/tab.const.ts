/**
 * /components/tab — full documentation data for OrigamTab.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Tabs/tab.interface.ts     (props)
 *   - packages/ds/src/components/Tabs/OrigamTab.vue        (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/tabs.json               (CSS tokens — item + indicator keys)
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

export const TAB_DOC: IComponentDoc = {
    slug: 'tab',
    name: 'Tab',
    tag: 'origam-tab',
    icon: 'mdi-tab',
    category: 'Navigation',
    descriptionKey: 'components.catalog.tab.description',
    descriptionFallback: 'Single registered tab inside an OrigamTabs tablist — renders the label text and optional leading/trailing icons.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-tabs--design',
    docUrl: 'http://localhost:4000/components/Tabs/OrigamTabs',

    parentSlug: 'tabs',

    family: [
        {
            slug: 'tabs',
            name: 'Tabs',
            descriptionKey: 'components.catalog.tabs.description',
            descriptionFallback: 'WAI-ARIA tablist container that orchestrates a group of OrigamTab elements.'
        },
        {
            slug: 'tab-panels',
            name: 'TabPanels',
            descriptionKey: 'components.catalog.tab_panels.description',
            descriptionFallback: 'Content container that mirrors the tablist selection and transitions between panels.'
        },
        {
            slug: 'tab-panel',
            name: 'TabPanel',
            descriptionKey: 'components.catalog.tab_panel.description',
            descriptionFallback: 'A single tab content panel — lazy-mounted by default until first activated.'
        }
    ],

    related: [
        {
            slug: 'tabs',
            name: 'Tabs',
            kind: 'component',
            descriptionKey: 'components.catalog.tabs.description',
            descriptionFallback: 'Parent tablist — required wrapper for OrigamTab.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "''",
            descriptionKey: 'components.tab.props.text.description',
            descriptionFallback: 'Label text rendered inside the tab. Can also be provided via the default slot.'
        },
        {
            name: 'variant',
            type: { label: "'default' | 'pills' | 'underline'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab.props.variant.description',
            descriptionFallback: 'Visual variant inherited from the parent OrigamTabs. Controls indicator and pill rendering.'
        },
        // ── IGroupItemProps ────────────────────────────────────────────
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab.props.value.description',
            descriptionFallback: 'Canonical identifier for this tab. Must match the value prop on the sibling OrigamTabPanel.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tab.props.disabled.description',
            descriptionFallback: 'Disables the tab. Sets aria-disabled and tabindex=-1; prevents click activation.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-tab--active'",
            descriptionKey: 'components.tab.props.selected_class.description',
            descriptionFallback: 'CSS class added to the tab root when it is the active selection.'
        },
        // ── Icon props ─────────────────────────────────────────────────
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab.props.icon.description',
            descriptionFallback: 'Leading icon displayed before the label text.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab.props.append_icon.description',
            descriptionFallback: 'Trailing icon displayed after the label text.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'button'",
            descriptionKey: 'components.tab.props.tag.description',
            descriptionFallback: 'Root HTML element. Defaults to button for keyboard accessibility.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, toggle, select, value, disabled }',
            descriptionKey: 'components.tab.slots.default.description',
            descriptionFallback: 'Default slot for the tab label. Receives group-item context props for custom rendering.'
        }
    ],

    examples: [
        {
            titleKey: 'components.tab.examples.basic.title',
            titleFallback: 'Basic tabs',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="active">
    <origam-tab value="one" text="First" />
    <origam-tab value="two" text="Second" />
    <origam-tab value="three" text="Third" disabled />
  </origam-tabs>
  <origam-tab-panels v-model="active">
    <origam-tab-panel value="one">Content one</origam-tab-panel>
    <origam-tab-panel value="two">Content two</origam-tab-panel>
    <origam-tab-panel value="three">Content three</origam-tab-panel>
  </origam-tab-panels>
</template>

<script setup lang="ts">
const active = ref('one')
</script>`
        },
        {
            titleKey: 'components.tab.examples.icons.title',
            titleFallback: 'Tabs with icons',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="active">
    <origam-tab value="home"    icon="mdi-home"     text="Home" />
    <origam-tab value="search"  icon="mdi-magnify"  text="Search" />
    <origam-tab value="profile" icon="mdi-account"  text="Profile" />
  </origam-tabs>
</template>

<script setup lang="ts">
const active = ref('home')
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { text: 'Tab', value: 'a' }, slotContent: undefined },
        { label: 'with icon', props: { text: 'Search', value: 'b', icon: 'mdi-magnify' }, slotContent: undefined },
        { label: 'disabled', props: { text: 'Disabled', value: 'c', disabled: true }, slotContent: undefined }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-tab',
        svgViewBox: '0 0 600 200',
        svgTitle: 'Anatomy of OrigamTab',
        svgDesc: 'Schematic of the Tab component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="600" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="52" width="520" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="66" width="80" height="52" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="100" y="95" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="152" y="66" width="256" height="52" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="280" y="95" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label / #default slot</text>
  <rect x="420" y="66" width="80" height="52" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="460" y="95" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">append icon</text>
  <rect x="40" y="128" width="520" height="4" rx="0" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="50" cy="60" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="50" y="64.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="88" cy="74" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="88" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="280" cy="74" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="280" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="448" cy="74" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="448" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="280" cy="133" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="280" y="137" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <line x1="50" y1="48" x2="80" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="26" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-tab</text>
  <text x="300" y="175" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② prepend · ③ label · ④ append — flex row; ⑤ indicator — abs bottom</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-tab&gt;</code> — 5 internal parts. The indicator (⑤) is absolute-positioned at the block-end and scales on activation.`,
        legend: [
            {
                num: 1,
                cls: '.origam-tab',
                descriptionKey: 'components.tab.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;button&gt;</code> by default. Carries <code>role="tab"</code>, <code>aria-selected</code>, <code>aria-controls</code> and managed <code>tabindex</code>.'
            },
            {
                num: 2,
                cls: '.origam-tab__prepend',
                descriptionKey: 'components.tab.anatomy.prepend',
                descriptionFallback: 'Leading icon area. Rendered with <code>v-if="icon"</code>. Wraps an <code>&lt;OrigamIcon&gt;</code>.'
            },
            {
                num: 3,
                cls: '.origam-tab__label',
                descriptionKey: 'components.tab.anatomy.label',
                descriptionFallback: 'Label zone. Contains the default slot (falls back to the <code>text</code> prop).'
            },
            {
                num: 4,
                cls: '.origam-tab__append',
                descriptionKey: 'components.tab.anatomy.append',
                descriptionFallback: 'Trailing icon area. Rendered with <code>v-if="appendIcon"</code>.'
            },
            {
                num: 5,
                cls: '.origam-tab__indicator',
                descriptionKey: 'components.tab.anatomy.indicator',
                descriptionFallback: 'Absolute underline indicator. Visible only when <code>variant="underline"</code>. Scales from 0 → 1 on <code>--active</code> via CSS transform.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root button: role="tab", aria-selected, aria-controls, tabindex -->
<button class="origam-tab" role="tab">
  <!-- leading icon (v-if="icon") -->
  <span class="origam-tab__prepend">
    <origam-icon :icon="icon" />
  </span>

  <!-- label / #default slot -->
  <span class="origam-tab__label">
    <slot name="default">{{ text }}</slot>
  </span>

  <!-- trailing icon (v-if="appendIcon") -->
  <span class="origam-tab__append">
    <origam-icon :icon="appendIcon" />
  </span>

  <!-- underline indicator (v-if="variant === 'underline'") -->
  <span class="origam-tab__indicator" aria-hidden="true" />
</button>`,
        classes: [
            {
                cls: 'origam-tab',
                descriptionKey: 'components.tab.anatomy.root',
                descriptionFallback: 'Root element. Carries role="tab", aria-selected, aria-controls, and tabindex.'
            },
            {
                cls: 'origam-tab--active',
                descriptionKey: 'components.tab.anatomy.active',
                descriptionFallback: 'Applied when this tab is the selected item in the tablist.'
            },
            {
                cls: 'origam-tab--disabled',
                descriptionKey: 'components.tab.anatomy.disabled',
                descriptionFallback: 'Applied when disabled=true. Sets cursor: not-allowed; pointer-events: none.'
            },
            {
                cls: 'origam-tab--with-prepend',
                descriptionKey: 'components.tab.anatomy.with_prepend',
                descriptionFallback: 'Applied when the icon prop is set (leading icon present).'
            },
            {
                cls: 'origam-tab--with-append',
                descriptionKey: 'components.tab.anatomy.with_append',
                descriptionFallback: 'Applied when the appendIcon prop is set (trailing icon present).'
            },
            {
                cls: 'origam-tab__prepend',
                descriptionKey: 'components.tab.anatomy.prepend',
                descriptionFallback: 'Leading icon wrapper. Only rendered when icon prop is provided.'
            },
            {
                cls: 'origam-tab__label',
                descriptionKey: 'components.tab.anatomy.label',
                descriptionFallback: 'Label zone containing the default slot content or text prop.'
            },
            {
                cls: 'origam-tab__append',
                descriptionKey: 'components.tab.anatomy.append',
                descriptionFallback: 'Trailing icon wrapper. Only rendered when appendIcon prop is provided.'
            },
            {
                cls: 'origam-tab__indicator',
                descriptionKey: 'components.tab.anatomy.indicator',
                descriptionFallback: 'Bottom indicator bar. Visible only in underline variant; scales on activation.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-tabs__item---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.tab.css_vars.color',
            descriptionFallback: 'Tab label color in resting state.'
        },
        {
            name: '--origam-tabs__item---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.tab.css_vars.background_color',
            descriptionFallback: 'Tab background in resting state.'
        },
        {
            name: '--origam-tabs__item---height',
            defaultValue: '48px',
            descriptionKey: 'components.tab.css_vars.height',
            descriptionFallback: 'Minimum tab height.'
        },
        {
            name: '--origam-tabs__item---padding-inline',
            defaultValue: '16px',
            descriptionKey: 'components.tab.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding of each tab.'
        },
        {
            name: '--origam-tabs__item---padding-block',
            defaultValue: '0',
            descriptionKey: 'components.tab.css_vars.padding_block',
            descriptionFallback: 'Vertical padding of each tab.'
        },
        {
            name: '--origam-tabs__item---gap',
            defaultValue: '8px',
            descriptionKey: 'components.tab.css_vars.gap',
            descriptionFallback: 'Gap between icon and label.'
        },
        {
            name: '--origam-tabs__item---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.tab.css_vars.font_size',
            descriptionFallback: 'Tab label font size.'
        },
        {
            name: '--origam-tabs__item---font-weight',
            defaultValue: '500',
            descriptionKey: 'components.tab.css_vars.font_weight',
            descriptionFallback: 'Tab label font weight.'
        },
        {
            name: '--origam-tabs__item---letter-spacing',
            defaultValue: '0.03125em',
            descriptionKey: 'components.tab.css_vars.letter_spacing',
            descriptionFallback: 'Tab label letter spacing.'
        },
        {
            name: '--origam-tabs__item---border-radius',
            defaultValue: '0',
            descriptionKey: 'components.tab.css_vars.border_radius',
            descriptionFallback: 'Tab border radius. Set to radius.full for pills variant.'
        },
        {
            name: '--origam-tabs__item---transition-duration',
            defaultValue: '0.2s',
            descriptionKey: 'components.tab.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for color, background-color, border-color and transform.'
        },
        {
            name: '--origam-tabs__item--active---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.tab.css_vars.active_color',
            descriptionFallback: 'Tab label color when active.'
        },
        {
            name: '--origam-tabs__item--active---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.tab.css_vars.active_font_weight',
            descriptionFallback: 'Font weight applied to the active tab.'
        },
        {
            name: '--origam-tabs__indicator---color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.tab.css_vars.indicator_color',
            descriptionFallback: 'Color of the underline indicator bar (variant="underline").'
        },
        {
            name: '--origam-tabs__indicator---height',
            defaultValue: '2px',
            descriptionKey: 'components.tab.css_vars.indicator_height',
            descriptionFallback: 'Thickness of the underline indicator bar.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.tab.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'toggle',
            type: '() => void',
            descriptionKey: 'components.tab.exposed.toggle',
            descriptionFallback: 'Toggles the selected state of this tab in the group.'
        },
        {
            name: 'select',
            type: '(value: boolean) => void',
            descriptionKey: 'components.tab.exposed.select',
            descriptionFallback: 'Programmatically selects (true) or deselects (false) this tab.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.tab.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed tab styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.tab.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.tab.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.tab.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.tab.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['tab'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.tab.a11y.key_activate',
                actionFallback: 'Activates the tab (selects it in the group).'
            },
            {
                key: 'ArrowLeft / ArrowRight',
                actionKey: 'components.tab.a11y.key_arrows',
                actionFallback: 'Moves focus to the previous / next tab in the tablist (roving tabindex managed by OrigamTabs).'
            },
            {
                key: 'Tab',
                actionKey: 'components.tab.a11y.key_tab',
                actionFallback: 'Moves focus outside the tablist to the next focusable element (tabpanel).'
            }
        ],
        notes: [
            {
                noteKey: 'components.tab.a11y.aria_note',
                noteFallback: 'OrigamTab wires role="tab", aria-selected, aria-controls (pointing to the matching panel id) and aria-disabled automatically — no manual ARIA needed on the consumer side.'
            },
            {
                noteKey: 'components.tab.a11y.disabled_note',
                noteFallback: 'When disabled=true the tab gets aria-disabled="true" and tabindex=-1; click events are swallowed via handleClick guard.'
            },
            {
                noteKey: 'components.tab.a11y.focus_note',
                noteFallback: 'Focus-visible outline is applied via :focus-visible pseudo-class (2px solid currentColor, outline-offset: -2px). Never shown on mouse click.'
            },
            {
                noteKey: 'components.tab.a11y.reduced_motion_note',
                noteFallback: 'The indicator transform transition should be disabled under prefers-reduced-motion: reduce via the consuming theme.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/tabs.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Tab-level tokens live under the tabs.item and tabs.indicator keys.',
        excerpt: [
            {
                tokenPath: 'tabs.item.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.tab.tokens.item_color',
                descriptionFallback: 'Resting label color.'
            },
            {
                tokenPath: 'tabs.item.height',
                value: '{space.12}',
                type: 'dimension',
                descriptionKey: 'components.tab.tokens.item_height',
                descriptionFallback: 'Minimum tab height.'
            },
            {
                tokenPath: 'tabs.item.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.tab.tokens.item_font_weight',
                descriptionFallback: 'Resting label font weight.'
            },
            {
                tokenPath: 'tabs.item.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.tab.tokens.item_transition_duration',
                descriptionFallback: 'Transition duration for color and background changes.'
            },
            {
                tokenPath: 'tabs.indicator.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.tab.tokens.indicator_color',
                descriptionFallback: 'Underline indicator color for variant="underline".'
            },
            {
                tokenPath: 'tabs.indicator.height',
                value: '{border.width.2}',
                type: 'dimension',
                descriptionKey: 'components.tab.tokens.indicator_height',
                descriptionFallback: 'Thickness of the underline indicator.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.tab.playground.text',
                labelFallback: 'Label text',
                defaultValue: 'Tab label'
            },
            {
                prop: 'icon',
                kind: 'select',
                labelKey: 'components.tab.playground.icon',
                labelFallback: 'Leading icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-home', value: 'mdi-home' },
                    { label: 'mdi-magnify', value: 'mdi-magnify' },
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-star', value: 'mdi-star' }
                ]
            },
            {
                prop: 'appendIcon',
                kind: 'select',
                labelKey: 'components.tab.playground.append_icon',
                labelFallback: 'Trailing icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-close', value: 'mdi-close' },
                    { label: 'mdi-chevron-right', value: 'mdi-chevron-right' },
                    { label: 'mdi-bell', value: 'mdi-bell' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.tab.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
