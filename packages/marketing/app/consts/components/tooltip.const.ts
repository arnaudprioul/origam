/**
 * /components/tooltip — full documentation data for OrigamTooltip.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Tooltip/tooltip.interface.ts  (props)
 *   - packages/ds/src/components/Tooltip/OrigamTooltip.vue     (template BEM, defineExpose, slots)
 *   - packages/ds/tokens/component/tooltip.json                (CSS tokens)
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

export const TOOLTIP_DOC: IComponentDoc = {
    slug: 'tooltip',
    name: 'Tooltip',
    tag: 'origam-tooltip',
    icon: 'mdi-tooltip-text',
    category: 'Overlay',
    descriptionKey: 'components.catalog.tooltip.description',
    descriptionFallback: 'Contextual floating label anchored to an activator element. Appears on hover/focus, auto-positioned via location strategy.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-tooltip--design',
    docUrl: 'http://localhost:4000/components/Tooltip/OrigamTooltip',

    family: [],

    related: [
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.related.overlay.description',
            descriptionFallback: 'Tooltip is built on top of OrigamOverlay and inherits all overlay positioning logic.'
        },
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.related.menu.description',
            descriptionFallback: 'Menu is the interactive variant of the same overlay pattern.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.id.description',
            descriptionFallback: 'HTML id applied to the tooltip content element. Auto-generated when omitted.'
        },
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.text.description',
            descriptionFallback: 'Tooltip label text. Can also be set via the #default slot.'
        },
        // ── IOverlayProps ────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.model_value.description',
            descriptionFallback: 'v-model for the open state. Controlled mode when provided.'
        },
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tooltip.props.eager.description',
            descriptionFallback: 'When true, the content is rendered in the DOM even before first open (disables lazy mounting).'
        },
        // ── IActivatorProps ──────────────────────────────────────────
        {
            name: 'activator',
            type: { label: 'string | Element | ComponentPublicInstance', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.activator.description',
            descriptionFallback: 'Reference to the activator element. Use the #activator slot instead for most cases.'
        },
        {
            name: 'activatorProps',
            type: { label: 'Record<string, any>', slug: '', kind: 'primitive' },
            defaultValue: '{}',
            descriptionKey: 'components.tooltip.props.activator_props.description',
            descriptionFallback: 'Props merged onto the activator element via the slot binder.'
        },
        // ── ILocationStrategyProps ────────────────────────────────────
        {
            name: 'location',
            type: { label: 'TLocation', slug: 'location', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.tooltip.props.location.description',
            descriptionFallback: 'Preferred position relative to the activator: top, bottom, start, end, and 2D variants (top start, bottom end, …).'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.origin.description',
            descriptionFallback: 'Transform origin for the entry/exit transition. Defaults to the anchor point.'
        },
        {
            name: 'offset',
            type: { label: 'string | number | number[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.offset.description',
            descriptionFallback: 'Distance in pixels between the tooltip and the activator edge.'
        },
        // ── IScrollStrategyProps ──────────────────────────────────────
        {
            name: 'scrollStrategy',
            type: { label: 'TScrollStrategy', slug: 'scroll-strategy', kind: 'type' },
            defaultValue: "'reposition'",
            descriptionKey: 'components.tooltip.props.scroll_strategy.description',
            descriptionFallback: 'Behavior when the container scrolls: reposition (follow activator) or close.'
        },
        // ── ITransitionComponentProps ─────────────────────────────────
        {
            name: 'transition',
            type: { label: 'boolean | string | TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.transition.description',
            descriptionFallback: 'Enter/leave transition. Defaults to origam-translate-scale.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.color.description',
            descriptionFallback: 'Foreground color of the tooltip text.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tooltip.props.bg_color.description',
            descriptionFallback: 'Background color override. Defaults to neutral.800 (dark inverse surface).'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: "'300px'",
            descriptionKey: 'components.tooltip.props.max_width.description',
            descriptionFallback: 'Maximum tooltip width before content wraps.'
        },
        // ── ILazyProps ─────────────────────────────────────────────────
        {
            name: 'lazy',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.tooltip.props.lazy.description',
            descriptionFallback: 'Defers rendering the content until the first open. Enabled by default for performance.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.tooltip.emits.update_model_value.description',
            descriptionFallback: 'Fired when the open state changes.'
        }
    ],

    slots: [
        {
            slot: 'activator',
            slotProps: '{ props }',
            descriptionKey: 'components.tooltip.slots.activator.description',
            descriptionFallback: 'The element that triggers the tooltip. Receives `props` to forward (aria-describedby, onMouseenter, onFocus, …) via v-bind.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.tooltip.slots.default.description',
            descriptionFallback: 'Tooltip content. Falls back to rendering the text prop as a plain span.'
        }
    ],

    examples: [
        {
            titleKey: 'components.tooltip.examples.basic.title',
            titleFallback: 'Basic tooltip',
            lang: 'vue',
            code: `<template>
  <origam-tooltip text="Save document">
    <template #activator="{ props }">
      <origam-btn v-bind="props" icon="mdi-content-save" aria-label="Save" />
    </template>
  </origam-tooltip>
</template>`
        },
        {
            titleKey: 'components.tooltip.examples.location.title',
            titleFallback: 'Locations',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <origam-tooltip v-for="loc in ['top','bottom','start','end']" :key="loc" :location="loc" :text="loc">
      <template #activator="{ props }">
        <origam-btn v-bind="props" :text="loc" />
      </template>
    </origam-tooltip>
  </div>
</template>`
        },
        {
            titleKey: 'components.tooltip.examples.colored.title',
            titleFallback: 'Colored tooltip',
            lang: 'vue',
            code: `<template>
  <origam-tooltip bg-color="primary" text="Primary hint">
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Hover me" color="primary" />
    </template>
  </origam-tooltip>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-tooltip',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamTooltip',
        svgDesc: 'Schematic of the Tooltip overlay with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="250" y="130" width="200" height="40" rx="6" fill="var(--origam-color__neutral---800, #1f1333)"/>
  <text x="350" y="154" font-size="11" fill="var(--origam-color__text---inverse, #fff)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Tooltip text</text>
  <polygon points="350,118 340,130 360,130" fill="var(--origam-color__neutral---800, #1f1333)"/>
  <rect x="300" y="60" width="100" height="40" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="84" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">activator</text>
  <circle cx="258" cy="138" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="258" y="142" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="138" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="142" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="68" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-tooltip&gt;</code> — overlay wraps a content div ① with the text ②; the activator ③ (any element) triggers visibility.`,
        legend: [
            {
                num: 1,
                cls: '.origam-tooltip',
                descriptionKey: 'components.tooltip.anatomy.root',
                descriptionFallback: 'Root overlay element — transparent, zero-size. Wraps OrigamOverlay; positions via location strategy. role="tooltip" set explicitly.'
            },
            {
                num: 2,
                cls: '.origam-tooltip__content',
                descriptionKey: 'components.tooltip.anatomy.content',
                descriptionFallback: 'Visible content surface. Background: neutral.800 (dark inverse). Contains the text or #default slot.'
            },
            {
                num: 3,
                cls: '[activator]',
                descriptionKey: 'components.tooltip.anatomy.activator',
                descriptionFallback: 'External activator element projected via #activator slot. Receives aria-describedby pointing to the tooltip id.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-overlay role="tooltip" :id="id" class="origam-tooltip" …>
  <template #activator="{ props }">
    <slot name="activator" v-bind="{ props }" />
  </template>
  <template #default>
    <!-- visible surface -->
    <div class="origam-tooltip__content">
      <slot name="default">
        <span>{{ text }}</span>
      </slot>
    </div>
  </template>
</origam-overlay>`,
        classes: [
            { cls: 'origam-tooltip', descriptionKey: 'components.tooltip.anatomy.root', descriptionFallback: 'Root overlay element.' },
            { cls: 'origam-tooltip__content', descriptionKey: 'components.tooltip.anatomy.content', descriptionFallback: 'Visible floating pill with dark background.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-tooltip---background-color',
            defaultValue: '{color.neutral.800}',
            descriptionKey: 'components.tooltip.css_vars.background_color',
            descriptionFallback: 'Tooltip background. Dark inverse surface for contrast in both themes.'
        },
        {
            name: '--origam-tooltip---color',
            defaultValue: '{color.text.inverse}',
            descriptionKey: 'components.tooltip.css_vars.color',
            descriptionFallback: 'Tooltip text color.'
        },
        {
            name: '--origam-tooltip---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.tooltip.css_vars.font_size',
            descriptionFallback: 'Font size of the tooltip label.'
        },
        {
            name: '--origam-tooltip---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.tooltip.css_vars.border_radius',
            descriptionFallback: 'Corner radius of the tooltip pill.'
        },
        {
            name: '--origam-tooltip---max-width',
            defaultValue: '300px',
            descriptionKey: 'components.tooltip.css_vars.max_width',
            descriptionFallback: 'Maximum width before tooltip text wraps.'
        },
        {
            name: '--origam-tooltip---z-index',
            defaultValue: '{zIndex.tooltip}',
            descriptionKey: 'components.tooltip.css_vars.z_index',
            descriptionFallback: 'Z-index of the tooltip overlay.'
        },
        {
            name: '--origam-tooltip---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.tooltip.css_vars.transition_duration',
            descriptionFallback: 'Enter/leave transition duration.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.tooltip.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to OrigamOverlay.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.tooltip.exposed.css',
            descriptionFallback: 'Reactive CSS string for computed tooltip styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.tooltip.exposed.id',
            descriptionFallback: 'Unique ID for this tooltip instance (referenced by aria-describedby on the activator).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.tooltip.exposed.load',
            descriptionFallback: 'Injects the computed style sheet.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.tooltip.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.tooltip.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.tooltip.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID scoping injected CSS rules.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['tooltip'],
        keyboard: [
            {
                key: 'Tab / Shift+Tab',
                actionKey: 'components.tooltip.a11y.key_focus',
                actionFallback: 'Focusing the activator opens the tooltip. Blurring closes it.'
            },
            {
                key: 'Escape',
                actionKey: 'components.tooltip.a11y.key_escape',
                actionFallback: 'Closes the tooltip if it was opened via keyboard focus.'
            }
        ],
        notes: [
            {
                noteKey: 'components.tooltip.a11y.aria_describedby',
                noteFallback: 'The activator element receives aria-describedby pointing to the tooltip id so screen readers announce the tooltip text.'
            },
            {
                noteKey: 'components.tooltip.a11y.role',
                noteFallback: 'role="tooltip" is applied directly on the OrigamOverlay element (not just the content div) so the association is unambiguous.'
            },
            {
                noteKey: 'components.tooltip.a11y.reduced_motion',
                noteFallback: 'Transitions are disabled under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/tooltip.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'tooltip.background-color',
                value: '{color.neutral.800}',
                type: 'color',
                descriptionKey: 'components.tooltip.tokens.background_color',
                descriptionFallback: 'Dark inverse background for contrast in both themes.'
            },
            {
                tokenPath: 'tooltip.color',
                value: '{color.text.inverse}',
                type: 'color',
                descriptionKey: 'components.tooltip.tokens.color',
                descriptionFallback: 'Inverse text color (white on dark surface).'
            },
            {
                tokenPath: 'tooltip.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.tooltip.tokens.border_radius',
                descriptionFallback: 'Corner radius.'
            },
            {
                tokenPath: 'tooltip.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.tooltip.tokens.transition_duration',
                descriptionFallback: 'Enter/leave transition duration.'
            },
            {
                tokenPath: 'tooltip.z-index',
                value: '{zIndex.tooltip}',
                type: 'number',
                descriptionKey: 'components.tooltip.tokens.z_index',
                descriptionFallback: 'Z-index layer.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.tooltip.playground.text',
                labelFallback: 'Text',
                defaultValue: 'This is a tooltip'
            },
            {
                prop: 'location',
                kind: 'select',
                labelKey: 'components.tooltip.playground.location',
                labelFallback: 'Location',
                defaultValue: 'top',
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'bottom', value: 'bottom' },
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' },
                    { label: 'top start', value: 'top start' },
                    { label: 'top end', value: 'top end' },
                    { label: 'bottom start', value: 'bottom start' },
                    { label: 'bottom end', value: 'bottom end' }
                ]
            },
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.tooltip.playground.bg_color',
                labelFallback: 'Background',
                defaultValue: '',
                options: [
                    { label: '(inverse dark)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
