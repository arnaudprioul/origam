import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CSS_NAMED_COLORS_CONST_DOC: IConstDoc = {
    slug: 'css-named-colors',
    name: 'CSS_NAMED_COLORS',
    category: 'Color',
    descriptionKey: 'consts.catalog.css_named_colors.description',
    descriptionFallback: 'Set of the 148 CSS named colors plus the CSS-wide keywords (transparent, currentColor, inherit, initial, unset, revert). Used by isCssColor so consumers can pass color names like "red" or "transparent" directly without going through hex or rgb notation.',
    definition: `export const CSS_NAMED_COLORS = new Set([
    'aliceblue', 'antiquewhite', 'aqua', /* … 145 more entries … */,
    // CSS-wide keywords
    'currentcolor', 'transparent', 'inherit', 'initial', 'unset', 'revert',
])`,
    values: [
        { value: "'transparent'", descriptionKey: 'consts.detail.css_named_colors.transparent', descriptionFallback: 'CSS-wide keyword — fully transparent.' },
        { value: "'currentcolor'", descriptionKey: 'consts.detail.css_named_colors.currentcolor', descriptionFallback: 'CSS-wide keyword — inherits the current text color.' },
        { value: "'inherit'", descriptionKey: 'consts.detail.css_named_colors.inherit', descriptionFallback: 'CSS-wide keyword — inherits the parent value.' },
        { value: "'red'", descriptionKey: 'consts.detail.css_named_colors.red', descriptionFallback: 'Named color — pure red.' },
        { value: "'white'", descriptionKey: 'consts.detail.css_named_colors.white', descriptionFallback: 'Named color — pure white.' },
        { value: "'black'", descriptionKey: 'consts.detail.css_named_colors.black', descriptionFallback: 'Named color — pure black.' },
    ],
    usedBy: [
        { name: 'isCssColor' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.css_named_colors.example',
            titleFallback: 'Checking if a string is a CSS named color',
            code: `import { CSS_NAMED_COLORS } from 'origam'

const isCssNamed = (v: string) =>
  CSS_NAMED_COLORS.has(v.toLowerCase())

isCssNamed('red')         // true
isCssNamed('transparent') // true
isCssNamed('#ff0000')     // false`,
            lang: 'typescript',
        },
    ],
}
