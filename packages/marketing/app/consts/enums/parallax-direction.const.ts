import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const PARALLAX_DIRECTION_ENUM_DOC: IEnumDoc = {
    slug: 'parallax-direction',
    name: 'PARALLAX_DIRECTION',
    category: 'Animation & Motion',
    descriptionKey: 'enums.catalog.parallax_direction.description',
    descriptionFallback: 'TypeScript enum for Parallax scroll/motion direction — vertical, horizontal, or both axes.',
    definition: `export enum PARALLAX_DIRECTION {
    VERTICAL   = 'vertical',
    HORIZONTAL = 'horizontal',
    BOTH       = 'both'
}`,
    values: [
        { value: 'PARALLAX_DIRECTION.VERTICAL', descriptionKey: 'enums.detail.parallax_direction.vertical', descriptionFallback: 'Effect applies along the vertical (Y) axis only.' },
        { value: 'PARALLAX_DIRECTION.HORIZONTAL', descriptionKey: 'enums.detail.parallax_direction.horizontal', descriptionFallback: 'Effect applies along the horizontal (X) axis only.' },
        { value: 'PARALLAX_DIRECTION.BOTH', descriptionKey: 'enums.detail.parallax_direction.both', descriptionFallback: 'Effect applies along both X and Y axes simultaneously.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/enums/Parallax/parallax-direction.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.parallax_direction.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { PARALLAX_DIRECTION } from 'origam'

const dir: PARALLAX_DIRECTION = PARALLAX_DIRECTION.VERTICAL`,
            lang: 'typescript',
        },
    ],
}
