/**
 * /components/empty-state — full documentation data for OrigamEmptyState.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/EmptyState/empty-state.interface.ts  (props)
 *   - packages/ds/src/components/EmptyState/OrigamEmptyState.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/empty-state.json                   (CSS tokens)
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

export const EMPTY_STATE_DOC: IComponentDoc = {
    slug: 'empty-state',
    name: 'EmptyState',
    tag: 'origam-empty-state',
    icon: 'mdi-inbox-outline',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.empty_state.description',
    descriptionFallback: 'Placeholder shown when a list, table or collection has nothing to display. Five visual presets (no-data, no-results, error, offline, locked) bundle icon + intent; both are overridable via props or slots.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-emptystate--design',
    docUrl: 'http://localhost:4000/components/EmptyState/OrigamEmptyState',

    family: [],

    related: [
        {
            slug: 'data-table',
            name: 'DataTable',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table.description',
            descriptionFallback: 'Feature-rich data table that renders EmptyState when no rows exist.'
        }
    ],

    props: [
        {
            name: 'preset',
            type: { label: 'TEmptyStatePreset', slug: 'empty-state-preset', kind: 'type' },
            defaultValue: "'no-data'",
            descriptionKey: 'components.empty_state.props.preset.description',
            descriptionFallback: "Visual preset. Bundles a default icon and intent. Values: 'no-data' | 'no-results' | 'error' | 'offline' | 'locked'. Override icon/iconColor to customise."
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.empty_state.props.title.description',
            descriptionFallback: 'Primary heading rendered below the icon. Override with the #title slot for richer markup.'
        },
        {
            name: 'description',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.empty_state.props.description.description',
            descriptionFallback: 'Optional sub-heading rendered below the title. Width is clamped by --origam-empty-state---max-width.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.empty_state.props.icon.description',
            descriptionFallback: 'Override the preset icon. Accepts an MDI string, a SVG path array, or a Vue component. Use the #icon slot for full SVG illustrations.'
        },
        {
            name: 'iconColor',
            type: { label: 'TIntent', slug: 'intent', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.empty_state.props.icon_color.description',
            descriptionFallback: 'Override the preset intent colour for the icon. Accepts semantic intent values (primary, success, danger…).'
        },
        {
            name: 'size',
            type: { label: 'TEmptyStateSize', slug: 'empty-state-size', kind: 'type' },
            defaultValue: "'md'",
            descriptionKey: 'components.empty_state.props.size.description',
            descriptionFallback: "Vertical density. Values: 'sm' | 'md' | 'lg'. Drives icon size, font sizes, padding and gap."
        },
        {
            name: 'align',
            type: { label: 'TEmptyStateAlign', slug: 'empty-state-align', kind: 'type' },
            defaultValue: "'center'",
            descriptionKey: 'components.empty_state.props.align.description',
            descriptionFallback: "Horizontal alignment of the icon / title / description / actions stack. Values: 'center' | 'left'."
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.empty_state.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.empty_state.slots.default.description',
            descriptionFallback: 'Replaces the entire built-in layout (icon + title + description + actions). Use for fully bespoke placeholder markup.'
        },
        {
            slot: 'icon',
            slotProps: '—',
            descriptionKey: 'components.empty_state.slots.icon.description',
            descriptionFallback: 'Replaces the default OrigamIcon render. Use for SVG / <img> illustrations. Mark as aria-hidden="true" when purely decorative.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.empty_state.slots.title.description',
            descriptionFallback: 'Replaces the rendered title element. Slot wins over the title prop when both are provided.'
        },
        {
            slot: 'description',
            slotProps: '—',
            descriptionKey: 'components.empty_state.slots.description.description',
            descriptionFallback: 'Replaces the rendered description element. Slot wins over the description prop.'
        },
        {
            slot: 'actions',
            slotProps: '—',
            descriptionKey: 'components.empty_state.slots.actions.description',
            descriptionFallback: 'Actions row rendered below the description. Typically holds 1–2 buttons (Create, Retry, Sign in…).'
        }
    ],

    examples: [
        {
            titleKey: 'components.empty_state.examples.presets.title',
            titleFallback: 'Presets',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <origam-empty-state preset="no-data"    title="No data yet"   />
    <origam-empty-state preset="no-results" title="No results"    />
    <origam-empty-state preset="error"      title="Something went wrong" />
    <origam-empty-state preset="offline"    title="You are offline" />
    <origam-empty-state preset="locked"     title="Access denied" />
  </div>
</template>`
        },
        {
            titleKey: 'components.empty_state.examples.with_actions.title',
            titleFallback: 'With actions',
            lang: 'vue',
            code: `<template>
  <origam-empty-state
    preset="no-data"
    title="No projects yet"
    description="Create your first project to get started."
  >
    <template #actions>
      <origam-btn color="primary" prepend-icon="mdi-plus" text="Create project" />
    </template>
  </origam-empty-state>
</template>`
        },
        {
            titleKey: 'components.empty_state.examples.custom_icon.title',
            titleFallback: 'Custom icon slot',
            lang: 'vue',
            code: `<template>
  <origam-empty-state title="No messages" description="Your inbox is clean.">
    <template #icon>
      <img src="/illustrations/inbox.svg" width="96" height="96" aria-hidden="true" />
    </template>
  </origam-empty-state>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'no-data',
            props: { preset: 'no-data', title: 'No data', description: 'Nothing to show yet.' }
        },
        {
            label: 'no-results',
            props: { preset: 'no-results', title: 'No results', size: 'sm' }
        },
        {
            label: 'error',
            props: { preset: 'error', title: 'Something went wrong', description: 'Please try again.' }
        },
        {
            label: 'offline',
            props: { preset: 'offline', title: 'You are offline', size: 'sm' }
        },
        {
            label: 'locked',
            props: { preset: 'locked', title: 'Access denied', align: 'left' }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-empty-state',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamEmptyState',
        svgDesc: 'Schematic of the EmptyState component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="208" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="280" y="32" width="140" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="64" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__icon</text>
  <rect x="160" y="100" width="380" height="26" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="117" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__title</text>
  <rect x="100" y="136" width="500" height="26" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="153" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__description</text>
  <rect x="250" y="172" width="200" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="194" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__actions</text>
  <circle cx="36" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="280" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="280" y="40" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="160" cy="104" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="160" y="108" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="100" cy="140" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="100" y="144" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="250" cy="176" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="250" y="180" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-empty-state&gt;</code> — 5 internal parts. The root ① carries <code>role="status"</code> and <code>aria-live="polite"</code>; each section is conditionally rendered.`,
        legend: [
            {
                num: 1,
                cls: '.origam-empty-state',
                descriptionKey: 'components.empty_state.anatomy.root',
                descriptionFallback: 'Root element. Has role="status" aria-live="polite". Flex column. Width 100%.'
            },
            {
                num: 2,
                cls: '.origam-empty-state__icon',
                descriptionKey: 'components.empty_state.anatomy.icon',
                descriptionFallback: 'Icon container. aria-hidden="true". Contains OrigamIcon or the #icon slot.'
            },
            {
                num: 3,
                cls: '.origam-empty-state__title',
                descriptionKey: 'components.empty_state.anatomy.title',
                descriptionFallback: 'Title element. Rendered when the title prop or the #title slot is present.'
            },
            {
                num: 4,
                cls: '.origam-empty-state__description',
                descriptionKey: 'components.empty_state.anatomy.description',
                descriptionFallback: 'Description element. Width clamped by --origam-empty-state---max-width (480px default). Rendered when description prop or #description slot is present.'
            },
            {
                num: 5,
                cls: '.origam-empty-state__actions',
                descriptionKey: 'components.empty_state.anatomy.actions',
                descriptionFallback: 'Actions row. Inline-flex with wrap. Rendered only when the #actions slot is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: role="status" aria-live="polite" -->
<div class="origam-empty-state origam-empty-state--size-md origam-empty-state--align-center">

  <!-- icon area — aria-hidden -->
  <div class="origam-empty-state__icon" aria-hidden="true">
    <slot name="icon">
      <origam-icon class="origam-empty-state__icon-glyph" />
    </slot>
  </div>

  <!-- title — v-if="hasTitle" -->
  <div class="origam-empty-state__title">
    <slot name="title">{{ title }}</slot>
  </div>

  <!-- description — v-if="hasDescription" -->
  <div class="origam-empty-state__description">
    <slot name="description">{{ description }}</slot>
  </div>

  <!-- actions — v-if="hasActions" -->
  <div class="origam-empty-state__actions">
    <slot name="actions" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-empty-state',
                descriptionKey: 'components.empty_state.anatomy.root',
                descriptionFallback: 'Root element. role="status" aria-live="polite". Flex column layout.'
            },
            {
                cls: 'origam-empty-state__icon',
                descriptionKey: 'components.empty_state.anatomy.icon',
                descriptionFallback: 'Icon wrapper with aria-hidden="true". Centres the icon glyph.'
            },
            {
                cls: 'origam-empty-state__icon-glyph',
                descriptionKey: 'components.empty_state.anatomy.icon_glyph',
                descriptionFallback: 'OrigamIcon instance inside the icon wrapper. Inherits size and colour from CSS vars.'
            },
            {
                cls: 'origam-empty-state__title',
                descriptionKey: 'components.empty_state.anatomy.title',
                descriptionFallback: 'Title text element.'
            },
            {
                cls: 'origam-empty-state__description',
                descriptionKey: 'components.empty_state.anatomy.description',
                descriptionFallback: 'Description text element. max-width clamped by token.'
            },
            {
                cls: 'origam-empty-state__actions',
                descriptionKey: 'components.empty_state.anatomy.actions',
                descriptionFallback: 'Inline-flex actions row with gap and top margin.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-empty-state---padding-block',
            defaultValue: '{space.10} (40px)',
            descriptionKey: 'components.empty_state.css_vars.padding_block',
            descriptionFallback: 'Block padding of the root element. Per-size variants override this value.'
        },
        {
            name: '--origam-empty-state---padding-inline',
            defaultValue: '{space.6} (24px)',
            descriptionKey: 'components.empty_state.css_vars.padding_inline',
            descriptionFallback: 'Inline padding of the root element.'
        },
        {
            name: '--origam-empty-state---gap',
            defaultValue: '{space.4} (16px)',
            descriptionKey: 'components.empty_state.css_vars.gap',
            descriptionFallback: 'Flex gap between icon, title, description and actions. Per-size overrides apply.'
        },
        {
            name: '--origam-empty-state---max-width',
            defaultValue: '480px',
            descriptionKey: 'components.empty_state.css_vars.max_width',
            descriptionFallback: 'Maximum width of the description text for readable line length.'
        },
        {
            name: '--origam-empty-state__icon---size',
            defaultValue: '64px',
            descriptionKey: 'components.empty_state.css_vars.icon_size',
            descriptionFallback: 'Icon font-size / size. Overridden per size class (sm=48px, md=64px, lg=96px).'
        },
        {
            name: '--origam-empty-state__icon---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.empty_state.css_vars.icon_color',
            descriptionFallback: 'Icon colour. Overridden per intent modifier class (e.g. --intent-danger maps to danger feedback colour).'
        },
        {
            name: '--origam-empty-state__title---font-size',
            defaultValue: '{font.size.xl} (1.25rem)',
            descriptionKey: 'components.empty_state.css_vars.title_font_size',
            descriptionFallback: 'Title font size. Overridden per size class.'
        },
        {
            name: '--origam-empty-state__description---font-size',
            defaultValue: '{font.size.md} (1rem)',
            descriptionKey: 'components.empty_state.css_vars.description_font_size',
            descriptionFallback: 'Description font size. Overridden per size class.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'resolvedIcon',
            type: 'ComputedRef<TIcon>',
            descriptionKey: 'components.empty_state.exposed.resolved_icon',
            descriptionFallback: 'The resolved icon: user icon prop wins over preset default.'
        },
        {
            name: 'resolvedIntent',
            type: 'ComputedRef<TIntent>',
            descriptionKey: 'components.empty_state.exposed.resolved_intent',
            descriptionFallback: 'The resolved intent: user iconColor prop wins over preset default.'
        },
        {
            name: 'hasDefaultSlot',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.empty_state.exposed.has_default_slot',
            descriptionFallback: 'True when the default slot is provided — replaces the built-in layout entirely.'
        },
        {
            name: 'hasTitle',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.empty_state.exposed.has_title',
            descriptionFallback: 'True when a title prop or #title slot is present.'
        },
        {
            name: 'hasDescription',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.empty_state.exposed.has_description',
            descriptionFallback: 'True when a description prop or #description slot is present.'
        },
        {
            name: 'hasActions',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.empty_state.exposed.has_actions',
            descriptionFallback: 'True when the #actions slot is provided.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['status'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.empty_state.a11y.live_region',
                noteFallback: 'The root has role="status" and aria-live="polite". Screen readers announce the state change when the component appears or when preset changes without a page reload.'
            },
            {
                noteKey: 'components.empty_state.a11y.icon_hidden',
                noteFallback: 'The icon container carries aria-hidden="true" — it is decorative. The meaningful information is in the title and description text nodes.'
            },
            {
                noteKey: 'components.empty_state.a11y.actions',
                noteFallback: 'Actions inside the #actions slot must individually carry correct roles (button, link). EmptyState does not wrap or intercept keyboard events.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/empty-state.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'empty-state.padding-block-md',
                value: '{space.10}',
                type: 'dimension',
                descriptionKey: 'components.empty_state.tokens.padding_block_md',
                descriptionFallback: 'Block padding for size=md (40px).'
            },
            {
                tokenPath: 'empty-state.gap-md',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.empty_state.tokens.gap_md',
                descriptionFallback: 'Gap between sections for size=md (16px).'
            },
            {
                tokenPath: 'empty-state.max-width',
                value: '480px',
                type: 'dimension',
                descriptionKey: 'components.empty_state.tokens.max_width',
                descriptionFallback: 'Max width of the description text zone.'
            },
            {
                tokenPath: 'empty-state.icon.size-md',
                value: '64px',
                type: 'dimension',
                descriptionKey: 'components.empty_state.tokens.icon_size_md',
                descriptionFallback: 'Icon size for size=md.'
            },
            {
                tokenPath: 'empty-state.title.font-size-md',
                value: '{font.size.xl}',
                type: 'dimension',
                descriptionKey: 'components.empty_state.tokens.title_font_size_md',
                descriptionFallback: 'Title font size for size=md (1.25rem).'
            },
            {
                tokenPath: 'empty-state.description.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.empty_state.tokens.description_color',
                descriptionFallback: 'Description text colour.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'preset',
                kind: 'select',
                labelKey: 'components.empty_state.playground.preset',
                labelFallback: 'Preset',
                defaultValue: 'no-data',
                options: [
                    { label: 'no-data', value: 'no-data' },
                    { label: 'no-results', value: 'no-results' },
                    { label: 'error', value: 'error' },
                    { label: 'offline', value: 'offline' },
                    { label: 'locked', value: 'locked' }
                ]
            },
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.empty_state.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Nothing to show yet'
            },
            {
                prop: 'description',
                kind: 'text',
                labelKey: 'components.empty_state.playground.description',
                labelFallback: 'Description',
                defaultValue: 'Create your first item to get started.'
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.empty_state.playground.size',
                labelFallback: 'Size',
                defaultValue: 'md',
                options: [
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            },
            {
                prop: 'align',
                kind: 'select',
                labelKey: 'components.empty_state.playground.align',
                labelFallback: 'Align',
                defaultValue: 'center',
                options: [
                    { label: 'center', value: 'center' },
                    { label: 'left', value: 'left' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
