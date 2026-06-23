/**
 * /components/loader — full documentation data for OrigamLoader.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Commons/loader.interface.ts  (ILoaderProps)
 *   - packages/ds/src/components/Loader/OrigamLoader.vue      (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/loader.json               (CSS tokens)
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

export const LOADER_DOC: IComponentDoc = {
    slug: 'loader',
    name: 'Loader',
    tag: 'origam-loader',
    icon: 'mdi-loading',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.loader.description',
    descriptionFallback: 'Toggle container that swaps between a loading spinner (OrigamProgress circular) and the default slot content. Carries aria-busy and aria-label when loading.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-loader--design',
    docUrl: 'http://localhost:4000/components/Loader/OrigamLoader',

    family: [],

    related: [
        {
            slug: 'progress',
            name: 'Progress',
            kind: 'component',
            descriptionKey: 'components.catalog.progress.description',
            descriptionFallback: 'The underlying progress indicator rendered inside Loader when loading is active.'
        },
        {
            slug: 'btn',
            name: 'Btn',
            kind: 'component',
            descriptionKey: 'components.catalog.btn.description',
            descriptionFallback: 'Uses OrigamLoader internally to show a loading spinner via the loading prop.'
        }
    ],

    props: [
        // ── ILoaderProps ───────────────────────────────────────────────────
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.loader.props.loading.description',
            descriptionFallback: 'When truthy, hides the default slot and shows the #loader slot (or OrigamProgress by default). Sets aria-busy="true" and aria-label="Loading" on the root.'
        },
        {
            name: 'loadingText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.loader.props.loading_text.description',
            descriptionFallback: 'Override for the aria-label text shown while loading. Defaults to "Loading".'
        },
        // ── IColorProps ────────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.loader.props.color.description',
            descriptionFallback: 'Color passed to the OrigamProgress spinner shown in the loader slot.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.loader.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.loader.slots.default.description',
            descriptionFallback: 'Rendered when loading is falsy. This is the normal content.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.loader.slots.loader.description',
            descriptionFallback: 'Rendered when loading is truthy. Defaults to OrigamProgress (circular, size=23, width=2). Override to provide a custom spinner.'
        }
    ],

    examples: [
        {
            titleKey: 'components.loader.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-loader :loading="isFetching" color="primary">
    <origam-list :items="items" />
  </origam-loader>
</template>

<script setup lang="ts">
const isFetching = ref(true)
const items = ref([])
onMounted(async () => {
  items.value = await fetchItems()
  isFetching.value = false
})
</script>`
        },
        {
            titleKey: 'components.loader.examples.custom_spinner.title',
            titleFallback: 'Custom spinner slot',
            lang: 'vue',
            code: `<template>
  <origam-loader :loading="loading">
    <template #loader>
      <div style="padding: 2rem; text-align: center;">
        <origam-progress type="circular" size="48" color="primary" indeterminate />
        <p>Loading data…</p>
      </div>
    </template>
    <slot />
  </origam-loader>
</template>`
        },
        {
            titleKey: 'components.loader.examples.fullscreen.title',
            titleFallback: 'Fullscreen loader',
            lang: 'vue',
            code: `<template>
  <origam-loader
    :loading="initialising"
    color="primary"
    class="origam-loader--fullscreen"
  >
    <router-view />
  </origam-loader>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'loading',
            props: { loading: true, color: 'primary' },
            slotContent: 'Content hidden while loading'
        },
        {
            label: 'loaded',
            props: { loading: false },
            slotContent: 'Content visible'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-loader',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamLoader',
        svgDesc: 'Schematic of the Loader component in its two states: loading and loaded.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="24" width="300" height="152" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="174" cy="96" r="28" fill="none" stroke="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.20))" stroke-width="4"/>
  <path d="M174 68 A28 28 0 0 1 202 96" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="4" stroke-linecap="round"/>
  <text x="174" y="148" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">loading=true → #loader slot</text>
  <rect x="376" y="24" width="300" height="152" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <text x="526" y="96" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot content</text>
  <text x="526" y="112" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">loading=false</text>
  <circle cx="32" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="384" cy="32" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="384" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="174" cy="96" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="174" y="100" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-loader&gt;</code> — ① loading state (root with aria-busy, spinner rendered via #loader slot), ② loaded state (#default content visible), ③ OrigamProgress spinner (size=23, width=2, type=circular).',
        legend: [
            {
                num: 1,
                cls: '.origam-loader (loading)',
                descriptionKey: 'components.loader.anatomy.loading_state',
                descriptionFallback: 'Root element while <code>loading</code> is truthy. Carries <code>aria-busy="true"</code> and <code>aria-label="Loading"</code>. Renders the <code>#loader</code> slot.'
            },
            {
                num: 2,
                cls: '.origam-loader (loaded)',
                descriptionKey: 'components.loader.anatomy.loaded_state',
                descriptionFallback: 'Root element while <code>loading</code> is falsy. <code>aria-busy</code> and <code>aria-label</code> are absent. Renders the <code>#default</code> slot.'
            },
            {
                num: 3,
                cls: '.origam-loader__progress',
                descriptionKey: 'components.loader.anatomy.progress',
                descriptionFallback: 'OrigamProgress circular spinner injected in the default <code>#loader</code> slot. <code>margin: auto</code> centres it. Can be replaced by a custom slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component
  :is="tag"
  :aria-busy="isLoading || undefined"
  :aria-label="isLoading ? 'Loading' : undefined"
  class="origam-loader"
>
  <!-- shown when loading=true -->
  <template v-if="isLoading">
    <slot name="loader">
      <origam-progress
        :color="color"
        :size="23"
        type="circular"
        :width="2"
        class="origam-loader__progress"
        indeterminate
      />
    </slot>
  </template>
  <!-- shown when loading=false -->
  <template v-else>
    <slot name="default" />
  </template>
</component>`,
        classes: [
            {
                cls: 'origam-loader',
                descriptionKey: 'components.loader.anatomy.root',
                descriptionFallback: 'Root element. height: 100% by default.'
            },
            {
                cls: 'origam-loader--fullscreen',
                descriptionKey: 'components.loader.anatomy.fullscreen',
                descriptionFallback: 'Optional consumer-applied modifier. position: fixed; top: 0; left: 0; 100vw × 100vh.'
            },
            {
                cls: 'origam-loader__progress',
                descriptionKey: 'components.loader.anatomy.progress',
                descriptionFallback: 'OrigamProgress element rendered in the default loader slot. margin: auto centres it.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-loader---height',
            defaultValue: '100%',
            descriptionKey: 'components.loader.css_vars.height',
            descriptionFallback: 'Height of the root element. Defaults to 100% to fill its parent.'
        },
        {
            name: '--origam-loader__fullscreen---position',
            defaultValue: 'fixed',
            descriptionKey: 'components.loader.css_vars.fullscreen_position',
            descriptionFallback: 'Position value when the fullscreen modifier class is applied.'
        },
        {
            name: '--origam-loader__fullscreen---height',
            defaultValue: '100vh',
            descriptionKey: 'components.loader.css_vars.fullscreen_height',
            descriptionFallback: 'Height in fullscreen mode.'
        },
        {
            name: '--origam-loader__fullscreen---width',
            defaultValue: '100vw',
            descriptionKey: 'components.loader.css_vars.fullscreen_width',
            descriptionFallback: 'Width in fullscreen mode.'
        },
        {
            name: '--origam-loader__progress---margin',
            defaultValue: 'auto',
            descriptionKey: 'components.loader.css_vars.progress_margin',
            descriptionFallback: 'Margin around the progress spinner — auto centres it.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.loader.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.loader.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.loader.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.loader.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.loader.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.loader.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.loader.a11y.aria_busy_note',
                noteFallback: 'While loading, the root carries <code>aria-busy="true"</code> and <code>aria-label="Loading"</code> (or the custom loadingText). Screen readers announce the loading state.'
            },
            {
                noteKey: 'components.loader.a11y.live_region_note',
                noteFallback: 'For critical async operations that change page content, consider wrapping OrigamLoader in a live region (<code>aria-live="polite"</code>) so the transition from loading to loaded is announced.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/loader.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. The loader token file is a stub — visual rendering is fully delegated to OrigamProgress.',
        excerpt: [
            {
                tokenPath: 'loader.height',
                value: '100%',
                type: 'other',
                descriptionKey: 'components.loader.tokens.height',
                descriptionFallback: 'Default height of the loader root.'
            },
            {
                tokenPath: 'loader.progress.margin',
                value: 'auto',
                type: 'other',
                descriptionKey: 'components.loader.tokens.progress_margin',
                descriptionFallback: 'Margin around the progress element in the loader slot.'
            },
            {
                tokenPath: 'loader.fullscreen.position',
                value: 'fixed',
                type: 'other',
                descriptionKey: 'components.loader.tokens.fullscreen_position',
                descriptionFallback: 'Position in fullscreen mode.'
            },
            {
                tokenPath: 'loader.fullscreen.height',
                value: '100vh',
                type: 'other',
                descriptionKey: 'components.loader.tokens.fullscreen_height',
                descriptionFallback: 'Height in fullscreen mode.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'loading',
                kind: 'switch',
                labelKey: 'components.loader.playground.loading',
                labelFallback: 'Loading',
                defaultValue: true
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.loader.playground.color',
                labelFallback: 'Spinner color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'tag',
                kind: 'select',
                labelKey: 'components.loader.playground.tag',
                labelFallback: 'Tag',
                defaultValue: 'span',
                options: [
                    { label: 'span', value: 'span' },
                    { label: 'div', value: 'div' },
                    { label: 'section', value: 'section' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
