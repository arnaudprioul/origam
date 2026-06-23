import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BORDER_REGEX_CONST_DOC: IConstDoc = {
    slug: 'border-regex',
    name: 'BORDER_REGEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.border_regex.description',
    descriptionFallback: 'Regular expression that parses a free-form border shorthand value into named capture groups: width, style, and color. Supports hex literals, CSS functions (rgb/hsl/rgba), CSS custom properties (var(--…)), and named keywords. The var() alternative is placed before the bare [A-Za-z]+ branch to avoid eating "var" as a keyword.',
    definition: `export const BORDER_REGEX = /^(?<width>...)(?<style>...)(?<color>...)$/`,
    value: 'RegExp — see sourceFile for full pattern',
    usedBy: [
        { name: 'useBorder' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/border.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.border_regex.example',
            titleFallback: 'Parsing a border shorthand value',
            code: `import { BORDER_REGEX } from 'origam'

const m = '2px solid #ff0000'.match(BORDER_REGEX)
// m?.groups?.width  → '2px'
// m?.groups?.style  → 'solid'
// m?.groups?.color  → '#ff0000'`,
            lang: 'typescript',
        },
    ],
}
