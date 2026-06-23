import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const EASING_ENUM_DOC: IEnumDoc = {
    slug: 'easing',
    name: 'EASING',
    category: 'Transition',
    descriptionKey: 'enums.catalog.easing.description',
    descriptionFallback: 'Material Design 3 easing curves used by animated components (Parallax, Overlay, TranslateScale, Field). Each value is a cubic-bezier() CSS function.',
    definition: `export enum EASING {
    STANDARD   = 'cubic-bezier(0.4, 0, 0.2, 1)',
    DECELERATE = 'cubic-bezier(0.0, 0, 0.2, 1)',
    ACCELERATE = 'cubic-bezier(0.4, 0, 1, 1)',
}`,
    values: [
        {
            value: 'EASING.STANDARD',
            descriptionKey: 'enums.detail.easing.standard',
            descriptionFallback: 'Standard curve — used for most transitions (ease in and out).',
        },
        {
            value: 'EASING.DECELERATE',
            descriptionKey: 'enums.detail.easing.decelerate',
            descriptionFallback: 'Decelerate curve — elements entering the screen (ease out).',
        },
        {
            value: 'EASING.ACCELERATE',
            descriptionKey: 'enums.detail.easing.accelerate',
            descriptionFallback: 'Accelerate curve — elements leaving the screen (ease in).',
        },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', propName: 'easing' },
        { slug: 'overlay', name: 'Overlay', propName: 'easing' },
        { slug: 'translate-scale', name: 'TranslateScale', propName: 'easing' },
    ],
    sourceFile: 'packages/ds/src/enums/Transition/transition.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.easing.example',
            titleFallback: 'Applying a decelerate curve to a parallax',
            code: `<origam-parallax :easing="EASING.DECELERATE" src="/hero.jpg" />`,
            lang: 'vue',
        },
    ],
}
