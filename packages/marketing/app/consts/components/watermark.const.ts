/**
 * /components/watermark — full documentation data for OrigamWatermark.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Watermark/watermark.interface.ts  (props, slots)
 *   - packages/ds/src/components/Watermark/OrigamWatermark.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/watermark.json                  (CSS tokens)
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

export const WATERMARK_DOC: IComponentDoc = {
    slug: 'watermark',
    name: 'Watermark',
    tag: 'origam-watermark',
    icon: 'mdi-watermark',
    category: 'Utility',
    descriptionKey: 'components.catalog.watermark.description',
    descriptionFallback: 'Absolutely-positioned repeating diagonal overlay wrapping a content slot. Renders a tiled SVG data-URL with text or image glyph. Supports anti-tamper MutationObserver, pointer-events pass-through and full visual customisation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-watermark--design',
    docUrl: 'http://localhost:4000/components/Watermark/OrigamWatermark',

    family: [],

    props: [
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.watermark.props.text.description',
            descriptionFallback: 'UTF-8 text glyph tiled across the overlay. Required unless image is passed.'
        },
        {
            name: 'image',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.watermark.props.image.description',
            descriptionFallback: 'URL or data-URL of an image used as the repeated glyph. Takes precedence over text.'
        },
        {
            name: 'opacity',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0.1',
            descriptionKey: 'components.watermark.props.opacity.description',
            descriptionFallback: 'Opacity of the glyph (0–1), applied at SVG level so wrapped content stays at full opacity.'
        },
        {
            name: 'angle',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '-30',
            descriptionKey: 'components.watermark.props.angle.description',
            descriptionFallback: 'Rotation in degrees. Negative rotates counter-clockwise (−30° = classic top-left to bottom-right diagonal).'
        },
        {
            name: 'gap',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '120',
            descriptionKey: 'components.watermark.props.gap.description',
            descriptionFallback: 'Distance in CSS pixels between adjacent tiles. Smaller gap = denser pattern.'
        },
        {
            name: 'fontSize',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '16',
            descriptionKey: 'components.watermark.props.font_size.description',
            descriptionFallback: 'Font size in CSS pixels for the text glyph. Ignored when image is used.'
        },
        {
            name: 'fontFamily',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'inherit'",
            descriptionKey: 'components.watermark.props.font_family.description',
            descriptionFallback: 'CSS font-family for the text glyph. inherit resolves to Helvetica/Arial (SVG data-URL does not inherit from the document).'
        },
        {
            name: 'color',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'currentColor'",
            descriptionKey: 'components.watermark.props.color.description',
            descriptionFallback: 'Color of the text glyph. currentColor does NOT work in data-URL SVGs — pass an explicit value for non-default cases.'
        },
        {
            name: 'fontWeight',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '400',
            descriptionKey: 'components.watermark.props.font_weight.description',
            descriptionFallback: 'CSS font-weight for the text glyph. Accepts standard CSS values (100–900, normal, bold).'
        },
        {
            name: 'zIndex',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.watermark.props.z_index.description',
            descriptionFallback: 'Z-index of the overlay layer. Use a value above wrapped content but below floating UI (menus, tooltips).'
        },
        {
            name: 'antiTamper',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.watermark.props.anti_tamper.description',
            descriptionFallback: 'Installs a MutationObserver that re-injects the overlay if it is removed or hidden via DevTools. Dissuasive only — not a security feature.'
        },
        {
            name: 'pointerEvents',
            type: { label: "'none' | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: "'none'",
            descriptionKey: 'components.watermark.props.pointer_events.description',
            descriptionFallback: 'none (default): clicks pass through the overlay to the wrapped content. auto: the overlay blocks interaction.'
        },
        // ── ITagProps ─────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.watermark.props.tag.description',
            descriptionFallback: 'Root HTML element rendered as the watermark wrapper.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.watermark.slots.default.description',
            descriptionFallback: 'Wrapped content rendered beneath the diagonal overlay. Fully interactive when pointerEvents="none" (default).'
        }
    ],

    examples: [
        {
            titleKey: 'components.watermark.examples.confidential.title',
            titleFallback: 'Confidential text',
            lang: 'vue',
            code: `<template>
  <origam-watermark text="CONFIDENTIAL" color="#7c3aed" :opacity="0.08">
    <origam-card>
      <origam-card-text>
        <p>This document is confidential and intended only for authorised recipients.</p>
      </origam-card-text>
    </origam-card>
  </origam-watermark>
</template>`
        },
        {
            titleKey: 'components.watermark.examples.dense.title',
            titleFallback: 'Dense pattern',
            lang: 'vue',
            code: `<template>
  <origam-watermark text="DRAFT" :gap="60" :font-size="12" :opacity="0.06" color="#9333ea">
    <div style="padding: 2rem; background: white;">
      <p>Work in progress — not for distribution.</p>
    </div>
  </origam-watermark>
</template>`
        },
        {
            titleKey: 'components.watermark.examples.anti_tamper.title',
            titleFallback: 'Anti-tamper',
            lang: 'vue',
            code: `<template>
  <origam-watermark text="PRIVATE" anti-tamper :opacity="0.12" color="#6d28d9">
    <p>Even if the overlay is removed in DevTools, the MutationObserver will re-inject it.</p>
  </origam-watermark>
</template>`
        }
    ],

    previewVariants: [
        { label: 'CONFIDENTIAL', props: { text: 'CONFIDENTIAL', opacity: 0.08, color: '#7c3aed', angle: -30 } },
        { label: 'DRAFT', props: { text: 'DRAFT', opacity: 0.1, color: '#9333ea', angle: -30, gap: 80 } },
        { label: 'large', props: { text: 'DO NOT COPY', opacity: 0.06, fontSize: 24, color: '#4c1d95', angle: -25 } },
        { label: 'horizontal', props: { text: 'SAMPLE', opacity: 0.1, color: '#6d28d9', angle: 0, gap: 100 } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-watermark',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamWatermark',
        svgDesc: 'Schematic showing the watermark wrapper with the tiled overlay layer above the slot content.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="60" y="20" width="580" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="110" font-size="14" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="sans-serif">Wrapped content</text>
  <g opacity="0.10" transform="translate(60,20)">
    <text x="30" y="50" font-size="18" fill="#7c3aed" transform="rotate(-30, 30, 50)" font-family="sans-serif">DRAFT</text>
    <text x="180" y="90" font-size="18" fill="#7c3aed" transform="rotate(-30, 180, 90)" font-family="sans-serif">DRAFT</text>
    <text x="340" y="60" font-size="18" fill="#7c3aed" transform="rotate(-30, 340, 60)" font-family="sans-serif">DRAFT</text>
    <text x="100" y="140" font-size="18" fill="#7c3aed" transform="rotate(-30, 100, 140)" font-family="sans-serif">DRAFT</text>
    <text x="280" y="160" font-size="18" fill="#7c3aed" transform="rotate(-30, 280, 160)" font-family="sans-serif">DRAFT</text>
    <text x="440" y="140" font-size="18" fill="#7c3aed" transform="rotate(-30, 440, 140)" font-family="sans-serif">DRAFT</text>
  </g>
  <circle cx="68" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="28" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="100" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="104" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-watermark&gt;</code> — the root ① is position:relative; the overlay layer ② is absolutely inset with a tiled SVG data-URL background; the slot content ③ sits beneath (pointer-events passes through by default).`,
        legend: [
            {
                num: 1,
                cls: '.origam-watermark',
                descriptionKey: 'components.watermark.anatomy.root',
                descriptionFallback: 'Root wrapper. position: relative; display: block. Receives the tag prop.'
            },
            {
                num: 2,
                cls: '.origam-watermark__layer',
                descriptionKey: 'components.watermark.anatomy.layer',
                descriptionFallback: 'Absolutely-positioned overlay (inset: 0). background-image set to a data:image/svg+xml data-URL. pointer-events: none by default.'
            },
            {
                num: 3,
                cls: '[#default slot]',
                descriptionKey: 'components.watermark.anatomy.slot',
                descriptionFallback: 'Wrapped content rendered at z-index 0, below the overlay layer.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" ref="rootEl" class="origam-watermark">
  <!-- wrapped content -->
  <slot />
  <!-- tiled overlay — position:absolute, inset:0 -->
  <div ref="layerEl" class="origam-watermark__layer" :style="layerStyles" />
</component>`,
        classes: [
            { cls: 'origam-watermark', descriptionKey: 'components.watermark.anatomy.root', descriptionFallback: 'Root wrapper with position:relative.' },
            { cls: 'origam-watermark__layer', descriptionKey: 'components.watermark.anatomy.layer', descriptionFallback: 'Absolutely-positioned tiled SVG overlay.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-watermark---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.watermark.css_vars.color',
            descriptionFallback: 'Default glyph color token (currentColor in data-URL context; override with explicit value).'
        },
        {
            name: '--origam-watermark---opacity-low',
            defaultValue: '0.05',
            descriptionKey: 'components.watermark.css_vars.opacity_low',
            descriptionFallback: 'Low opacity level (very subtle).'
        },
        {
            name: '--origam-watermark---opacity-medium',
            defaultValue: '0.1',
            descriptionKey: 'components.watermark.css_vars.opacity_medium',
            descriptionFallback: 'Medium opacity level (default).'
        },
        {
            name: '--origam-watermark---opacity-high',
            defaultValue: '0.2',
            descriptionKey: 'components.watermark.css_vars.opacity_high',
            descriptionFallback: 'High opacity level (more prominent).'
        },
        {
            name: '--origam-watermark---gap-tight',
            defaultValue: '60px',
            descriptionKey: 'components.watermark.css_vars.gap_tight',
            descriptionFallback: 'Tight tile gap (dense pattern).'
        },
        {
            name: '--origam-watermark---gap-medium',
            defaultValue: '120px',
            descriptionKey: 'components.watermark.css_vars.gap_medium',
            descriptionFallback: 'Medium tile gap (default).'
        },
        {
            name: '--origam-watermark---z-index',
            defaultValue: '1',
            descriptionKey: 'components.watermark.css_vars.z_index',
            descriptionFallback: 'Z-index of the overlay layer.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'patternUrl',
            type: 'Ref<string>',
            descriptionKey: 'components.watermark.exposed.pattern_url',
            descriptionFallback: 'Reactive data-URL of the generated SVG tile. Can be used as a background-image in custom CSS.'
        },
        {
            name: 'rootEl',
            type: 'Ref<HTMLElement | null>',
            descriptionKey: 'components.watermark.exposed.root_el',
            descriptionFallback: 'Reference to the root wrapper element.'
        },
        {
            name: 'layerEl',
            type: 'Ref<HTMLElement | null>',
            descriptionKey: 'components.watermark.exposed.layer_el',
            descriptionFallback: 'Reference to the overlay layer element. Used internally by the MutationObserver.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.watermark.a11y.visual_only',
                noteFallback: 'The overlay is purely visual. It carries aria-hidden="true" so screen readers skip it entirely — only the wrapped content is announced.'
            },
            {
                noteKey: 'components.watermark.a11y.pointer_events',
                noteFallback: 'With pointerEvents="none" (default), all interactive elements inside the slot remain keyboard and pointer accessible.'
            },
            {
                noteKey: 'components.watermark.a11y.security',
                noteFallback: 'The watermark is NOT a security feature. antiTamper adds dissuasion only — a determined user can always disable JS. Do not rely on it to protect sensitive data.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/watermark.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'watermark.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.watermark.tokens.color',
                descriptionFallback: 'Default glyph color.'
            },
            {
                tokenPath: 'watermark.opacity-medium',
                value: '0.1',
                type: 'opacity',
                descriptionKey: 'components.watermark.tokens.opacity_medium',
                descriptionFallback: 'Medium opacity level.'
            },
            {
                tokenPath: 'watermark.gap-medium',
                value: '120px',
                type: 'dimension',
                descriptionKey: 'components.watermark.tokens.gap_medium',
                descriptionFallback: 'Default tile gap.'
            },
            {
                tokenPath: 'watermark.font-size-md',
                value: '16px',
                type: 'dimension',
                descriptionKey: 'components.watermark.tokens.font_size_md',
                descriptionFallback: 'Default glyph font size.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.watermark.playground.text',
                labelFallback: 'Text',
                defaultValue: 'CONFIDENTIAL'
            },
            {
                prop: 'opacity',
                kind: 'number',
                labelKey: 'components.watermark.playground.opacity',
                labelFallback: 'Opacity',
                defaultValue: 0.1
            },
            {
                prop: 'angle',
                kind: 'number',
                labelKey: 'components.watermark.playground.angle',
                labelFallback: 'Angle (degrees)',
                defaultValue: -30
            },
            {
                prop: 'gap',
                kind: 'number',
                labelKey: 'components.watermark.playground.gap',
                labelFallback: 'Gap (px)',
                defaultValue: 120
            },
            {
                prop: 'fontSize',
                kind: 'number',
                labelKey: 'components.watermark.playground.font_size',
                labelFallback: 'Font size (px)',
                defaultValue: 16
            },
            {
                prop: 'antiTamper',
                kind: 'switch',
                labelKey: 'components.watermark.playground.anti_tamper',
                labelFallback: 'Anti-tamper',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
