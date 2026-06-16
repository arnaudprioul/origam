/**
 * /components/progress-linear — full documentation data for OrigamProgressLinear.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Progress/progress-linear.interface.ts  (props)
 *   - packages/ds/src/components/Progress/OrigamProgressLinear.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/progress-linear.json                  (CSS tokens)
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

export const PROGRESS_LINEAR_DOC: IComponentDoc = {
    slug: 'progress-linear',
    name: 'ProgressLinear',
    tag: 'origam-progress-linear',
    icon: 'mdi-progress-helper',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.progress_linear.description',
    descriptionFallback: 'Horizontal progress bar with determinate, indeterminate, buffer, stream and clickable modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-progress-linear--design',
    docUrl: 'http://localhost:4000/components/Progress/OrigamProgressLinear',

    family: [
        {
            slug: 'progress-circular',
            name: 'ProgressCircular',
            descriptionKey: 'components.catalog.progress_circular.description',
            descriptionFallback: 'SVG-based circular progress indicator.'
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
            descriptionKey: 'components.progress_linear.props.model_value.description',
            descriptionFallback: 'Current progress value between 0 and max. Ignored in indeterminate mode.'
        },
        {
            name: 'max',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.progress_linear.props.max.description',
            descriptionFallback: 'Maximum value used to normalise modelValue into a 0-100 percentage.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.indeterminate.description',
            descriptionFallback: 'Activates the continuous bar animation. Overrides modelValue display.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.progress_linear.props.active.description',
            descriptionFallback: 'When false, pauses animations (animation-play-state: paused).'
        },
        {
            name: 'absolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.absolute.description',
            descriptionFallback: 'Positions the bar absolutely (position: absolute; left: 0).'
        },
        {
            name: 'thickness',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.progress_linear.props.thickness.description',
            descriptionFallback: 'Bar height in pixels. Sets both height and line-height inline.'
        },
        {
            name: 'bufferValue',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_linear.props.buffer_value.description',
            descriptionFallback: 'Secondary progress value (0-max). Shows a buffer zone when stream=true.'
        },
        {
            name: 'stream',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.stream.description',
            descriptionFallback: 'Renders an animated dot-stream beyond the buffer zone. Requires bufferValue.'
        },
        {
            name: 'clickable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.clickable.description',
            descriptionFallback: 'Allows the user to click the bar to set the value. Maps the click X position to a normalised value.'
        },
        {
            name: 'reverse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.reverse.description',
            descriptionFallback: 'Reverses the fill direction. Combined with RTL direction via useRtl.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.rounded.description',
            descriptionFallback: 'Applies pill-shaped border-radius ({radius.full}) to the bar and loader.'
        },
        {
            name: 'striped',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.progress_linear.props.striped.description',
            descriptionFallback: 'Adds a stripe pattern to the foreground bar.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_linear.props.color.description',
            descriptionFallback: 'Foreground bar color. Accepts intent tokens or a CSS color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_linear.props.bg_color.description',
            descriptionFallback: 'Background track color. Defaults to currentColor at 50% opacity.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Loading'",
            descriptionKey: 'components.progress_linear.props.label.description',
            descriptionFallback: 'Accessible label (aria-label) for the progress bar.'
        },
        {
            name: 'location',
            type: { label: 'TLocation', slug: 'location', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.progress_linear.props.location.description',
            descriptionFallback: 'Positional anchor: top or bottom. Sets top:0 or bottom:0 when absolute/fixed.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.progress_linear.props.tag.description',
            descriptionFallback: 'Root HTML element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ value: number, buffer: number }',
            descriptionKey: 'components.progress_linear.slots.default.description',
            descriptionFallback: 'Content overlaid on the bar (e.g. a label). Slot props: normalised value (0-100) and normalised buffer value.'
        }
    ],

    examples: [
        {
            titleKey: 'components.progress_linear.examples.determinate.title',
            titleFallback: 'Determinate',
            lang: 'vue',
            code: `<template>
  <origam-progress-linear :model-value="45" color="primary" />
</template>`
        },
        {
            titleKey: 'components.progress_linear.examples.indeterminate.title',
            titleFallback: 'Indeterminate',
            lang: 'vue',
            code: `<template>
  <origam-progress-linear indeterminate color="primary" />
</template>`
        },
        {
            titleKey: 'components.progress_linear.examples.buffer.title',
            titleFallback: 'Buffer + stream',
            lang: 'vue',
            code: `<template>
  <origam-progress-linear
    :model-value="30"
    :buffer-value="60"
    stream
    color="primary"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'determinate 40%', props: { modelValue: 40, color: 'primary' } },
        { label: 'indeterminate', props: { indeterminate: true, color: 'primary' } },
        { label: 'buffer', props: { modelValue: 30, bufferValue: 60, stream: true, color: 'info' } },
        { label: 'rounded', props: { modelValue: 70, color: 'success', rounded: true } },
        { label: 'thick', props: { modelValue: 55, color: 'warning', thickness: 12 } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-progress--linear',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamProgressLinear',
        svgDesc: 'Schematic of the ProgressLinear component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <rect x="28" y="60" width="644" height="20" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="28" y="60" width="280" height="20" rx="2" fill="var(--origam-color__surface---disabled, #e9d5ff)" opacity="0.5"/>
  <rect x="28" y="60" width="180" height="20" rx="2" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="308" y="66" width="4" height="8" rx="1" fill="var(--origam-color__text---tertiary, #7e5fb0)" opacity="0.4"/>
  <rect x="316" y="66" width="4" height="8" rx="1" fill="var(--origam-color__text---tertiary, #7e5fb0)" opacity="0.4"/>
  <rect x="324" y="66" width="4" height="8" rx="1" fill="var(--origam-color__text---tertiary, #7e5fb0)" opacity="0.3"/>
  <circle cx="36" cy="60" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="64.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="120" cy="50" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="120" y="54.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="280" cy="50" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="280" y="54.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="350" cy="60" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="64.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="350" cy="90" r="10" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="94.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <text x="400" y="100" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">① root wrapper (div.origam-progress--linear)</text>
  <text x="400" y="120" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">② div.origam-progress__background (track)</text>
  <text x="400" y="140" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">③ div.origam-progress__loader &gt; __bar</text>
  <text x="400" y="160" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">④ div.origam-progress__stream (buffer dots)</text>
  <text x="400" y="180" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">⑤ div.origam-progress__content (slot)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-progress-linear&gt;</code> — 5 internal parts: root ①, background track ②, foreground bar ③, stream indicator ④ (buffer mode only), and content slot ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-progress--linear',
                descriptionKey: 'components.progress_linear.anatomy.root',
                descriptionFallback: 'Root element. <code>overflow: hidden; position: relative; width: 100%</code>. Height set inline from thickness prop.'
            },
            {
                num: 2,
                cls: '.origam-progress__background',
                descriptionKey: 'components.progress_linear.anatomy.background',
                descriptionFallback: 'Background track — absolute, full-width until buffer narrows it. Color from bgColor prop via useTextColor, opacity 0.5.'
            },
            {
                num: 3,
                cls: '.origam-progress__loader > .origam-progress__bar',
                descriptionKey: 'components.progress_linear.anatomy.loader',
                descriptionFallback: 'Foreground loader container + bar(s). In indeterminate mode two bars (--long and --short) animate simultaneously. Width driven by normalised value in determinate mode.'
            },
            {
                num: 4,
                cls: '.origam-progress__stream',
                descriptionKey: 'components.progress_linear.anatomy.stream',
                descriptionFallback: 'Animated dot-stream rendered only when stream=true. Positioned after the buffer zone. Opacity: 0.3.'
            },
            {
                num: 5,
                cls: '.origam-progress__content',
                descriptionKey: 'components.progress_linear.anatomy.content',
                descriptionFallback: 'Absolute overlay for the #default slot. Rendered only when hasContent is true.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-progress--linear">
  <!-- stream dots (stream=true only) -->
  <div v-if="stream" class="origam-progress__stream" />
  <!-- background track -->
  <div class="origam-progress__background" />
  <!-- animated loader (determinate or indeterminate) -->
  <origam-transition :transition="transition">
    <div class="origam-progress__loader">
      <div class="origam-progress__bar" />          <!-- determinate -->
      <div class="origam-progress__bar--long" />    <!-- indeterminate only -->
      <div class="origam-progress__bar--short" />   <!-- indeterminate only -->
    </div>
  </origam-transition>
  <!-- optional slot content -->
  <div v-if="hasContent" class="origam-progress__content">
    <slot :value="normalizedValue" :buffer="normalizedBuffer" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-progress--linear',
                descriptionKey: 'components.progress_linear.anatomy.root',
                descriptionFallback: 'Root BEM block.'
            },
            {
                cls: 'origam-progress--indeterminate',
                descriptionKey: 'components.progress_linear.anatomy.indeterminate',
                descriptionFallback: 'Applied when indeterminate=true. Starts the CSS animations.'
            },
            {
                cls: 'origam-progress--reverse',
                descriptionKey: 'components.progress_linear.anatomy.reverse',
                descriptionFallback: 'Applied when isReversed is true (reverse prop XOR RTL).'
            },
            {
                cls: 'origam-progress--rounded',
                descriptionKey: 'components.progress_linear.anatomy.rounded',
                descriptionFallback: 'Applied when rounded=true. Sets border-radius: 9999px on root and loader.'
            },
            {
                cls: 'origam-progress--absolute',
                descriptionKey: 'components.progress_linear.anatomy.absolute',
                descriptionFallback: 'Applied when absolute=true. Position: absolute; left: 0; z-index: 1.'
            },
            {
                cls: 'origam-progress--fixed',
                descriptionKey: 'components.progress_linear.anatomy.fixed',
                descriptionFallback: 'Applied when the component is fixed to the viewport.'
            },
            {
                cls: 'origam-progress__background',
                descriptionKey: 'components.progress_linear.anatomy.background',
                descriptionFallback: 'Background track element.'
            },
            {
                cls: 'origam-progress__loader',
                descriptionKey: 'components.progress_linear.anatomy.loader',
                descriptionFallback: 'Foreground progress container.'
            },
            {
                cls: 'origam-progress__bar',
                descriptionKey: 'components.progress_linear.anatomy.bar',
                descriptionFallback: 'Individual bar stripe. One in determinate mode, two in indeterminate.'
            },
            {
                cls: 'origam-progress__stream',
                descriptionKey: 'components.progress_linear.anatomy.stream',
                descriptionFallback: 'Buffer stream dots (stream=true).'
            },
            {
                cls: 'origam-progress__content',
                descriptionKey: 'components.progress_linear.anatomy.content',
                descriptionFallback: 'Absolute centered slot container.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-progress-linear__background---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.progress_linear.css_vars.background_color',
            descriptionFallback: 'Background track color. Inherits from bgColor prop via useTextColor.'
        },
        {
            name: '--origam-progress-linear__background---opacity',
            defaultValue: '0.5',
            descriptionKey: 'components.progress_linear.css_vars.background_opacity',
            descriptionFallback: 'Background track opacity.'
        },
        {
            name: '--origam-progress-linear__loader---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.progress_linear.css_vars.loader_color',
            descriptionFallback: 'Foreground bar color. Inherits from color prop via useTextColor.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.progress_linear.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.progress_linear.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.progress_linear.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.progress_linear.exposed.load',
            descriptionFallback: 'Injects the computed style sheet.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.progress_linear.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.progress_linear.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['progressbar'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.progress_linear.a11y.progressbar_note',
                noteFallback: 'role="progressbar" is applied by the progress composable along with aria-valuenow, aria-valuemin (0) and aria-valuemax.'
            },
            {
                noteKey: 'components.progress_linear.a11y.label_note',
                noteFallback: 'Pass the label prop with a localised string to set aria-label. Defaults to "Loading".'
            },
            {
                noteKey: 'components.progress_linear.a11y.clickable_note',
                noteFallback: 'When clickable=true, the bar is interactive. Ensure an aria-label describes what clicking does (e.g. "Seek video").'
            },
            {
                noteKey: 'components.progress_linear.a11y.reduced_motion_note',
                noteFallback: 'Under prefers-reduced-motion: reduce, indeterminate bars are frozen at 50% width and streams stop animating.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/progress-linear.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'progress-linear.width',
                value: '100%',
                type: 'dimension',
                descriptionKey: 'components.progress_linear.tokens.width',
                descriptionFallback: 'Bar always fills its container width.'
            },
            {
                tokenPath: 'progress-linear.background-track.opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.progress_linear.tokens.background_opacity',
                descriptionFallback: 'Background track opacity — muted 50% of foreground color.'
            },
            {
                tokenPath: 'progress-linear.rounded-border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.progress_linear.tokens.rounded_border_radius',
                descriptionFallback: 'Border radius used when rounded=true.'
            },
            {
                tokenPath: 'progress-linear.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.progress_linear.tokens.transition_duration',
                descriptionFallback: 'Duration of width transitions in determinate mode.'
            },
            {
                tokenPath: 'progress-linear.indeterminate-duration',
                value: '2200ms',
                type: 'duration',
                descriptionKey: 'components.progress_linear.tokens.indeterminate_duration',
                descriptionFallback: 'Duration of the indeterminate bar CSS animations.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.progress_linear.playground.model_value',
                labelFallback: 'Value (0-100)',
                defaultValue: 45
            },
            {
                prop: 'indeterminate',
                kind: 'switch',
                labelKey: 'components.progress_linear.playground.indeterminate',
                labelFallback: 'Indeterminate',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.progress_linear.playground.color',
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
                prop: 'rounded',
                kind: 'switch',
                labelKey: 'components.progress_linear.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: false
            },
            {
                prop: 'stream',
                kind: 'switch',
                labelKey: 'components.progress_linear.playground.stream',
                labelFallback: 'Stream (buffer mode)',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
