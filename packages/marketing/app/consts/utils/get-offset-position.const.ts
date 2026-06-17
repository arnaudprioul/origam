import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_OFFSET_POSITION_UTIL_DOC: IUtilDoc = {
    slug: 'get-offset-position',
    name: 'getOffsetPosition',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_offset_position.description',
    descriptionFallback: 'Returns the offsetLeft or offsetTop pixel value of a SlideGroup element depending on the axis direction. Returns 0 when the element is undefined.',
    signature: `function getOffsetPosition(isHorizontal: boolean, element?: HTMLElement): number`,
    params: [
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_offset_position.param_is_horizontal',
            descriptionFallback: 'When true, reads offsetLeft (horizontal axis); when false, reads offsetTop (vertical axis).',
        },
        {
            name: 'element',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_offset_position.param_element',
            descriptionFallback: 'The target element. When omitted, the function returns 0.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_offset_position.returns',
        descriptionFallback: 'The offsetLeft or offsetTop value in pixels, or 0 if the element is absent.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_offset_position.example_basic',
            titleFallback: 'Read slide position in a horizontal track',
            code: `import { getOffsetPosition } from 'origam'

const slide = document.querySelector<HTMLElement>('.origam-slide-item')
// horizontal offset
getOffsetPosition(true, slide ?? undefined)  // → e.g. 320

// vertical offset
getOffsetPosition(false, slide ?? undefined) // → e.g. 0`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset', 'get-offset-size', 'get-scroll-position'],
}
