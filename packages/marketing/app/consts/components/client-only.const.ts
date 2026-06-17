/**
 * /components/client-only — full documentation data for OrigamClientOnly.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/components/ClientOnly/OrigamClientOnly.vue  (props, template)
 *
 * No dedicated interface file — props are declared inline via defineProps<{…}>.
 * No tokens file — component is a pure structural wrapper with no visual chrome.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentA11y,
    IComponentPreviewVariant
} from '~/interfaces/components-catalog.interface'

export const CLIENT_ONLY_DOC: IComponentDoc = {
    slug: 'client-only',
    name: 'ClientOnly',
    tag: 'origam-client-only',
    icon: 'mdi-monitor',
    category: 'Utility',
    descriptionKey: 'components.catalog.client_only.description',
    descriptionFallback: 'Wrapper that renders its default slot ONLY after hydration on the client. On the server a configurable placeholder element (or the #fallback slot) is rendered instead, preventing hydration mismatches for client-only content.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-clientonly--design',
    docUrl: 'http://localhost:4000/components/ClientOnly/OrigamClientOnly',

    family: [],
    related: [],

    props: [
        {
            name: 'placeholderTag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.client_only.props.placeholder_tag.description',
            descriptionFallback: "HTML tag used for the SSR placeholder when no #fallback slot is provided. Defaults to undefined — SSR output is completely empty (perf win). Set to 'div' or 'span' when you need to reserve layout space to avoid cumulative layout shift."
        },
        {
            name: 'placeholderClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.client_only.props.placeholder_class.description',
            descriptionFallback: 'CSS class applied to the placeholder element. Pair with placeholderTag to reserve exact dimensions matching the client render.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.client_only.slots.default.description',
            descriptionFallback: 'Content rendered only on the client, after hydration. Not executed on the server.'
        },
        {
            slot: 'fallback',
            slotProps: '—',
            descriptionKey: 'components.client_only.slots.fallback.description',
            descriptionFallback: 'Content rendered on the server and during the initial client hydration. Replaces the auto-generated placeholder element.'
        }
    ],

    examples: [
        {
            titleKey: 'components.client_only.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-client-only>
    <!-- rendered only client-side (e.g. Chart that needs canvas) -->
    <origam-chart type="line" :series="series" />

    <template #fallback>
      <p>Loading chart…</p>
    </template>
  </origam-client-only>
</template>`
        },
        {
            titleKey: 'components.client_only.examples.placeholder.title',
            titleFallback: 'Layout-preserving placeholder',
            lang: 'vue',
            code: `<template>
  <!-- Reserve the same block dimensions on SSR to avoid layout shift -->
  <origam-client-only
    placeholder-tag="div"
    placeholder-class="chart-skeleton"
  >
    <origam-chart type="area" :series="series" height="300" />
  </origam-client-only>
</template>

<style scoped>
.chart-skeleton {
  height: 300px;
  background: var(--origam-color__surface---raised);
  border-radius: var(--origam-radius---md);
}
</style>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-client-only',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamClientOnly',
        svgDesc: 'Schematic showing the SSR vs client render paths of OrigamClientOnly.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="300" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-dasharray="6 3" stroke-width="1.5"/>
  <text x="170" y="44" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif" font-weight="600">SSR (isMounted = false)</text>
  <rect x="40" y="54" width="260" height="60" rx="4" fill="var(--origam-color__feedback--warning---bgSubtle, rgba(180,130,0,0.08))" stroke="var(--origam-color__feedback--warning---border, rgba(180,130,0,0.35))" stroke-width="1"/>
  <text x="170" y="88" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">#fallback slot (or placeholder tag)</text>
  <rect x="380" y="20" width="300" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="530" y="44" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="sans-serif" font-weight="600">Client (isMounted = true)</text>
  <rect x="400" y="54" width="260" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bg, rgba(124,58,237,0.35))" stroke-width="1"/>
  <text x="530" y="88" font-size="11" fill="var(--origam-color__text---primary, #1a0f3c)" text-anchor="middle" font-family="sans-serif">#default slot (your content)</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__feedback--warning---fgSubtle, #b45309)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="388" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="388" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-client-only&gt;</code> — two render paths: server (fallback/placeholder) and client (default slot after <code>onMounted</code>).`,
        legend: [
            { num: 1, cls: '#fallback / placeholderTag', descriptionKey: 'components.client_only.anatomy.fallback', descriptionFallback: 'Rendered on the server and during first client paint. Either the #fallback slot content or a generated <placeholderTag> element (aria-hidden="true").' },
            { num: 2, cls: '#default', descriptionKey: 'components.client_only.anatomy.default', descriptionFallback: 'Rendered only after onMounted fires on the client (isMounted ref flips to true). Completely absent from SSR output.' }
        ],
        code: `<template>
  <!-- isMounted=false (SSR) → renders fallback/placeholder -->
  <template v-if="isMounted">
    <slot />
  </template>
  <template v-else>
    <slot name="fallback">
      <!-- auto-generated placeholder (aria-hidden) -->
      <component
        :is="placeholderTag"
        v-if="placeholderTag"
        :class="placeholderClass"
        aria-hidden="true"
      />
    </slot>
  </template>
</template>`,
        classes: []
    } satisfies IComponentAnatomy,

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.client_only.a11y.placeholder_aria',
                noteFallback: 'The auto-generated placeholder element carries aria-hidden="true" so it is invisible to assistive technologies. Only provide a placeholder that is purely decorative (skeleton, shimmer).'
            },
            {
                noteKey: 'components.client_only.a11y.fallback_slot',
                noteFallback: 'If the #fallback slot contains meaningful content (e.g. "Loading chart…"), ensure it is visible to screen readers (do not add aria-hidden).'
            },
            {
                noteKey: 'components.client_only.a11y.ssr_note',
                noteFallback: 'OrigamClientOnly prevents hydration mismatches for content that relies on browser APIs (window, document, canvas, WebGL). Use it for charts, maps, canvas-based components and anything that reads window dimensions on mount.'
            }
        ]
    } satisfies IComponentA11y
}
