import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_QR_CORNER_RADIUS_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-qr-corner-radius',
    name: 'resolveQrCornerRadius',
    category: 'QrCode',
    icon: 'mdi-qrcode-scan',
    descriptionKey: 'utils.catalog.resolve_qr_corner_radius.description',
    descriptionFallback: 'Convert a DS-shaped rounded value (named rung, number, boolean, or string) into a per-module corner radius in the [0, 0.5] range expected by the QR encoder. CSS dimension strings fall back to 0.',
    signature: `function resolveQrCornerRadius(
  value: TRounded | number | boolean | string | null | undefined
): number`,
    params: [
        {
            name: 'value',
            type: 'TRounded | number | boolean | string | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.resolve_qr_corner_radius.param_value',
            descriptionFallback: 'A DS rounded value: a named rung string ("x-small" … "x-large"), true (0.5 = fully rounded), false/null/undefined (0 = square), a number (clamped to [0, 0.5]), or a CSS dimension string (falls back to 0).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.resolve_qr_corner_radius.returns',
        descriptionFallback: 'A corner radius in [0, 0.5] module units. 0 = square modules, 0.5 = fully rounded dots.',
    },
    sourceFile: 'packages/ds/src/utils/QrCode/qr-code-adapters.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_qr_corner_radius.example_basic',
            titleFallback: 'Resolve various rounded values to module units',
            code: `import { resolveQrCornerRadius } from 'origam'

resolveQrCornerRadius('x-small')  // → 0.10
resolveQrCornerRadius('large')    // → 0.40
resolveQrCornerRadius(true)       // → 0.50
resolveQrCornerRadius(false)      // → 0
resolveQrCornerRadius(0.3)        // → 0.30
resolveQrCornerRadius('4px')      // → 0 (CSS units not supported)`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-qr-color', 'resolve-bracket-radius'],
}
