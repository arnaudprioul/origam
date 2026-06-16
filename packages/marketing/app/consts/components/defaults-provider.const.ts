/**
 * /components/defaults-provider — full documentation data for OrigamDefaultsProvider.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DefaultProvider/default-provider.interface.ts  (props)
 *   - packages/ds/src/components/DefaultsProvider/OrigamDefaultsProvider.vue    (template, defineExpose)
 *   - packages/ds/tokens/component/defaults-provider.json                       (CSS tokens — render-only, no chrome)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentA11y,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DEFAULTS_PROVIDER_DOC: IComponentDoc = {
    slug: 'defaults-provider',
    name: 'DefaultsProvider',
    tag: 'origam-defaults-provider',
    icon: 'mdi-tune-variant',
    category: 'Utilities',
    descriptionKey: 'components.catalog.defaults_provider.description',
    descriptionFallback: 'Structurally transparent context provider that injects a prop-defaults map into all descendant Origam components via useDefaults().',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-defaults-provider--design',
    docUrl: 'http://localhost:4000/components/DefaultsProvider/OrigamDefaultsProvider',

    family: [],

    related: [
        {
            slug: 'form',
            name: 'Form',
            kind: 'component',
            descriptionKey: 'components.catalog.form.description',
            descriptionFallback: 'Often used together with DefaultsProvider to apply shared field density or variant across form fields.'
        }
    ],

    props: [
        {
            name: 'defaults',
            type: { label: 'IDefault', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.defaults_provider.props.defaults.description',
            descriptionFallback: 'Map of default prop values keyed by "global" (all components in subtree) or by component name (e.g. "origam-btn": { color: "primary" }).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.defaults_provider.props.disabled.description',
            descriptionFallback: 'When true, parent defaults are passed through unchanged — useful to temporarily disable an outer DefaultsProvider without unmounting it.'
        },
        {
            name: 'reset',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.defaults_provider.props.reset.description',
            descriptionFallback: 'When set, parent defaults are NOT inherited; the subtree starts from this provider\'s defaults only. The value is opaque but useful for DevTools tracing.'
        },
        {
            name: 'root',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.defaults_provider.props.root.description',
            descriptionFallback: 'Marks the provider as a root scope — equivalent to reset but communicates intent: this is the top of a defaults tree, not a mid-tree override.'
        },
        {
            name: 'scoped',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.defaults_provider.props.scoped.description',
            descriptionFallback: 'When true, parent defaults are not merged in — the subtree only sees this provider\'s defaults. Same effect as reset but expressed declaratively.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.defaults_provider.slots.default.description',
            descriptionFallback: 'Subtree that will receive the injected defaults. The component renders only this slot — it has no visual chrome of its own.'
        }
    ],

    examples: [
        {
            titleKey: 'components.defaults_provider.examples.global.title',
            titleFallback: 'Global density override',
            lang: 'vue',
            code: `<template>
  <origam-defaults-provider :defaults="{ global: { density: 'comfortable' } }">
    <origam-btn text="Comfortable Btn" />
    <origam-chip text="Comfortable Chip" />
  </origam-defaults-provider>
</template>`
        },
        {
            titleKey: 'components.defaults_provider.examples.targeted.title',
            titleFallback: 'Per-component defaults',
            lang: 'vue',
            code: `<template>
  <origam-defaults-provider
    :defaults="{
      'origam-btn':  { color: 'primary', variant: 'tonal' },
      'origam-chip': { variant: 'outlined' }
    }"
  >
    <origam-btn text="Auto-primary tonal" />
    <origam-chip text="Auto-outlined" />
  </origam-defaults-provider>
</template>`
        },
        {
            titleKey: 'components.defaults_provider.examples.scoped.title',
            titleFallback: 'Scoped subtree (no parent inheritance)',
            lang: 'vue',
            code: `<template>
  <!-- Outer provider sets density=compact globally -->
  <origam-defaults-provider :defaults="{ global: { density: 'compact' } }">
    <!-- Inner scoped provider: subtree only sees its own defaults, not compact -->
    <origam-defaults-provider
      :defaults="{ 'origam-btn': { color: 'success' } }"
      scoped
    >
      <origam-btn text="Success, not compact" />
    </origam-defaults-provider>
  </origam-defaults-provider>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-defaults-provider',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamDefaultsProvider',
        svgDesc: 'Schematic showing the provider renders only its default slot with no visual chrome.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="120" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="8 4"/>
  <text x="350" y="30" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-defaults-provider (no DOM output)</text>
  <rect x="80" y="70" width="180" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="170" y="104" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">child component</text>
  <rect x="300" y="70" width="180" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="390" y="104" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">child component</text>
  <rect x="520" y="70" width="120" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="580" y="104" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">…more</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="170" cy="78" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="170" y="82.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="185" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">① Provider (transparent) injects defaults via provide() — no DOM node rendered</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-defaults-provider&gt;</code> — structurally transparent. The component renders only the <code>#default</code> slot; it injects defaults via Vue's <code>provide()</code> / <code>inject()</code> without any DOM output of its own.`,
        legend: [
            {
                num: 1,
                cls: '.origam-defaults-provider (no DOM)',
                descriptionKey: 'components.defaults_provider.anatomy.provider',
                descriptionFallback: 'The provider itself. Calls <code>provideDefaults()</code> once on setup, then renders only <code>&lt;slot name="default"/&gt;</code>. No wrapper element is injected into the DOM.'
            },
            {
                num: 2,
                cls: '#default slot — descendant components',
                descriptionKey: 'components.defaults_provider.anatomy.slot',
                descriptionFallback: 'Any Origam component in the subtree that calls <code>useDefaults()</code> automatically picks up the injected map. Child components are NOT aware of being wrapped.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamDefaultsProvider renders ONLY its default slot — no DOM wrapper -->
<template>
  <slot name="default" />
</template>

<script setup>
// Injects the defaults map into all useDefaults() consumers in the subtree
provideDefaults(computed(() => props.defaults ?? {}), {
  scoped: props.scoped,
  reset: props.reset,
  root: props.root,
  disabled: props.disabled
})
</script>`,
        classes: [
            {
                cls: 'origam-defaults-provider',
                descriptionKey: 'components.defaults_provider.anatomy.root',
                descriptionFallback: 'No CSS class is emitted on any DOM element. The component is purely logical.'
            }
        ]
    } satisfies IComponentAnatomy,

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.defaults_provider.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component. Used by Origam\'s auto-forwarding pattern.'
        }
    ],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.defaults_provider.a11y.transparent_note',
                noteFallback: 'OrigamDefaultsProvider has no visual rendering, no focusable element and no ARIA attributes. All a11y considerations belong to the descendant components it wraps.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/defaults-provider.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. This component has no visual chrome — the token file is present for token-set ordering consistency only.',
        excerpt: []
    },

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.defaults_provider.playground.disabled',
                labelFallback: 'Disabled (pass through parent defaults)',
                defaultValue: false
            },
            {
                prop: 'scoped',
                kind: 'switch',
                labelKey: 'components.defaults_provider.playground.scoped',
                labelFallback: 'Scoped (no parent inheritance)',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
