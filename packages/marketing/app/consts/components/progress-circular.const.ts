/**
 * /components/progress-circular — full documentation data for OrigamProgressCircular.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Progress/progress-circular.interface.ts  (props)
 *   - packages/ds/src/components/Progress/OrigamProgressCircular.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/progress-circular.json                  (CSS tokens)
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

export const PROGRESS_CIRCULAR_DOC: IComponentDoc = {
    slug: 'progress-circular',
    name: 'ProgressCircular',
    tag: 'origam-progress-circular',
    icon: 'mdi-loading',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.progress_circular.description',
    descriptionFallback: 'SVG-based circular progress indicator. Supports determinate, indeterminate and custom size modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-progress-circular--design',
    docUrl: 'http://localhost:4000/components/Progress/OrigamProgressCircular',

    family: [
        {
            slug: 'progress-linear',
            name: 'ProgressLinear',
            descriptionKey: 'components.catalog.progress_linear.description',
            descriptionFallback: 'Horizontal linear progress bar with determinate, indeterminate and buffer modes.'
        },
        {
            slug: 'progress',
            name: 'Progress',
            descriptionKey: 'components.catalog.progress.description',
            descriptionFallback: 'Unified progress component that delegates to ProgressCircular or ProgressLinear.'
        }
    ],

    parentSlug: 'progress',

    props: [
        {
            name: 'modelValue',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.progress_circular.props.model_value.description',
            descriptionFallback: 'Current progress value between 0 and max. Ignored in indeterminate mode.'
        },
        {
            name: 'max',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.progress_circular.props.max.description',
            descriptionFallback: 'Maximum value used to normalise modelValue into a 0-100 percentage.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_circular.props.indeterminate.description',
            descriptionFallback: 'Activates the continuous spin animation (unknown duration). Overrides modelValue display.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.progress_circular.props.active.description',
            descriptionFallback: 'When false, the component is hidden (visibility: hidden).'
        },
        {
            name: 'absolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_circular.props.absolute.description',
            descriptionFallback: 'Positions the component absolutely within its container.'
        },
        {
            name: 'thickness',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.progress_circular.props.thickness.description',
            descriptionFallback: 'Stroke width of the SVG circles. Accepts a number (px) or CSS length.'
        },
        {
            name: 'rotate',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.progress_circular.props.rotate.description',
            descriptionFallback: 'Rotation offset applied to the SVG. The start point defaults to the top (−90 deg applied internally).'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.progress_circular.props.size.description',
            descriptionFallback: 'Controls the component dimensions. Named sizes: x-small (16), small (24), default (32), large (48), x-large (64). A number sets an explicit pixel size.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_circular.props.color.description',
            descriptionFallback: 'Foreground arc color. Accepts intent tokens (primary, success…) or a CSS color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_circular.props.bg_color.description',
            descriptionFallback: 'Background ring color. Defaults to --origam-progress-circular__underlay---color (color.surface.disabled at 50% opacity).'
        },
        {
            name: 'striped',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_circular.props.striped.description',
            descriptionFallback: 'Adds a stripe pattern to the progress arc.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Loading'",
            descriptionKey: 'components.progress_circular.props.label.description',
            descriptionFallback: 'Accessible label (aria-label) for the progress indicator. Pass a localised string.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.progress_circular.props.tag.description',
            descriptionFallback: 'Root HTML element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ value: number }',
            descriptionKey: 'components.progress_circular.slots.default.description',
            descriptionFallback: 'Content rendered inside the circular progress (e.g. a percentage label). Slot prop value is the normalised 0-100 value.'
        }
    ],

    examples: [
        {
            titleKey: 'components.progress_circular.examples.determinate.title',
            titleFallback: 'Determinate',
            lang: 'vue',
            code: `<template>
  <origam-progress-circular
    :model-value="60"
    color="primary"
    size="large"
  >
    <template #default="{ value }">
      {{ value }}%
    </template>
  </origam-progress-circular>
</template>`
        },
        {
            titleKey: 'components.progress_circular.examples.indeterminate.title',
            titleFallback: 'Indeterminate',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <origam-progress-circular indeterminate />
    <origam-progress-circular indeterminate color="primary" size="large" />
    <origam-progress-circular indeterminate color="success" size="x-large" />
  </div>
</template>`
        },
        {
            titleKey: 'components.progress_circular.examples.sizes.title',
            titleFallback: 'Sizes',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <origam-progress-circular :model-value="75" size="x-small" color="primary" />
    <origam-progress-circular :model-value="75" size="small"   color="primary" />
    <origam-progress-circular :model-value="75"                color="primary" />
    <origam-progress-circular :model-value="75" size="large"   color="primary" />
    <origam-progress-circular :model-value="75" size="x-large" color="primary" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'indeterminate', props: { indeterminate: true, color: 'primary', size: 'large' } },
        { label: '25%', props: { modelValue: 25, color: 'primary', size: 'large' } },
        { label: '50%', props: { modelValue: 50, color: 'success', size: 'large' } },
        { label: '75%', props: { modelValue: 75, color: 'warning', size: 'large' } },
        { label: '100%', props: { modelValue: 100, color: 'danger', size: 'large' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-progress--circular',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamProgressCircular',
        svgDesc: 'Schematic of the ProgressCircular component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <g transform="translate(120, 40)">
    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--origam-color__surface---disabled, #e9d5ff)" stroke-width="8" opacity="0.5"/>
    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="8" stroke-dasharray="188 314" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90 60 60)"/>
    <text x="60" y="65" font-size="14" fill="var(--origam-color__text---primary, #1a1a1a)" text-anchor="middle" font-family="'JetBrains Mono',monospace">60%</text>
  </g>
  <circle cx="128" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="128" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="128" cy="102" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="128" y="106.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="180" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="180" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="180" cy="78" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="180" y="82.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <text x="420" y="60" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">① root (div.origam-progress--circular)</text>
  <text x="420" y="80" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">② svg &gt; circle.origam-progress__underlay</text>
  <text x="420" y="100" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">③ svg &gt; circle.origam-progress__overlay</text>
  <text x="420" y="120" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">④ div.origam-progress__content (#default slot)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-progress-circular&gt;</code> — 4 internal parts: root container ①, background SVG ring ②, foreground SVG arc ③, and content slot for inner label ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-progress--circular',
                descriptionKey: 'components.progress_circular.anatomy.root',
                descriptionFallback: 'Root element. <code>display: inline-flex; position: relative</code>. Size driven by size prop via useSize → <code>origam-progress--size-{size}</code> modifier.'
            },
            {
                num: 2,
                cls: '.origam-progress__underlay',
                descriptionKey: 'components.progress_circular.anatomy.underlay',
                descriptionFallback: 'Background SVG circle (<code>&lt;circle&gt;</code>). Color from bgColor prop. Opacity 0.5 by default. z-index: 1.'
            },
            {
                num: 3,
                cls: '.origam-progress__overlay',
                descriptionKey: 'components.progress_circular.anatomy.overlay',
                descriptionFallback: 'Foreground SVG arc. stroke-dashoffset driven by normalised value. In indeterminate mode: animated via CSS keyframes. z-index: 2.'
            },
            {
                num: 4,
                cls: '.origam-progress__content',
                descriptionKey: 'components.progress_circular.anatomy.content',
                descriptionFallback: 'Center content area. Rendered only when the #default slot is filled. <code>display: flex; align-items: center; justify-content: center</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-progress--circular origam-progress--size-default">
  <svg :viewBox="svgViewBox">
    <!-- background ring -->
    <circle class="origam-progress__underlay" />
    <!-- foreground progress arc -->
    <circle class="origam-progress__overlay" :stroke-dashoffset="strokeDashOffset" />
  </svg>
  <!-- optional center slot -->
  <div class="origam-progress__content">
    <slot :value="normalizedValue" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-progress--circular',
                descriptionKey: 'components.progress_circular.anatomy.root',
                descriptionFallback: 'Root BEM block. Always present on the host element.'
            },
            {
                cls: 'origam-progress--size-{size}',
                descriptionKey: 'components.progress_circular.anatomy.size_modifier',
                descriptionFallback: 'Size modifier emitted by useSize. Sets fixed width/height (16/24/32/48/64 px).'
            },
            {
                cls: 'origam-progress--indeterminate',
                descriptionKey: 'components.progress_circular.anatomy.indeterminate',
                descriptionFallback: 'Applied when indeterminate=true. Triggers the CSS spin/dash animations.'
            },
            {
                cls: 'origam-progress__underlay',
                descriptionKey: 'components.progress_circular.anatomy.underlay',
                descriptionFallback: 'Background ring SVG circle.'
            },
            {
                cls: 'origam-progress__overlay',
                descriptionKey: 'components.progress_circular.anatomy.overlay',
                descriptionFallback: 'Foreground arc SVG circle.'
            },
            {
                cls: 'origam-progress__content',
                descriptionKey: 'components.progress_circular.anatomy.content',
                descriptionFallback: 'Centered inner content container (shown only when default slot is used).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-progress-circular__underlay---color',
            defaultValue: '{color.surface.disabled}',
            descriptionKey: 'components.progress_circular.css_vars.underlay_color',
            descriptionFallback: 'Color of the background ring. Resolves to neutral.200 (light) / neutral.800 (dark).'
        },
        {
            name: '--origam-progress-circular__underlay---opacity',
            defaultValue: '0.5',
            descriptionKey: 'components.progress_circular.css_vars.underlay_opacity',
            descriptionFallback: 'Opacity of the background ring.'
        },
        {
            name: '--origam-progress-circular__overlay---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.progress_circular.css_vars.overlay_color',
            descriptionFallback: 'Foreground arc color. Overridden at runtime by the color prop via useTextColor.'
        },
        {
            name: '--origam-progress-circular---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.progress_circular.css_vars.transition_duration',
            descriptionFallback: 'Duration of the stroke-dashoffset transition in determinate mode.'
        },
        {
            name: '--origam-progress-circular---transition-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.progress_circular.css_vars.transition_easing',
            descriptionFallback: 'Easing function for the stroke transition.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.progress_circular.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.progress_circular.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.progress_circular.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.progress_circular.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.progress_circular.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.progress_circular.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['progressbar'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.progress_circular.a11y.progressbar_note',
                noteFallback: 'The component applies role="progressbar" via the progress composable. aria-valuenow, aria-valuemin (0) and aria-valuemax are bound automatically.'
            },
            {
                noteKey: 'components.progress_circular.a11y.label_note',
                noteFallback: 'Pass the label prop with a localised string to set aria-label. Defaults to "Loading".'
            },
            {
                noteKey: 'components.progress_circular.a11y.reduced_motion_note',
                noteFallback: 'Under prefers-reduced-motion: reduce, the CSS spin and dash animations are disabled.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/progress-circular.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'progress-circular.size-md',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.progress_circular.tokens.size_md',
                descriptionFallback: 'Default (medium) size: 32 × 32 px.'
            },
            {
                tokenPath: 'progress-circular.underlay.color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.progress_circular.tokens.underlay_color',
                descriptionFallback: 'Background ring color — muted track.'
            },
            {
                tokenPath: 'progress-circular.underlay.opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.progress_circular.tokens.underlay_opacity',
                descriptionFallback: 'Background ring opacity.'
            },
            {
                tokenPath: 'progress-circular.overlay.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.progress_circular.tokens.overlay_color',
                descriptionFallback: 'Default foreground arc color (overridden by color prop at runtime).'
            },
            {
                tokenPath: 'progress-circular.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.progress_circular.tokens.transition_duration',
                descriptionFallback: 'Arc transition duration in determinate mode.'
            },
            {
                tokenPath: 'progress-circular.indeterminate-duration',
                value: '1400ms',
                type: 'duration',
                descriptionKey: 'components.progress_circular.tokens.indeterminate_duration',
                descriptionFallback: 'Duration of the indeterminate spin/dash SVG animations.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.progress_circular.playground.model_value',
                labelFallback: 'Value (0-100)',
                defaultValue: 60
            },
            {
                prop: 'indeterminate',
                kind: 'switch',
                labelKey: 'components.progress_circular.playground.indeterminate',
                labelFallback: 'Indeterminate',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.progress_circular.playground.color',
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
                prop: 'size',
                kind: 'select',
                labelKey: 'components.progress_circular.playground.size',
                labelFallback: 'Size',
                defaultValue: 'default',
                options: [
                    { label: 'x-small', value: 'x-small' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                    { label: 'large', value: 'large' },
                    { label: 'x-large', value: 'x-large' }
                ]
            },
            {
                prop: 'thickness',
                kind: 'number',
                labelKey: 'components.progress_circular.playground.thickness',
                labelFallback: 'Thickness (px)',
                defaultValue: 4
            }
        ]
    } satisfies IComponentPlayground
}
