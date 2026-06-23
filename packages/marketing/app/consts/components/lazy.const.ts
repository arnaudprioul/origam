/**
 * /components/lazy — full documentation data for OrigamLazy.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Commons/lazy.interface.ts  (props: ILazyComponentProps)
 *   - packages/ds/src/components/Lazy/OrigamLazy.vue        (template BEM, defineExpose)
 *   - packages/ds/tokens/component/lazy.json               (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const LAZY_DOC: IComponentDoc = {
    slug: 'lazy',
    name: 'Lazy',
    tag: 'origam-lazy',
    icon: 'mdi-image-filter-none',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.lazy.description',
    descriptionFallback: 'Defers the mounting of its children until the placeholder enters the viewport. Uses IntersectionObserver (v-intersect directive) with an optional fade-in transition.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-lazy--design',
    docUrl: 'http://localhost:4000/components/Lazy/OrigamLazy',

    family: [],

    related: [
        {
            slug: 'infinite-scroll',
            name: 'InfiniteScroll',
            kind: 'component',
            descriptionKey: 'components.catalog.infinite_scroll.description',
            descriptionFallback: 'Fires a load event when the user scrolls near the bottom — complements lazy loading.'
        }
    ],

    props: [
        // ── ILazyComponentProps ────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.lazy.props.model_value.description',
            descriptionFallback: 'Controls visibility. Once set to true (either programmatically or via the IntersectionObserver), the children are mounted and stay mounted.'
        },
        {
            name: 'options',
            type: { label: 'IntersectionObserverInit', slug: '', kind: 'primitive' },
            defaultValue: '{ root: undefined, rootMargin: undefined, threshold: undefined }',
            descriptionKey: 'components.lazy.props.options.description',
            descriptionFallback: 'IntersectionObserver options passed to the v-intersect directive. Controls root element, margin and threshold.'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: 'transition', kind: 'type' },
            defaultValue: '{ component: OrigamFade }',
            descriptionKey: 'components.lazy.props.transition.description',
            descriptionFallback: 'Transition to apply when the slot content is revealed. Defaults to OrigamFade. Pass null to disable.'
        },
        // ── IDimensionProps ────────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.lazy.props.height.description',
            descriptionFallback: 'Placeholder height before the content is loaded. Helps IntersectionObserver detect the element.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.lazy.props.width.description',
            descriptionFallback: 'Placeholder width before the content is loaded.'
        },
        {
            name: 'minHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.lazy.props.min_height.description',
            descriptionFallback: 'Minimum placeholder height.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.lazy.props.max_height.description',
            descriptionFallback: 'Maximum placeholder height.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.lazy.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.lazy.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the IntersectionObserver fires and the element becomes visible. Payload is always true (component only mounts once).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.lazy.slots.default.description',
            descriptionFallback: 'Content to render once the element enters the viewport. Wrapped in the configured transition.'
        }
    ],

    examples: [
        {
            titleKey: 'components.lazy.examples.basic.title',
            titleFallback: 'Basic lazy load',
            lang: 'vue',
            code: `<template>
  <!-- The HeavyChart component is only mounted when this block scrolls into view -->
  <origam-lazy min-height="300">
    <HeavyChart />
  </origam-lazy>
</template>`
        },
        {
            titleKey: 'components.lazy.examples.controlled.title',
            titleFallback: 'Controlled (v-model)',
            lang: 'vue',
            code: `<template>
  <origam-btn @click="visible = true">Load content</origam-btn>
  <origam-lazy v-model="visible" min-height="200">
    <p>This paragraph mounts only after the button is clicked or the block scrolls in.</p>
  </origam-lazy>
</template>

<script setup lang="ts">
const visible = ref(false)
</script>`
        },
        {
            titleKey: 'components.lazy.examples.observer_options.title',
            titleFallback: 'Custom observer options',
            lang: 'vue',
            code: `<template>
  <!-- Load content 200px before it reaches the viewport bottom -->
  <origam-lazy :options="{ rootMargin: '200px 0px' }" min-height="400">
    <ExpensiveList />
  </origam-lazy>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-lazy',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamLazy',
        svgDesc: 'Schematic of the Lazy component in its two states: placeholder and revealed.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="24" width="300" height="152" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="174" y="96" font-size="11" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-family="'JetBrains Mono',monospace">placeholder</text>
  <text x="174" y="112" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">(min-height applied, children not mounted)</text>
  <rect x="376" y="24" width="300" height="152" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="526" y="88" font-size="11" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">revealed</text>
  <text x="526" y="104" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">(children mounted + fade transition)</text>
  <circle cx="32" cy="32" r="10" fill="var(--origam-color__border---default, rgba(168,85,247,0.5))"/>
  <text x="32" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="384" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="384" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-lazy&gt;</code> — ① placeholder state (children unmounted, min-height reserves space for IntersectionObserver) → ② revealed state (children mounted with transition).',
        legend: [
            {
                num: 1,
                cls: '.origam-lazy (placeholder)',
                descriptionKey: 'components.lazy.anatomy.placeholder',
                descriptionFallback: 'While <code>isActive=false</code>, the root element is an empty block with the configured dimensions. The <code>v-intersect</code> directive watches it.'
            },
            {
                num: 2,
                cls: '.origam-lazy (revealed)',
                descriptionKey: 'components.lazy.anatomy.revealed',
                descriptionFallback: 'Once <code>isActive=true</code>, the default slot is rendered inside an <code>&lt;origam-transition&gt;</code> (OrigamFade by default). The element is never hidden again.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" v-intersect="intersect" :aria-busy="!isActive || undefined" class="origam-lazy">
  <!-- children rendered only when isActive=true -->
  <template v-if="isActive">
    <origam-transition :transition="transition" appear>
      <slot name="default" />
    </origam-transition>
  </template>
</component>`,
        classes: [
            {
                cls: 'origam-lazy',
                descriptionKey: 'components.lazy.anatomy.root',
                descriptionFallback: 'Root element. Carries dimension styles and the v-intersect watcher.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-lazy---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.lazy.css_vars.transition_duration',
            descriptionFallback: 'Duration of the reveal transition (OrigamFade).'
        },
        {
            name: '--origam-lazy---transition-timing-function',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.lazy.css_vars.transition_timing_function',
            descriptionFallback: 'Easing of the reveal transition.'
        },
        {
            name: '--origam-lazy---placeholder-min-height',
            defaultValue: '{space.10}',
            descriptionKey: 'components.lazy.css_vars.placeholder_min_height',
            descriptionFallback: 'Minimum height of the placeholder zone so the IntersectionObserver has something to detect.'
        },
        {
            name: '--origam-lazy---placeholder-background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.lazy.css_vars.placeholder_background_color',
            descriptionFallback: 'Background color of the placeholder zone (visible only before reveal).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.lazy.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.lazy.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.lazy.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.lazy.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.lazy.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.lazy.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.lazy.a11y.aria_busy_note',
                noteFallback: 'While the content is not yet revealed, the root element carries <code>aria-busy="true"</code>. This signals to assistive technologies that the region is still loading.'
            },
            {
                noteKey: 'components.lazy.a11y.intersection_note',
                noteFallback: 'OrigamLazy relies on IntersectionObserver. Ensure placeholder dimensions are set (min-height / height) so the browser can observe a non-zero element. A zero-size element may never intersect and the content would never mount.'
            },
            {
                noteKey: 'components.lazy.a11y.reduced_motion_note',
                noteFallback: 'The default OrigamFade transition respects prefers-reduced-motion: reduce — pass transition="null" to fully disable animation.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/lazy.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'lazy.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.lazy.tokens.transition_duration',
                descriptionFallback: 'Duration of the reveal fade-in transition.'
            },
            {
                tokenPath: 'lazy.placeholder-min-height',
                value: '{space.10}',
                type: 'dimension',
                descriptionKey: 'components.lazy.tokens.placeholder_min_height',
                descriptionFallback: 'Default minimum height for the placeholder zone.'
            },
            {
                tokenPath: 'lazy.placeholder-background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.lazy.tokens.placeholder_background_color',
                descriptionFallback: 'Background color of the empty placeholder zone.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'switch',
                labelKey: 'components.lazy.playground.model_value',
                labelFallback: 'Revealed (modelValue)',
                defaultValue: false
            },
            {
                prop: 'height',
                kind: 'text',
                labelKey: 'components.lazy.playground.height',
                labelFallback: 'Height (placeholder)',
                defaultValue: '200'
            },
            {
                prop: 'tag',
                kind: 'select',
                labelKey: 'components.lazy.playground.tag',
                labelFallback: 'Tag',
                defaultValue: 'div',
                options: [
                    { label: 'div', value: 'div' },
                    { label: 'section', value: 'section' },
                    { label: 'article', value: 'article' }
                ]
            }
        ]
    }
}
