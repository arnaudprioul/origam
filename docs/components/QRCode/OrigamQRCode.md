# OrigamQrCode

Native SVG QR-code renderer powered by
[`qrcode-generator`](https://www.npmjs.com/package/qr-code-generator)
(~5 kB minified, pure JavaScript, no canvas dependency). Produces a
scalable, themeable matrix that inherits the parent's `color` by
default — drop it into any layout, swap the surrounding theme, the
QR re-paints with the right foreground without a re-encode.

## Quick start

```vue
<template>
    <origam-qr-code
        value="https://origam.dev"
        :size="240"
        error-correction-level="M"
    />

    <origam-qr-code
        value="WIFI:T:WPA;S:origam-guest;P:welcome2026;;"
        :size="200"
        error-correction-level="Q"
    />

    <origam-qr-code
        value="https://origam.dev/qr-code-with-logo"
        error-correction-level="H"
        :logo="{ src: '/logo.svg', size: 0.2 }"
        :size="240"
    />
</template>
```

## Props

| Prop                   | Type                          | Default          | Notes                                                                                          |
|------------------------|-------------------------------|------------------|------------------------------------------------------------------------------------------------|
| `value`                | `string`                      | required         | Text or URL to encode (UTF-8).                                                                 |
| `size`                 | `number \| string`            | `240`            | Pixel number or any CSS dimension (`'14rem'`, `'min(80vw, 320px)'`).                           |
| `errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'`    | `'M'`            | Reed-Solomon redundancy budget — see the matrix below.                                         |
| `foreground`           | `string`                      | `'currentColor'` | Module fill colour. Defaults to inherit so theme switches work out-of-the-box.                 |
| `background`           | `string`                      | `'transparent'`  | Matrix + quiet-zone fill. `'transparent'` keeps the parent surface visible.                    |
| `margin`               | `number`                      | `4`              | Quiet-zone width (in modules). ISO/IEC 18004 recommends ≥4.                                    |
| `logo`                 | `IQrCodeLogo`                 | —                | Optional centred overlay — see [Logo overlay](#logo-overlay).                                  |
| `cornerRadius`         | `number`                      | `0`              | Per-module corner radius in module units (`0.5` = circles).                                    |
| `ariaLabel`            | `string`                      | —                | Accessible label. Defaults to `"QR code for {value}"`.                                         |
| `tag`                  | `string`                      | `'div'`          | Wrapper element.                                                                               |
| `class`                | `string \| array \| object`   | —                |                                                                                                |
| `style`                | `string \| array \| object`   | —                |                                                                                                |

## Error correction levels

| Level | Recovery | Recommended for                                                       |
|-------|----------|-----------------------------------------------------------------------|
| `L`   | ~7%      | Clean digital display, dense payload, no overlay.                     |
| `M`   | ~15%     | Default — balanced for screen and clean print without overlay.        |
| `Q`   | ~25%     | Outdoor / print surface at risk of light damage; small logo overlay.  |
| `H`   | ~30%     | Marketing-style codes with a centred logo (up to ~25–30% width).      |

Bumping the level **grows** the matrix for the same payload. Take that
into account when designing for a fixed physical footprint — going
from `L` to `H` on a long URL can push the matrix from a 25×25 to a
33×33 grid, and the per-module size shrinks proportionally.

## Logo overlay

```vue
<origam-qr-code
    value="https://origam.dev"
    error-correction-level="H"
    :logo="{
        src: '/brand-logo.svg',
        size: 0.22,
        padding: 8,
        background: '#ffffff'
    }"
/>
```

The overlay paints **on top** of the matrix — every module beneath
the overlay is obscured and has to be reconstructed via the
Reed-Solomon redundancy budget. Guidelines:

| `errorCorrectionLevel` | Maximum overlay (`size`) |
|------------------------|--------------------------|
| `L`                    | do not use a logo        |
| `M`                    | ≤ 0.10                   |
| `Q`                    | ≤ 0.20                   |
| `H`                    | ≤ 0.25 – 0.30            |

Above `0.30` the composable surfaces a `console.warn` — no
error-correction level can reliably reconstruct that much loss.

## Scannability tips

- **Contrast** — keep the foreground / background luminance contrast
  ≥ 4.5:1. Inverted codes (light modules on dark surface) work in
  practice but some legacy scanners fail; test on a real device.
- **Physical size** — for a printed code, the rule of thumb is
  `scan_distance / 10 ≈ matrix_width`. A 240 px / 6 cm code is
  comfortable at arm's length; a 480 px / 12 cm code is needed for a
  poster meant to be scanned from 1 metre.
- **Quiet zone** — the default `margin=4` is mandatory. Reducing it
  below 4 makes the matrix harder to detect against busy backgrounds.
- **Don't recolour blindly** — `currentColor` foreground works well
  in any theme, but pairing it with a contrasting `background` is
  what lets the scanner detect the matrix boundaries.

## Accessibility

The component renders inside a `role="img"` element with an
`aria-label` derived from `value` (or the explicit `ariaLabel` prop).
Screen readers announce the underlying payload — useful for URLs and
plain-text codes; consider a custom `ariaLabel` for opaque payloads
(magic links, signed tokens, …) where the raw value is meaningless to
a human listener.

Because the SVG is decorative for sighted users (the meaning is in
the scan), no visible alternative text is provided — the `aria-label`
is exactly the accessibility contract.

## SSR

The renderer is SSR-safe. `qrcode-generator` is pure JavaScript with
no DOM access, and the SVG is emitted as a string via `v-html`. The
matrix encodes identically on server and client — no hydration
mismatch.

## Slots

The component does not expose slots in v2.3. The roadmap for a
`#center` scoped slot (custom logo / icon at the centre, with the
reserved-square size passed to the consumer) is tracked in the
composable's TypeScript signature — `useQrCode` already exposes
`modules` and `size`, so anyone who needs a fully custom render can
drop down to the composable and paint their own SVG.

## Composable — `useQrCode`

```ts
import { useQrCode } from '@origam/composables'

const { svg, modules, size } = useQrCode(valueRef, {
    errorCorrectionLevel: 'H',
    foreground: '#000',
    background: '#fff'
})
```

- `svg: ComputedRef<string>` — ready-to-mount SVG fragment.
- `modules: ComputedRef<boolean[][]>` — raw N×N matrix (`true` = dark).
- `size: ComputedRef<number>` — matrix width in modules.

The composable caches the latest 16 matrices in a module-level LRU
keyed on `value + errorCorrectionLevel`. Re-renders with the same
payload reuse the cached matrix, so the only cost is the SVG-string
build.
