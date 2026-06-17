import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_SCROLL_POSITION_UTIL_DOC: IUtilDoc = {
    slug: 'get-scroll-position',
    name: 'getScrollPosition',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_scroll_position.description',
    descriptionFallback: 'Returns the current scroll position (scrollLeft or scrollTop) of a SlideGroup element, with RTL correction applied for horizontal axes.',
    signature: `function getScrollPosition(isHorizontal: boolean, isRtl: boolean, element?: HTMLElement): number`,
    params: [
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_scroll_position.param_is_horizontal',
            descriptionFallback: 'When true, returns the horizontal scroll position (scrollLeft); when false, returns scrollTop.',
        },
        {
            name: 'isRtl',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_scroll_position.param_is_rtl',
            descriptionFallback: 'When true and horizontal, normalises the RTL scrollLeft value so that 0 always means "scrolled to the start of content".',
        },
        {
            name: 'element',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_scroll_position.param_element',
            descriptionFallback: 'The scroll container element. Returns 0 when omitted.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_scroll_position.returns',
        descriptionFallback: 'The normalised scroll offset in pixels. Always 0 when element is absent.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_scroll_position.example_basic',
            titleFallback: 'Read current scroll offset in a slide group',
            code: `import { getScrollPosition } from 'origam'

const track = document.querySelector<HTMLElement>('.origam-slide-group__wrapper')
// LTR horizontal
const pos = getScrollPosition(true, false, track ?? undefined)

// RTL horizontal (normalised)
const posRtl = getScrollPosition(true, true, track ?? undefined)`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parent', 'get-scroll-parents', 'get-scroll-size', 'get-offset-position'],
}
