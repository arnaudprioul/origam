import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MARGIN_REGEX_CONST_DOC: IConstDoc = {
    slug: 'margin-regex',
    name: 'MARGIN_REGEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.margin_regex.description',
    descriptionFallback: 'Regular expression that validates a CSS shorthand margin/padding string (up to four space-separated values with valid units: px, pt, PC, in, cm, mm, em, rem, %, ex, ch, fr). Used by useMargin and usePadding to distinguish shorthand strings from single token values.',
    definition: `export const MARGIN_REGEX = /^(?<margin>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr)){0,4})$/`,
    value: '/^(?<margin>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr)){0,4})$/',
    usedBy: [
        { name: 'useMargin' },
        { name: 'usePadding' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/margin.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.margin_regex.example',
            titleFallback: 'Validating a CSS shorthand margin string',
            code: `import { MARGIN_REGEX } from 'origam'

// Valid CSS shorthand strings
MARGIN_REGEX.test('8px')           // true
MARGIN_REGEX.test('8px 16px')      // true
MARGIN_REGEX.test('4px 8px 4px 8px') // true

// Token alias — not a shorthand, handle separately
MARGIN_REGEX.test('md')            // false`,
            lang: 'typescript',
        },
    ],
}
