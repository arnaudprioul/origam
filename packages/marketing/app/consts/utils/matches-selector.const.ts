import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MATCHES_SELECTOR_UTIL_DOC: IUtilDoc = {
    slug: 'matches-selector',
    name: 'matchesSelector',
    category: 'Commons',
    icon: 'mdi-target',
    descriptionKey: 'utils.catalog.matches_selector.description',
    descriptionFallback: 'Safely tests whether a DOM element matches a CSS selector. Returns null when the browser does not support the CSS.supports selector() query, and null on error.',
    signature: `function matchesSelector(el: Element | undefined, selector: string): boolean | null`,
    params: [
        {
            name: 'el',
            type: 'Element | undefined',
            required: true,
            descriptionKey: 'utils.detail.matches_selector.param_el',
            descriptionFallback: 'The DOM element to test. Returns null when undefined.',
        },
        {
            name: 'selector',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.matches_selector.param_selector',
            descriptionFallback: 'A valid CSS selector string (e.g. ":focus-visible", "[data-active]").',
        },
    ],
    returns: {
        type: 'boolean | null',
        descriptionKey: 'utils.detail.matches_selector.returns',
        descriptionFallback: 'true / false when the browser supports selector() and el.matches() succeeds. null when unsupported, el is undefined, or an error is thrown.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.matches_selector.example_basic',
            titleFallback: 'Check if an element is focused',
            code: `import { matchesSelector } from 'origam'

const btn = document.querySelector('button')
matchesSelector(btn, ':focus-visible')  // true / false / null`,
            lang: 'typescript',
        },
    ],
    related: ['focusable-children', 'focus-child'],
}
