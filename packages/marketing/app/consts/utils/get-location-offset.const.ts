import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_LOCATION_OFFSET_UTIL_DOC: IUtilDoc = {
    slug: 'get-location-offset',
    name: 'getLocationOffset',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_location_offset.description',
    descriptionFallback: 'Computes the cumulative offset of an element from the document edge by walking its offsetParent chain, or returns a raw numeric offset (negated in RTL horizontal mode).',
    signature: `function getLocationOffset(target: any, horizontal?: boolean, rtl?: boolean): number`,
    params: [
        {
            name: 'target',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_location_offset.param_target',
            descriptionFallback: 'A number (returned as-is), a CSS selector string, a Vue component instance, or an HTMLElement. Numbers in horizontal RTL mode are negated.',
        },
        {
            name: 'horizontal',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.get_location_offset.param_horizontal',
            descriptionFallback: 'When true, measures the horizontal (left) offset instead of the vertical (top) offset.',
        },
        {
            name: 'rtl',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.get_location_offset.param_rtl',
            descriptionFallback: 'When true and horizontal is true, a numeric target is negated to account for RTL document direction.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_location_offset.returns',
        descriptionFallback: 'The cumulative pixel offset of the element from the document edge (top by default, left in horizontal mode).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/goTo.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_location_offset.example_basic',
            titleFallback: 'Vertical offset of an element',
            code: `import { getLocationOffset } from 'origam'

const el = document.getElementById('section-hero')
const top = getLocationOffset(el) // cumulative offsetTop

// Horizontal offset
const left = getLocationOffset(el, true)

// Raw numeric offset in RTL mode
const rtlLeft = getLocationOffset(200, true, true) // → -200`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset', 'get-offset-position', 'get-scroll-position'],
}
