import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_SCROLL_SIZE_UTIL_DOC: IUtilDoc = {
    slug: 'get-scroll-size',
    name: 'getScrollSize',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_scroll_size.description',
    descriptionFallback: 'Returns the scrollWidth or scrollHeight of an element depending on the axis. Returns 0 when the element is undefined. Used by SlideGroup to determine total scrollable content size.',
    signature: `function getScrollSize(isHorizontal: boolean, element?: HTMLElement): number`,
    params: [
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_scroll_size.param_is_horizontal',
            descriptionFallback: 'When true, reads scrollWidth; when false, reads scrollHeight.',
        },
        {
            name: 'element',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_scroll_size.param_element',
            descriptionFallback: 'The scroll container element. Returns 0 when omitted.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_scroll_size.returns',
        descriptionFallback: 'The full scrollable content size in pixels along the selected axis, or 0 if the element is absent.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_scroll_size.example_basic',
            titleFallback: 'Compute whether scroll arrows should be shown',
            code: `import { getScrollSize, getOffsetSize } from 'origam'

const track = document.querySelector<HTMLElement>('.origam-slide-group__wrapper')
const scrollable = getScrollSize(true, track ?? undefined)
const visible    = getOffsetSize(true, track ?? undefined)

const hasOverflow = scrollable > visible`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parent', 'get-scroll-position', 'get-offset-size'],
}
