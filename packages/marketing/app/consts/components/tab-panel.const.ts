/**
 * /components/tab-panel — full documentation data for OrigamTabPanel.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Tabs/tab-panel.interface.ts  (props)
 *   - packages/ds/src/components/Tabs/OrigamTabPanel.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/tabs.json                  (CSS tokens — panel key)
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

export const TAB_PANEL_DOC: IComponentDoc = {
    slug: 'tab-panel',
    name: 'TabPanel',
    tag: 'origam-tab-panel',
    icon: 'mdi-tab',
    category: 'Navigation',
    descriptionKey: 'components.catalog.tab_panel.description',
    descriptionFallback: 'A single tab content panel — lazy-mounted by default until first activated, then kept alive via v-show.',
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
            slug: 'tab',
            name: 'Tab',
            descriptionKey: 'components.catalog.tab.description',
            descriptionFallback: 'Single registered tab inside an OrigamTabs tablist.'
        },
        {
            slug: 'tab-panels',
            name: 'TabPanels',
            descriptionKey: 'components.catalog.tab_panels.description',
            descriptionFallback: 'Content container that mirrors the tablist selection and transitions between panels.'
        }
    ],

    related: [
        {
            slug: 'tab-panels',
            name: 'TabPanels',
            kind: 'component',
            descriptionKey: 'components.catalog.tab_panels.description',
            descriptionFallback: 'Required parent wrapper for OrigamTabPanel.'
        },
        {
            slug: 'tab',
            name: 'Tab',
            kind: 'component',
            descriptionKey: 'components.catalog.tab.description',
            descriptionFallback: 'Sibling tab that controls this panel via matching value.'
        }
    ],

    props: [
        // ── IGroupItemProps ────────────────────────────────────────────
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab_panel.props.value.description',
            descriptionFallback: 'Canonical identifier for this panel. Must match the value prop on the sibling OrigamTab.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tab_panel.props.disabled.description',
            descriptionFallback: 'Prevents this panel from being selected via the group.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-tab-panel--active'",
            descriptionKey: 'components.tab_panel.props.selected_class.description',
            descriptionFallback: 'CSS class added to the panel root when it is the active selection.'
        },
        // ── ILazyProps ─────────────────────────────────────────────────
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tab_panel.props.eager.description',
            descriptionFallback: 'When true the slot content is mounted immediately (SSR / preload). When false (default) content is only mounted on first activation.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.tab_panel.props.tag.description',
            descriptionFallback: 'Root HTML element rendered for the panel container.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.tab_panel.slots.default.description',
            descriptionFallback: 'Panel content. Lazy-mounted on first activation (unless eager=true). Kept alive via v-show after first mount.'
        }
    ],

    examples: [
        {
            titleKey: 'components.tab_panel.examples.basic.title',
            titleFallback: 'Lazy panels',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="active">
    <origam-tab value="one" text="First" />
    <origam-tab value="two" text="Second" />
    <origam-tab value="three" text="Third" />
  </origam-tabs>
  <origam-tab-panels v-model="active">
    <origam-tab-panel value="one">
      Content for the first tab.
    </origam-tab-panel>
    <origam-tab-panel value="two">
      Content for the second tab.
    </origam-tab-panel>
    <origam-tab-panel value="three" eager>
      Pre-mounted content (eager).
    </origam-tab-panel>
  </origam-tab-panels>
</template>

<script setup lang="ts">
const active = ref('one')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-tab-panel',
        svgViewBox: '0 0 560 180',
        svgTitle: 'Anatomy of OrigamTabPanel',
        svgDesc: 'Schematic of the TabPanel component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="40" width="480" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="60" width="440" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="280" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot content</text>
  <circle cx="52" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="52" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="72" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="72" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="52" y1="36" x2="80" y2="18" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="16" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-tab-panel</text>
  <text x="280" y="160" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">① = role="tabpanel" · tabindex=0 · aria-labelledby; ② = lazy #default slot</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-tab-panel&gt;</code> — 2 parts. The root carries <code>role="tabpanel"</code> and <code>aria-labelledby</code> pointing to the sibling tab; the slot content is lazy-mounted on first activation.`,
        legend: [
            {
                num: 1,
                cls: '.origam-tab-panel',
                descriptionKey: 'components.tab_panel.anatomy.root',
                descriptionFallback: 'Root element. Carries <code>role="tabpanel"</code>, <code>tabindex="0"</code> and <code>aria-labelledby</code> pointing to the matching tab id. Hidden via <code>v-show</code> when inactive.'
            },
            {
                num: 2,
                cls: '#default slot',
                descriptionKey: 'components.tab_panel.anatomy.slot',
                descriptionFallback: 'Slot content area. Lazy-mounted on first activation via <code>useLazy</code> — renders only after the panel becomes selected for the first time.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: role="tabpanel", tabindex=0, aria-labelledby -->
<Transition name="fade" mode="out-in">
  <div
    v-show="isShown"
    class="origam-tab-panel"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="tabLabelledBy"
  >
    <!-- lazy slot: only renders after first activation -->
    <slot v-if="hasContent" name="default" />
  </div>
</Transition>`,
        classes: [
            {
                cls: 'origam-tab-panel',
                descriptionKey: 'components.tab_panel.anatomy.root',
                descriptionFallback: 'Root element. role="tabpanel", tabindex=0, aria-labelledby, hidden via v-show when inactive.'
            },
            {
                cls: 'origam-tab-panel--active',
                descriptionKey: 'components.tab_panel.anatomy.active',
                descriptionFallback: 'Applied when this panel is the selected item in the panels group.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-tab-panels__panel---padding-block',
            defaultValue: '16px',
            descriptionKey: 'components.tab_panel.css_vars.padding_block',
            descriptionFallback: 'Vertical padding applied to each tab panel via the parent OrigamTabPanels.'
        },
        {
            name: '--origam-tab-panels__panel---padding-inline',
            defaultValue: '0',
            descriptionKey: 'components.tab_panel.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding applied to each tab panel via the parent OrigamTabPanels.'
        },
        {
            name: '--origam-tab-panels__panel---transition-duration',
            defaultValue: '0.18s',
            descriptionKey: 'components.tab_panel.css_vars.transition_duration',
            descriptionFallback: 'Duration of the fade transition when switching panels.'
        },
        {
            name: '--origam-tab-panels__panel--focus---outline-color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.tab_panel.css_vars.focus_outline_color',
            descriptionFallback: 'Outline color shown on focus-visible for the panel container.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.tab_panel.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.tab_panel.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed panel styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.tab_panel.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.tab_panel.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.tab_panel.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.tab_panel.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['tabpanel'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.tab_panel.a11y.key_tab',
                actionFallback: 'Moves focus into the panel content from the tablist.'
            },
            {
                key: 'Shift + Tab',
                actionKey: 'components.tab_panel.a11y.key_shift_tab',
                actionFallback: 'Returns focus to the active tab in the tablist.'
            }
        ],
        notes: [
            {
                noteKey: 'components.tab_panel.a11y.aria_note',
                noteFallback: 'OrigamTabPanel sets role="tabpanel" and aria-labelledby pointing to the sibling tab DOM id automatically. No manual ARIA needed.'
            },
            {
                noteKey: 'components.tab_panel.a11y.lazy_note',
                noteFallback: 'Content is not in the DOM until the panel is first activated (unless eager=true). Screen readers only perceive the content after it is mounted.'
            },
            {
                noteKey: 'components.tab_panel.a11y.vshow_note',
                noteFallback: 'Inactive panels use v-show (not v-if) after first mount, so content remains in the DOM. Assistive technologies may still reach it via search — the v-show="false" (display: none) does hide it from AT per ARIA spec.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/tabs.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Panel-level tokens live under the tabs.panel key.',
        excerpt: [
            {
                tokenPath: 'tabs.panel.padding-block',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.tab_panel.tokens.padding_block',
                descriptionFallback: 'Default vertical padding for panel content.'
            },
            {
                tokenPath: 'tabs.panel.padding-inline',
                value: '{space.0}',
                type: 'dimension',
                descriptionKey: 'components.tab_panel.tokens.padding_inline',
                descriptionFallback: 'Default horizontal padding for panel content.'
            },
            {
                tokenPath: 'tabs.panel.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.tab_panel.tokens.transition_duration',
                descriptionFallback: 'Duration of the fade transition when switching panels.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'eager',
                kind: 'switch',
                labelKey: 'components.tab_panel.playground.eager',
                labelFallback: 'Eager mount',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
