import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CUSTOM_BORDER_RADIUS_REGEX_CONST_DOC: IConstDoc = {
    slug: 'custom-border-radius-regex',
    name: 'CUSTOM_BORDER_RADIUS_REGEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.custom_border_radius_regex.description',
    descriptionFallback: 'Regex that detects free-form CSS border-radius values not covered by the fixed-unit BORDER_RADIUS_REGEX whitelist: custom-property references (var(…)), CSS math functions (calc/clamp/min/max/env), and single lengths with viewport or advanced units (vw, vh, lh, …). Mirrors the convertToUnit escape hatch used by useDimension.',
    definition: `export const CUSTOM_BORDER_RADIUS_REGEX =
  /^(?:var|calc|clamp|min|max|env)\\(.*\\)$|^-?(?:0|[0-9]*\\.?[0-9]+)(?:px|pt|pc|in|cm|mm|q|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vi|vb|vmin|vmax|%)$/i`,
    value: '/^(?:var|calc|clamp|min|max|env)\\(.*\\)$|^-?(?:0|[0-9]*\\.?[0-9]+)(?:px|pt|pc|in|cm|mm|q|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vi|vb|vmin|vmax|%)$/i',
    usedBy: [
        { name: 'useRounded' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/rounded.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.custom_border_radius_regex.example',
            titleFallback: 'Detecting a custom border-radius value',
            code: `import { CUSTOM_BORDER_RADIUS_REGEX } from 'origam'

const isCustom = (v: string) => CUSTOM_BORDER_RADIUS_REGEX.test(v)

isCustom('var(--origam-radius---card)') // true
isCustom('calc(1rem + 2px)')            // true
isCustom('12vw')                        // true
isCustom('sm')                          // false → falls to named variant`,
            lang: 'typescript',
        },
    ],
}
