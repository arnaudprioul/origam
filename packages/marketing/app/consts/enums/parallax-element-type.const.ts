import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const PARALLAX_ELEMENT_TYPE_ENUM_DOC: IEnumDoc = {
    slug: 'parallax-element-type',
    name: 'PARALLAX_ELEMENT_TYPE',
    category: 'Animation & Motion',
    descriptionKey: 'enums.catalog.parallax_element_type.description',
    descriptionFallback: 'TypeScript enum for the CSS transform type applied to each Parallax element — scale, translate, rotate, depth, or custom.',
    definition: `export enum PARALLAX_ELEMENT_TYPE {
    SCALE     = 'scale',
    SCALE_X   = 'scaleX',
    SCALE_Y   = 'scaleY',
    TRANSLATE = 'translate',
    ROTATE    = 'rotate',
    DEPTH     = 'depth',
    DEPTH_INV = 'depth_inv',
    CUSTOM    = 'custom'
}`,
    values: [
        { value: 'PARALLAX_ELEMENT_TYPE.SCALE', descriptionKey: 'enums.detail.parallax_element_type.scale', descriptionFallback: 'Applies a uniform scale transform on both axes.' },
        { value: 'PARALLAX_ELEMENT_TYPE.SCALE_X', descriptionKey: 'enums.detail.parallax_element_type.scale_x', descriptionFallback: 'Applies a horizontal scale transform (scaleX).' },
        { value: 'PARALLAX_ELEMENT_TYPE.SCALE_Y', descriptionKey: 'enums.detail.parallax_element_type.scale_y', descriptionFallback: 'Applies a vertical scale transform (scaleY).' },
        { value: 'PARALLAX_ELEMENT_TYPE.TRANSLATE', descriptionKey: 'enums.detail.parallax_element_type.translate', descriptionFallback: 'Applies a translate transform — moves the element along the scroll axis.' },
        { value: 'PARALLAX_ELEMENT_TYPE.ROTATE', descriptionKey: 'enums.detail.parallax_element_type.rotate', descriptionFallback: 'Applies a rotation transform driven by scroll/motion progress.' },
        { value: 'PARALLAX_ELEMENT_TYPE.DEPTH', descriptionKey: 'enums.detail.parallax_element_type.depth', descriptionFallback: 'Simulates depth — combines translateZ and scale to produce a 3-D perspective shift.' },
        { value: 'PARALLAX_ELEMENT_TYPE.DEPTH_INV', descriptionKey: 'enums.detail.parallax_element_type.depth_inv', descriptionFallback: 'Inverted depth — element appears to recede as the user scrolls forward.' },
        { value: 'PARALLAX_ELEMENT_TYPE.CUSTOM', descriptionKey: 'enums.detail.parallax_element_type.custom', descriptionFallback: 'Custom transform — consumer provides a transform function via the element config.' },
    ],
    usedBy: [
        { slug: 'parallax', name: 'Parallax', propName: 'elements[].type' },
    ],
    sourceFile: 'packages/ds/src/enums/Parallax/parallax-element.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.parallax_element_type.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { PARALLAX_ELEMENT_TYPE } from 'origam'

const elementType: PARALLAX_ELEMENT_TYPE = PARALLAX_ELEMENT_TYPE.TRANSLATE`,
            lang: 'typescript',
        },
    ],
}
