import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CSS_COLOR_REGEX_CONST_DOC: IConstDoc = {
    slug: 'css-color-regex',
    name: 'CSS_COLOR_REGEX',
    category: 'Color',
    descriptionKey: 'consts.catalog.css_color_regex.description',
    descriptionFallback: 'Regular expression that matches CSS functional color notations such as rgb(), rgba(), hsl() and hsla(). Captures two named groups: fn (the function name) and values (the comma-separated channel arguments). Used by parseColor to dispatch to the right COLOR_MAPPERS entry.',
    definition: `export const CSS_COLOR_REGEX = /^(?<fn>(?:rgb|hsl)a?)\\((?<values>.+)\\)/`,
    value: '/^(?<fn>(?:rgb|hsl)a?)\\((?<values>.+)\\)/',
    usedBy: [
        { name: 'useColor' },
        { name: 'parseColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.css_color_regex.example',
            titleFallback: 'Matching a CSS color string',
            code: `import { CSS_COLOR_REGEX } from 'origam'

const m = CSS_COLOR_REGEX.exec('rgba(255, 0, 128, 0.5)')
// m.groups.fn     → 'rgba'
// m.groups.values → '255, 0, 128, 0.5'`,
            lang: 'typescript',
        },
    ],
}
