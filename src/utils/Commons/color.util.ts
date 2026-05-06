import {
    BCO,
    BLK_CLMP,
    BLK_THRS,
    CIELAB_FORWARD_TRANSFORM,
    CIELAB_REVERSE_TRANSFORM,
    COLOR_DELTA_Y_MIN,
    COLOR_MAPPERS,
    CSS_COLOR_REGEX,
    CSS_NAMED_COLORS,
    GCO,
    LO_CLIP,
    LO_CON_FACTOR,
    LO_CON_OFFSET,
    LO_CON_THRESH,
    MAIN_TRC,
    NORM_BG,
    NORM_TXT,
    RCO,
    REV_BG,
    REV_TXT,
    SCALE_B_O_W,
    SCALE_W_O_B,
    SRGB_FORWARD_MATRIX,
    SRGB_FORWARD_TRANSFORM,
    SRGB_REVERSE_MATRIX,
    SRGB_REVERSE_TRANSFORM
} from '../../consts'

import type { TColorType, THex, THSLA, THSVA, TLAB, TRGBA, TXYZ } from '../../types'

import { chunk, clamp, consoleWarn, has, int, padEnd } from '../../utils'

/**
 * Recognise any string the CSS engine treats as a colour:
 *   - hex (`#abc`, `#aabbcc`, `#aabbccdd`)
 *   - functional notation (`rgb()`, `rgba()`, `hsl()`, `hsla()`,
 *     `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color()`)
 *   - CSS variable (`var(--…)`)
 *   - one of the 148 named colours OR a CSS-wide keyword
 *     (`transparent`, `currentColor`, `inherit`, …)
 */
export function isCssColor (color?: string | null | false): boolean {
    return !!color && (
        /^(#|var\(--|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\()/i.test(color) ||
        CSS_NAMED_COLORS.has(color.toLowerCase())
    )
}

export function isParsableColor (color: string): boolean {
    return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color)
}

