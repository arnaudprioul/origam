/**
 * /components/badge — full documentation data for OrigamBadge.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Badge/badge.interface.ts  (props)
 *   - packages/ds/src/components/Badge/OrigamBadge.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/badge.json              (CSS tokens)
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

export const BADGE_DOC: IComponentDoc = {
    slug: 'badge',
    name: 'Badge',
    tag: 'origam-badge',
    icon: 'mdi-shield-star-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.badge.description',
    descriptionFallback: 'Overlay badge for notification counts, status dots and labels, anchored to a wrapped element.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-badge--design',
    docUrl: 'http://localhost:4000/components/Badge/OrigamBadge',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'content',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.content.description',
            descriptionFallback: 'Text or number displayed inside the badge. Use max to cap large numbers.'
        },
        {
            name: 'dot',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.badge.props.dot.description',
            descriptionFallback: 'Renders as a small dot without content — useful for status indicators.'
        },
        {
            name: 'floating',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.badge.props.floating.description',
            descriptionFallback: 'Floats the badge at the corner of the wrapped element with reduced offset.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.badge.props.inline.description',
            descriptionFallback: 'Renders the badge inline instead of as a positioned overlay.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.badge'",
            descriptionKey: 'components.badge.props.label.description',
            descriptionFallback: 'Accessible aria-label for the badge element.'
        },
        {
            name: 'max',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.max.description',
            descriptionFallback: 'Maximum value to display. When content exceeds max, renders "max+" instead.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.badge.props.model_value.description',
            descriptionFallback: 'Controls the badge visibility. Use v-model to bind two-way.'
        },
        {
            name: 'offsetX',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.offset_x.description',
            descriptionFallback: 'Horizontal offset from the anchor corner (CSS length or number in px).'
        },
        {
            name: 'offsetY',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.offset_y.description',
            descriptionFallback: 'Vertical offset from the anchor corner (CSS length or number in px).'
        },
        // ── IColorProps / IBgColorProps ─────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.color.description',
            descriptionFallback: 'Intent or custom foreground color applied to the badge.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.bg_color.description',
            descriptionFallback: 'Badge background color.'
        },
        // ── ILocationProps ──────────────────────────────────────────────
        {
            name: 'location',
            type: { label: "'top' | 'bottom' | 'start' | 'end' | 'top start' | 'top end' | 'bottom start' | 'bottom end'", slug: '', kind: 'primitive' },
            defaultValue: "'top end'",
            descriptionKey: 'components.badge.props.location.description',
            descriptionFallback: 'Corner of the host element where the badge is anchored.'
        },
        // ── IRoundedProps ───────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.rounded.description',
            descriptionFallback: 'Border-radius token for the badge pill. Default is {radius.full}.'
        },
        // ── IBorderProps ────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.badge.props.border.description',
            descriptionFallback: 'Applies a 2px border ring around the badge (useful for contrast against the background).'
        },
        // ── IElevationProps ─────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.badge.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token for the badge.'
        },
        // ── IStatusProps ────────────────────────────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.badge.props.disabled.description',
            descriptionFallback: 'Hides the badge overlay when true.'
        },
        // ── ITagProps ───────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.badge.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root wrapper.'
        },
        // ── ITransitionComponentProps ───────────────────────────────────
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: 'OrigamFade',
            descriptionKey: 'components.badge.props.transition.description',
            descriptionFallback: 'Transition applied when the badge appears/disappears. Defaults to fade.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.badge.slots.default.description',
            descriptionFallback: 'The element the badge is anchored to. Wrapped in a relative-positioned container.'
        },
        {
            slot: 'badge',
            slotProps: '—',
            descriptionKey: 'components.badge.slots.badge.description',
            descriptionFallback: 'Custom content rendered inside the badge pill, replacing the content prop.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.badge.slots.prepend.description',
            descriptionFallback: 'Icon or content before the badge text.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.badge.slots.append.description',
            descriptionFallback: 'Icon or content after the badge text.'
        }
    ],

    examples: [
        {
            titleKey: 'components.badge.examples.counts.title',
            titleFallback: 'Count badges',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1.5rem; align-items: center;">
    <origam-badge content="3" color="danger">
      <origam-btn icon="mdi-bell" aria-label="Notifications" />
    </origam-badge>
    <origam-badge content="99" max="99" color="primary">
      <origam-btn icon="mdi-email" aria-label="Messages" />
    </origam-badge>
    <origam-badge dot color="success">
      <origam-avatar icon="mdi-account" />
    </origam-badge>
  </div>
</template>`
        },
        {
            titleKey: 'components.badge.examples.locations.title',
            titleFallback: 'Locations',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 2rem; align-items: center;">
    <origam-badge content="1" location="top end" color="primary">
      <origam-btn icon="mdi-bell" />
    </origam-badge>
    <origam-badge content="2" location="top start" color="success">
      <origam-btn icon="mdi-email" />
    </origam-badge>
    <origam-badge content="3" location="bottom end" color="warning">
      <origam-btn icon="mdi-account" />
    </origam-badge>
  </div>
</template>`
        },
        {
            titleKey: 'components.badge.examples.inline.title',
            titleFallback: 'Inline badge',
            lang: 'vue',
            code: `<template>
  <p>
    You have
    <origam-badge inline content="5" color="primary" />
    unread messages.
  </p>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'count',
            props: { content: 3, color: 'danger', modelValue: true },
            slotContent: 'btn'
        },
        {
            label: 'dot',
            props: { dot: true, color: 'success', modelValue: true },
            slotContent: 'avatar'
        },
        {
            label: 'max',
            props: { content: 150, max: 99, color: 'primary', modelValue: true },
            slotContent: 'btn'
        },
        {
            label: 'floating',
            props: { content: 1, color: 'warning', floating: true, modelValue: true },
            slotContent: 'btn'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-badge',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamBadge',
        svgDesc: 'Schematic of the Badge component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="200" y="50" width="300" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="200" y="50" width="300" height="120" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.5"/>
  <rect x="230" y="80" width="240" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="350" y="115" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot (anchor element)</text>
  <circle cx="475" cy="55" r="20" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="475" y="60" font-size="11" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">42</text>
  <circle cx="208" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="208" y="62.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="238" cy="88" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="238" y="92" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="463" cy="43" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="463" y="47" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="350" y1="173" x2="350" y2="190" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="350" y="205" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Badge pill uses OrigamTransition (fade by default) for show/hide</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-badge&gt;</code> — 3 parts: root ①, relative wrapper ②, and the absolute-positioned badge pill ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-badge',
                descriptionKey: 'components.badge.anatomy.root',
                descriptionFallback: 'Root element (<code>display: inline-flex</code>). Receives the <code>tag</code> prop (default <code>&lt;div&gt;</code>). Modifiers: <code>--dot</code>, <code>--floating</code>, <code>--inline</code>.'
            },
            {
                num: 2,
                cls: '.origam-badge__wrapper',
                descriptionKey: 'components.badge.anatomy.wrapper',
                descriptionFallback: 'Relative-positioned container that anchors the badge pill. Contains the <code>#default</code> slot (the host element).'
            },
            {
                num: 3,
                cls: '.origam-badge__badge',
                descriptionKey: 'components.badge.anatomy.badge',
                descriptionFallback: 'The visible badge pill (<code>position: absolute</code>). Location computed by <code>useLocation</code>. Content capped at <code>max</code>. Wrapped in <code>OrigamTransition</code> for show/hide animation. Has <code>role="status"</code>, <code>aria-live="polite"</code>, <code>aria-atomic="true"</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-badge">
  <div class="origam-badge__wrapper">
    <!-- anchor element -->
    <slot name="default" />

    <!-- badge pill with show/hide transition -->
    <origam-transition>
      <span
        class="origam-badge__badge"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        :aria-label="label"
      >
        <!-- icon or count content -->
        <span class="origam-badge__content">{{ content }}</span>
      </span>
    </origam-transition>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-badge',
                descriptionKey: 'components.badge.anatomy.root',
                descriptionFallback: 'Root inline-flex container.'
            },
            {
                cls: 'origam-badge__wrapper',
                descriptionKey: 'components.badge.anatomy.wrapper',
                descriptionFallback: 'Relative-positioned wrapper anchoring the badge.'
            },
            {
                cls: 'origam-badge__badge',
                descriptionKey: 'components.badge.anatomy.badge',
                descriptionFallback: 'The visible badge pill (absolute positioned, role="status").'
            },
            {
                cls: 'origam-badge__content',
                descriptionKey: 'components.badge.anatomy.content',
                descriptionFallback: 'Text content span inside the badge pill.'
            },
            {
                cls: 'origam-badge__prepend',
                descriptionKey: 'components.badge.anatomy.prepend',
                descriptionFallback: 'Leading icon inside the badge pill.'
            },
            {
                cls: 'origam-badge__append',
                descriptionKey: 'components.badge.anatomy.append',
                descriptionFallback: 'Trailing icon inside the badge pill.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-badge__badge---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.badge.css_vars.background_color',
            descriptionFallback: 'Badge pill background. Overridden by color/bgColor prop and status.'
        },
        {
            name: '--origam-badge__badge---color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.badge.css_vars.color',
            descriptionFallback: 'Badge pill foreground color.'
        },
        {
            name: '--origam-badge__badge---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.badge.css_vars.border_radius',
            descriptionFallback: 'Pill border radius. Default is full circle; overridden by rounded prop.'
        },
        {
            name: '--origam-badge__badge---height',
            defaultValue: '1.25rem',
            descriptionKey: 'components.badge.css_vars.height',
            descriptionFallback: 'Badge pill height. Fixed at 20px (1.25rem). Shrinks to 9px in dot mode.'
        },
        {
            name: '--origam-badge__badge---min-width',
            defaultValue: '20px',
            descriptionKey: 'components.badge.css_vars.min_width',
            descriptionFallback: 'Minimum badge width for circular single-digit display.'
        },
        {
            name: '--origam-badge__badge---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.badge.css_vars.font_size',
            descriptionFallback: 'Badge content font size.'
        },
        {
            name: '--origam-badge__badge---font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.badge.css_vars.font_weight',
            descriptionFallback: 'Badge content font weight.'
        },
        {
            name: '--origam-badge__badge---transition-duration',
            defaultValue: '225ms',
            descriptionKey: 'components.badge.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for badge position/opacity animations.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.badge.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.badge.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed badgeContentStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.badge.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.badge.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.badge.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.badge.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['status'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.badge.a11y.role_note',
                noteFallback: 'The badge pill has role="status" with aria-live="polite" and aria-atomic="true". Screen readers announce badge content changes (e.g. new count).'
            },
            {
                noteKey: 'components.badge.a11y.label_note',
                noteFallback: 'The label prop (or the translated "origam.badge" key) is used as aria-label to describe the badge to screen readers. Pass a meaningful value like "5 unread notifications".'
            },
            {
                noteKey: 'components.badge.a11y.dot_note',
                noteFallback: 'In dot mode, the content is visually hidden (text-indent: -9999px) but the aria-label still conveys the status to screen readers.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/badge.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'badge.badge.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.badge.tokens.background_color',
                descriptionFallback: 'Default badge pill background.'
            },
            {
                tokenPath: 'badge.badge.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.badge.tokens.border_radius',
                descriptionFallback: 'Full-circle border radius by default.'
            },
            {
                tokenPath: 'badge.badge.height',
                value: '1.25rem',
                type: 'dimension',
                descriptionKey: 'components.badge.tokens.height',
                descriptionFallback: 'Badge pill height (20px).'
            },
            {
                tokenPath: 'badge.badge.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.badge.tokens.font_size',
                descriptionFallback: 'Badge content font size.'
            },
            {
                tokenPath: 'badge.danger.background-color',
                value: '{color.feedback.danger.bg}',
                type: 'color',
                descriptionKey: 'components.badge.tokens.danger_bg',
                descriptionFallback: 'Background for error/danger status badges.'
            },
            {
                tokenPath: 'badge.badge.transition-duration',
                value: '225ms',
                type: 'duration',
                descriptionKey: 'components.badge.tokens.transition_duration',
                descriptionFallback: 'Badge position/opacity transition duration.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'content',
                kind: 'number',
                labelKey: 'components.badge.playground.content',
                labelFallback: 'Content',
                defaultValue: 5
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.badge.playground.color',
                labelFallback: 'Color',
                defaultValue: 'danger',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'danger', value: 'danger' },
                    { label: 'success', value: 'success' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'location',
                kind: 'select',
                labelKey: 'components.badge.playground.location',
                labelFallback: 'Location',
                defaultValue: 'top end',
                options: [
                    { label: 'top end', value: 'top end' },
                    { label: 'top start', value: 'top start' },
                    { label: 'bottom end', value: 'bottom end' },
                    { label: 'bottom start', value: 'bottom start' }
                ]
            },
            {
                prop: 'dot',
                kind: 'switch',
                labelKey: 'components.badge.playground.dot',
                labelFallback: 'Dot mode',
                defaultValue: false
            },
            {
                prop: 'floating',
                kind: 'switch',
                labelKey: 'components.badge.playground.floating',
                labelFallback: 'Floating',
                defaultValue: false
            },
            {
                prop: 'max',
                kind: 'number',
                labelKey: 'components.badge.playground.max',
                labelFallback: 'Max',
                defaultValue: 99
            }
        ]
    } satisfies IComponentPlayground
}
