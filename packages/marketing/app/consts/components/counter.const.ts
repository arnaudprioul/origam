/**
 * /components/counter — full documentation data for OrigamCounter.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Counter/counter.interface.ts  (props)
 *   - packages/ds/src/components/Counter/OrigamCounter.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/counter.json               (CSS tokens)
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

export const COUNTER_DOC: IComponentDoc = {
    slug: 'counter',
    name: 'Counter',
    tag: 'origam-counter',
    icon: 'mdi-counter',
    category: 'Display',
    descriptionKey: 'components.catalog.counter.description',
    descriptionFallback: 'Animated character-count badge that shows current/max values. Used internally by TextField, Textarea and similar inputs.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-counter--design',
    docUrl: 'http://localhost:4000/components/Counter/OrigamCounter',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'Text field that uses OrigamCounter to display character count.'
        },
        {
            slug: 'input',
            name: 'Input',
            kind: 'component',
            descriptionKey: 'components.catalog.input.description',
            descriptionFallback: 'Base input that hosts the counter in its details zone.'
        }
    ],

    props: [
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.active.description',
            descriptionFallback: 'Controls visibility via the slide-y transition. When false the counter collapses animated.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.counter.props.disabled.description',
            descriptionFallback: 'Reduces opacity and suppresses the error colour when the field is disabled.'
        },
        {
            name: 'max',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.max.description',
            descriptionFallback: 'Maximum character count. When value exceeds max the counter switches to the error colour.'
        },
        {
            name: 'value',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.value.description',
            descriptionFallback: 'Current character count (or the value string, length is derived if needed).'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.counter.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to div.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.color.description',
            descriptionFallback: 'Intent or custom colour for the counter text.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.counter.props.density.description',
            descriptionFallback: 'Density adjustment passed through to the root element.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.counter.props.border.description',
            descriptionFallback: 'Applies a border around the counter badge.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the counter badge.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation applied to the counter badge.'
        },
        // ── IPaddingProps ──────────────────────────────────────────────
        {
            name: 'paddingInline',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.counter.props.padding_inline.description',
            descriptionFallback: 'Inline (left/right) padding of the counter badge.'
        },
        // ── ITransitionComponentProps ──────────────────────────────────
        {
            name: 'transition',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: "'origam-slide-y-transition'",
            descriptionKey: 'components.counter.props.transition.description',
            descriptionFallback: 'Animation transition when the counter appears / disappears. Defaults to slide-y.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ counter: string, max: string | number | undefined, value: string | number | undefined }',
            descriptionKey: 'components.counter.slots.default.description',
            descriptionFallback: 'Custom counter content. By default renders the computed "value / max" or "value" string.'
        }
    ],

    examples: [
        {
            titleKey: 'components.counter.examples.basic.title',
            titleFallback: 'Character counter',
            lang: 'vue',
            code: `<template>
  <div>
    <input v-model="text" maxlength="100" />
    <origam-counter :value="text.length" :max="100" :active="true" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const text = ref('')
</script>`
        },
        {
            titleKey: 'components.counter.examples.error.title',
            titleFallback: 'Over-limit state',
            lang: 'vue',
            code: `<template>
  <!-- Counter turns red when value > max (280 for a tweet) -->
  <origam-counter :value="text.length" :max="280" :active="true" />
</template>`
        },
        {
            titleKey: 'components.counter.examples.in_field.title',
            titleFallback: 'Embedded in TextField',
            lang: 'vue',
            code: `<template>
  <!-- counter prop on TextField delegates to OrigamCounter automatically -->
  <origam-text-field
    v-model="text"
    label="Bio"
    :counter="280"
    auto-grow
  />
</template>`
        }
    ],

    previewVariants: [
        { label: '12 / 50', props: { value: 12, max: 50, active: true } },
        { label: '50 / 50', props: { value: 50, max: 50, active: true } },
        { label: '52 / 50 (error)', props: { value: 52, max: 50, active: true } },
        { label: 'no max', props: { value: 128, active: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-counter',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamCounter',
        svgDesc: 'Schematic of the Counter component with numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fdf4ff)" rx="4"/>
  <origam-transition name="origam-slide-y-transition">
    <rect x="280" y="50" width="140" height="36" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1.5"/>
  </origam-transition>
  <text x="350" y="73" font-size="13" fill="var(--origam-color__text---secondary, #666)" text-anchor="middle" font-family="'JetBrains Mono',monospace">12 / 50</text>
  <circle cx="296" cy="58" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="296" y="62.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="58" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="62.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="296" y1="46" x2="296" y2="28" stroke="var(--origam-color__border---default, rgba(124,58,237,0.4))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="180" y="26" font-size="8" fill="var(--origam-color__text---secondary, #7e5fb0)" font-style="italic" text-anchor="middle">origam-counter (root tag)</text>
  <line x1="350" y1="46" x2="350" y2="28" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="510" y="26" font-size="8" fill="var(--origam-color__text---secondary, #7e5fb0)" font-style="italic" text-anchor="middle">#default slot — renders "value / max"</text>
  <text x="350" y="140" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Wrapped in OrigamTransition (slide-y). --error modifier when value &gt; max.</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-counter&gt;</code>. A single root element (① tag) wraps the default slot (②) which renders the computed "<code>value / max</code>" string. The <code>--error</code> modifier is applied when <code>value &gt; max</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-counter',
                descriptionKey: 'components.counter.anatomy.root',
                descriptionFallback: 'Root element. Tag is controlled by the <code>tag</code> prop (default: <code>div</code>). Wrapped in <code>&lt;origam-transition&gt;</code> for animated show/hide. Modifier <code>--error</code> applied when <code>value &gt; max</code>.'
            },
            {
                num: 2,
                cls: '#default slot',
                descriptionKey: 'components.counter.anatomy.slot',
                descriptionFallback: 'Counter content. Default renderer produces "<code>value / max</code>" when max is set, or just "<code>value</code>" otherwise. Slot props: <code>{ counter, max, value }</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- Wrapped in OrigamTransition for animated show/hide -->
<origam-transition :transition="transition">
  <component
    :is="tag"
    v-show="active"
    class="origam-counter"
    :class="{ 'origam-counter--error': value > max && !disabled }"
  >
    <!-- #default slot: { counter, max, value } -->
    <slot :counter="counter" :max="max" :value="value">
      {{ counter }}
    </slot>
  </component>
</origam-transition>`,
        classes: [
            { cls: 'origam-counter', descriptionKey: 'components.counter.anatomy.root', descriptionFallback: 'Root element. Transition-wrapped, v-show controlled by active prop.' },
            { cls: 'origam-counter--error', descriptionKey: 'components.counter.anatomy.error', descriptionFallback: 'Applied when value > max and disabled is false. Switches text colour to the danger token.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-counter---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.counter.css_vars.color',
            descriptionFallback: 'Default counter text colour.'
        },
        {
            name: '--origam-counter---color-active',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.counter.css_vars.color_active',
            descriptionFallback: 'Counter text colour when the field is focused / active.'
        },
        {
            name: '--origam-counter---color-error',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.counter.css_vars.color_error',
            descriptionFallback: 'Counter text colour when value exceeds max (--error modifier).'
        },
        {
            name: '--origam-counter---font-size',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.counter.css_vars.font_size',
            descriptionFallback: 'Counter font size.'
        },
        {
            name: '--origam-counter---font-weight',
            defaultValue: '{font.weight.regular}',
            descriptionKey: 'components.counter.css_vars.font_weight',
            descriptionFallback: 'Counter font weight.'
        },
        {
            name: '--origam-counter---opacity',
            defaultValue: '{opacity.70}',
            descriptionKey: 'components.counter.css_vars.opacity',
            descriptionFallback: 'Default opacity. Set to 1 when active/focused.'
        },
        {
            name: '--origam-counter---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.counter.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for colour/opacity changes.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.counter.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.counter.exposed.css',
            descriptionFallback: 'Reactive CSS string for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.counter.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.counter.exposed.load',
            descriptionFallback: 'Injects the style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.counter.exposed.unload',
            descriptionFallback: 'Removes the style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.counter.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.counter.a11y.aria_note',
                noteFallback: 'OrigamCounter is a visual helper only. When embedded in a text field, the parent field should use aria-describedby pointing to the counter element so screen readers announce the character count.'
            },
            {
                noteKey: 'components.counter.a11y.live_note',
                noteFallback: 'For dynamic character-count announcements, add aria-live="polite" to the counter element or its parent container.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/counter.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'counter.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.counter.tokens.color',
                descriptionFallback: 'Default text colour.'
            },
            {
                tokenPath: 'counter.color-active',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.counter.tokens.color_active',
                descriptionFallback: 'Text colour when field is active/focused.'
            },
            {
                tokenPath: 'counter.color-error',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.counter.tokens.color_error',
                descriptionFallback: 'Text colour when value exceeds max.'
            },
            {
                tokenPath: 'counter.font-size',
                value: '{font.size.xs}',
                type: 'dimension',
                descriptionKey: 'components.counter.tokens.font_size',
                descriptionFallback: 'Counter font size.'
            },
            {
                tokenPath: 'counter.opacity',
                value: '{opacity.70}',
                type: 'number',
                descriptionKey: 'components.counter.tokens.opacity',
                descriptionFallback: 'Default counter opacity.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'value',
                kind: 'number',
                labelKey: 'components.counter.playground.value',
                labelFallback: 'Value',
                defaultValue: 12
            },
            {
                prop: 'max',
                kind: 'number',
                labelKey: 'components.counter.playground.max',
                labelFallback: 'Max',
                defaultValue: 50
            },
            {
                prop: 'active',
                kind: 'switch',
                labelKey: 'components.counter.playground.active',
                labelFallback: 'Active (visible)',
                defaultValue: true
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.counter.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.counter.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
