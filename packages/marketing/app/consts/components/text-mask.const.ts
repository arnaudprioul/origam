/**
 * /components/text-mask — full documentation data for OrigamTextMask.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/TextMask/text-mask.interface.ts  (props)
 *   - packages/ds/src/components/TextMask/OrigamTextMask.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/text-mask.json                 (CSS tokens)
 *
 * CATEGORY: Data Display — this is a TEXT RENDERING component (background-clip:text
 * gradient/image transparency effect), NOT a form input mask.
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

export const TEXT_MASK_DOC: IComponentDoc = {
    slug: 'text-mask',
    name: 'TextMask',
    tag: 'origam-text-mask',
    icon: 'mdi-format-color-text',
    category: 'Data Display',
    descriptionKey: 'components.catalog.text_mask.description',
    descriptionFallback: 'Renders text with a gradient or image as a transparent fill via background-clip: text. Supports animated gradients (pan, rotate, pulse, zoom).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-textmask--design',
    docUrl: 'http://localhost:4000/components/TextMask/OrigamTextMask',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'background',
            type: { label: 'string | IGradient', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.text_mask.props.background.description',
            descriptionFallback: 'REQUIRED. Background painted through the text glyphs. Accepts: a structured IGradient object (intent-aware), a raw CSS gradient string (linear-gradient/radial-gradient/conic-gradient), a preset name (gradient-sunset → var(--origam-gradient---{slug})), or an url(...) image.'
        },
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_mask.props.text.description',
            descriptionFallback: 'Text to mask. Ignored when the default slot is provided.'
        },
        {
            name: 'animated',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_mask.props.animated.description',
            descriptionFallback: 'Enables CSS keyframe animation on the background. Pair with animationType.'
        },
        {
            name: 'animationDuration',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'3s'",
            descriptionKey: 'components.text_mask.props.animation_duration.description',
            descriptionFallback: 'Duration of one animation cycle. Any CSS <time> value (3s, 750ms, …).'
        },
        {
            name: 'animationType',
            type: { label: 'TTextMaskAnimation', slug: 'text-mask-animation', kind: 'type' },
            defaultValue: "'pan'",
            descriptionKey: 'components.text_mask.props.animation_type.description',
            descriptionFallback: "Animation strategy: 'pan' (horizontal pan), 'rotate' (hue-rotate), 'pulse' (size pulse), 'zoom' (scale zoom)."
        },
        {
            name: 'fontSize',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: "'inherit'",
            descriptionKey: 'components.text_mask.props.font_size.description',
            descriptionFallback: 'font-size of the masked text. Numbers are interpreted as px.'
        },
        {
            name: 'fontWeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: "'inherit'",
            descriptionKey: 'components.text_mask.props.font_weight.description',
            descriptionFallback: 'font-weight of the masked text. Accepts numeric weights (100–900) or keywords.'
        },
        {
            name: 'fontFamily',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'inherit'",
            descriptionKey: 'components.text_mask.props.font_family.description',
            descriptionFallback: 'font-family stack applied to the masked text.'
        },
        {
            name: 'lineHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '1.1',
            descriptionKey: 'components.text_mask.props.line_height.description',
            descriptionFallback: 'line-height applied to the masked text. Tight by default for large display text.'
        },
        {
            name: 'letterSpacing',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_mask.props.letter_spacing.description',
            descriptionFallback: 'letter-spacing applied to the masked text. Defaults to the CSS initial value.'
        },
        {
            name: 'align',
            type: { label: 'TBlockquoteAlign', slug: 'blockquote-align', kind: 'type' },
            defaultValue: "'left'",
            descriptionKey: 'components.text_mask.props.align.description',
            descriptionFallback: "text-align of the masked content: 'left', 'center', or 'right'."
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.text_mask.props.tag.description',
            descriptionFallback: 'HTML element rendered at root. Defaults to span; use div for block display.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.text_mask.slots.default.description',
            descriptionFallback: 'Rich content to mask (wins over the text prop). Accepts multiple lines, nested <span>, <h1>, <em>… The DOM text is preserved for screen readers and search engines.'
        }
    ],

    examples: [
        {
            titleKey: 'components.text_mask.examples.gradient.title',
            titleFallback: 'Gradient text',
            lang: 'vue',
            code: `<template>
  <origam-text-mask
    text="Hello, Origam!"
    background="linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)"
    :font-size="48"
    :font-weight="800"
  />
</template>`
        },
        {
            titleKey: 'components.text_mask.examples.animated.title',
            titleFallback: 'Animated gradient',
            lang: 'vue',
            code: `<template>
  <origam-text-mask
    text="Animated!"
    background="linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #10b981)"
    :animated="true"
    animation-type="pan"
    animation-duration="4s"
    :font-size="64"
    :font-weight="900"
  />
</template>`
        },
        {
            titleKey: 'components.text_mask.examples.image.title',
            titleFallback: 'Image clipping',
            lang: 'vue',
            code: `<template>
  <origam-text-mask
    background="url(/hero.jpg)"
    :font-size="80"
    :font-weight="900"
    align="center"
  >
    <h1>Big Headline</h1>
  </origam-text-mask>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'gradient pan',
            props: {
                background: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)',
                fontSize: 32,
                fontWeight: 800,
                text: 'Origam DS'
            }
        },
        {
            label: 'animated',
            props: {
                background: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4, #10b981)',
                fontSize: 32,
                fontWeight: 800,
                animated: true,
                animationType: 'pan',
                text: 'Animated!'
            }
        },
        {
            label: 'center align',
            props: {
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                fontSize: 28,
                fontWeight: 700,
                align: 'center',
                text: 'Center'
            }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-text-mask',
        svgViewBox: '0 0 600 160',
        svgTitle: 'Anatomy of OrigamTextMask',
        svgDesc: 'Schematic of the TextMask component — root with inline background-clip style.',
        svg: `
  <rect x="0" y="0" width="600" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="544" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <defs>
    <linearGradient id="tmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7c3aed"/>
      <stop offset="50%" style="stop-color:#a855f7"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
  </defs>
  <text x="300" y="92" font-size="32" fill="url(#tmGrad)" font-weight="900" text-anchor="middle" font-family="sans-serif">Hello World</text>
  <circle cx="36" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <line x1="46" y1="40" x2="80" y2="22" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-text-mask</text>
  <text x="300" y="148" font-size="8" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">background-clip: text · -webkit-text-fill-color: transparent</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-text-mask&gt;</code> — single root element with <code>background-clip: text</code>. The text content is preserved in the DOM; the gradient/image visual is CSS-only.`,
        legend: [
            {
                num: 1,
                cls: '.origam-text-mask',
                descriptionKey: 'components.text_mask.anatomy.root',
                descriptionFallback: 'Root element (span by default). Sets background-image, background-clip:text and -webkit-text-fill-color:transparent. Animation classes are added when animated=true.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: inline-block with background-clip: text -->
<component
  :is="tag"
  class="origam-text-mask"
  :class="[
    \`origam-text-mask--align-\${align}\`,
    \`origam-text-mask--\${animationType}\`,
    { 'origam-text-mask--animated': animated }
  ]"
  :style="{
    '--origam-text-mask---bg': resolvedBackground,
    '--origam-text-mask---font-size': ...,
    '--origam-text-mask---font-weight': ...,
  }"
>
  <!-- slot content (wins over text prop) -->
  <slot v-if="hasSlot"/>
  <template v-else>{{ text }}</template>
</component>`,
        classes: [
            {
                cls: 'origam-text-mask',
                descriptionKey: 'components.text_mask.anatomy.root',
                descriptionFallback: 'Root element. display:inline-block with background-clip:text.'
            },
            {
                cls: 'origam-text-mask--align-left',
                descriptionKey: 'components.text_mask.anatomy.align_left',
                descriptionFallback: 'text-align: left (default).'
            },
            {
                cls: 'origam-text-mask--align-center',
                descriptionKey: 'components.text_mask.anatomy.align_center',
                descriptionFallback: 'text-align: center.'
            },
            {
                cls: 'origam-text-mask--align-right',
                descriptionKey: 'components.text_mask.anatomy.align_right',
                descriptionFallback: 'text-align: right.'
            },
            {
                cls: 'origam-text-mask--animated',
                descriptionKey: 'components.text_mask.anatomy.animated',
                descriptionFallback: 'Added when animated=true. Enables the keyframe animation selected by --{animationType}.'
            },
            {
                cls: 'origam-text-mask--pan',
                descriptionKey: 'components.text_mask.anatomy.pan',
                descriptionFallback: 'Horizontal pan animation (background-position 0% → 100%).'
            },
            {
                cls: 'origam-text-mask--rotate',
                descriptionKey: 'components.text_mask.anatomy.rotate',
                descriptionFallback: 'Hue-rotate animation (filter: hue-rotate 0 → 360deg).'
            },
            {
                cls: 'origam-text-mask--pulse',
                descriptionKey: 'components.text_mask.anatomy.pulse',
                descriptionFallback: 'Size pulse animation (background-size oscillates).'
            },
            {
                cls: 'origam-text-mask--zoom',
                descriptionKey: 'components.text_mask.anatomy.zoom',
                descriptionFallback: 'Zoom animation (background-size 100% → 220%).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-text-mask---bg',
            defaultValue: 'undefined',
            descriptionKey: 'components.text_mask.css_vars.bg',
            descriptionFallback: 'Resolved background-image value (gradient or url()). Set from the background prop.'
        },
        {
            name: '--origam-text-mask---duration',
            defaultValue: '3s',
            descriptionKey: 'components.text_mask.css_vars.duration',
            descriptionFallback: 'Animation cycle duration. Maps to animationDuration prop.'
        },
        {
            name: '--origam-text-mask---font-size',
            defaultValue: 'inherit',
            descriptionKey: 'components.text_mask.css_vars.font_size',
            descriptionFallback: 'Font size of the masked text.'
        },
        {
            name: '--origam-text-mask---font-weight',
            defaultValue: 'inherit',
            descriptionKey: 'components.text_mask.css_vars.font_weight',
            descriptionFallback: 'Font weight of the masked text.'
        },
        {
            name: '--origam-text-mask---font-family',
            defaultValue: 'inherit',
            descriptionKey: 'components.text_mask.css_vars.font_family',
            descriptionFallback: 'Font family of the masked text.'
        },
        {
            name: '--origam-text-mask---line-height',
            defaultValue: '1.1',
            descriptionKey: 'components.text_mask.css_vars.line_height',
            descriptionFallback: 'Line height of the masked text.'
        },
        {
            name: '--origam-text-mask---letter-spacing',
            defaultValue: 'normal',
            descriptionKey: 'components.text_mask.css_vars.letter_spacing',
            descriptionFallback: 'Letter spacing of the masked text.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'resolvedBackground',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.text_mask.exposed.resolved_background',
            descriptionFallback: 'The resolved background-image CSS value (gradient or url()). Derived from the background prop after resolveGradient() processing.'
        },
        {
            name: 'hasSlot',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.text_mask.exposed.has_slot',
            descriptionFallback: 'True when the default slot is provided. When false, the text prop is rendered.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['(none — inline text)'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.text_mask.a11y.dom_text_note',
                noteFallback: 'The text content is preserved in the DOM as plain text (or semantic slot content). The background-clip:text transform is purely CSS — screen readers and search engines read the real text.'
            },
            {
                noteKey: 'components.text_mask.a11y.reduced_motion_note',
                noteFallback: 'All CSS animations are disabled under prefers-reduced-motion: reduce. The background-size reverts to cover so the gradient is still visible.'
            },
            {
                noteKey: 'components.text_mask.a11y.contrast_note',
                noteFallback: 'Gradient backgrounds may produce low-contrast regions. Verify WCAG AA contrast ratios for the minimum-contrast point of the gradient. Add a fallback color for browsers that do not support background-clip:text.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/text-mask.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'text-mask.font-size-default',
                value: '{font.size.5xl}',
                type: 'dimension',
                descriptionKey: 'components.text_mask.tokens.font_size_default',
                descriptionFallback: 'Reference display font size used in the DS story defaults.'
            },
            {
                tokenPath: 'text-mask.font-weight-default',
                value: '{font.weight.bold}',
                type: 'fontWeight',
                descriptionKey: 'components.text_mask.tokens.font_weight_default',
                descriptionFallback: 'Reference font weight used in the DS story defaults.'
            },
            {
                tokenPath: 'text-mask.line-height-default',
                value: '{font.lineHeight.tight}',
                type: 'number',
                descriptionKey: 'components.text_mask.tokens.line_height_default',
                descriptionFallback: 'Tight line-height suited to large display text.'
            },
            {
                tokenPath: 'text-mask.animation.duration-default',
                value: '3s',
                type: 'duration',
                descriptionKey: 'components.text_mask.tokens.animation_duration',
                descriptionFallback: 'Default animation cycle duration.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Origam DS',
        controls: [
            {
                prop: 'background',
                kind: 'select',
                labelKey: 'components.text_mask.playground.background',
                labelFallback: 'Background',
                defaultValue: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)',
                options: [
                    { label: 'Violet → Cyan', value: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)' },
                    { label: 'Sunset', value: 'linear-gradient(135deg, #f59e0b, #ef4444, #a855f7)' },
                    { label: 'Ocean', value: 'linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)' },
                    { label: 'Forest', value: 'linear-gradient(135deg, #10b981, #059669, #3b82f6)' }
                ]
            },
            {
                prop: 'animated',
                kind: 'switch',
                labelKey: 'components.text_mask.playground.animated',
                labelFallback: 'Animated',
                defaultValue: false
            },
            {
                prop: 'animationType',
                kind: 'select',
                labelKey: 'components.text_mask.playground.animation_type',
                labelFallback: 'Animation type',
                defaultValue: 'pan',
                options: [
                    { label: 'pan', value: 'pan' },
                    { label: 'rotate', value: 'rotate' },
                    { label: 'pulse', value: 'pulse' },
                    { label: 'zoom', value: 'zoom' }
                ]
            },
            {
                prop: 'fontSize',
                kind: 'number',
                labelKey: 'components.text_mask.playground.font_size',
                labelFallback: 'Font size (px)',
                defaultValue: 48
            },
            {
                prop: 'fontWeight',
                kind: 'select',
                labelKey: 'components.text_mask.playground.font_weight',
                labelFallback: 'Font weight',
                defaultValue: 800,
                options: [
                    { label: '400', value: 400 },
                    { label: '600', value: 600 },
                    { label: '700', value: 700 },
                    { label: '800', value: 800 },
                    { label: '900', value: 900 }
                ]
            },
            {
                prop: 'align',
                kind: 'select',
                labelKey: 'components.text_mask.playground.align',
                labelFallback: 'Align',
                defaultValue: 'left',
                options: [
                    { label: 'left', value: 'left' },
                    { label: 'center', value: 'center' },
                    { label: 'right', value: 'right' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
