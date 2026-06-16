/**
 * /components/qr-code — full documentation data for OrigamQrCode.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/QrCode/qr-code.interface.ts      (props)
 *   - packages/ds/src/interfaces/QrCode/qr-code-logo.interface.ts  (logo overlay)
 *   - packages/ds/src/components/QrCode/OrigamQrCode.vue           (template BEM)
 *   - packages/ds/tokens/component/qrcode.json                     (CSS tokens)
 *
 * OrigamQrCode is SSR-safe — no window/document/canvas API is touched.
 * The SVG matrix is computed via qrcode-generator and emitted as an
 * inline SVG string. An icon or image overlay can be centered in the matrix.
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

export const QR_CODE_DOC: IComponentDoc = {
    slug: 'qr-code',
    name: 'QrCode',
    tag: 'origam-qr-code',
    icon: 'mdi-qrcode',
    category: 'Data Display',
    descriptionKey: 'components.catalog.qr_code.description',
    descriptionFallback: 'SSR-safe SVG QR code renderer with configurable error correction level, quiet zone, module corner radius, optional title, and a centred icon/image overlay. Accepts any text or URL via the value prop.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-qrcode--design',
    docUrl: 'http://localhost:4000/components/QrCode/OrigamQrCode',

    family: [],

    related: [
        {
            slug: 'clipboard',
            name: 'Clipboard',
            kind: 'component',
            descriptionKey: 'components.catalog.clipboard.description',
            descriptionFallback: 'Often paired with QrCode to let users copy the underlying URL to clipboard.'
        }
    ],

    props: [
        // ── QR-specific ──────────────────────────────────────────────────
        {
            name: 'value',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.qr_code.props.value.description',
            descriptionFallback: 'Text or URL encoded into the QR matrix. UTF-8 is supported via qrcode-generator Byte mode.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.title.description',
            descriptionFallback: 'Optional heading rendered above the QR matrix inside the wrapper.'
        },
        {
            name: 'errorCorrectionLevel',
            type: { label: 'TQrCodeErrorCorrectionLevel', slug: '', kind: 'primitive' },
            defaultValue: "'M'",
            descriptionKey: 'components.qr_code.props.error_correction_level.description',
            descriptionFallback: 'Reed-Solomon redundancy level: L (7%), M (15%), Q (25%), H (30%). Higher levels survive more damage or logo overlay, at the cost of denser modules.'
        },
        {
            name: 'quietZone',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.qr_code.props.quiet_zone.description',
            descriptionFallback: 'Number of modules reserved as quiet-zone padding around the matrix. ISO mandates ≥ 4.'
        },
        {
            name: 'qrCodeProps',
            type: { label: 'IQrCodeOptions', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.qr_code_props.description',
            descriptionFallback: 'Per-matrix overrides applied inside the SVG (not on the wrapper). Accepts color, bgColor, rounded to style modules independently from the wrapper.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.icon.description',
            descriptionFallback: 'Optional centred icon overlay rendered via OrigamIcon on top of the matrix. Coexists with image; the #center slot overrides both.'
        },
        {
            name: 'image',
            type: { label: 'string | ISrcObject', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.image.description',
            descriptionFallback: 'Optional centred image overlay. Accepts a raw URL or ISrcObject (src, srcset, alt…). Rendered as an OrigamAvatar.'
        },
        {
            name: 'ariaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '"QR code for {value}"',
            descriptionKey: 'components.qr_code.props.aria_label.description',
            descriptionFallback: 'Accessible label for the QR code (aria-label on the root element). Falls back to "QR code for {value}" when omitted.'
        },
        // ── IColorProps / IBgColorProps ───────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.color.description',
            descriptionFallback: 'Wrapper text color. The SVG modules inherit this via fill="currentColor" unless qrCodeProps.color overrides.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.bg_color.description',
            descriptionFallback: 'Wrapper background color.'
        },
        // ── IRoundedProps ─────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.rounded.description',
            descriptionFallback: 'Wrapper border-radius. Use qrCodeProps.rounded to apply per-module corner rounding to the QR matrix.'
        },
        // ── IBorderProps ──────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.qr_code.props.border.description',
            descriptionFallback: 'Applies a border to the wrapper element.'
        },
        // ── IElevationProps ───────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the wrapper.'
        },
        // ── ISizeProps ────────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.qr_code.props.size.description',
            descriptionFallback: 'Width and height of the wrapper element. Token sizes: sm=120px, md=240px, lg=480px.'
        },
        // ── IPaddingProps / IMarginProps ──────────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.padding.description',
            descriptionFallback: 'Inner padding of the wrapper around the QR SVG.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.qr_code.props.margin.description',
            descriptionFallback: 'Outer margin of the wrapper element.'
        },
        // ── ITagProps ─────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.qr_code.props.tag.description',
            descriptionFallback: 'Root HTML tag for the wrapper element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'center',
            slotProps: '{ size: number }',
            descriptionKey: 'components.qr_code.slots.center.description',
            descriptionFallback: 'Replaces the default icon/image overlay at the center of the QR matrix. Receives the resolved size of the central reserved square in module units. When provided, both icon and image props are ignored.'
        }
    ],

    examples: [
        {
            titleKey: 'components.qr_code.examples.basic.title',
            titleFallback: 'Basic QR code',
            lang: 'vue',
            code: `<template>
  <origam-qr-code
    value="https://origam.dev"
    size="default"
    aria-label="QR code for origam.dev"
  />
</template>`
        },
        {
            titleKey: 'components.qr_code.examples.icon.title',
            titleFallback: 'With centred icon overlay',
            lang: 'vue',
            code: `<template>
  <origam-qr-code
    value="https://origam.dev"
    icon="mdi-vuejs"
    error-correction-level="H"
    :qr-code-props="{ rounded: 'sm' }"
    size="default"
  />
</template>`
        },
        {
            titleKey: 'components.qr_code.examples.custom.title',
            titleFallback: 'Custom module style',
            lang: 'vue',
            code: `<template>
  <origam-qr-code
    value="https://origam.dev"
    color="primary"
    :qr-code-props="{
      color: 'primary',
      bgColor: 'surface',
      rounded: 'md'
    }"
    rounded="lg"
    border
    elevation="md"
    size="default"
  />
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: { value: 'https://origam.dev' },
            ariaLabel: 'QR code for origam.dev'
        },
        {
            label: 'with icon',
            props: { value: 'https://origam.dev', icon: 'mdi-vuejs', errorCorrectionLevel: 'H' },
            ariaLabel: 'QR code with Vue icon overlay'
        },
        {
            label: 'card',
            props: { value: 'https://origam.dev', border: true, rounded: 'lg', elevation: 'sm', padding: '3' },
            ariaLabel: 'QR code as card'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-qr-code',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamQrCode',
        svgDesc: 'Schematic of the QrCode component with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="200" y="20" width="300" height="240" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5"/>
  <text x="350" y="50" font-size="9" fill="var(--origam-color__text---secondary, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-qr-code__title</text>
  <rect x="220" y="58" width="260" height="160" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="135" font-size="32" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">⬛</text>
  <text x="350" y="160" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-qr-code__svg-host</text>
  <circle cx="350" cy="120" r="24" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1"/>
  <text x="350" y="125" font-size="14" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">◆</text>
  <text x="350" y="235" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-qr-code__center (icon/image/#center slot)</text>
  <circle cx="196" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="196" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="196" cy="50" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="196" y="54" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="196" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="196" y="66" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="324" cy="100" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="324" y="104" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="196" cy="232" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="196" y="236" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-qr-code&gt;</code> — 5 parts: wrapper root, optional title, SVG host, inline SVG matrix, and the centred overlay zone (#center slot).',
        legend: [
            {
                num: 1,
                cls: '.origam-qr-code',
                descriptionKey: 'components.qr_code.anatomy.root',
                descriptionFallback: 'Root wrapper element. Has role="img" and aria-label. Applies wrapper-level color, bgColor, rounded, border, elevation, size, padding, margin.'
            },
            {
                num: 2,
                cls: '.origam-qr-code__title',
                descriptionKey: 'components.qr_code.anatomy.title',
                descriptionFallback: 'Optional heading rendered above the SVG. Only present when the title prop is set.'
            },
            {
                num: 3,
                cls: '.origam-qr-code__svg-host',
                descriptionKey: 'components.qr_code.anatomy.svg_host',
                descriptionFallback: 'Container div that hosts the inline SVG element and the center overlay. Manages the relative positioning context.'
            },
            {
                num: 4,
                cls: 'inline SVG (matrix)',
                descriptionKey: 'components.qr_code.anatomy.svg',
                descriptionFallback: 'The QR matrix rendered as an inline SVG by qrcode-generator. Module color and corner radius are applied here from qrCodeProps.'
            },
            {
                num: 5,
                cls: '.origam-qr-code__center',
                descriptionKey: 'components.qr_code.anatomy.center',
                descriptionFallback: 'Absolutely centered overlay zone. Renders the icon (origam-qr-code__center-icon), image (origam-qr-code__center-avatar), or #center slot. aria-hidden="true".'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-qr-code" role="img" :aria-label="resolvedAriaLabel">
  <!-- optional title above the matrix -->
  <div v-if="title" class="origam-qr-code__title">{{ title }}</div>

  <!-- SVG host + center overlay -->
  <div class="origam-qr-code__svg-host">
    <!-- inline SVG generated by qrcode-generator -->
    <!-- v-html: the SVG string is sanitized and contains only geometric elements -->

    <!-- centred overlay (icon / image / #center slot) -->
    <div class="origam-qr-code__center" aria-hidden="true">
      <slot name="center" :size="centerSize">
        <origam-avatar
          v-if="image"
          class="origam-qr-code__center-avatar"
        />
        <origam-icon
          v-else-if="icon"
          class="origam-qr-code__center-icon"
          :icon="icon"
        />
      </slot>
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-qr-code',
                descriptionKey: 'components.qr_code.anatomy.root',
                descriptionFallback: 'Root wrapper with role="img".'
            },
            {
                cls: 'origam-qr-code__title',
                descriptionKey: 'components.qr_code.anatomy.title',
                descriptionFallback: 'Optional title heading above the matrix.'
            },
            {
                cls: 'origam-qr-code__svg-host',
                descriptionKey: 'components.qr_code.anatomy.svg_host',
                descriptionFallback: 'SVG + center overlay container.'
            },
            {
                cls: 'origam-qr-code__center',
                descriptionKey: 'components.qr_code.anatomy.center',
                descriptionFallback: 'Absolutely centered overlay for icon/image/slot. aria-hidden="true".'
            },
            {
                cls: 'origam-qr-code__center-icon',
                descriptionKey: 'components.qr_code.anatomy.center_icon',
                descriptionFallback: 'OrigamIcon rendered at the center when icon prop is set.'
            },
            {
                cls: 'origam-qr-code__center-avatar',
                descriptionKey: 'components.qr_code.anatomy.center_avatar',
                descriptionFallback: 'OrigamAvatar rendered at the center when image prop is set.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-qrcode---foreground',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.qr_code.css_vars.foreground',
            descriptionFallback: 'Default module (dark square) fill color.'
        },
        {
            name: '--origam-qrcode---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.qr_code.css_vars.background_color',
            descriptionFallback: 'Default quiet-zone and SVG background color.'
        },
        {
            name: '--origam-qrcode---size-sm',
            defaultValue: '120px',
            descriptionKey: 'components.qr_code.css_vars.size_sm',
            descriptionFallback: 'Wrapper width/height for size="small".'
        },
        {
            name: '--origam-qrcode---size-md',
            defaultValue: '240px',
            descriptionKey: 'components.qr_code.css_vars.size_md',
            descriptionFallback: 'Wrapper width/height for size="default" (medium).'
        },
        {
            name: '--origam-qrcode---size-lg',
            defaultValue: '480px',
            descriptionKey: 'components.qr_code.css_vars.size_lg',
            descriptionFallback: 'Wrapper width/height for size="large".'
        },
        {
            name: '--origam-qrcode__module---corner-radius',
            defaultValue: '0',
            descriptionKey: 'components.qr_code.css_vars.module_corner_radius',
            descriptionFallback: 'Per-module corner radius in module units. 0 = square, 0.5 = circle.'
        },
        {
            name: '--origam-qrcode__logo---padding',
            defaultValue: '{space.2}',
            descriptionKey: 'components.qr_code.css_vars.logo_padding',
            descriptionFallback: 'Pixel padding of the opaque backdrop drawn around the logo overlay.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['img'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.qr_code.a11y.role_note',
                noteFallback: 'The root element has role="img" and aria-label. When ariaLabel is not set, it falls back to "QR code for {value}". This ensures screen readers announce the purpose without exposing the raw URL twice.'
            },
            {
                noteKey: 'components.qr_code.a11y.center_note',
                noteFallback: 'The center overlay (icon, image, or #center slot) is marked aria-hidden="true" since it is purely decorative — the aria-label on the root already conveys the full meaning.'
            },
            {
                noteKey: 'components.qr_code.a11y.error_level_note',
                noteFallback: 'When using a logo overlay, use errorCorrectionLevel="H" (30% redundancy). Lower levels may make the code unscannable when modules are occluded by the overlay.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/qrcode.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Module color and corner-radius are applied at SVG generation time via resolveQrColor / resolveQrCornerRadius utilities.',
        excerpt: [
            {
                tokenPath: 'qrcode.foreground',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.qr_code.tokens.foreground',
                descriptionFallback: 'Default dark module fill color.'
            },
            {
                tokenPath: 'qrcode.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.qr_code.tokens.background_color',
                descriptionFallback: 'Default quiet-zone background.'
            },
            {
                tokenPath: 'qrcode.size-sm',
                value: '120px',
                type: 'dimension',
                descriptionKey: 'components.qr_code.tokens.size_sm',
                descriptionFallback: 'Small wrapper size.'
            },
            {
                tokenPath: 'qrcode.size-md',
                value: '240px',
                type: 'dimension',
                descriptionKey: 'components.qr_code.tokens.size_md',
                descriptionFallback: 'Medium (default) wrapper size.'
            },
            {
                tokenPath: 'qrcode.size-lg',
                value: '480px',
                type: 'dimension',
                descriptionKey: 'components.qr_code.tokens.size_lg',
                descriptionFallback: 'Large wrapper size.'
            },
            {
                tokenPath: 'qrcode.module.corner-radius',
                value: '0',
                type: 'dimension',
                descriptionKey: 'components.qr_code.tokens.module_corner_radius',
                descriptionFallback: 'Default module corner radius (square). Set via qrCodeProps.rounded.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'value',
                kind: 'text',
                labelKey: 'components.qr_code.playground.value',
                labelFallback: 'URL / text',
                defaultValue: 'https://origam.dev'
            },
            {
                prop: 'errorCorrectionLevel',
                kind: 'select',
                labelKey: 'components.qr_code.playground.error_correction_level',
                labelFallback: 'Error correction',
                defaultValue: 'M',
                options: [
                    { label: 'L (7%)', value: 'L' },
                    { label: 'M (15%)', value: 'M' },
                    { label: 'Q (25%)', value: 'Q' },
                    { label: 'H (30%)', value: 'H' }
                ]
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.qr_code.playground.size',
                labelFallback: 'Size',
                defaultValue: 'default',
                options: [
                    { label: 'small (120px)', value: 'small' },
                    { label: 'default (240px)', value: 'default' },
                    { label: 'large (480px)', value: 'large' }
                ]
            },
            {
                prop: 'quietZone',
                kind: 'number',
                labelKey: 'components.qr_code.playground.quiet_zone',
                labelFallback: 'Quiet zone',
                defaultValue: 4
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.qr_code.playground.rounded',
                labelFallback: 'Wrapper rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.qr_code.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
