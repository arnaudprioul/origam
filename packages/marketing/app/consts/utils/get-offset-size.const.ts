import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_OFFSET_SIZE_UTIL_DOC: IUtilDoc = {
    slug: 'get-offset-size',
    name: 'getOffsetSize',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_offset_size.description',
    descriptionFallback: 'Returns the offsetWidth or offsetHeight of an element depending on the axis. Returns 0 when the element is undefined. Used by SlideGroup to compute slide dimensions.',
    signature: `function getOffsetSize(isHorizontal: boolean, element?: HTMLElement): number`,
    params: [
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_offset_size.param_is_horizontal',
            descriptionFallback: 'When true, reads offsetWidth; when false, reads offsetHeight.',
        },
        {
            name: 'element',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_offset_size.param_element',
            descriptionFallback: 'The target element. Returns 0 when omitted.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_offset_size.returns',
        descriptionFallback: 'The offsetWidth or offsetHeight value in pixels, or 0 if the element is absent.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_offset_size.example_basic',
            titleFallback: 'Read slide width or height',
            code: `import { getOffsetSize } from 'origam'

const slide = document.querySelector<HTMLElement>('.origam-slide-item')
getOffsetSize(true,  slide ?? undefined) // offsetWidth  → e.g. 240
getOffsetSize(false, slide ?? undefined) // offsetHeight → e.g. 120`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset', 'get-offset-position', 'get-scroll-size'],
}
