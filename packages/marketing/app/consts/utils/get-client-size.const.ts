import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CLIENT_SIZE_UTIL_DOC: IUtilDoc = {
    slug: 'get-client-size',
    name: 'getClientSize',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_client_size.description',
    descriptionFallback: 'Returns clientWidth or clientHeight of an element depending on the orientation axis. Used by SlideGroup to measure scrollable container dimensions.',
    signature: `function getClientSize(isHorizontal: boolean, element?: HTMLElement): number`,
    params: [
        {
            name: 'isHorizontal',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.get_client_size.param_is_horizontal',
            descriptionFallback: 'When true, returns element.clientWidth; when false, returns element.clientHeight.',
        },
        {
            name: 'element',
            type: 'HTMLElement',
            required: false,
            descriptionKey: 'utils.detail.get_client_size.param_element',
            descriptionFallback: 'The DOM element to measure. Returns 0 when omitted or falsy.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_client_size.returns',
        descriptionFallback: 'The client dimension in pixels (width or height depending on isHorizontal), or 0 when no element is provided.',
    },
    sourceFile: 'packages/ds/src/utils/Slide/slide-group.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_client_size.example_basic',
            titleFallback: 'Measure a scrollable container',
            code: `import { getClientSize } from 'origam'

const trackEl = document.querySelector('.origam-slide-group__content') as HTMLElement

const width  = getClientSize(true,  trackEl)  // → clientWidth
const height = getClientSize(false, trackEl)  // → clientHeight`,
            lang: 'typescript',
        },
    ],
    related: ['get-client-width', 'get-client-height'],
}
