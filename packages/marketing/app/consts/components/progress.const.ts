/**
 * /components/progress — full documentation data for OrigamProgress family.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Progress/progress.interface.ts          (props)
 *   - packages/ds/src/interfaces/Progress/progress-linear.interface.ts   (linear props)
 *   - packages/ds/src/interfaces/Progress/progress-circular.interface.ts (circular props)
 *   - packages/ds/src/components/Progress/OrigamProgress.vue             (dispatcher)
 *   - packages/ds/src/components/Progress/OrigamProgressLinear.vue       (BEM template)
 *   - packages/ds/src/components/Progress/OrigamProgressCircular.vue     (BEM template)
 *   - packages/ds/tokens/component/progress.json                         (shared tokens)
 *   - packages/ds/tokens/component/progress-linear.json                  (linear tokens)
 *   - packages/ds/tokens/component/progress-circular.json                (circular tokens)
 *
 * FAMILY:
 *   OrigamProgress — router / dispatcher that delegates to Linear or Circular based on type prop.
 *   OrigamProgressLinear — determinate, indeterminate, buffered, striped, clickable, stream.
 *   OrigamProgressCircular — determinate, indeterminate, rotate, size.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const PROGRESS_DOC: IComponentDoc = {
    slug: 'progress',
    name: 'Progress',
    tag: 'origam-progress',
    icon: 'mdi-progress-clock',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.progress.description',
    descriptionFallback: 'Progress indicator family: linear bar (determinate, indeterminate, buffered, stream, striped, clickable) and circular spinner (determinate, indeterminate, rotate). Dispatched via the type prop.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-progress--design',
    docUrl: 'http://localhost:4000/components/Progress/OrigamProgress',

    family: [
        {
            slug: 'progress-linear',
            name: 'ProgressLinear',
            descriptionKey: 'components.catalog.progress_linear.description',
            descriptionFallback: 'Horizontal progress bar. Supports determinate, indeterminate, buffer, stream and striped modes. Emits click when clickable=true.'
        },
        {
            slug: 'progress-circular',
            name: 'ProgressCircular',
            descriptionKey: 'components.catalog.progress_circular.description',
            descriptionFallback: 'Circular SVG spinner. Supports determinate and indeterminate modes, rotate offset, and size tokens.'
        }
    ],

    related: [
        {
            slug: 'skeleton',
            name: 'Skeleton',
            kind: 'component',
            descriptionKey: 'components.catalog.skeleton.description',
            descriptionFallback: 'Skeleton placeholder for content loading states.'
        }
    ],

    props: [
        // ── OrigamProgress dispatcher ──────────────────────────────────────
        {
            name: 'type',
            type: { label: 'TProgressType', slug: '', kind: 'primitive' },
            defaultValue: "'linear'",
            descriptionKey: 'components.progress.props.type.description',
            descriptionFallback: 'Determines which sub-component to render: "linear" → OrigamProgressLinear, "circular" → OrigamProgressCircular.'
        },
        // ── IProgressTypeProps (shared) ───────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.progress.props.model_value.description',
            descriptionFallback: 'Current progress value (0 to max). Used in determinate mode. Ignored when indeterminate=true.'
        },
        {
            name: 'max',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.progress.props.max.description',
            descriptionFallback: 'Maximum value. Normalized value = modelValue / max * 100.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.indeterminate.description',
            descriptionFallback: 'Animates continuously without a determinate value. Sets aria-valuenow to undefined.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.progress.props.active.description',
            descriptionFallback: 'Controls visibility. When false, the progress bar is hidden (aria-hidden="true").'
        },
        {
            name: 'absolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.absolute.description',
            descriptionFallback: 'Positions the progress bar absolutely relative to its nearest positioned ancestor.'
        },
        {
            name: 'striped',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.striped.description',
            descriptionFallback: 'Adds animated diagonal stripes to the progress bar (linear only).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the progress fill and spinner stroke.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Loading'",
            descriptionKey: 'components.progress.props.label.description',
            descriptionFallback: 'Accessible label (aria-label) on the progress bar. Pass a translated string.'
        },
        {
            name: 'thickness',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress.props.thickness.description',
            descriptionFallback: 'Thickness of the linear bar (height) or circular stroke width.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.progress.props.tag.description',
            descriptionFallback: 'Root HTML tag.'
        },
        // ── IProgressLinearProps ──────────────────────────────────────────
        {
            name: 'bufferValue',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress.props.buffer_value.description',
            descriptionFallback: 'Linear only. Buffer value (e.g. media buffered percentage). Renders a secondary track from 0 to bufferValue.'
        },
        {
            name: 'clickable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.clickable.description',
            descriptionFallback: 'Linear only. Makes the bar interactive — click sets modelValue to the clicked position. Used internally by OrigamMediaController.'
        },
        {
            name: 'reverse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.reverse.description',
            descriptionFallback: 'Linear only. Reverses the bar direction (fills right to left).'
        },
        {
            name: 'stream',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress.props.stream.description',
            descriptionFallback: 'Linear only. Adds a streaming dots animation ahead of the progress bar (live media pattern).'
        },
        {
            name: 'location',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'top'",
            descriptionKey: 'components.progress.props.location.description',
            descriptionFallback: 'Linear only. Absolute position on the screen when absolute=true: top | bottom.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress.props.rounded.description',
            descriptionFallback: 'Linear only. Border-radius of the bar ends. true → {radius.full}.'
        },
        // ── IProgressCircularProps ────────────────────────────────────────
        {
            name: 'rotate',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.progress.props.rotate.description',
            descriptionFallback: 'Circular only. Rotation offset of the SVG circle start point in degrees.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.progress.props.size.description',
            descriptionFallback: 'Circular only. Overall size of the spinner. Accepts size tokens (xs → xl) or a px number.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.progress.emits.update_model_value.description',
            descriptionFallback: 'Linear only, clickable=true. Fired when the user clicks the bar — payload is the new value (0 to max).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ value: number, buffer?: number }',
            descriptionKey: 'components.progress.slots.default.description',
            descriptionFallback: 'Content rendered inside the progress indicator. Circular: inside the ring. Linear: overlaid on the bar. Receives normalized value (0-100) and optional buffer.'
        }
    ],

    examples: [
        {
            titleKey: 'components.progress.examples.linear.title',
            titleFallback: 'Linear determinate',
            lang: 'vue',
            code: `<template>
  <origam-progress v-model="progress" color="primary" />
  <origam-progress v-model="progress" color="success" rounded />
  <origam-progress :model-value="60" color="danger" striped />
</template>`
        },
        {
            titleKey: 'components.progress.examples.indeterminate.title',
            titleFallback: 'Indeterminate',
            lang: 'vue',
            code: `<template>
  <origam-progress indeterminate color="primary" />
  <origam-progress type="circular" indeterminate color="primary" />
</template>`
        },
        {
            titleKey: 'components.progress.examples.circular.title',
            titleFallback: 'Circular with value slot',
            lang: 'vue',
            code: `<template>
  <origam-progress
    type="circular"
    :model-value="72"
    color="primary"
    size="large"
  >
    <template #default="{ value }">
      <span>{{ value }}%</span>
    </template>
  </origam-progress>
</template>`
        }
    ],

    previewVariants: [
        { label: 'linear default', props: { modelValue: 60, color: 'primary' } },
        { label: 'linear indeterminate', props: { indeterminate: true, color: 'primary' } },
        { label: 'linear striped', props: { modelValue: 45, color: 'success', striped: true } },
        { label: 'circular', props: { type: 'circular', modelValue: 75, color: 'primary' } },
        { label: 'circular indeterminate', props: { type: 'circular', indeterminate: true, color: 'danger' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-progress-linear',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamProgress',
        svgDesc: 'Schematic of the ProgressLinear and ProgressCircular components with numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <text x="30" y="30" font-size="10" fill="var(--origam-color__text---secondary, #7c3aed)" font-weight="600" font-family="'JetBrains Mono',monospace">ProgressLinear</text>
  <rect x="30" y="40" width="620" height="24" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))"/>
  <rect x="30" y="40" width="372" height="24" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.85"/>
  <rect x="620" y="36" width="80" height="32" rx="2" fill="transparent"/>
  <text x="660" y="56" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <rect x="30" y="72" width="620" height="8" rx="4" fill="var(--origam-color__surface---disabled, rgba(124,58,237,0.12))"/>
  <rect x="30" y="72" width="248" height="8" rx="4" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.5))"/>
  <text x="360" y="90" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">buffer track</text>
  <text x="30" y="115" font-size="10" fill="var(--origam-color__text---secondary, #7c3aed)" font-weight="600" font-family="'JetBrains Mono',monospace">ProgressCircular</text>
  <circle cx="120" cy="175" r="50" fill="transparent" stroke="var(--origam-color__surface---disabled, rgba(124,58,237,0.15))" stroke-width="8"/>
  <circle cx="120" cy="175" r="50" fill="transparent" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="8" stroke-dasharray="314" stroke-dashoffset="80" transform="rotate(-90 120 175)"/>
  <text x="120" y="180" font-size="10" fill="var(--origam-color__text---primary, #111)" text-anchor="middle" font-family="'JetBrains Mono',monospace">75%</text>
  <circle cx="290" cy="175" r="50" fill="transparent" stroke="var(--origam-color__surface---disabled, rgba(124,58,237,0.15))" stroke-width="8"/>
  <circle cx="290" cy="175" r="50" fill="transparent" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="8" stroke-dasharray="314" stroke-dashoffset="0" opacity="0.5" transform="rotate(-90 290 175)"/>
  <text x="290" y="180" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">indeterminate</text>
  <circle cx="26" cy="44" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="48" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="26" cy="76" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="26" y="80" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="66" cy="175" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="66" y="179" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="66" cy="145" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="66" y="149" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="120" cy="124" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="120" y="128" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-progress&gt;</code> — Linear: fill bar (①) + buffer track (②). Circular: SVG underlay ring (③) + overlay arc (④) + content slot (⑤).',
        legend: [
            {
                num: 1,
                cls: '.origam-progress__bar',
                descriptionKey: 'components.progress.anatomy.bar',
                descriptionFallback: 'Linear: foreground fill bar. Width = normalized value %. In indeterminate mode, two bars (--long and --short) animate in loop.'
            },
            {
                num: 2,
                cls: '.origam-progress__stream / background track',
                descriptionKey: 'components.progress.anatomy.background',
                descriptionFallback: 'Linear: background track (opacity 50% of fill color) and optional stream dots. Buffer renders a secondary transparent track at bufferValue.'
            },
            {
                num: 3,
                cls: 'SVG underlay circle',
                descriptionKey: 'components.progress.anatomy.circular_underlay',
                descriptionFallback: 'Circular: background ring (stroke = {color.surface.disabled}, opacity 50%). Always visible.'
            },
            {
                num: 4,
                cls: 'SVG overlay circle',
                descriptionKey: 'components.progress.anatomy.circular_overlay',
                descriptionFallback: 'Circular: foreground arc. stroke-dashoffset driven by normalized value. Animated by CSS in indeterminate mode.'
            },
            {
                num: 5,
                cls: '.origam-progress__content',
                descriptionKey: 'components.progress.anatomy.content',
                descriptionFallback: 'Shared content zone. Circular: absolutely centered inside the ring. Linear: overlaid on the bar. Visible only when #default slot has content.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- Linear -->
<div class="origam-progress-linear" role="progressbar" :aria-valuenow="value">
  <div class="origam-progress__stream"/>
  <div class="origam-progress__background-track"/>
  <div class="origam-progress__bar"/>            <!-- determinate -->
  <div class="origam-progress__bar--long"/>      <!-- indeterminate -->
  <div class="origam-progress__bar--short"/>     <!-- indeterminate -->
  <div class="origam-progress__content">
    <slot :value="normalizedValue" :buffer="normalizedBuffer"/>
  </div>
</div>

<!-- Circular -->
<div class="origam-progress-circular" role="progressbar" :aria-valuenow="value">
  <svg :viewBox="svgViewBox">
    <circle class="origam-progress__underlay"/>  <!-- background ring -->
    <circle class="origam-progress__overlay"/>   <!-- fill arc -->
  </svg>
  <div class="origam-progress__content">
    <slot :value="normalizedValue"/>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-progress-linear',
                descriptionKey: 'components.progress.anatomy.linear_root',
                descriptionFallback: 'Root element for the linear variant.'
            },
            {
                cls: 'origam-progress__bar',
                descriptionKey: 'components.progress.anatomy.bar',
                descriptionFallback: 'Foreground fill bar (determinate) or animated long/short bars (indeterminate).'
            },
            {
                cls: 'origam-progress__bar--long',
                descriptionKey: 'components.progress.anatomy.bar_long',
                descriptionFallback: 'Indeterminate: long primary bar.'
            },
            {
                cls: 'origam-progress__bar--short',
                descriptionKey: 'components.progress.anatomy.bar_short',
                descriptionFallback: 'Indeterminate: short secondary bar.'
            },
            {
                cls: 'origam-progress__stream',
                descriptionKey: 'components.progress.anatomy.stream',
                descriptionFallback: 'Stream dots animation element. Only present when stream=true.'
            },
            {
                cls: 'origam-progress-circular',
                descriptionKey: 'components.progress.anatomy.circular_root',
                descriptionFallback: 'Root element for the circular variant.'
            },
            {
                cls: 'origam-progress__content',
                descriptionKey: 'components.progress.anatomy.content',
                descriptionFallback: 'Content slot overlay. Centered absolutely over the indicator.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-progress-linear---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.progress.css_vars.linear_transition',
            descriptionFallback: 'Transition duration for the fill bar width change.'
        },
        {
            name: '--origam-progress-linear---indeterminate-duration',
            defaultValue: '2200ms',
            descriptionKey: 'components.progress.css_vars.linear_indeterminate',
            descriptionFallback: 'Duration of the indeterminate bar animation cycle.'
        },
        {
            name: '--origam-progress-linear---rounded-border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.progress.css_vars.linear_rounded',
            descriptionFallback: 'Border-radius applied when rounded=true.'
        },
        {
            name: '--origam-progress-circular---size-xs',
            defaultValue: '16px',
            descriptionKey: 'components.progress.css_vars.circular_size_xs',
            descriptionFallback: 'Circular size for size="x-small".'
        },
        {
            name: '--origam-progress-circular---size-xl',
            defaultValue: '64px',
            descriptionKey: 'components.progress.css_vars.circular_size_xl',
            descriptionFallback: 'Circular size for size="x-large".'
        },
        {
            name: '--origam-progress-circular---indeterminate-duration',
            defaultValue: '1400ms',
            descriptionKey: 'components.progress.css_vars.circular_indeterminate',
            descriptionFallback: 'Duration of the indeterminate circular spin animation.'
        },
        {
            name: '--origam-progress-circular__underlay---color',
            defaultValue: '{color.surface.disabled}',
            descriptionKey: 'components.progress.css_vars.circular_underlay_color',
            descriptionFallback: 'Color of the background ring (underlay circle).'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['progressbar'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.progress.a11y.role_note',
                noteFallback: 'Both ProgressLinear and ProgressCircular have role="progressbar". They bind aria-valuemin="0", aria-valuemax, and aria-valuenow (undefined in indeterminate mode). aria-label comes from the label prop (defaults to "Loading").'
            },
            {
                noteKey: 'components.progress.a11y.hidden_note',
                noteFallback: 'When active=false, the component sets aria-hidden="true" to remove it from the accessibility tree without removing it from the DOM.'
            },
            {
                noteKey: 'components.progress.a11y.reduced_motion',
                noteFallback: 'Indeterminate animations are paused under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/progress.json',
        pipelineNote: 'Three token files: progress.json (shared), progress-linear.json, progress-circular.json. Built with Style Dictionary v4.',
        excerpt: [
            {
                tokenPath: 'progress-linear.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.progress.tokens.linear_transition',
                descriptionFallback: 'Linear fill bar transition duration.'
            },
            {
                tokenPath: 'progress-linear.indeterminate-duration',
                value: '2200ms',
                type: 'duration',
                descriptionKey: 'components.progress.tokens.linear_indeterminate',
                descriptionFallback: 'Indeterminate animation duration for the linear bar.'
            },
            {
                tokenPath: 'progress-circular.size-md',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.progress.tokens.circular_size_md',
                descriptionFallback: 'Default (medium) circular spinner size.'
            },
            {
                tokenPath: 'progress-circular.indeterminate-duration',
                value: '1400ms',
                type: 'duration',
                descriptionKey: 'components.progress.tokens.circular_indeterminate',
                descriptionFallback: 'Spin animation duration for the indeterminate circular variant.'
            },
            {
                tokenPath: 'progress-circular.underlay.opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.progress.tokens.circular_underlay_opacity',
                descriptionFallback: 'Opacity of the background ring.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'type',
                kind: 'select',
                labelKey: 'components.progress.playground.type',
                labelFallback: 'Type',
                defaultValue: 'linear',
                options: [
                    { label: 'linear', value: 'linear' },
                    { label: 'circular', value: 'circular' }
                ]
            },
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.progress.playground.model_value',
                labelFallback: 'Value',
                defaultValue: 60
            },
            {
                prop: 'indeterminate',
                kind: 'switch',
                labelKey: 'components.progress.playground.indeterminate',
                labelFallback: 'Indeterminate',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.progress.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'striped',
                kind: 'switch',
                labelKey: 'components.progress.playground.striped',
                labelFallback: 'Striped (linear)',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'switch',
                labelKey: 'components.progress.playground.rounded',
                labelFallback: 'Rounded (linear)',
                defaultValue: false
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.progress.playground.size',
                labelFallback: 'Size (circular)',
                defaultValue: 'default',
                options: [
                    { label: 'x-small', value: 'x-small' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                    { label: 'large', value: 'large' },
                    { label: 'x-large', value: 'x-large' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
