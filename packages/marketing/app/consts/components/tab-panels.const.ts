/**
 * /components/tab-panels — full documentation data for OrigamTabPanels.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Tabs/tab-panels.interface.ts  (props + emits)
 *   - packages/ds/src/components/Tabs/OrigamTabPanels.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/tabs.json                   (CSS tokens — panel key)
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

export const TAB_PANELS_DOC: IComponentDoc = {
    slug: 'tab-panels',
    name: 'TabPanels',
    tag: 'origam-tab-panels',
    icon: 'mdi-tab',
    category: 'Navigation',
    descriptionKey: 'components.catalog.tab_panels.description',
    descriptionFallback: 'Content container that mirrors the tablist selection — orchestrates OrigamTabPanel children with optional fade transition and swipe support.',
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
            descriptionFallback: 'Sibling tablist — must share the same v-model to synchronise selection.'
        }
    ],

    props: [
        // ── IGroupProps ────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tab_panels.props.model_value.description',
            descriptionFallback: 'Value of the currently visible panel. Bind with v-model — must stay in sync with the sibling OrigamTabs v-model.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.tab_panels.props.mandatory.description',
            descriptionFallback: 'When true a panel is always visible (cannot deselect all).'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.tab_panels.props.direction.description',
            descriptionFallback: 'Layout direction. horizontal = panels stacked inline; vertical = flex-row with panels side by side.'
        },
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'transition',
            type: { label: 'string | false', slug: '', kind: 'primitive' },
            defaultValue: "'fade'",
            descriptionKey: 'components.tab_panels.props.transition.description',
            descriptionFallback: 'Transition name applied to <Transition> inside each OrigamTabPanel. Defaults to "fade". Pass false to disable all transitions.'
        },
        {
            name: 'swipeable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tab_panels.props.swipeable.description',
            descriptionFallback: 'Enables horizontal touch swipe to navigate panels (left → next, right → prev) via the v-touch directive.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.tab_panels.props.tag.description',
            descriptionFallback: 'Root HTML element rendered for the panels container.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.tab_panels.emits.update_model_value.description',
            descriptionFallback: 'Fired when the visible panel changes. Use v-model to bind.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, select, next, prev, selected, items }',
            descriptionKey: 'components.tab_panels.slots.default.description',
            descriptionFallback: 'Container for OrigamTabPanel children. Receives group orchestration props for advanced custom panel rendering.'
        }
    ],

    examples: [
        {
            titleKey: 'components.tab_panels.examples.basic.title',
            titleFallback: 'Basic panel container',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="active">
    <origam-tab value="a" text="Alpha" />
    <origam-tab value="b" text="Beta" />
    <origam-tab value="c" text="Gamma" />
  </origam-tabs>

  <origam-tab-panels v-model="active">
    <origam-tab-panel value="a">Alpha content</origam-tab-panel>
    <origam-tab-panel value="b">Beta content</origam-tab-panel>
    <origam-tab-panel value="c">Gamma content</origam-tab-panel>
  </origam-tab-panels>
</template>

<script setup lang="ts">
const active = ref('a')
</script>`
        },
        {
            titleKey: 'components.tab_panels.examples.swipeable.title',
            titleFallback: 'Swipeable (touch)',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="active">
    <origam-tab value="one" text="One" />
    <origam-tab value="two" text="Two" />
  </origam-tabs>

  <origam-tab-panels v-model="active" swipeable>
    <origam-tab-panel value="one">Swipe left to go to Two</origam-tab-panel>
    <origam-tab-panel value="two">Swipe right to go to One</origam-tab-panel>
  </origam-tab-panels>
</template>

<script setup lang="ts">
const active = ref('one')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-tab-panels',
        svgViewBox: '0 0 600 200',
        svgTitle: 'Anatomy of OrigamTabPanels',
        svgDesc: 'Schematic of the TabPanels container with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="600" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="36" width="540" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="50" y="56" width="500" height="100" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="70" y="76" width="460" height="60" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="300" y="110" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-tab-panel (active)</text>
  <circle cx="42" cy="44" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="42" y="48.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="62" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="62" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="82" cy="84" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="82" y="88" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="42" y1="32" x2="70" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="74" y="12" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-tab-panels</text>
  <text x="300" y="180" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">① root · ② defaults-provider · ③ active origam-tab-panel</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-tab-panels&gt;</code> — 3 layers. The root wraps an <code>&lt;OrigamDefaultsProvider&gt;</code> that forwards the <code>transition</code> prop to child panels. Only the active panel is shown; others are <code>v-show</code>-hidden.`,
        legend: [
            {
                num: 1,
                cls: '.origam-tab-panels',
                descriptionKey: 'components.tab_panels.anatomy.root',
                descriptionFallback: 'Root element. Manages the panel group via <code>useGroup</code> and provides transition context via <code>ORIGAM_TAB_PANELS_CTX_KEY</code>.'
            },
            {
                num: 2,
                cls: 'OrigamDefaultsProvider (internal)',
                descriptionKey: 'components.tab_panels.anatomy.defaults_provider',
                descriptionFallback: 'Internal <code>&lt;OrigamDefaultsProvider&gt;</code> that injects the <code>transition</code> prop into child <code>&lt;OrigamTabPanel&gt;</code> elements without requiring explicit prop drilling.'
            },
            {
                num: 3,
                cls: '.origam-tab-panel--active',
                descriptionKey: 'components.tab_panels.anatomy.active_panel',
                descriptionFallback: 'The currently visible panel. Inactive panels remain in the DOM via <code>v-show</code> after first mount.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: manages group + provides transition context -->
<div class="origam-tab-panels" v-touch="touchOptions">
  <!-- internal defaults provider forwards transition to all child panels -->
  <origam-defaults-provider :defaults="slotDefaults">
    <!-- #default slot: place origam-tab-panel children here -->
    <slot name="default" v-bind="slotProps" />
  </origam-defaults-provider>
</div>`,
        classes: [
            {
                cls: 'origam-tab-panels',
                descriptionKey: 'components.tab_panels.anatomy.root',
                descriptionFallback: 'Root element. display: block; position: relative. Provides transition context to child panels.'
            },
            {
                cls: 'origam-tab-panels--direction-vertical',
                descriptionKey: 'components.tab_panels.anatomy.vertical',
                descriptionFallback: 'Applied when direction="vertical". Switches to display: flex; flex-direction: row.'
            },
            {
                cls: 'origam-tab-panels--swipeable',
                descriptionKey: 'components.tab_panels.anatomy.swipeable',
                descriptionFallback: 'Applied when swipeable=true. Adds overflow: hidden and touch-action: pan-y.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-tab-panels__panel---padding-block',
            defaultValue: '16px',
            descriptionKey: 'components.tab_panels.css_vars.padding_block',
            descriptionFallback: 'Vertical padding applied inside the tab panels container.'
        },
        {
            name: '--origam-tab-panels__panel---padding-inline',
            defaultValue: '0',
            descriptionKey: 'components.tab_panels.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding applied inside the tab panels container.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.tab_panels.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'next',
            type: '() => void',
            descriptionKey: 'components.tab_panels.exposed.next',
            descriptionFallback: 'Programmatically selects the next panel in registration order.'
        },
        {
            name: 'prev',
            type: '() => void',
            descriptionKey: 'components.tab_panels.exposed.prev',
            descriptionFallback: 'Programmatically selects the previous panel in registration order.'
        },
        {
            name: 'select',
            type: '(value: any, selected: boolean) => void',
            descriptionKey: 'components.tab_panels.exposed.select',
            descriptionFallback: 'Programmatically selects a panel by its registered value.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.tab_panels.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.tab_panels.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.tab_panels.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.tab_panels.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.tab_panels.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Swipe left / right',
                actionKey: 'components.tab_panels.a11y.swipe',
                actionFallback: 'When swipeable=true, horizontal swipe navigates to the next/previous panel.'
            }
        ],
        notes: [
            {
                noteKey: 'components.tab_panels.a11y.sync_note',
                noteFallback: 'OrigamTabPanels has no ARIA role of its own — it is a layout orchestrator. ARIA semantics live on each child OrigamTabPanel (role="tabpanel").'
            },
            {
                noteKey: 'components.tab_panels.a11y.sync_model_note',
                noteFallback: 'Keep the v-model in sync with the sibling OrigamTabs v-model. Desynchronised models break the aria-controls / aria-labelledby wiring between tabs and panels.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/tabs.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Container tokens live under the tabs.panel key.',
        excerpt: [
            {
                tokenPath: 'tabs.panel.padding-block',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.tab_panels.tokens.padding_block',
                descriptionFallback: 'Default vertical padding for panel content.'
            },
            {
                tokenPath: 'tabs.panel.padding-inline',
                value: '{space.0}',
                type: 'dimension',
                descriptionKey: 'components.tab_panels.tokens.padding_inline',
                descriptionFallback: 'Default horizontal padding for panel content.'
            },
            {
                tokenPath: 'tabs.panel.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.tab_panels.tokens.transition_duration',
                descriptionFallback: 'Duration of the fade transition between panels.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'transition',
                kind: 'select',
                labelKey: 'components.tab_panels.playground.transition',
                labelFallback: 'Transition',
                defaultValue: 'fade',
                options: [
                    { label: 'fade (default)', value: 'fade' },
                    { label: '(none)', value: '' }
                ]
            },
            {
                prop: 'swipeable',
                kind: 'switch',
                labelKey: 'components.tab_panels.playground.swipeable',
                labelFallback: 'Swipeable',
                defaultValue: false
            },
            {
                prop: 'direction',
                kind: 'select',
                labelKey: 'components.tab_panels.playground.direction',
                labelFallback: 'Direction',
                defaultValue: 'horizontal',
                options: [
                    { label: 'horizontal', value: 'horizontal' },
                    { label: 'vertical', value: 'vertical' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
