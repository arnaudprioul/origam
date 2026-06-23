import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GEN_DEFAULTS_UTIL_DOC: IUtilDoc = {
    slug: 'gen-defaults',
    name: 'genDefaults',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.gen_defaults.description',
    descriptionFallback: 'Return the default IGoToOptions object used by the useGoTo scroll-animation composable. Provides the built-in easing functions (linear, easeInOutCubic, …) and sensible defaults for duration, offset, and container.',
    signature: `function genDefaults(): Partial<IGoToOptions>`,
    params: [],
    returns: {
        type: 'Partial<IGoToOptions>',
        descriptionKey: 'utils.detail.gen_defaults.returns',
        descriptionFallback: 'Default options including duration (300 ms), offset (0), easing (easeInOutCubic), and a patterns map with standard easing functions.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.gen_defaults.example_basic',
            titleFallback: 'Inspect or extend the scroll defaults',
            code: `import { genDefaults } from 'origam'

const defaults = genDefaults()
// defaults.duration      → 300
// defaults.easing        → 'easeInOutCubic'
// defaults.patterns.linear → (t) => t`,
            lang: 'typescript',
        },
    ],
    related: ['merge-deep'],
}
