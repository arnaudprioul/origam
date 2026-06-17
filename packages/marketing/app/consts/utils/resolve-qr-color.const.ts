import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_QR_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-qr-color',
    name: 'resolveQrColor',
    category: 'QrCode',
    icon: 'mdi-qrcode',
    descriptionKey: 'utils.catalog.resolve_qr_color.description',
    descriptionFallback: 'Resolve a QR code colour value (intent token or raw colour) to a concrete CSS colour string for a foreground or background role. Falls back to a provided default for empty/null inputs.',
    signature: `function resolveQrColor(
  value: TColor | undefined | null,
  role: 'foreground' | 'background',
  fallback: string
): string`,
    params: [
        {
            name: 'value',
            type: 'TColor | undefined | null',
            required: true,
            descriptionKey: 'utils.detail.resolve_qr_color.param_value',
            descriptionFallback: 'The colour value to resolve. An intent string is mapped to its foreground or background token depending on role; a raw string is used directly; null/undefined/empty returns the fallback.',
        },
        {
            name: 'role',
            type: "'foreground' | 'background'",
            required: true,
            descriptionKey: 'utils.detail.resolve_qr_color.param_role',
            descriptionFallback: "Determines which token to use for intent strings: 'foreground' maps to fg-subtle, 'background' maps to the intent background token.",
        },
        {
            name: 'fallback',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.resolve_qr_color.param_fallback',
            descriptionFallback: 'Default CSS colour string returned when value is null, undefined, or empty.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.resolve_qr_color.returns',
        descriptionFallback: 'The resolved CSS colour string (intent token var or raw value) or the fallback string.',
    },
    sourceFile: 'packages/ds/src/utils/QrCode/qr-code-adapters.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_qr_color.example_basic',
            titleFallback: 'Resolve foreground and background colours',
            code: `import { resolveQrColor } from 'origam'

resolveQrColor('primary', 'foreground', '#000000')
// → 'var(--origam-color-primary-fg-subtle)'

resolveQrColor('primary', 'background', '#ffffff')
// → 'var(--origam-color-primary-bg)'

resolveQrColor(null, 'foreground', '#000000')
// → '#000000'`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-qr-corner-radius', 'resolve-bracket-surface', 'resolve-bracket-foreground'],
}
