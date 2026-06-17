import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const RIPPLE_OPTIONS_CONST_DOC: IConstDoc = {
    slug: 'ripple-options',
    name: 'RIPPLE_OPTIONS',
    category: 'Interaction & Animation',
    descriptionKey: 'consts.catalog.ripple_options.description',
    descriptionFallback: 'Default configuration object for the v-ripple directive — defines the CSS class, centering mode, shape, animation duration, easing function, opacity, and initial position of each ripple element.',
    definition: `export const RIPPLE_OPTIONS = {
    class: 'origam-ripple__element',
    center: false,
    circle: false,
    duration: 1000,
    easing: 'ease-out',
    opacity: 0.3,
    x: 0,
    y: 0
} as const`,
    values: [
        { value: "class: 'origam-ripple__element'", descriptionKey: 'consts.detail.ripple_options.class', descriptionFallback: 'CSS class applied to the ripple element.' },
        { value: 'center: false', descriptionKey: 'consts.detail.ripple_options.center', descriptionFallback: 'When true the ripple originates from the element centre, not the click point.' },
        { value: 'circle: false', descriptionKey: 'consts.detail.ripple_options.circle', descriptionFallback: 'When true the ripple is forced to a circular shape.' },
        { value: 'duration: 1000', descriptionKey: 'consts.detail.ripple_options.duration', descriptionFallback: 'Total ripple animation duration in milliseconds.' },
        { value: "easing: 'ease-out'", descriptionKey: 'consts.detail.ripple_options.easing', descriptionFallback: 'CSS easing function applied to the ripple expand animation.' },
        { value: 'opacity: 0.3', descriptionKey: 'consts.detail.ripple_options.opacity', descriptionFallback: 'Peak opacity of the ripple wave at the centre of the animation.' },
        { value: 'x: 0', descriptionKey: 'consts.detail.ripple_options.x', descriptionFallback: 'Initial horizontal offset of the ripple origin in pixels.' },
        { value: 'y: 0', descriptionKey: 'consts.detail.ripple_options.y', descriptionFallback: 'Initial vertical offset of the ripple origin in pixels.' },
    ],
    usedBy: [
        { name: 'ripple.util' },
        { name: 'v-ripple' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/ripple.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.ripple_options.example',
            titleFallback: 'Merging custom options with defaults',
            code: `import { RIPPLE_OPTIONS } from 'origam'

const opts = { ...RIPPLE_OPTIONS, center: true, duration: 600 }`,
            lang: 'typescript',
        },
    ],
}