export function parseColor (color: TColorType): TRGBA {
    if (typeof color === 'number') {
        if (isNaN(color) || color < 0 || color > 0xFFFFFF) { // int can't have opacity
            consoleWarn(`'${color}' is not a valid hex color`)
        }

        return {
            r: (color & 0xFF0000) >> 16,
            g: (color & 0xFF00) >> 8,
            b: (color & 0xFF)
        }
    } else if (typeof color === 'string' && CSS_COLOR_REGEX.test(color)) {
        const {groups} = color.match(CSS_COLOR_REGEX)!
        const {fn, values} = groups as { fn: keyof typeof COLOR_MAPPERS, values: string }
        const realValues = values.split(/,\s*/)
            .map(v => {
                if (v.endsWith('%') && ['hsl', 'hsla', 'hsv', 'hsva'].includes(fn)) {
                    return parseFloat(v) / 100
                } else {
                    return parseFloat(v)
                }
            }) as [number, number, number, number?]

        return COLOR_MAPPERS[fn](...realValues)
    } else if (typeof color === 'string') {
        let hex = color.startsWith('#') ? color.slice(1) : color

        if ([3, 4].includes(hex.length)) {
            hex = hex.split('').map(char => char + char).join('')
        } else if (![6, 8].includes(hex.length)) {
            consoleWarn(`'${color}' is not a valid hex(a) color`)
        }

        const integer = int(hex, 16)
        if (isNaN(integer) || integer < 0 || integer > 0xFFFFFFFF) {
            consoleWarn(`'${color}' is not a valid hex(a) color`)
        }

        return HexToRGB(hex as THex)
    } else if (typeof color === 'object') {
        if (has(color, ['r', 'g', 'b'])) {
            return color
        } else if (has(color, ['h', 's', 'l'])) {
            return HSVtoRGB(HSLtoHSV(color))
        } else if (has(color, ['h', 's', 'v'])) {
            return HSVtoRGB(color)
        }
    }

    throw new TypeError(`Invalid color: ${color == null ? color : (String(color) || (color as any).constructor.name)}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)
}

export function getForeground (color: TColorType) {
    const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)))
    const whiteContrast = Math.abs(APCAcontrast(parseColor(0xffffff), parseColor(color)))

    // Prefer white text if both have an acceptable contrast ratio
    return whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000'
}

export function HSLtoRGB (hsla: THSLA): TRGBA {
    return HSVtoRGB(HSLtoHSV(hsla))
}

export function RGBtoHSV (rgba: TRGBA): THSVA {
    if (!rgba) return {h: 0, s: 1, v: 1, a: 1}

    const r = rgba.r / 255
    const g = rgba.g / 255
    const b = rgba.b / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let h = 0

    if (max !== min) {
        if (max === r) {
            h = 60 * (0 + ((g - b) / (max - min)))
        } else if (max === g) {
            h = 60 * (2 + ((b - r) / (max - min)))
        } else if (max === b) {
            h = 60 * (4 + ((r - g) / (max - min)))
        }
    }

    if (h < 0) h = h + 360

    const s = max === 0 ? 0 : (max - min) / max
    const hsv = [h, s, max]

    return {h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a}
}

export function HSVtoHSL (hsva: THSVA): THSLA {
    const {h, s, v, a} = hsva

    const l = v - (v * s / 2)

    const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

    return {h, s: sprime, l, a}
}

export function HSLtoHSV (hsl: THSLA): THSVA {
    const {h, s, l, a} = hsl

    const v = l + s * Math.min(l, 1 - l)

    const sprime = v === 0 ? 0 : 2 - (2 * l / v)

    return {h, s: sprime, v, a}
}

export function RGBtoCSS ({r, g, b, a}: TRGBA): string {
    return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

export function HSVtoCSS (hsva: THSVA): string {
    return RGBtoCSS(HSVtoRGB(hsva))
}

export function toHex (v: number) {
    const h = Math.round(v).toString(16)
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
}

export function RGBtoHex ({r, g, b, a}: TRGBA): THex {
    return `#${[
        toHex(r),
        toHex(g),
        toHex(b),
        a !== undefined ? toHex(Math.round(a * 255)) : ''
    ].join('')}` as THex
}

export function HexToRGB (hex: THex): TRGBA {
    hex = parseHex(hex)
    const [r, g, b, a] = chunk(hex, 2).map((c: string) => int(c, 16))
    const alpha = a === undefined ? a : (a / 255)

    return {r, g, b, a: alpha}
}

export function HexToHSV (hex: THex): THSVA {
    const rgb = HexToRGB(hex)
    return RGBtoHSV(rgb)
}

export function HSVtoHex (hsva: THSVA): THex {
    return RGBtoHex(HSVtoRGB(hsva))
}

export function HSVtoRGB (hsva: THSVA): TRGBA {
    const {h, s, v, a} = hsva
    const f = (n: number) => {
        const k = (n + (h / 60)) % 6
        return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
    }

    const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255))

    return {r: rgb[0], g: rgb[1], b: rgb[2], a}
}

export function parseHex (hex: string): THex {
    if (hex.startsWith('#')) {
        hex = hex.slice(1)
    }

    hex = hex.replace(/([^0-9a-f])/gi, 'F')

    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(x => x + x).join('')
    }

    if (hex.length !== 6) {
        hex = padEnd(padEnd(hex, 6), 8, 'F')
    }

    return hex as THex
}

export function lighten (value: TRGBA, amount: number): TRGBA {
    const lab = XyztoLab(RgbtoXyz(value))
    lab[0] = lab[0] + amount * 10

    return XyzToRgb(LabtoXyz(lab))
}

export function darken (value: TRGBA, amount: number): TRGBA {
    const lab = XyztoLab(RgbtoXyz(value))
    lab[0] = lab[0] - amount * 10

    return XyzToRgb(LabtoXyz(lab))
}

export function getContrast (first: TColorType, second: TColorType) {
    const l1 = getLuma(first)
    const l2 = getLuma(second)

    const light = Math.max(l1, l2)
    const dark = Math.min(l1, l2)

    return (light + 0.05) / (dark + 0.05)
}

export function getLuma (color: TColorType) {
    const rgb = parseColor(color)

    return RgbtoXyz(rgb)[1]
}

export function parseGradient (
    gradient: string,
    colors: Record<string, Record<string, string>>
) {
    return gradient.replace(/([a-z]+(\s[a-z]+-[1-5])?)(?=$|,)/gi, x => {
        return classToHex(x, colors) || x
    }).replace(/(rgba\()#[0-9a-f]+(?=,)/gi, x => {
        return 'rgba(' + Object.values(HexToRGB(parseHex(x.replace(/rgba\(/, '')))).slice(0, 3).join(',')
    })
}

export function classToHex (
    color: string,
    colors: Record<string, Record<string, string>>
): string {
    const [colorName, colorModifier] = color
        .toString().trim().replace('-', '').split(' ', 2) as Array<(string | undefined)>

    let hexColor = ''
    if (colorName && colorName in colors) {
        if (colorModifier && colorModifier in colors[colorName]) {
            hexColor = colors[colorName][colorModifier]
        } else if ('base' in colors[colorName]) {
            hexColor = colors[colorName].base
        }
    }

    return hexColor
}

export function XyzToRgb (xyz: TXYZ): TRGBA {
    const rgb: number[] = Array(3)
    const transform = SRGB_FORWARD_TRANSFORM
    const matrix = SRGB_FORWARD_MATRIX

    // Matrix transform, then gamma adjustment
    for (let i = 0; i < 3; ++i) {
        // Rescale back to [0, 255]
        rgb[i] = Math.round(clamp(transform(
            matrix[i][0] * xyz[0] +
            matrix[i][1] * xyz[1] +
            matrix[i][2] * xyz[2]
        )) * 255)
    }

    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    }
}

export function RgbtoXyz ({r, g, b}: TRGBA): TXYZ {
    const xyz: TXYZ = [0, 0, 0]
    const transform = SRGB_REVERSE_TRANSFORM
    const matrix = SRGB_REVERSE_MATRIX

    // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
    const rLinear = transform(r / 255)
    const gLinear = transform(g / 255)
    const bLinear = transform(b / 255)

    // Matrix color space transform
    for (let i = 0; i < 3; ++i) {
        xyz[i] = matrix[i][0] * rLinear + matrix[i][1] * gLinear + matrix[i][2] * bLinear
    }

    return xyz
}

export function XyztoLab (xyz: TXYZ): TLAB {
    const transform = CIELAB_FORWARD_TRANSFORM
    const transformedY = transform(xyz[1])

    return [
        116 * transformedY - 16,
        500 * (transform(xyz[0] / 0.95047) - transformedY),
        200 * (transformedY - transform(xyz[2] / 1.08883))
    ]
}

export function LabtoXyz (lab: TLAB): TXYZ {
    const transform = CIELAB_REVERSE_TRANSFORM
    const Ln = (lab[0] + 16) / 116
    return [
        transform(Ln + lab[1] / 500) * 0.95047,
        transform(Ln),
        transform(Ln - lab[2] / 200) * 1.08883
    ]
}

export function APCAcontrast (text: TRGBA, background: TRGBA) {
    // Linearize sRGB
    const Rtxt = (text.r / 255) ** MAIN_TRC
    const Gtxt = (text.g / 255) ** MAIN_TRC
    const Btxt = (text.b / 255) ** MAIN_TRC

    const Rbg = (background.r / 255) ** MAIN_TRC
    const Gbg = (background.g / 255) ** MAIN_TRC
    const Bbg = (background.b / 255) ** MAIN_TRC

    // Apply the standard coefficients and sum to Y
    let Ytxt = (Rtxt * RCO) + (Gtxt * GCO) + (Btxt * BCO)
    let Ybg = (Rbg * RCO) + (Gbg * GCO) + (Bbg * BCO)

    // Soft clamp Y when near black.
    // Now clamping all colors to prevent crossover errors
    if (Ytxt <= BLK_THRS) Ytxt += (BLK_THRS - Ytxt) ** BLK_CLMP
    if (Ybg <= BLK_THRS) Ybg += (BLK_THRS - Ybg) ** BLK_CLMP

    // Return 0 Early for extremely low ∆Y (lint trap #1)
    if (Math.abs(Ybg - Ytxt) < COLOR_DELTA_Y_MIN) return 0.0

    // SAPC CONTRAST

    let outputContrast: number // For weighted final values
    if (Ybg > Ytxt) {
        // For normal polarity, black text on white
        // Calculate the SAPC contrast value and scale

        const SAPC = ((Ybg ** NORM_BG) - (Ytxt ** NORM_TXT)) * SCALE_B_O_W

        // NEW! SAPC SmoothScale™
        // Low Contrast Smooth Scale Rollout to prevent polarity reversal
        // and also a low clip for very low contrasts (lint trap #2)
        // much of this is for very low contrasts, less than 10
        // therefore for most reversing needs, only LO_CON_OFFSET is important
        outputContrast =
            (SAPC < LO_CLIP) ? 0.0
                : (SAPC < LO_CON_THRESH) ? SAPC - SAPC * LO_CON_FACTOR * LO_CON_OFFSET
                    : SAPC - LO_CON_OFFSET
    } else {
        // For reverse polarity, light text on dark
        // WoB should always return negative value.

        const SAPC = ((Ybg ** REV_BG) - (Ytxt ** REV_TXT)) * SCALE_W_O_B

        outputContrast =
            (SAPC > -LO_CLIP) ? 0.0
                : (SAPC > -LO_CON_THRESH) ? SAPC - SAPC * LO_CON_FACTOR * LO_CON_OFFSET
                    : SAPC + LO_CON_OFFSET
    }

    return outputContrast * 100
}
