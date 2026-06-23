import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const FEATURE_QUERIES_CONST_DOC: IConstDoc = {
    slug: 'feature-queries',
    name: 'FEATURE_QUERIES',
    category: 'CSS Support',
    descriptionKey: 'consts.catalog.feature_queries.description',
    descriptionFallback: 'Catalogue of CSS feature-detection queries consumed by useCssSupport. Each key is a stable feature name mapped to the exact string passed to CSS.supports(). 20 entries covering grid, container queries, :has(), color-mix, anchor positioning, scroll-driven animations, and more.',
    definition: `export const FEATURE_QUERIES = {
    grid:                 'display: grid',
    subgrid:              'grid-template-columns: subgrid',
    flexGap:              'gap: 1px',
    containerQueries:     '(container-type: inline-size)',
    has:                  'selector(:has(*))',
    aspectRatio:          'aspect-ratio: 1',
    colorMix:             'color: color-mix(in srgb, red, blue)',
    accentColor:          'accent-color: red',
    minMaxClamp:          'width: min(10px, 20px)',
    mathFunctions:        'width: calc(min(10px, 20px) + max(5px, 8px))',
    anchorPositioning:    'anchor-name: --foo',
    scrollDrivenAnims:    'animation-timeline: scroll()',
    viewTransitions:      'view-transition-name: foo',
    nestedSelectors:      'selector(& > a)',
    individualTransforms: 'translate: 1px 1px',
    logicalProperties:    'margin-inline: 1px',
    backdropFilter:       'backdrop-filter: blur(1px)',
    fieldSizing:          'field-sizing: content',
    textWrapBalance:      'text-wrap: balance',
    contentVisibility:    'content-visibility: auto',
    masonry:              'grid-template-rows: masonry'
} as const satisfies Record<string, string>`,
    values: [
        { value: "grid: 'display: grid'", descriptionKey: 'consts.detail.feature_queries.grid', descriptionFallback: 'Detects CSS grid layout support.' },
        { value: "subgrid: 'grid-template-columns: subgrid'", descriptionKey: 'consts.detail.feature_queries.subgrid', descriptionFallback: 'Detects CSS subgrid support.' },
        { value: "containerQueries: '(container-type: inline-size)'", descriptionKey: 'consts.detail.feature_queries.container_queries', descriptionFallback: 'Detects CSS container queries support.' },
        { value: "has: 'selector(:has(*))'", descriptionKey: 'consts.detail.feature_queries.has', descriptionFallback: 'Detects the :has() CSS selector.' },
        { value: "colorMix: 'color: color-mix(in srgb, red, blue)'", descriptionKey: 'consts.detail.feature_queries.color_mix', descriptionFallback: 'Detects color-mix() function support.' },
        { value: "anchorPositioning: 'anchor-name: --foo'", descriptionKey: 'consts.detail.feature_queries.anchor_positioning', descriptionFallback: 'Detects CSS anchor positioning support.' },
        { value: "scrollDrivenAnims: 'animation-timeline: scroll()'", descriptionKey: 'consts.detail.feature_queries.scroll_driven_anims', descriptionFallback: 'Detects scroll-driven animations support.' },
        { value: "masonry: 'grid-template-rows: masonry'", descriptionKey: 'consts.detail.feature_queries.masonry', descriptionFallback: 'Detects CSS masonry grid layout support.' },
    ],
    usedBy: [
        { name: 'useCssSupport' },
    ],
    sourceFile: 'packages/ds/src/consts/CssSupport/css-support.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.feature_queries.example',
            titleFallback: 'Adding a custom feature entry',
            code: `import { FEATURE_QUERIES } from 'origam'

// FEATURE_QUERIES provides the 21 built-in queries
// Access an entry directly
const gridQuery = FEATURE_QUERIES.grid // 'display: grid'

// To add a custom feature, extend in useCssSupport`,
            lang: 'typescript',
        },
    ],
}
