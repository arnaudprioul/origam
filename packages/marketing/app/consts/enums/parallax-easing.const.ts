import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const PARALLAX_EASING_ENUM_DOC: IEnumDoc = {
    slug: 'parallax-easing',
    name: 'PARALLAX_EASING',
    category: 'Animation & Motion',
    descriptionKey: 'enums.catalog.parallax_easing.description',
    descriptionFallback: 'TypeScript enum for Parallax easing curve — linear, ease-out, or spring physics.',
    definition: `export enum PARALLAX_EASING {
    LINEAR   = 'linear',
    EASE_OUT = 'ease-out',
    SPRING   = 'spring'
}`,
    values: [
        { value: 'PARALLAX_EASING.LINEAR', descriptionKey: 'enums.detail.parallax_easing.linear', descriptionFallback: 'No easing — the element moves at a constant rate relative to scroll.' },
        { value: 'PARALLAX_EASING.EASE_OUT', descriptionKey: 'enums.detail.parallax_easing.ease_out', descriptionFallback: 'Deceleration easing — the element slows down as it reaches its target position.' },
        { value: 'PARALLAX_EASING.SPRING', descriptionKey: 'enums.detail.parallax_easing.spring', descriptionFallback: 'Spring physics — the element overshoots slightly and settles with a natural bounce.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', propName: 'easing' },
    ],
    sourceFile: 'packages/ds/src/enums/Parallax/parallax-easing.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.parallax_easing.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { PARALLAX_EASING } from 'origam'

const easing: PARALLAX_EASING = PARALLAX_EASING.SPRING`,
            lang: 'typescript',
        },
    ],
}
